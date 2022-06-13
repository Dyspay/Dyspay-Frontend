import axios, { AxiosInstance } from 'axios'
import { IJsonRpcRequest } from '@walletconnect/types'

const api: AxiosInstance = axios.create({
  baseURL: 'https://ethereum-api.xyz',
  timeout: 30000, // 30 secs
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const apiGetCustomRequest = async (
  customRpc: Partial<IJsonRpcRequest>
): Promise<any> => {
  const response = await api.post(
    `config-request?chainId=${process.env.chainId}`,
    customRpc
  )
  const { result } = response.data
  return result
}
