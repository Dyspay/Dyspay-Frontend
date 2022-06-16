import * as React from 'react'
import { IGroup } from '@/types/group'
import { TextField, Typography, Box, Button } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import Colors from '@/components/lib/color'
import { useTheme } from "next-themes";

interface IStepper {
  nextFormStep: () => void
}
export default function Step1({ nextFormStep }: IStepper) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const { register, getValues, setValue, handleSubmit } =
    useFormContext<IGroup>()

  function onSubmit(data: any) {
    nextFormStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="body1" sx={{ color: Colors[resolvedTheme]?.primary, textAlign: 'left' }}>
        What should we call this group
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
          my: 2,
        }}
        {...register('name', { required: true })}
        id="groupName"
        label="Name"
        variant="outlined"
      />
      <Typography variant="body1" sx={{ color: Colors[resolvedTheme]?.primary, textAlign: 'left' }}>
        a.k.a
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
          my: 2,
        }}
        {...register('symbol', { required: true })}
        id="symbol"
        label="symbol"
        variant="outlined"
      />
      <Typography
        variant="subtitle2"
        component="span"
        sx={{ color: Colors[resolvedTheme]?.textgrey, textAlign: 'left' }}
      >
        Set an easily recognizable symbol for your group token that powers the
        group&apos;s cap table management and governance infrastructure. Members
        receive this group token (initially defaults to non-transferable) as
        proof of their deposit
      </Typography>
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
          variant="contained"
          size="medium"
        >
          Next
        </Button>
      </Box>
    </form>
  )
}
