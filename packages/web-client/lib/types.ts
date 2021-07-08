export type GenerateAuthenticatedUUIDBody = {
  uid: string;
  title?: string;
  ref_url: string;
  enabled: boolean;
  expire_at?: number;
};
