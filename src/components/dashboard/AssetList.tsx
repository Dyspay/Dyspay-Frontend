import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@mui/material'
import { getBalance } from '@/services/api/balance'
import { IGroup } from '@/types/group'

interface IAssetList {
  group: IGroup
}
function AssetList({ group }: IAssetList) {
  const [assets, setAssets] = React.useState([])

  React.useEffect(() => {
    handleFetchAssetr()
  }, [])

  async function handleFetchAssetr() {
    const { result } = await getBalance(group.treasureAddress)
    if (result) setAssets(result)
  }

  return (
    <>
      <Grid container spacing={2}>
        {assets?.map((data: any, index: any) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                background: '#000000',
                border: '1px solid #959ca7',
                height: '20rem',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={data?.logo_url}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    sx={{ color: 'white', textAlign: 'left' }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {data?.collection_name}
                  </Typography>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '90%',
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: 'left',
                        mt: 4,
                        color: '#959ca7',
                      }}
                      variant="body2"
                    >
                      Floor Price
                    </Typography>
                    <Typography
                      sx={{
                        color: 'white',
                        textAlign: 'left',
                        mt: 1,
                      }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {data?.statistics?.floor} ETH
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default AssetList
