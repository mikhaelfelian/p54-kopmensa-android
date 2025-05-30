import axios from "axios";
import { getEnvVars } from "../../../Environment";
import { getData } from "@/app/utils/localstorage";
import InterceptorManager from "../interceptors";

const { apiUrl } = getEnvVars();

const getToken = async (): Promise<string | null> => {
  try {
    let token = "";
    await getData("token").then((response) => {
      if (response != null) {
        token = response;
      }
    });

    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: false,
});

InterceptorManager.attachTokenInterceptor(axiosInstance, getToken);
InterceptorManager.attachResponseInterceptor(axiosInstance);

export default axiosInstance;
