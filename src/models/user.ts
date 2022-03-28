export interface UserInfo {
    id: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    authority?: string;
    customer_id?: string;
    tenant_id?: string;
    email?: string;
    status?: 'enabled' | 'disable';
    created_ts? : number;
  }
  
  export interface Account {
    // username: string;
    email: string;
    password: string;
  }
  
  export interface LoginInfo {
    refresh_token: string;
    token: string;
  }
  