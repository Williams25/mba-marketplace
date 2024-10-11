export const formatPrice = (
  price: number
): {
  reais: string;
  centavos: string;
} => {
  const priceFormated = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL"
  }).format(price);

  const [reais, centavos] = priceFormated.split(",");

  return { reais: String(reais || 0), centavos: String(centavos || 0) };
};

export const currency = (price: number): string =>
  Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL"
  }).format(price);

export const regexNumbers = (value: string = "0") => value.match(/\d+/g) || [];

export const parsePriceMultipliedOneHundred = (value: string) => {
  const cents = regexNumbers(value.substring(value.length - 2) || "00").join(
    ""
  );
  const price = regexNumbers(value.substring(0, value.length - 2) || "00").join(
    ""
  );

  const fullPrice = Number(`${price}.${cents}`);
  return parseInt(String(fullPrice * 100));
};

export const parsePriceDividedHundred = (price: number) => {
  return (price || 0) / 100;
};
