from ninja import Router, File, Form
from ninja.files import UploadedFile
from api.schemas import (
    BotsResponse,
    CountResponse,
    BotResponse,
    RunsResponse,
    LogsResponse,
    ExecutionResponse,
    ExecutionDetails,
    SipecBotDetails,
    AccessUrlDetails,
    Error,
)
from django.utils import timezone
from django.http import HttpRequest, HttpResponse
from api.repositories.robot import (
    does_robot_exist,
    get_all_robots,
    get_robot_by_id,
    get_robot_runs,
    get_robot_runs_count,
)
from api.repositories.run import (
    get_run_by_id,
    create_run,
    get_run_logs,
    get_run_logs_count,
)
from api.tasks.mock_robot import execute_mock_bot
from api.tasks.access_url import access_url
from api.tasks.sipec_bot import execute_sipec_bot
from api.token import decode_jwt_token

router = Router()

DEFAULT_SKIP = 0
DEFAULT_LIMIT = 0


@router.get("/", response=BotsResponse)
def robots(request: HttpRequest, response: HttpResponse):
    access_token = request.auth

    payload = decode_jwt_token(access_token)

    all_bots = get_all_robots(payload["groups"])

    if len(all_bots) == 0:
        return {
            "message": "There are no robots avaliable",
            "robots": list(all_bots),
        }

    return {
        "message": "Bots fetched successfully",
        "robots": list(all_bots),
    }


@router.get("/{robot_id}", response={200: BotResponse, 404: Error})
def robot(request, robot_id):
    if not does_robot_exist(robot_id):
        return 404, {"error": "This robot does not exist"}

    robot = get_robot_by_id(robot_id)

    return {"message": "Robot fetched successfully", "robot": robot}


@router.get("/{robot_id}/runs", response={200: RunsResponse, 400: Error, 404: Error})
def runs(request, robot_id, skip: int = DEFAULT_SKIP, limit: int = DEFAULT_LIMIT):
    if not does_robot_exist(robot_id):
        return 404, {"error": "This robot does not exist"}

    robot_runs = get_robot_runs(robot_id, skip, limit)

    if not robot_runs:
        return {
            "message": "There are no executions avaliable",
            "runs": [],
        }

    return {
        "message": "Executions fetched successfully",
        "runs": list(robot_runs),
    }


@router.get("/{robot_id}/runs/count", response={200: CountResponse, 404: Error})
def runs_count(request, robot_id):
    if not does_robot_exist(robot_id):
        return 404, {"error": "This robot does not exist"}

    runs_count = get_robot_runs_count(robot_id)

    return {
        "message": "Robot runs count fetched successfully",
        "count": runs_count,
    }


@router.get(
    "/{robot_id}/runs/{run_id}/logs",
    response={200: LogsResponse, 400: Error, 404: Error},
)
def logs(
    request, robot_id, run_id, skip: int = DEFAULT_SKIP, limit: int = DEFAULT_LIMIT
):
    run = get_run_by_id(run_id)

    if run is None:
        return 404, {"error": "This run does not exist"}

    logs = get_run_logs(run_id, skip, limit)

    return {
        "message": "Logs fetched successfully",
        "run": run,
        "logs": list(logs),
    }


@router.get(
    "/{robot_id}/runs/{run_id}/logs/count",
    response={200: CountResponse, 400: Error, 404: Error},
)
def logs_count(request, robot_id, run_id):
    run = get_run_by_id(run_id)

    if run is None:
        return 404, {"error": "This run does not exist"}

    logs_count = get_run_logs_count(run.id)

    return {"message": "Logs count fetched successfully", "count": logs_count}


def save_to_disk(file, file_path):
    with open(file_path, "wb") as dest:
        for chunk in file.chunks():
            dest.write(chunk)


@router.post(
    "/{robot_id}/execute/mock-robot", response={200: ExecutionResponse, 404: Error}
)
def mock_robot(
    request,
    robot_id,
    details: ExecutionDetails = Form(...),
    file: UploadedFile = File(...),
):
    if not does_robot_exist(robot_id):
        return 404, {"error": "This robot does not exist"}

    robot = get_robot_by_id(robot_id)

    file_path = f"upload-{file.name}-{timezone.now()}.csv"

    save_to_disk(file, file_path)

    run = create_run(robot, "Cadastrar novos usuários no django admin")

    execute_mock_bot.apply_async(
        args=[file_path, run.id, details.name, details.password]
    )

    return {
        "message": "Tarefa iniciada com sucesso",
        "run": run.id,
    }


@router.post(
    "/{robot_id}/execute/sipec-robot", response={200: ExecutionResponse, 404: Error}
)
def sipec_robot(
    request,
    robot_id,
    details: SipecBotDetails = Form(...),
    file: UploadedFile = File(...),
):
    if not does_robot_exist(robot_id):
        return 404, {"error": "This robot does not exist"}

    robot = get_robot_by_id(robot_id)

    file_path = f"upload-{file.name}-{timezone.now()}.csv"

    save_to_disk(file, file_path)

    run = create_run(robot, "Cadastrar necessidades dos servidores no SIPEC")

    execute_sipec_bot.apply_async(
        args=[
            file_path,
            run.id,
            details.cpf,
            details.password,
            details.year,
            details.sector,
        ]
    )

    return {
        "message": "Tarefa iniciada com sucesso",
        "run": run.id,
    }


@router.post(
    "/{robot_id}/execute/access-url", response={200: ExecutionResponse, 404: Error}
)
def access_target_url(request, robot_id, details: AccessUrlDetails = Form(...)):
    robot = get_robot_by_id(robot_id)

    if not does_robot_exist(robot_id):
        return 404, {"error": "This robot does not exist"}

    run = create_run(robot, f"Acessar {details.url}")

    access_url.apply_async(args=[run.id, details.url])

    return {
        "message": "Tarefa iniciada com sucesso",
        "run": run.id,
    }
