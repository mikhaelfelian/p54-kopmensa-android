import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

export default class InterceptorManager {
  static attachTokenInterceptor(axiosInstance: AxiosInstance, getToken: () => Promise<string | null>): void {
    axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  static attachResponseInterceptor(axiosInstance: AxiosInstance): void {
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        console.error("Response Error:", error);
        return Promise.reject(error);
      }
    );
  }
}
