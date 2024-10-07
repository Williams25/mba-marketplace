export const mailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
export const fixePhoneRegex = /^\(\d{2}\) \d{4}-\d{4}$/;
export const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
export const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
export const cepRegex = /^\d{5}-\d{3}$/;
export const passwordRegex =
  /^(?=.*[a-zÀ-ÖØ-öø-ÿ])(?=.*[A-ZÀ-ÖØ-öø-ÿ])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-zÀ-ÖØ-öø-ÿ\d@$!%*?&#]{8,}$/;
