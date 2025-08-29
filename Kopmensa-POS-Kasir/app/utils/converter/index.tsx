export const toUrlEncoded = (params: any) => {
  return Object.keys(params)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
    .join("&");
};

export const formatPercent = (value: number | null | undefined): string => {
  if (value == null || isNaN(value)) return "0.0%";
  return `${value.toFixed(1)}%`;
};
