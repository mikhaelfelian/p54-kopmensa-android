import api from "../base";
import { isNotNullOrEmpty } from "@/app/utils/checker";

export const GetProducts = async (page: string, keyword: string, categoryID: string) => {
  const params = new URLSearchParams();

  if (page?.length > 0) {
    params.append("page", page);
  }

  if (categoryID?.length > 0) {
    params.append("CategoryId", categoryID);
  }

  params.append("keyword", keyword);

  const url = `/api/pos/produk?${params.toString()}`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const GetCategory = async (page: string) => {
  const params = new URLSearchParams();

  if (page?.length > 0) {
    params.append("page", page);
  }

  const url = `/api/pos/category?${params.toString()}`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const GetOutlets = async (page: string) => {
  const params = new URLSearchParams();

  if (page?.length > 0) {
    params.append("page", page);
  }

  const url = `/api/pos/outlet?${params.toString()}`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const GetProfile = async () => {
  const url = `/api/anggota/profile`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};
