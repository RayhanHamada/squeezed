export type GenerateAuthenticatedUUIDBody = {
  uid: string;
  title?: string;
  ref_url: string;
  enabled: boolean;
  expire_at?: number;
};

export type GenerateAuthenticatedResponse = {
  error_msg?: string;
  uuid_code?: string;
};

export type generateAnonUUIDBody = {
  ref_url: string;
};

export type generateAnonUUIDResponse = {
  error_msg?: string;
  uuid_code?: string;
};
