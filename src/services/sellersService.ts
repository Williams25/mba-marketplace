import { http } from "@/lib/axios";
import { ISignUpFormData } from "@/pages/auth/SignUp";
import { ISellersResponse } from "@/types/sellers";
import { attachmentsService } from "./attachmentsService";

export const sellersService = {
  create: async (data: ISignUpFormData) => {
    let avatarId = "";
    if (data.fileAvatar) {
      const uploadedFiles = await attachmentsService.upload([data.fileAvatar]);
      avatarId = uploadedFiles?.attachments[0]?.id || "";
    }

    const response = await http.post<ISellersResponse>("/sellers", {
      ...data,
      avatarId
    });

    return response.data;
  },
  getProfile: async () => {
    const { data } = await http.get<ISellersResponse>("/sellers/me");
    return data;
  }
};
