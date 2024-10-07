/* eslint-disable @typescript-eslint/no-explicit-any */
import { decoded, encoded } from "./base64";

// localStorage

export const setLocalStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, encoded(JSON.stringify(data)));
  }
};

export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    if (item) {
      return decoded(item);
    }
  }
  return null;
};

export const deleteLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

// sessionStorage

export const setSessionStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, encoded(JSON.stringify(data)));
  }
};

export const getSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const item = sessionStorage.getItem(key);
    if (item) {
      return decoded(item);
    }
  }
  return null;
};

export const deleteSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};

export const clearSessionStorage = () => {
  if (typeof window !== "undefined") {
    sessionStorage.clear();
  }
};
