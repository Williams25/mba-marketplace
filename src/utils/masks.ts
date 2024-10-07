import { hasText } from "./stringUtil";

export const phoneMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};

export const fixePhoneMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

export const currencyMask = (number: number | string): string => {
  let money: string;
  let intPart: string;
  let centPart: string;

  if (typeof number === "number") number = number.toFixed(2);

  money = String(number);

  if (money.indexOf("c") !== -1 || money.indexOf("C") !== -1) {
    money = "0";
  }

  money = money.replace(/\D/g, "");
  if (money === "") {
    money = "0";
  }
  money = parseInt(money).toString();

  if (money.length > 13) {
    money = money.substring(0, 14);
  }

  if (money.length < 3 && money === "0") {
    money = "000";
  } else {
    for (let i = money.length; i < 3; i++) {
      money = "0" + money;
    }
  }

  intPart = money
    .slice(0, money.length - 2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  centPart = money.slice(-2);

  money = intPart + "," + centPart;

  return money;
};

export const maskCPF = (value: string) => {
  let cpf = value;
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
};

export const maskCNPJ = (value: string) => {
  let cnpj = value;
  cnpj = cnpj.replace(/\D/g, "");
  cnpj = cnpj.replace(/(\d{2})(\d)/, "$1.$2");
  cnpj = cnpj.replace(/(\d{3})(\d)/, "$1.$2");
  cnpj = cnpj.replace(/(\d{3})(\d)/, "$1/$2");
  cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
  return cnpj;
};

export const maskNumbers = (value?: string) => {
  if (!hasText(value) || !value) return "";
  return value.replace(/[^0-9]/g, "");
};

export const maskCep = (value?: string) => {
  if (!hasText(value) || !value) return "";

  let cepNumbers = value.replace(/\D/g, "");
  if (cepNumbers && cepNumbers.length > 5)
    cepNumbers = cepNumbers.substr(0, 5) + "-" + cepNumbers.substr(5);
  return cepNumbers;
};

export const weightMask = (weight?: string): string => {
  if (!hasText(weight) || !weight) return "";

  const formattedWeight = weight.replace(/\D/g, "");

  const trimmedWeight = formattedWeight.replace(/^0+(?!$)/, "");

  if (trimmedWeight === "" || trimmedWeight === "0") {
    return "";
  }

  let integerPart = trimmedWeight.slice(0, -3);
  const decimalPart = trimmedWeight.slice(-3);

  if (integerPart === "") {
    integerPart = "0";
  }

  let result = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  result += "," + decimalPart;

  return result;
};

export const maskPercent = (value?: string) => {
  if (!hasText(value) || !value) return "";

  let inputValue = value;

  inputValue = inputValue.replace(/[^\d.]/g, "");

  let decimalPart = "";
  const decimalIndex = inputValue.indexOf(".");
  if (decimalIndex !== -1) {
    decimalPart = inputValue.substring(decimalIndex);
    if (decimalPart.length > 3) {
      decimalPart = decimalPart.substring(0, 3);
    }
    inputValue = inputValue.substring(0, decimalIndex);
  }

  let formattedValue = "";
  let integerPart = inputValue || "";
  while (integerPart.length > 2) {
    formattedValue = "," + integerPart.slice(-3) + formattedValue;
    integerPart = integerPart.slice(0, -3);
  }
  formattedValue = integerPart + formattedValue + decimalPart;

  return formattedValue;
};
