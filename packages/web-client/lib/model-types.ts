export type UserData = {
  id?: number;
  email: string;
  username: string;
};

export type URLData = {
  id?: number;
  id_user?: string;
  url_name?: string;
  uuid_code: string;
  ref_url: string;
  enabled: boolean;
  created_at: number;
  last_modified_at: number;
  expire_at?: number;
};
