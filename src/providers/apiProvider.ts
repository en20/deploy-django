import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { AuthenticationResponse } from "@/types/api";
import { API_URL, LOCAL_URL } from "@/utils/api";
import { errorInterceptor } from "./interceptors/ErrorInterceptor";
import { responseInterceptor } from "./interceptors/ResponseInterceptor";

class ApiProvider {
  private instance: AxiosInstance;

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
    });

    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return errorInterceptor(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => responseInterceptor(response),
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data.error === "token expired"
        ) {
          try {
            const response = await axios.get<AuthenticationResponse>(
              `${LOCAL_URL}/api/auth/refresh`,
              { withCredentials: true },
            );
            
            if (response.status !== 200) {
              return errorInterceptor(error as AxiosError);
            }
            
            localStorage.setItem("token", response.data.access_token)

            return this.instance(originalRequest);
          } catch (error) {
            return errorInterceptor(error as AxiosError);
          }
        }
        return errorInterceptor(error);
      },
    );
  }
  async get<T>(path: string, options?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.get<T>(path, options);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T, D>(
    path: string,
    data?: D,
    options?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.instance.post<T>(path, data, options);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put<T, D>(
    path: string,
    data?: D,
    options?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.instance.put<T>(path, data, options);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(path: string, options?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.delete<T>(path, options);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const apiProvider = new ApiProvider(API_URL);
export const localProvider = new ApiProvider(LOCAL_URL);
