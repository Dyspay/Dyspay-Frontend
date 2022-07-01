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
import { getTransactions } from '@/services/api/transaction'
import { ITransaction } from '@/types/transaction'
import { IGroup } from '@/types/group'
import { ethers } from 'ethers'
import { shortenAddress } from '@/services/utils/util'

interface ITransactionList {
  group: IGroup
}
function TransactionList({ group }: ITransactionList) {
  const [transactions, setTransactions] = React.useState<ITransaction[]>([])

  React.useEffect(() => {
    handleFetchTransactions()
  }, [])

  async function handleFetchTransactions() {
    const { result } = await getTransactions(group.treasureAddress)
    if (result) setTransactions(result ? result.items : [])
  }
  return (
    <>
      {transactions.length ? (
        <>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Member</TableCell>
                  <TableCell align="right">Deposit amount</TableCell>
                  <TableCell align="right">
                    Club tokens (ownership share)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction: ITransaction) => (
                  <TableRow
                    key={transaction.tx_hash}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {transaction.from_address}
                    </TableCell>

                    <TableCell align="right">
                      {transaction.to_address}
                    </TableCell>
                    <TableCell align="right">
                      {transaction.successful}
                    </TableCell>
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

export default TransactionList
