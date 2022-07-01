import React, { useEffect, useState } from 'react'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from '@mui/material'
import { getProposals } from '@/services/api/proposal'
import { IProposal } from '@/types/proposal'
import { IGroup } from '@/types/group'
import { tokenList, Itoken } from '@/services/utils/tokenList'
import { ethers } from 'ethers'
import { shortenAddress } from '@/services/utils/util'

interface IProposalList {
  group: IGroup
}
function ProposalList({ group }: IProposalList) {
  const [proposals, setProposals] = React.useState([])

  React.useEffect(() => {
    handleFetchProposals()
  }, [])

  async function handleFetchProposals() {
    const { result } = await getProposals(group.address)
    if (result) setProposals(result)
  }
  return (
    <>
      {proposals.length ? (
        <>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proposals.map((proposal: IProposal) => (
                  <TableRow
                    key={proposal.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {proposal.name}
                    </TableCell>

                    <TableCell align="right">{proposal.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <Typography
            variant="body1"
            sx={{ color: 'white', textAlign: 'left' }}
          >
            No members
          </Typography>
        </>
      )}
    </>
  )
}

export default ProposalList
