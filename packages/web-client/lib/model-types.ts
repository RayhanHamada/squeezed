export type UserData = {
  id?: string;
  uid?: string;
  email: string;
  username: string;
};

export type URLData = {
  id?: string;
  uid?: string;
  url_name?: string;
  uuid_code: string;
  ref_url: string;
  enabled: boolean;
  created_at: number;
  last_modified_at: number;
  expire_at?: number;
};
