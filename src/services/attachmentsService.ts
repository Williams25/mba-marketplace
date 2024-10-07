import { http } from "@/lib/axios";
import { UploadedAttachments } from "@/types/attachments";

export const attachmentsService = {
  upload: async (files: File[]) => {
    if (files.length === 0) return null;
    const formData = new FormData();
    files?.forEach((file) => {
      formData.set("files", file);
    });

    const { data } = await http.post<UploadedAttachments>(
      "attachments",
      formData
    );

    return data;
  }
};
