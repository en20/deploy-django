from api.models import Robot, Run
from django.core.exceptions import ObjectDoesNotExist


def get_all_robots(groups):
    robots = []
    for robot in Robot.objects.all():
        if robot.group.id in groups:
            robots.append(robot)

    return robots


def get_robot_by_id(id):
    return Robot.objects.get(pk=id)


def get_robot_runs(id, skip, limit):
    return Run.objects.filter(robot=id)[skip:limit]


def get_robot_runs_count(robot_id):
    return Run.objects.filter(robot=robot_id).count()


def does_robot_exist(id):
    try:
        _ = get_robot_by_id(id)
        return True
    except ObjectDoesNotExist:
        return False
