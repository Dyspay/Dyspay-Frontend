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
import { getSafeSdk, getSafeService } from '@/services/utils/safe'
import { getLocal } from '@/services/utils/local'

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
  if (!transaction || !transaction.confirmations) return
  transaction.confirmations.forEach((confirmation) => {
    const signature = new EthSignSignature(
      confirmation.owner,
      confirmation.signature
    )
    safeTransaction.addSignature(signature)
  })
  const executeTxResponse = await safeSdk.executeTransaction(safeTransaction)
  return executeTxResponse
}

export async function proposeTransaction(
  safeAddress: string,
  transaction: any
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
  console.log('to number ::', Number(transaction.value).toString()) 

  const safeTransactionData: SafeTransactionData = {
    to: '0xb2b16Aa66e357e3E804Bc82b364258bD33937AEd',
    data: transaction.data,
    value: Number(transaction.value).toString(),
    operation: 0,
    safeTxGas: 0,
    baseGas: 0,
    gasPrice: 0,
    gasToken: '0x0000000000000000000000000000000000000000',
    refundReceiver: '0x0000000000000000000000000000000000000000',
    nonce: 0
  }


  const safeTransaction = await safeSdk.createTransaction(safeTransactionData)
  //await safeSdk.signTransaction(safeTransaction)
  const safeTxHash = await safeSdk.getTransactionHash(safeTransaction)
  console.log('transaction::13 ',safeTxHash)

  const transactionConfig: ProposeTransactionProps = {
    safeAddress: ethers.utils.getAddress(safeAddress),
    safeTransaction,
    safeTxHash,
    senderAddress: ethers.utils.getAddress(getLocal("account")),
  }
  console.log("Hello !!!",transactionConfig)
  await safeService.proposeTransaction(transactionConfig)

  /*  

  */
} 
