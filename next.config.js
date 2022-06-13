/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    redirectUri: process.env.REDIRECT_URI,
    dispayApi: process.env.DISPAY_API,
    botAddress: process.env.BOT_ADDRESS,
    factoryAddress: process.env.FACTORY_ADDRESS,
    networkName: process.env.NETWORK_NAME,
    chainId: process.env.CHAIN_ID,
    txServiceUrl: process.env.TX_SERIVCE_URL
  }
}

module.exports = nextConfig
