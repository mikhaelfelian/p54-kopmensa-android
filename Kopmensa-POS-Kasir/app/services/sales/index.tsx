import { getData } from "@/app/utils/localstorage";
import api from "../base";
import { isNotNullOrEmpty } from "@/app/utils/checker";

export const GetDashboardBasicMetrics = async () => {
  const url = `/api/pos/dashboard/basic-metrics`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const GetSalesAnalytics = async () => {
  const url = `/api/pos/dashboard/sales-analytics`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const GetPerformanceMetrics = async () => {
  const url = `/api/pos/dashboard/performance-metrics`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const GetMonthlySales = async () => {
  const url = `/api/pos/dashboard/monthly-sales`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const GetSalesByCategory = async () => {
  const url = `/api/pos/dashboard/sales-by-category`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const GetTopProducts = async () => {
  const url = `/api/pos/dashboard/top-products`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const GetRecentTransaction = async () => {
  const url = `/api/pos/dashboard/recent-transactions`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const GetPaymentMethods = async () => {
  const url = `/api/pos/transaksi/payments`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const CreateTransaction = async (body: string) => {
  const { data } = await api({
    method: "POST",
    url: "/api/pos/transaksi/store",
    data: body,
  });

  return data;
};

export const GetReturnSales = async () => {
  const params = new URLSearchParams();

  const userData = await getData("userData");
  params.append("id_pelanggan", userData?.id);

  const url = `/api/pos/retur-jual?${params.toString()}`;

  const { data } = await api({
    method: "GET",
    url: url,
  });

  return data;
};

export const CheckVoucher = async (body: string) => {
  const { data } = await api({
    method: "POST",
    url: "/api/pos/transaksi/validate-voucher",
    data: body,
  });

  return data;
};
