import { apiClient } from "@/lib/api-client";
import { UploadResponse } from "@/types/api";

export const uploadService = {
  async uploadFile(file: File, folder?: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);
    if (folder) {
      formData.append("folder", folder);
    }

    return apiClient.post<UploadResponse>("/upload", formData);
  },

  async uploadMultipleFiles(
    files: File[],
    folder?: string,
  ): Promise<PromiseSettledResult<UploadResponse>[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file, folder));
    return Promise.allSettled(uploadPromises);
  },

  async deleteFile(publicId: string): Promise<any> {
    return apiClient.delete("/upload/delete-multiple", {
      publicIds: [publicId],
    });
  },

  async deleteMultipleFiles(publicIds: string[]): Promise<any> {
    return apiClient.delete("/upload/delete-multiple", { publicIds });
  },
};
