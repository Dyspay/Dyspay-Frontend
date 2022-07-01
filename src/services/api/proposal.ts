import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import Factory from '@/abi/Factory.json'
import GroupManagement from '@/abi/GroupManagement.json'

export async function getProposals(
  groupAddress: string
): Promise<{ result: any; error: any }> {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(
      `${process.env.dispayApi}/proposal?groupAddress=${groupAddress}`,
      requestOptions
    )
    const result = await response.json()
    console.log(result)
    return { result, error: null }
  } catch (error) {
    return { result: null, error }
  }
}
