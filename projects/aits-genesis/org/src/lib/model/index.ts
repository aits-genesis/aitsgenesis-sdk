import { BaseSliDto } from '@aits-genesis/models';

/** Organization slim item for selection dropdowns */
export interface OrgSliDto extends BaseSliDto {
  logoUrl?: string;
  isActive: boolean;
}

/** Org store state */
export interface OrgState {
  orgs: OrgSliDto[];
  activeOrgId: string | null;
  loaded: boolean;
}
