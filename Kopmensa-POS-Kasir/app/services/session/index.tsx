import api from "../base";
import { isNotNullOrEmpty } from "@/app/utils/checker";

export const login = (body: any) =>
  api({
    method: "POST",
    url: "/TokenAuth/Authenticate",
    headers: { "Content-Type": "application/json-patch+json", Accept: "text/plain" },
    data: body,
  }).then(({ data }) => data);

export const Logout = () =>
  api({
    method: "GET",
    url: "/TokenAuth/LogOut",
  }).then(({ data }) => data);

export const GetCurrentLoginInformations = () =>
  api({
    method: "GET",
    url: `/services/app/Session/GetCurrentLoginInformations`,
  }).then(({ data }) => data);

export const RefreshToken = async (refreshToken: string) => {
  const formBody = new URLSearchParams();
  formBody.append("refreshToken", refreshToken);

  try {
    const response = await api({
      method: "POST",
      url: "/TokenAuth/RefreshToken",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json",
      },
      data: formBody.toString(),
    });

    return response.data;
  } catch (error: any) {
    console.error("Error details:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const UpdateCurrentUserProfile = (body: any) =>
  api({
    method: "PUT",
    url: "/services/app/Profile/UpdateCurrentUserProfile",
    headers: { "Content-Type": "application/json" },
    data: body,
  }).then(({ data }) => data);

export const GetProfilePictureByUser = async (userId: string) => {
  const params = new URLSearchParams();

  if (isNotNullOrEmpty(userId)) {
    params.append("userId", userId);
  }

  const url = `/services/app/Profile/GetProfilePictureByUser?${params.toString()}`;

  const { data } = await api({
    method: "GET",
    url: url,
  });
  return data;
};

export const UpdateProfilePicture = (body: any) =>
  api({
    method: "PUT",
    url: "/services/app/Profile/UpdateProfilePicture",
    headers: { "Content-Type": "application/json" },
    data: body,
  }).then(({ data }) => data);
