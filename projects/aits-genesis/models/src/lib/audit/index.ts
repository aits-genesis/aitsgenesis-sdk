/** Common audit fields present on most entities */
export interface AuditableDto {
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

/** Full soft-delete audit trail */
export interface FullAuditableDto extends AuditableDto {
  deletedBy?: string;
  deletedAt?: string;
  isDeleted?: boolean;
}
