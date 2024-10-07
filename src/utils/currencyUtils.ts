export const formatPrice = (
  price: number
): {
  reais: string;
  centavos: string;
} => {
  const priceFormated = Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  const [reais, centavos] = priceFormated.split(',');

  return { reais: String(reais || 0), centavos: String(centavos || 0) };
};

export const currency = (price: number): string =>
  Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
