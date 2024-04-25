import { localProvider } from "@/providers/apiProvider";

type ExecutionResponse = {
  message: string;
  run: string;
};

const executeRobot = async (
  robotId: string,
  name: string,
  password: string,
  file: File,
  setProgress: (progress: number) => void,
): Promise<ExecutionResponse> => {
  try {
    const data = new FormData()

    const TestBotData = {
      robot_name: "test_robot",
      name: name,
      password: password
    }
    
    data.set("data", JSON.stringify(TestBotData));
    data.set("file", file);

    const response = await localProvider.post<ExecutionResponse, FormData>(
      `/api/robots/${robotId}/execute`,
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
  url: string
): Promise<ExecutionResponse> => {
  try {
    const data = new FormData()

    const UrlBotData = {
      robot_name: "url_robot",
      url: url
    }

    data.set("data", JSON.stringify(UrlBotData));
    
    const response = await localProvider.post<ExecutionResponse, FormData>(
      `/api/robots/${robotId}/execute`,
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
