export const toUrlEncoded = (params: any) => {
  return Object.keys(params)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
    .join("&");
};

export const formatPercent = (value: number | null | undefined): string => {
  if (value == null || isNaN(value)) return "0.0%";
  return `${value.toFixed(1)}%`;
};

export const generateRandomString = () => {
  const date = new Date();

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${yyyy}${mm}${dd}`;

  const randomNum = String(Math.floor(Math.random() * 10000)).padStart(4, "0");

  return `TRX-${formattedDate}-${randomNum}`;
};
