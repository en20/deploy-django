export interface ApiError {
  error: string;
}

export interface CsrfResponse {
  message: string;
}

export interface DecodeResponse {
  message: string;
  user: string;
  email: string;
  groups: string[];
}

export interface AuthenticationResponse {
  message: string;
  access_token: string;
}

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface Robot {
  id: string;
  name: string;
  description: string;
  section_name: string;
  created_at: string;
}

export interface Run {
  id: string;
  robot: string;
  task: string;
  status: string;
  started_at: string;
}

export interface Log {
  id: string;
  run: Run;
  content: string;
  level: string;
  executed_at: string;
}

export interface CountResponse {
  message: string;
  count: number;
}

export interface RobotsResponse {
  message: string;
  robots: Robot[];
}

export interface RobotResponse {
  message: string;
  robot: Robot;
}

export interface RunsResponse {
  message: string;
  runs: Run[];
}

export interface LogsResponse {
  message: string;
  run: Run;
  logs: Log[];
}

export interface ExecutionResponse {
  message: string;
  runs: Run[];
}
