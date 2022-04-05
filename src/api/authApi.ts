import { Account, historyInfo, lineInfo, LinesOfUser, ListParams, ListResponse, LoginResponse } from '../models';
import axiosClient from './axiosClient';

export const authApi = {
  login(params: Account): Promise<LoginResponse> {
    const url = 'api/v1/login';
    return axiosClient.post(url, params);
  },
  getUserInfo(text: string): Promise<Array<LinesOfUser[]>> {
    const url = `/api/v1/devices?skip=0&limit=10&token=${text}`;
    return axiosClient.get(url);
  },
  getDeviceInfo(params: ListParams): Promise<lineInfo> {
    const url = `/api/v1/devices/${params.id}?token=${params.token}`;
    return axiosClient.get(url);
  },
  fetchHistoryOfLine(params: ListParams): Promise<ListResponse<historyInfo>> {
    const url = `/api/v1/log_update_devices/${params.id}?page=${params._page}&token=${params.token}`;
    return axiosClient.get(url);
  },
};
