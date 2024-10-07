export interface UploadAttachments {
  files: string[];
}
export interface UploadedAttachments {
  attachments: {
    id: string;
    url: string;
  }[];
}
