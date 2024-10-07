import { STORAGE_KEYS } from "@/constants/StorageKeys";
import { http } from "@/lib/axios";
import { IGetSessionParams, ISessionResponse } from "@/types/session";
import { clearCookie, createCookie } from "@/utils/cookie";

export const sessionService = {
  getSession: async (data: IGetSessionParams) => {
    const response = await http.post<ISessionResponse>(
      "sellers/sessions",
      data
    );
    createCookie(response.data.accessToken, STORAGE_KEYS.AUTH);
    return response.data;
  },
  signOut: async () => {
    await http.post("/sign-out");
    clearCookie(STORAGE_KEYS.AUTH);
  }
};
