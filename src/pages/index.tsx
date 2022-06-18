import * as React from 'react'
import Layout from '@/components/Layout'
import { Paper, Typography, Button, Box, Container } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'
import { useTheme } from "next-themes";
import Colors from '@/components/lib/color'
function Home() {
  const router = useRouter()
  const { theme, resolvedTheme, setTheme } = useTheme();


  return (
    <>
      <Layout>
        <Container>
          <Box sx={{ flexGrow: 1 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
                justifyContent: 'center',
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  mt: 5,
                  textAlign: 'center',
                  fontSize: '22px',

                  color: Colors[resolvedTheme]?.primary,
                }}
              >
                You are not in any group yet
              </Typography>
              <Typography
                sx={{
                  textAlign: 'center',
                  color: '#858992',
                  fontSize: '14px',
                }}
              >
                Create your group or join will appear here
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                }}
              >
                <Button
                  onClick={() => router.push(`/group/create`)}
                  startIcon={<AddIcon sx={{ color: Colors[resolvedTheme]?.secondary }} />}
                  sx={{
                    my: 2,
                    borderRadius: '12px',
                    backgroundColor:  Colors[resolvedTheme]?.primary,
                    color: Colors[resolvedTheme]?.secondary,
                    fontSize: '16px',
                    cursor: 'pointer',
                    textTransform: 'none',
                    width: '291px',
                    height: '52px',
                    ':hover': {
                      backgroundColor: '#7d7d7d',
                    },
                  }}
                  variant="contained"
                  size="medium"
                >
                  Create a Group
                </Button>
              </Box>
            </div>
          </Box>
        </Container>
      </Layout>
    </>
  )
}
export default Home
