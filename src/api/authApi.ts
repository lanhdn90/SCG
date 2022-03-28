import { Account, lineInfo, LinesOfUser, ListParams, LoginInfo } from '../models';
import axiosClient from './axiosClient';

export const authApi = {
  login(params: Account): Promise<LoginInfo> {
    const url = 'api/v1/login';
    return axiosClient.post(url, params);
  },
  getUserInfo(text: string): Promise<Array<LinesOfUser[]>> {
    const url = `http://103.149.253.133:7654/api/v1/devices?skip=0&limit=10&token=${text}`;
    return axiosClient.get(url);
  },
  getDeviceInfo(params: ListParams): Promise<lineInfo> {
    const url = `http://103.149.253.133:7654/api/v1/devices/${params.id}?token=${params.token}`;
    return axiosClient.get(url);
  },
};
