import { Account, UserInfo, LoginInfo } from '../models';
import axiosClient from './axiosClient';

export const authApi = {
  login(params: Account): Promise<LoginInfo> {
    const url = 'api/v1/auth/login';
    return axiosClient.post(url, params);
  },
  getUserInfo(): Promise<UserInfo> {
    const url = `api/v1/user`;
    return axiosClient.get(url);
  },
};
