export interface UserData {
  id: number;
  supabase_uid: string;
  username: string;
}

export interface URLData {
  id: number;
  id_user: number;
  url_name: string;
  link_uuid: string;
  real_url: string;
  enabled: boolean;
}
