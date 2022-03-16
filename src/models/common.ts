import React from "react";

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

export interface initialPanes{
  key: React.Key;
  title: string;
  content: string;
}