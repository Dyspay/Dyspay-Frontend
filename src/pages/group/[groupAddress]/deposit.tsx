import * as React from 'react'
import Layout from '@/components/Layout'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useForm } from 'react-hook-form'
import { addDeposit } from '@/services/api/group'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import { getGroupByAddress, DepositType } from '@/services/api/group'
import { IGroup } from '@/types/group'
import PendingWalletValidation from '@/components/modals/PendingWalletValidation'
import { tokenList, Itoken } from '@/services/utils/tokenList'

import Colors from '@/components/lib/color'
import { useTheme } from "next-themes";


interface IDepsit {
  group: IGroup
}
function Deposit({ group }: IDepsit) {
  type FormValues = {
    amount: number
  }
  const router = useRouter()
  const { theme, resolvedTheme, setTheme } = useTheme();

  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState<{ type: string } | undefined>(
    undefined
  )
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<FormValues>({
    defaultValues: {
      amount: 0,
    },
  })

  const onSubmit = async (data: any) => {
    let depositType: DepositType = DepositType.nativeToken
    setLoading(true)
    const token: Itoken[] = tokenList.filter(
      (token) => token.address === group?.depositToken
    )
    if (!token || !token.length) return
    if (!token[0].isNative) depositType = DepositType.noNativeToken

    const { result, error } = await addDeposit(
      group.address,
      data.amount,
      DepositType.nativeToken
    )
    setStatus({ type: error ? 'error' : 'success' })
    setLoading(false)
  }

  if (loading) {
    return (
      <PendingWalletValidation
        description={'Confirm the deposit in your wallet.'}
        isOpen={loading}
      ></PendingWalletValidation>
    )
  }

  if (status) {
    return (
      <Layout>
        <Box sx={{ p: 5 }}>
          <Grid
            container
            direction="row"
            justifyContent="Center"
            alignItems="center"
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: Colors[resolvedTheme]?.primary,
                }}
              >
                {status?.type === 'success' && (
                  <>
                    Deposit sucees !!!
                    <Button
                      onClick={() =>
                        router.push(
                          `/group/${group.address.toLowerCase()}/dashboard`
                        )
                      }
                      type="submit"
                      sx={{
                        my: 2,
                        backgroundColor: Colors[resolvedTheme]?.primary,
                        color: Colors[resolvedTheme]?.secondary,
                        borderRadius: '4px',
                        cursor: 'pointer',
                        textTransform: 'none',
                      }}
                      variant="contained"
                      size="medium"
                    >
                      Go to dashboard
                    </Button>
                  </>
                )}
                {status?.type === 'error' && <>error ...</>}
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Layout>
    )
  }

  const todayTimeStamp = new Date().getTime()
  const isDepositEnded = todayTimeStamp > Number(group.depositEndDate)
  if (isDepositEnded) {
    return (
      <Layout>
        <Box sx={{ p: 5 }}>
          <Grid
            container
            direction="row"
            justifyContent="Center"
            alignItems="center"
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: Colors[resolvedTheme]?.primary,
                }}
              >
                Deposit is close
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Layout>
    )
  }

  return (
    <>
      <Layout>
        <Box sx={{ p: 5 }}>
          <Grid
            container
            direction="row"
            justifyContent="Center"
            alignItems="center"
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: Colors[resolvedTheme]?.primary,
                }}
              >
                Deposit to group wallet
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: Colors[resolvedTheme]?.primary,
                }}
              >
                Remaining time :
                {new Date(Number(group.depositEndDate)).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
        </Box>
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            sx={{
              maxWidth: '30rem',
              display: 'flex',
              margin: '0 auto',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 4,
            }}
          >
            <Container>
              <Typography
                variant="body1"
                sx={{ color: Colors[resolvedTheme]?.primary, textAlign: 'left' }}
              >
                How much do you want to deposit?
              </Typography>
              <TextField
                fullWidth
                sx={{
                  input: { color: Colors[resolvedTheme]?.primary },
                  label: { color: Colors[resolvedTheme]?.primary },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: Colors[resolvedTheme]?.primary,
                    },
                    '&:hover fieldset': {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                  },
                  my: 3,
                }}
                {...register('amount', { required: true })}
                type="number"
                InputProps={{ inputProps: { min: 0, step: 'any' } }}
                id="amount"
                label="Amount"
                variant="outlined"
              />
            </Container>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                type="submit"
                sx={{
                  my: 2,
                  backgroundColor: Colors[resolvedTheme]?.primary,
                  color: Colors[resolvedTheme]?.secondary,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textTransform: 'none',
                }}
                disabled={!dirtyFields?.amount}
                variant="contained"
                size="medium"
              >
                Deposit
              </Button>
            </Box>
          </Box>
        </form>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params }: any) {
  const { result } = await getGroupByAddress(params.groupAddress)
  return {
    props: {
      group: result,
    },
  }
}

export default Deposit
