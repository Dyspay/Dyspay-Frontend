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
import Web3Modal from "web3modal"
import GroupManagement from "../abi/GroupManagement.json"
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'


import {
    FactoryAddress
  } from '../config';
  import Link from 'next/link';



function Deposit({tokens}:{
    tokens : any;
  }){

type groupValues = {
  groupName:string,
  groupSymbol: string,
  depositLimit: string,
  owner: string,
  totalDeposited: string,
  totalMinted: string,
  depositToken: string,
  treasureAddress: string,
  groupAddress: string
}

type FormValues = {
    amount: number;
    }
const router = useRouter();

const [loading, setLoading] = React.useState(false);
const [groupAddress, setGroupAddress] = React.useState("");
const [group, setGroup] = React.useState<groupValues>({
  groupName:"",
  groupSymbol: "",
  depositLimit: "",
  owner: "",
  totalDeposited: "",
  totalMinted: "",
  depositToken:"",
  treasureAddress: "",
  groupAddress: ""
});


const {register, handleSubmit, getValues, formState:{ dirtyFields}, reset} = useForm<FormValues>({
    defaultValues :{
        amount: 0,
    }
  })

  React.useEffect(()=> {
    if(router.isReady){
        const groupDetails: any = JSON.parse(localStorage.getItem("groupAddress") || '{}');
        if(Object.keys(groupDetails).length !== 0){
          getGroupDeatils()
        }else{
            router.push({
                pathname:"/"
            })
        }

    }
},[router.isReady, router.query, router.pathname])

const getGroupDeatils = async () => {
  setLoading(true);
  const groupDetails: any = JSON.parse(localStorage.getItem("groupAddress") || '{}');
    const currentGroupAddress: any = groupDetails?.args[0]
    setGroupAddress(currentGroupAddress);
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  };
    const response = await fetch(`http://207.154.202.18:3000/groups/${currentGroupAddress}`, requestOptions);
    const jsonData = await response.json();
      console.log("currentGroup", jsonData)
      setGroup(jsonData);
      setLoading(false)
}

const onSubmit = async (data: any) =>{
  console.log("data", data);
  setLoading(true);
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner()
  let contract = new ethers.Contract(groupAddress,GroupManagement.abi,signer)
  const amount = ethers.utils.parseUnits(data.amount.toString(),'ether')
  if(group?.depositToken === "0x0000000000000000000000000000000000000000"){
    const tx = await contract.addDeposit(0, {value: amount})
    let recepit = await tx.wait();
    console.log("receipt on zero address", recepit)
  } else {
    await contract.approve(group?.groupAddress, amount)
    const tx = await contract.addDeposit(amount)
    let recepit = await tx.wait();
    console.log("receipt on non zero address", recepit)
    
  }

  
}

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
          <form
            style={{display:"flex", flexDirection:"column"}}
            onSubmit={handleSubmit(onSubmit)}>
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
                    InputProps={{ inputProps: { min: 0, step: "any"} }}
                    id="amount" label="Amount" variant="outlined" />
                  </Container>
                  <Box sx={{
                  display:"flex",
                  justifyContent:"flex-end"
                }}>
                <Button 
                type='submit'
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
            </Box>
            </form>
           
           

        </Layout>
        </>
    )

}

export async function getServerSideProps() {
    const res = await fetch('https://api-polygon-tokens.polygon.technology/tokenlists/testnet.tokenlist.json')
    const json = await res.json()
    console.log(JSON.stringify(json))
    return {
      props: {
        tokens: json.tokens,
      },
    }
  }
export default Deposit