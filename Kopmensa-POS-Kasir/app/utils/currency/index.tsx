export const formatCurrency = (value: number | string | undefined | null): string => {
  const numberValue = typeof value === "string" ? parseFloat(value) : value ?? 0;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numberValue);
};
