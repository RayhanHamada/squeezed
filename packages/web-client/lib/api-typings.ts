export type CreateUserResponse = {
  error_msg?: string;
};

export type GenerateAuthenticatedUUIDBody = {
  uid: string;
  title?: string;
  ref_url: string;
  enabled: boolean;
  expire_at?: number;
};

export type GenerateAuthenticatedUUIDResponse = {
  error_msg?: string;
  uuid_code?: string;
};

export type GenerateAnonUUIDBody = {
  ref_url: string;
};

export type GenerateAnonUUIDResponse = {
  error_msg?: string;
  uuid_code?: string;
};
