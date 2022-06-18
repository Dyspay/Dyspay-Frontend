import * as React from 'react'
import { TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useFormContext } from 'react-hook-form'
import { IGroup } from '@/types/group'
import CircularProgress from '@mui/material/CircularProgress'
import { createGroup } from '@/services/api/group'
import PendingWalletValidation from '@/components/modals/PendingWalletValidation'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import useLocalStorage from 'src/hooks/localStorage'
import Colors from '@/components/lib/color'
import { useTheme } from "next-themes";

interface IStepper {
  nextFormStep: () => void
  prevFormStep: () => void
}

export default function Step4({ nextFormStep, prevFormStep }: IStepper) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const { register, handleSubmit } = useFormContext<IGroup>()
  const router = useRouter()
  const [userAddress] = useLocalStorage<string>('account', '')

  async function onSubmit(groupForm: any) {
    setLoading(true)
    const addresses: any[] = [process.env.botAddress, userAddress]
    const groupPayLoad = [
      addresses,
      groupForm.name,
      groupForm.symbol,
      groupForm.token?.address,
      groupForm.depositEndDate.getTime(),
      ethers.utils.parseUnits(groupForm.depositLimit.toString(), 'ether'),
      groupForm.maxMembers,
    ]
    console.log(groupPayLoad)
    const { result, error } = await createGroup(groupPayLoad)
    console.log(error)
    setLoading(false)
    if (error) return
    const { groupAddress } = result[0].args
    router.push(`/group/${groupAddress.toLowerCase()}/bot/authorize`)
  }

  const [loading, setLoading] = React.useState(false)

  return (
    <>
      <PendingWalletValidation
        description={'Confirm the creation of this group in your wallet.'}
        isOpen={loading}
      ></PendingWalletValidation>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <Typography
            variant="body1"
            sx={{ color: Colors[resolvedTheme]?.primary, textAlign: 'left' }}
          >
            What’s the maximum number of members?
          </Typography>
          <Typography
            component="span"
            variant="subtitle2"
            sx={{ color: Colors[resolvedTheme]?.textgrey, textAlign: 'left' }}
          >
            Groups may have up to 99 members according to the SEC. Dyspay
            encourages all users to consult with their own legal and tax
            counsel.
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
            {...register('maxMembers', { required: true })}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 99 } }}
            id="maxMembers"
            label="Max Members"
            variant="outlined"
          />
          <Box
            component="span"
            m={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              startIcon={
                <KeyboardBackspaceIcon
                  sx={{
                    color: Colors[resolvedTheme]?.primary,
                  }}
                />
              }
              onClick={prevFormStep}
              sx={{
                my: 2,
                color: Colors[resolvedTheme]?.primary,
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'none',
              }}
              variant="text"
              size="medium"
            >
              Back
            </Button>
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
              variant="contained"
              size="medium"
            >
              {loading && <CircularProgress size={14} />}
              {!loading && 'Create Group'}
            </Button>
          </Box>
        </>
      </form>
    </>
  )
}
