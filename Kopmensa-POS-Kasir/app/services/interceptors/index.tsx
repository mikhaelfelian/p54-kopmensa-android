import { clearAllData } from "@/app/utils/localstorage";
import { navigateGlobal } from "@/app/utils/navigate-global";
import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import Toast from "react-native-toast-message";

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
      async (error) => {
        try {
          if (error.response?.status === 401) {
            console.warn("Unauthorized: Token might be expired or invalid.");

            await clearAllData().finally(() => {
              Toast.show({
                text1: "Session expired!",
                text2: `Please login again with your account.`,
                type: "error",
              });

              navigateGlobal("LoginScreen");
            });
          }
        } catch (error) {
          console.error("attachResponseInterceptor = " + error);
        }

        return Promise.reject(error);
      }
    );
  }
}
