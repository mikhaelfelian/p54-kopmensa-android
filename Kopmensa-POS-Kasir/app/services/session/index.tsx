import api from "../base";
import { isNotNullOrEmpty } from "@/app/utils/checker";

export const Login = async (body: string) => {
  const { data } = await api({
    method: "POST",
    url: "/api/anggota/login",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: body,
  });

  return data;
};

export const Logout = async () => {
  const url = `/api/anggota/logout`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};
