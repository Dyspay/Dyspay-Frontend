import * as React from 'react'
import WalletConnect from '@walletconnect/client'
import { Paper, Typography, Button, TextField, Box, Card } from '@mui/material'
import PeerMeta from '@/components/PeerMeta'
import Layout from '@/components/Layout'
import { getLocal } from '@/services/utils/local'
import { IClientMeta } from '@walletconnect/types'
import { useRouter } from 'next/router'
import {
  createTransaction,
  proposeTransaction,
  submitTransaction,
} from '@/services/api/gnosisSafe'
import { SafeTransactionDataPartial } from '@gnosis.pm/safe-core-sdk-types'
import { ProposeTransactionProps } from '@gnosis.pm/safe-service-client'

export default function DappConnect() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [uri, setUri] = React.useState('')
  const [payload, setPayload] = React.useState<any>()
  const [requests, setRequests] = React.useState<any[]>([])
  const [address, setAddress] = React.useState('')
  const [peerMeta, setPeerMeta] = React.useState<
    IClientMeta | null | undefined
  >()
  const [connector, setConnector] = React.useState<WalletConnect | null>()
  const [connected, setConnected] = React.useState<boolean>(false)

  const chainId = process.env.chainId || 1

  React.useEffect(() => {
    const { groupAddress } = router.query
    setAddress(groupAddress?.toString() || '')
    init()
  }, [router.isReady, router.query, router.pathname])

  async function initWalletConnect(uriInput: string) {
    setLoading(true)
    try {
      const connector = new WalletConnect({ uri: uriInput })

      if (!connector.connected) {
        await connector.createSession()
      }
      setConnector(connector)
      setUri(connector.uri)
      setLoading(false)

      subscribeToEvents(connector)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  async function init() {
    const session = getLocal('walletconnect')
    if (session) {
      const connector = new WalletConnect({ session })
      const { connected, peerMeta } = connector
      setConnected(connected)
      setPeerMeta(peerMeta)
      setConnector(connector)
      subscribeToEvents(connector)
    }
  }

  async function resetApp() {
    setPeerMeta(null)
    setPayload(null)
    setConnector(null)
    setConnected(false)
    init()
  }

  async function openRequest(request: any) {
    console.log(request)
    const payload = Object.assign({}, request)

    const params = payload.params[0]
    const transaction: SafeTransactionDataPartial = {
      data: '0x85a585a585a585a5',
      to: '0xA65387F16B013cf2Af4605Ad8aA5ec25a2cbA3a2',
      value: '0',
      operation: 1,
      safeTxGas: 0,
      gasPrice: 0,
    }

    const result = await submitTransaction(
      '0xc93b40bb4fe57dd5f5d591bb4171e2ce209d1603f557e2f4bee10c097e8d8ef2',
      '0xb2b16Aa66e357e3E804Bc82b364258bD33937AEd',
    )

    if (request.method === 'eth_sendTransaction') {
      //  payload.params[0] = await getAppControllers().wallet.populateTransaction(params);
    }
  }

  function subscribeToEvents(connector: WalletConnect) {
    console.log('ACTION', 'subscribeToEvents')
    if (connector) {
      connector.on('session_request', (error, payload) => {
        console.log('EVENT', 'session_request')

        if (error) {
          throw error
        }
        console.log('SESSION_REQUEST', payload.params)
        const { peerMeta } = payload.params[0]
        setPeerMeta(peerMeta)
      })

      connector.on('session_update', (error) => {
        console.log('EVENT', 'session_update')

        if (error) {
          throw error
        }
      })

      connector.on('call_request', async (error, payload) => {
        // tslint:disable-next-line
        console.log('EVENT', 'call_request', 'method', payload.method)
        console.log('EVENT', 'call_request', 'params', payload.params)
        console.log('payload ::: ', payload)
        setRequests((prevRequest) => [...prevRequest, payload])

        if (error) {
          throw error
        }
      })

      connector.on('connect', (error, payload) => {
        console.log('EVENT', 'connect')

        if (error) {
          throw error
        }
        setConnected(true)
      })

      connector.on('disconnect', (error, payload) => {
        console.log('EVENT', 'disconnect')

        if (error) {
          throw error
        }

        resetApp()
      })

      if (connector.connected) {
        setConnected(true)
      }

      setConnector(connector)
    }
  }

  function approveSession() {
    if (connector) {
      connector.approveSession({
        chainId: Number(chainId),
        // accounts: [address],
        accounts: ['0xb2b16Aa66e357e3E804Bc82b364258bD33937AEd'],
      })
    }
    setConnector(connector)
  }

  function rejectSession() {
    console.log('ACTION', 'rejectSession')
    if (connector) {
      connector.rejectSession()
    }
    setConnector(connector)
  }

  async function onURIPaste(e: any) {
    const data = e.target.value
    const uriInput = typeof data === 'string' ? data : ''
    if (uriInput) {
      setUri(uriInput)
      await initWalletConnect(uriInput)
    }
  }
  return (
    <Layout>
      {!connected ? (
        peerMeta && peerMeta.name ? (
          <>
            <PeerMeta peerMeta={peerMeta} />
            <Button
              onClick={approveSession}
              sx={{
                my: 2,
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'none',
              }}
              variant="contained"
              size="medium"
            >
              Accept
            </Button>
            <Button
              onClick={rejectSession}
              sx={{
                my: 2,
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'none',
              }}
              variant="contained"
              size="medium"
            >
              Reject
            </Button>
          </>
        ) : (
          <Box sx={{ p: 5 }}>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                alignSelf: 'center',
              }}
            >
              Connect wallet
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'white',
                alignSelf: 'center',
              }}
            >
              Paste URI to connect wallet
            </Typography>
            <TextField
              fullWidth
              onChange={onURIPaste}
              placeholder={'Paste wc: uri'}
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
                my: 3,
              }}
              type="string"
              InputProps={{ inputProps: { min: 0, max: 99 } }}
              id="botCommandId"
              variant="outlined"
            />
          </Box>
        )
      ) : !payload ? (
        <>
          {peerMeta && peerMeta.name && (
            <Box sx={{ p: 5 }}>
              <Typography
                sx={{ color: 'white', textAlign: 'center' }}
                variant="h5"
                component="div"
              >
                Connected to
              </Typography>
              <img src={peerMeta.icons[0]} alt={peerMeta.name} />
              <Typography
                sx={{ color: 'white', textAlign: 'center' }}
                variant="body1"
                component="div"
              >
                {peerMeta.name}
              </Typography>
              <Typography
                sx={{ color: 'white', textAlign: 'center' }}
                variant="h5"
                component="div"
              >
                Pending call request
              </Typography>
              {requests.length ? (
                requests.map((request) => (
                  <Button key={request.id} onClick={() => openRequest(request)}>
                    <div>{request.method}</div>
                  </Button>
                ))
              ) : (
                <div>
                  <div>{'No pending requests'}</div>
                </div>
              )}
            </Box>
          )}
        </>
      ) : (
        <>
          <Typography gutterBottom variant="h5" component="div">
            ddkfld,fl
          </Typography>
        </>
      )}
    </Layout>
  )
}
