export interface PaginationParams {
  total_elements: number;
  total_pages: number;
}

export interface ListResponse<T> {
  data: T[];
  total_elements: number;
  total_pages: number;
  has_next: boolean;
  [key: string]: any;
}
export interface ResponseData {
  ts: number;
  value: number | null;
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  [key: string]: any;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  [key: string]: any;
}

export interface newItem {
  key: string;
  [key: string]: any;
}

export interface lineInfo {
  spc: newItem;
  spr: newItem;
}

export interface initialPanes {
  key: number;
  title: string;
  content: string[];
}

export interface LinesOfUser {
  station: string;
  line: string;
  gateway: string;
  id: number;
  spc: string[];
  spr: string[];
}
