/** Generic key-value pair */
export interface KeyValueDto<K = string, V = string> {
  key: K;
  value: V;
}

/** Standard address structure used across modules */
export interface AddressDto {
  addressTypeId: number;
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  district?: string;
  postalCode?: string;
  country?: string;
}

/** Single contact person entry */
export interface ContactPersonDto {
  name: string;
  designation?: string;
  phone?: string;
  email?: string;
  relationId?: number;
}

/** Social media link */
export interface SocialMediaDto {
  typeId: number;
  url: string;
}

/** Generic name + ID pair (lighter than {@link BaseSliDto}) */
export interface NameIdDto {
  id: string;
  name: string;
}

/** Report request with output format and optional date range */
export interface ReportRequestDto {
  renderType?: number;
  fromDate?: string;
  toDate?: string;
  [key: string]: unknown;
}
