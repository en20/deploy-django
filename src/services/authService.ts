import { localProvider } from "@/providers/apiProvider";
import {
  AuthenticationRequest,
  AuthenticationResponse,
  CsrfResponse,
  DecodeResponse,
} from "@/types/api";

async function login(
  email: string,
  password: string,
): Promise<AuthenticationResponse> {
  try {
    const response = await localProvider.post<
      AuthenticationResponse,
      AuthenticationRequest
    >("/api/auth/login", {
      email: email,
      password: password,
    })

    return response;
  } catch (error) {
    throw error;
  }
}

async function getCsrf(): Promise<CsrfResponse> {
  try {
    const response = await localProvider.get<CsrfResponse>("/api/auth/csrf");

    return response;
  } catch (error) {
    throw error;
  }
}

async function decodeToken(): Promise<DecodeResponse> {
  try {
    const response = await localProvider.get<DecodeResponse>("/api/auth/decode");

    return response;
  } catch (error) {
    throw error;
  }
}

async function refreshToken(): Promise<AuthenticationResponse> {
  try {
    const response = await localProvider.get<AuthenticationResponse>(
      "/api/auth/refresh",
      { withCredentials: true },
    );

    return response;
  } catch (error) {
    throw error;
  }
}

const authService = {
  login,
  getCsrf,
  decodeToken,
  refreshToken,
};

export default authService;
