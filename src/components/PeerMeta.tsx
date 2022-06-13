import * as React from 'react'
import { IClientMeta } from '@walletconnect/types'
import { Box, Grid, Typography } from '@mui/material'

interface IPeerMetaProps {
  peerMeta: IClientMeta
}

export default function PeerMeta(props: IPeerMetaProps) {
  return (
    <Box sx={{ my: 4 }}>
      <img src={props.peerMeta.icons[0]} alt={props.peerMeta.name} />
      <Typography variant="body1" sx={{ color: '#959ca7', textAlign: 'left' }}>
        {props.peerMeta.name}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: '#959ca7', textAlign: 'center' }}
      >
        {props.peerMeta.description}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: '#959ca7', textAlign: 'center' }}
      >
        {props.peerMeta.url}
      </Typography>
    </Box>
  )
}
