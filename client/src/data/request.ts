import axios, { AxiosRequestConfig } from 'axios'
import { CONFIG } from '../../config'

export async function request<T>(params: AxiosRequestConfig): Promise<T> {
  params.url = CONFIG.serverUrl + params.url
  console.log(params)
  const res = await axios.request<T>({
    ...params,
    withCredentials: false,
  })
  if (res.status === 200) {
    return res.data
  } else {
    return Promise.reject(res)
  }
}

export interface IServerResponse<T> {
  code: number
  data: T
}
