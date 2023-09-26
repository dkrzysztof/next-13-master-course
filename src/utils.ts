export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(amount);
};

export const getPages = (pageSize: number, totalItems: number) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}