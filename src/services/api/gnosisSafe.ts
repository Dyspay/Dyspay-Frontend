import {
  SafeTransactionDataPartial,
  SafeTransaction,
  SafeTransactionData,
} from '@gnosis.pm/safe-core-sdk-types'
import Safe, { EthSignSignature } from '@gnosis.pm/safe-core-sdk'
import { ethers } from 'ethers'
import EthersAdapter from '@gnosis.pm/safe-ethers-lib'
import Web3Modal from 'web3modal'
import SafeServiceClient, {
  ProposeTransactionProps,
} from '@gnosis.pm/safe-service-client'

export async function createTransaction(
  safeAddress: string,
  transaction: SafeTransactionDataPartial
) {
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  const ethAdapter = new EthersAdapter({ ethers, signer })
  const safeSdk = await Safe.create({ ethAdapter, safeAddress })
  const safeTransaction = await safeSdk.createTransaction(transaction)
  const safeTxHash = await safeSdk.getTransactionHash(safeTransaction)
  return {
    safeTransaction,
    safeTxHash,
  }
}

export async function signAndexecuteTransaction(
  safeAddress: string,
  safeTransaction: SafeTransaction
) {
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  const ethAdapter = new EthersAdapter({ ethers, signer })
  const safeSdk = await Safe.create({ ethAdapter, safeAddress })
  await safeSdk.signTransaction(safeTransaction)
  return await safeSdk.executeTransaction(safeTransaction)
}

export async function proposeTransaction(
  transactionConfig: ProposeTransactionProps
) {
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  const ethAdapter = new EthersAdapter({ ethers, signer })
  const safeService = new SafeServiceClient({
    txServiceUrl:
      process.env.txServiceUrl || 'https://safe-transaction.rinkeby.gnosis.io',
    ethAdapter,
  })
  const result = await safeService.proposeTransaction(transactionConfig)
  const result2 = await safeService.getTransaction(transactionConfig.safeTxHash)
  console.log('result2result2result2result2', result2)
}

export async function submitTransaction(
  safeTxHash: string,
  safeAddress: string
) {
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  const ethAdapter = new EthersAdapter({ ethers, signer })
  const safeService = new SafeServiceClient({
    txServiceUrl:
      process.env.txServiceUrl || 'https://safe-transaction.rinkeby.gnosis.io',
    ethAdapter,
  })
  const safeSdk = await Safe.create({ ethAdapter, safeAddress })
  const transaction = await safeService.getTransaction(safeTxHash)
  const safeTransactionData: SafeTransactionData = {
    to: transaction.to,
    value: transaction.value,
    data: transaction.data || '',
    operation: transaction.operation,
    safeTxGas: transaction.safeTxGas,
    baseGas: transaction.baseGas,
    gasPrice: Number(transaction.gasPrice),
    gasToken: transaction.gasToken,
    refundReceiver: transaction.refundReceiver || '',
    nonce: transaction.nonce,
  }
  const safeTransaction = await safeSdk.createTransaction(safeTransactionData)
  if (!transaction || !transaction.confirmations) return;
  transaction.confirmations.forEach((confirmation) => {
    const signature = new EthSignSignature(
      confirmation.owner,
      confirmation.signature
    )
    safeTransaction.addSignature(signature)
  })
  console.log('hello')
  const executeTxResponse = await safeSdk.executeTransaction(safeTransaction)
  return executeTxResponse
}
