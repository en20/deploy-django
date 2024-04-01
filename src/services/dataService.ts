import { apiProvider } from "@/providers/apiProvider";
import { LogsResponse, RobotsResponse, RobotResponse, RunsResponse, CountResponse } from "@/types/api";

const fetchRobot = async (robotId: string): Promise<RobotResponse> => {
  try {
    const response = await apiProvider.get<RobotResponse>(`/api/robots/${robotId}`) 

    return response;
  } catch (error) {
    throw error 
  }
}

const fetchRobots = async (): Promise<RobotsResponse> => {
  try {
    const response = await apiProvider.get<RobotsResponse>("/api/robots");

    return response;
  } catch (error) {
    throw error;
  }
};

const fetchRuns = async (robotId: string, skip: number, limit: number): Promise<RunsResponse> => {
  try {
    const response = await apiProvider.get<RunsResponse>(
      `/api/robots/${robotId}/runs?skip=${skip}&limit=${limit}`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const fetchRunsCount = async (robotId: string): Promise<CountResponse> => {
  try {
    const response = await apiProvider.get<CountResponse>(
      `/api/robots/${robotId}/runs/count`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const fetchLogs = async (
  robotId: string,
  runId: string,
  skip: number,
  limit: number,
): Promise<LogsResponse> => {
  try {
    const response = await apiProvider.get<LogsResponse>(
      `/api/robots/${robotId}/runs/${runId}/logs?skip=${skip}&limit=${limit}`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};


const fetchLogsCount = async (
  robotId: string,
  runId: string,
): Promise<CountResponse> => {
  try {
    const response = await apiProvider.get<CountResponse>(
      `/api/robots/${robotId}/runs/${runId}/logs/count`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const dataService = {
  fetchRobot,
  fetchRobots,
  fetchRuns,
  fetchRunsCount,
  fetchLogs,
  fetchLogsCount,
};

export default dataService;
