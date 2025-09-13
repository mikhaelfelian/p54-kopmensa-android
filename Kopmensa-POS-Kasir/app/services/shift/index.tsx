import api from "../base";
import { isNotNullOrEmpty } from "@/app/utils/checker";

export const OpenShift = async (body: string) => {
  const { data } = await api({
    method: "POST",
    url: "/api/pos/shift/open",
    data: body,
  });

  return data;
};

export const GetShiftList = async (outletID: string, page: string) => {
  const params = new URLSearchParams();

  if (page?.length > 0) {
    params.append("page", page);
  }

  if (outletID?.length > 0) {
    params.append("outlet_id", outletID);
  }

  const url = `/api/pos/shift?${params.toString()}`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const GetShiftDetail = async (id: string) => {
  const url = `/api/pos/shift/detail/${id}`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const CloseShift = async (body: string, id: string) => {
  const { data } = await api({
    method: "POST",
    url: `/api/pos/shift/close/${id}`,
    data: body,
  });

  return data;
};
