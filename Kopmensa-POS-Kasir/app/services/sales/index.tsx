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
