/* eslint-disable @typescript-eslint/no-explicit-any */
import { encode, decode } from "js-base64";

export const encoded = (cookie: any): string => {
  return encode(String(cookie));
};

export const decoded = (cookie: any) => {
  return decode(String(cookie));
};
