require("@nomiclabs/hardhat-waffle");
require("hardhat-etherscan-abi");
require("dotenv").config();

module.exports = {
  networks: {
    hardhat: {
    chainId: 1,
    forking: {
      url: process.env.ALCHEMY_URL,
      blockNumber: 13308800,
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