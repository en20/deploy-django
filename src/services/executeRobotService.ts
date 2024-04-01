import { localProvider } from "@/providers/apiProvider";

type ExecutionResponse = {
  message: string;
  run: string;
};

const executeRobot = async (
  robotId: string,
  data: FormData,
  setProgress: (progress: number) => void,
): Promise<ExecutionResponse> => {
  try {
    const response = await localProvider.post<ExecutionResponse, FormData>(
      `/api/robots/${robotId}/execute/mock-robot`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        onUploadProgress: (progress) => {
          if (!progress.total) return;

          setProgress(Math.round((100 * progress.loaded) / progress.total));
        },
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const executeRobot2 = async (
  robotId: string,
  data: FormData,
): Promise<ExecutionResponse> => {
  try {
    const response = await localProvider.post<ExecutionResponse, FormData>(
      `/api/robots/${robotId}/execute/access-url`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const executeRobot3 = async (
  robotId: string,
  data: FormData,
  setProgress: (progress: number) => void,
): Promise<ExecutionResponse> => {
  try {
    const response = await localProvider.post<ExecutionResponse, FormData>(
      `/api/robots/${robotId}/execute/sipec-robot`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        onUploadProgress: (progress) => {
          if (!progress.total) return;

          setProgress(Math.round((100 * progress.loaded) / progress.total));
        },
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};
const executeRobotService = {
  executeRobot,
  executeRobot2,
  executeRobot3
};

export default executeRobotService;
