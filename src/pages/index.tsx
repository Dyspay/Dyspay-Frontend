import * as React from 'react'
import Layout from '@/components/Layout'
import { Paper, Typography, Button, Box, Container } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'

function Home() {
  const router = useRouter()

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

                  color: 'white',
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
                  startIcon={<AddIcon sx={{ color: 'black' }} />}
                  sx={{
                    my: 2,
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    color: 'Black',
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
