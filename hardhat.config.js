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
      blockNumber: 12315702, //2_88mph_Function_Initialization_Bug.js
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