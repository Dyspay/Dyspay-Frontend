export interface IVoter {
  walletAddress: string
  name: string
}

export interface IVote {
  isFor: boolean
  voter: IVoter
}

export interface IProposal {
  messageId: string
  name: string
  groupAddress: string
  description: string
  url: string
  createdAt: Date
  status: string
  voters: IVote[]
}
