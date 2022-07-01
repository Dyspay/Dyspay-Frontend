import {
  SafeTransactionDataPartial,
  SafeTransaction,
  SafeTransactionData,
} from '@gnosis.pm/safe-core-sdk-types'
import Web3Modal from 'web3modal'
import Safe, { EthSignSignature } from '@gnosis.pm/safe-core-sdk'
import { ethers } from 'ethers'
import EthersAdapter from '@gnosis.pm/safe-ethers-lib'
import SafeServiceClient, {
  ProposeTransactionProps,
} from '@gnosis.pm/safe-service-client'

export const getSafeSdk = async (safeAddress: string): Promise<Safe> => {
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  const ethAdapter = new EthersAdapter({ ethers, signer })
  return await Safe.create({ ethAdapter, safeAddress })
}

export const getSafeService = async (): Promise<SafeServiceClient> => {
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  const ethAdapter = new EthersAdapter({ ethers, signer })
  return new SafeServiceClient({
    txServiceUrl:
      process.env.txServiceUrl || 'https://safe-transaction.rinkeby.gnosis.io',
    ethAdapter,
  })
}
