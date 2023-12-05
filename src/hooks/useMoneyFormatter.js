import { useMemo } from "react";

export function useMoneyFormatter () {
  return useMemo(() => new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0, }));
};