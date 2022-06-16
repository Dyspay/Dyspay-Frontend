import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { styled } from '@mui/material/styles';

import Switch, { SwitchProps } from '@mui/material/Switch';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Image from 'next/image'
import Modal from '@mui/material/Modal'
import Avatar from 'boring-avatars'
import Grid from '@mui/material/Grid'
import { ethers } from 'ethers'
import { shortenAddress } from '@/services/utils/util'
import Container from '@mui/material/Container'
import Link from 'next/link'
import { useTheme } from "next-themes";
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import useLocalStorage from '@/hooks/localStorage'
import Colors from './lib/color'

export default function Header() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);
  const [userAddress, setWalletAddress] = useLocalStorage<string>('account', '')
  React.useEffect(() => setMounted(true), []);
  const [noMetamaskModal, shownoMetamaskModal] = React.useState(false)
  const noMetaMaskModalClose = () => {
    shownoMetamaskModal(false)
  }

  const [darkMode, setDarkMode] = React.useState(theme);
  const changeDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mode = event.target.value;
    setDarkMode(mode);
    setTheme(mode);
  };
  const [anchorElWalletInfo, setAnchorElWalletInfo] =
    React.useState<HTMLButtonElement | null>(null)
  const handleOpenWalletInfo = (event: any) => {
    setAnchorElWalletInfo(event.currentTarget)
  }
  const handleCloseWalletInfo = () => {
    setAnchorElWalletInfo(null)
  }
  const [anchorElMore, setAnchorElMore] =
    React.useState<HTMLButtonElement | null>(null)
  const handleOpenMore = (event: any) => {
    setAnchorElMore(event.currentTarget)
  }
  const handleCloseMore = () => {
    setAnchorElMore(null)
  }
  async function requestAccount() {
    if ((window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        })
        setWalletAddress(accounts[0])
      } catch (error) {
        console.log(error)
      }
    } else {
      shownoMetamaskModal(true)
    }
  }

  async function connectWallet() {
    if (typeof (window as any).ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      )
    } else {
    }
  }
  async function disconnect() {
    setWalletAddress('')
    localStorage.removeItem('account')
  }

  // const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  //   width: 62,
  //   height: 34,
  //   padding: 7,
  //   '& .MuiSwitch-switchBase': {
  //     margin: 1,
  //     padding: 0,
  //     transform: 'translateX(6px)',
  //     '&.Mui-checked': {
  //       color: '#fff',
  //       transform: 'translateX(22px)',
  //       '& .MuiSwitch-thumb:before': {
  //         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
  //           '#fff',
  //         )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
  //       },
  //       '& + .MuiSwitch-track': {
  //         opacity: 1,
  //         backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
  //       },
  //     },
  //   },
  //   '& .MuiSwitch-thumb': {
  //     backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
  //     width: 32,
  //     height: 32,
  //     '&:before': {
  //       content: "''",
  //       position: 'absolute',
  //       width: '100%',
  //       height: '100%',
  //       left: 0,
  //       top: 0,
  //       backgroundRepeat: 'no-repeat',
  //       backgroundPosition: 'center',
  //       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
  //         '#fff',
  //       )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
  //     },
  //   },
  //   '& .MuiSwitch-track': {
  //     opacity: 1,
  //     backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
  //     borderRadius: 20 / 2,
  //   },
  // }));

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    bgcolor: '#242526',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
  }
  if(!mounted) return(<></>);
  return (
    <>
      <Modal
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
        onClose={noMetaMaskModalClose}
        open={noMetamaskModal}
      >
        <Box sx={modalStyle}>
          <Typography sx={{ color: Colors[resolvedTheme]?.primary }}>
            You do no have metamask installed on this browser Please install{' '}
            <a style={{ color: 'blue' }} href="https://metamask.io/">
              {' '}
              Metamask
            </a>
          </Typography>
        </Box>
      </Modal>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: Colors[resolvedTheme]?.header_bg,
          }}
        >
          <Container>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: 'none', md: 'flex', sm: 'flex' },
                  flexGrow: 1,
                  color: Colors[resolvedTheme]?.primary
                }}
              >
                Portfolio
              </Typography>
              <Box
                sx={{
                  ml: { sx: 0, md: 15, sm: 15 },
                }}
              >
                <Link href="/">
                  <a>
                    <Image
                      src={'/images/lootbase-white.png'}
                      width={60}
                      height={32}
                      alt={`lootbase Icon`}
                    />
                  </a>
                </Link>
              </Box>
              <Box sx={{ flexGrow: 1 }} />

              <Box
                sx={{
                  display: 'flex',
                }}
              >
                {userAddress ? (
                  <>
                    <Button
                      onClick={handleOpenWalletInfo}
                      startIcon={
                        <Avatar
                          size={36}
                          name={userAddress}
                          variant="pixel"
                          colors={[
                            '#ffad08',
                            '#edd75a',
                            '#73b06f',
                            '#0c8f8f',
                            '#405059',
                          ]}
                        />
                      }
                      endIcon={<KeyboardArrowDownIcon />}
                      variant="outlined"
                      sx={(theme) => ({
                        borderRadius: (theme.shape.borderRadius = 30),
                        background: Colors[resolvedTheme]?.hover ,
                        border: 'none',
                        color: Colors[resolvedTheme]?.primary,
                        textTransform: 'none',
                      })}
                    >
                      {shortenAddress(userAddress)}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={requestAccount}
                      startIcon={
                        <Image
                          src={'/images/metamask.svg'}
                          width={45}
                          height={32}
                          alt={`metamask Icon`}
                        />
                      }
                      variant="outlined"
                      sx={{
                        border: `1px solid ${Colors[resolvedTheme]?.primary}`,
                        color: Colors[resolvedTheme]?.primary,
                        textTransform: 'none',
                      }}
                    >
                      Connect to Metamask
                    </Button>
                  </>
                )}

                <Popover
                  open={Boolean(anchorElWalletInfo)}
                  anchorEl={anchorElWalletInfo}
                  onClose={handleCloseWalletInfo}
                  keepMounted
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{
                    mt: '45px',
                  }}
                  PaperProps={{
                    sx: {
                      background: Colors[resolvedTheme]?.dark_bg,
                      border: '1px solid grey',
                      borderRadius: '10px',
                      width: 330,
                    },
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box sx={{ flexGrow: 1, p: 1 }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box
                        sx={{
                          flexGrow: 1,
                          p: 2,
                          background: Colors[resolvedTheme]?.hover ,
                          BorderTopRounded: 3,
                        }}
                      >
                        <Typography
                          sx={{
                            color: Colors[resolvedTheme]?.primary,
                          }}
                        >
                          {shortenAddress(userAddress)}
                        </Typography>
                      </Box>
                      <Divider
                        sx={{
                          height: '1px',
                          width: '100%',
                          background: Colors[resolvedTheme]?.primary,
                        }}
                      />
                      <List
                        sx={{
                          width: '100%',
                        }}
                      >
                        <ListItem
                          sx={{
                            ':hover': {
                              background: Colors[resolvedTheme]?.hover ,
                            },
                          }}
                        >
                          <ListItemButton>
                            <ListItemText
                              sx={{ color: Colors[resolvedTheme]?.primary }}
                              primary="Copy Address"
                            />
                            <ListItemIcon>
                              <ContentCopyIcon sx={{ color: Colors[resolvedTheme]?.primary }} />
                            </ListItemIcon>
                          </ListItemButton>
                        </ListItem>
                        <ListItem
                          sx={{
                            ':hover': {
                              background: Colors[resolvedTheme]?.hover ,
                            },
                          }}
                        >
                          <ListItemButton>
                            <ListItemText
                              sx={{ color: Colors[resolvedTheme]?.primary }}
                              primary="View on Etherscan"
                            />
                            <ListItemIcon>
                              <OpenInNewIcon sx={{ color: Colors[resolvedTheme]?.primary }} />
                            </ListItemIcon>
                          </ListItemButton>
                        </ListItem>
                        <ListItem>
                          <Button
                            onClick={disconnect}
                            fullWidth
                            sx={{
                              border: 'none',
                              background: Colors[resolvedTheme]?.primary,
                              color: Colors[resolvedTheme]?.whiteBtn,
                              ':hover':{
                              background: Colors[resolvedTheme]?.hover ,

                              }
                            }}
                          >
                            Disconnect
                          </Button>
                        </ListItem>
                      </List>
                    </Grid>
                  </Box>
                </Popover>
                <IconButton
                  onClick={handleOpenMore}
                  sx={{
                    ml: 1,
                    borderRadius: (theme) => (theme.shape.borderRadius = 30),
                    background: Colors[resolvedTheme]?.header_bg,
                  }}
                >
                  <MoreHorizIcon sx={{ color: Colors[resolvedTheme]?.primary }} />
                </IconButton>
                <Popover
                  open={Boolean(anchorElMore)}
                  anchorEl={anchorElMore}
                  onClose={handleCloseMore}
                  keepMounted
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{
                    mt: '45px',
                  }}
                  PaperProps={{
                    sx: {
                      background: Colors[resolvedTheme].header_bg,
                      border: '1px solid grey',
                      borderRadius: '10px',
                      width: 230,
                    },
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box sx={{ flexGrow: 1, p: 1 }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                         <FormControl style={{ padding: "6px 16px" }}>
                         {/* <FormControlLabel
                            value="dark"
                            
                            control={<MaterialUISwitch
                              onChange={changeDarkMode} sx={{ m: 1 }} defaultChecked />}
                            label="MUI switch"
                          /> */}
                      <FormLabel
                        id="dark-mode-group"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          color: Colors[resolvedTheme]?.primary,
                        }}
                      >
                        <ModeNightIcon />
                        <Typography
                          style={{ marginLeft: 7, fontWeight: "bold" }}
                        >
                          Dark Mode
                        </Typography>
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="dark-mode-group"
                        name="darkMode"
                        value={darkMode}
                        onChange={changeDarkMode}
                        style={{ marginTop: 10, marginLeft: 10, width: 180 }}
                      >
                        <FormControlLabel
                          value="system"
                          control={
                            <Radio
                              style={{ padding: 3 }}
                              sx={{
                                "&": { color: Colors[resolvedTheme]?.primary },
                              }}
                            />
                          }
                          label="System"
                          labelPlacement="start"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        />
                        <FormControlLabel
                          value="light"
                          control={
                            <Radio
                              style={{ padding: 3 }}
                              sx={{
                                "&": { color: Colors[resolvedTheme]?.primary },
                              }}
                            />
                          }
                          label="Off"
                          labelPlacement="start"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        />
                        <FormControlLabel
                          value="dark"
                          control={
                            <Radio
                              style={{ padding: 3 }}
                              sx={{
                                "&": { color: Colors[resolvedTheme]?.primary },
                              }}
                            />
                          }
                          label="On"
                          labelPlacement="start"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                      <List
                        sx={{
                          width: '100%',
                        }}
                      >
                        <ListItem
                          sx={{
                            ':hover': {
                              background: '#0F2027',
                            },
                          }}
                        >
                          <ListItemButton
                            component="a"
                            href="https://discord.gg/NMY68wfA"
                          >
                            <ListItemText
                              sx={{ color: Colors[resolvedTheme]?.primary }}
                              primary="Discord"
                            />
                          </ListItemButton>
                        </ListItem>
                        <ListItem
                          sx={{
                            ':hover': {
                              background: '#0F2027',
                            },
                          }}
                        >
                          <ListItemButton
                            component="a"
                            href="https://www.instagram.com/dyspay.finance/"
                          >
                            <ListItemText
                              sx={{ color: Colors[resolvedTheme]?.primary }}
                              primary="Instagram"
                            />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Grid>
                  </Box>
                </Popover>
                {/* {
                  darkMode ?(
                    <IconButton 
                    onClick={()=> {changeDarkMode('dark')}}>
                    <ModeNightIcon/>
                  </IconButton>
                  ): (
                    <IconButton
                    onClick={()=> {changeDarkMode('light')}}>
                    <LightModeIcon/>
                     </IconButton>
                  )
                } */}
               
               
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  )
}
