import { ListParams } from './../models/common';
import axiosClient from './axiosClient';

const urlApi = '/api/v1/';
export const commonApi = {
  fetchValueOfProperties(param: ListParams): Promise<any> {
    const url = `${urlApi}latest-timeseries/DEVICE/${param.id}?keys=${param.key}`;
    return axiosClient.get(url);
  },
  setValueOfProperties(param: ListParams): Promise<any> {
    const url = `${urlApi}${param.key}/${param.id}`;
    return axiosClient.post(url, param.newList);
  },
};
