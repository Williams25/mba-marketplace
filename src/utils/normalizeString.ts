export const normalizeString = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ /g, '')
    .replace(/\s(.?)\s*/g, '')
    .toLowerCase();

export const compareStrings = (val1: string, val2: string) =>
  normalizeString(val1).includes(normalizeString(val2));
