import * as React from 'react'
import Layout from '../componets/Layout'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useForm } from "react-hook-form";

import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'


import {
    FactoryAddress
  } from '../config';
  import Link from 'next/link';



function Deposit({tokens}:{
    tokens : any;
  }){

type FormValues = {
    amount: number;
    }
const router = useRouter();

const [loading, setLoading] = React.useState(false);

const {register, handleSubmit, getValues, formState:{ dirtyFields}, reset} = useForm<FormValues>({
    defaultValues :{
        amount: 0,
    }
  })

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={120} />
      </div>
    );
  }
    return(
        <>
        <Layout>
        <Box sx={{p:5}}>
              <Grid
              container
              direction="row"
              justifyContent="Center"
              alignItems="center">
                <Box sx={{ flexGrow: 1 }}>
                <Typography
                variant='body1'
                sx={{
                  textAlign:"center",
                  color:"white"}}>
              Deposit to group wallet
                </Typography>
                    </Box>

                </Grid>
          </Box>

            <Box
                sx={{
                  maxWidth:"30rem",
                  display:"flex",
                  margin: "0 auto",
                  flexDirection:"column",
                  justifyContent:"center",
                  p:4
                }}>
                  <Container>
                     <Typography variant='body1' sx={{color:"white", textAlign:"left"}}>What should we call this group</Typography>
                     <TextField
                    fullWidth
                    sx={{
                      input: { color: "white"},
                      label: { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: (theme) => theme.palette.primary.main,
                        },
                      },
                    my:3}} 
                    {...register("amount",
                    {required: true}
                    )}
                    type="number"
                    InputProps={{ inputProps: { min: 0} }}
                    id="amount" label="Amount" variant="outlined" />
                  </Container>
            </Box>
            <Box sx={{
                  display:"flex",
                  justifyContent:"flex-end"
                }}>
                <Button 
               
                      sx={{
                          my:2,
                          backgroundColor:"white",
                          color:"black",
                          borderRadius: "4px",
                          cursor:"pointer",
                          textTransform:"none"
                      }}
                      disabled={!dirtyFields?.amount}
                      
                      variant='contained' size="medium">Deposit</Button>
                </Box>

        </Layout>
        </>
    )

}

export async function getServerSideProps() {
    const res = await fetch('https://api-polygon-tokens.polygon.technology/tokenlists/testnet.tokenlist.json')
    const json = await res.json()
    // console.log(JSON.stringify(json))
    return {
      props: {
        tokens: json.tokens,
      },
    }
  }
export default Deposit