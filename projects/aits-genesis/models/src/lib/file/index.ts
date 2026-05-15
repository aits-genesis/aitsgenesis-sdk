/** File upload response — returned by `POST /FileBank/Upload` */
export interface FileBankDto {
  fileBankId: string;
  fileName: string;
  fileSize: number;
  contentType: string;
  url?: string;
}

/** Reference to a previously uploaded file attached to an entity */
export interface FileAttachmentDto {
  fileBankId: string;
  fileName: string;
  fileSize: number;
  contentType: string;
  displayOrder?: number;
}
