require("@nomiclabs/hardhat-waffle");
require("hardhat-etherscan-abi");
require("dotenv").config();

module.exports = {
  networks: {
    hardhat: {
    chainId: 1,
    forking: {
      url: process.env.ALCHEMY_URL,
      //blockNumber: 13308800, //1_Alchemix_Access_Control.js
      //blockNumber: 12315702, //2_88mph_Function_Initialization_Bug.js
      //blockNumber: 15055615, //3_CoinstoreNFT_Public_Burn.js 
      //blockNumber: 15083765 //4_FlippazOne_Access_Control_Bug.js
      blockNumber: 4043801 // 5_Parity_Wallet_Hack.js
      },
    }
  },
  etherscan: {
     apiKey: process.env.ETHERSCAN_API
  },
  solidity: {
    compilers: [
      {
      version: "0.8.0"
    },
  ]},
};
