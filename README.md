# defiHacks_via_Hardhat

**1. Alchemix Access Control Bug**

Any user could have called `setWhitelist()` to give an attacker the ability to call the _harvest_ function or to call the `flush` function. While these two actions are relatively harmless, an attacker could also front-run the intended keeper addresses to block `harvest()` and `flush()` from being called, effectively causing a _denial of service_.

_Reference_ - https://medium.com/immunefi/alchemix-access-control-bug-fix-debrief-a13d39b9f2e0

**2. 88mph Function Initialization Bug**

The `init()` function used to initialize the NFT contract on 88mph’s platform, was missing an `onlyOwner` modifier, and there was also no `initializer` modifier to prevent a re-initialization as well. This vulnerability would have allowed a malicious attacker to have access to any user’s NFTs and deposits via `burn()` and `mint()` functions. 

_Note:_ The blockNumber of the hardhat config is set a block where in one of the NFT was minted.

_Reference_ - https://medium.com/immunefi/88mph-function-initialization-bug-fix-postmortem-c3a2282894d3

**3. CoinstoreNFT Public Burn Bug**

The `burn()` function present in the ERC721 standard which destroys the token and removes it from blockchain is missing proper access control. 
As a result, this function can be called by anyone. 

_Reference_ - https://twitter.com/BlockSecTeam/status/1543928537882714112

**4. FlippazOne Missing Access Control**

The `ownerWithdrawAllTo()` function is missing the `onlyOwner` modifier check. Additionally, the check of whether the auction is over is also missing. As a result, any user can call the function and drain all the funds. Be sure to check out the tweet linked below to understand more about what happend - when one of the user sent the transaction to the public mempool.

_Reference_ - https://twitter.com/bertcmiller/status/1544496577338826752

**5. Parity Wallet Hack**

The attacker sent two transactions to each of the affected contracts: the first transaction is a call to `initWallet` which can change the contract’s owners. Unfortunately, `initWallet` has no checks to prevent an attacker from calling it after the contract was initialized. Moving on to invoking the execute function to send all funds to an account controlled by the attacker:

_Reference_ - https://blog.openzeppelin.com/on-the-parity-wallet-multisig-hack-405a8c12e8f7/

**6. Sandbox LAND Migration Hack**

the `_burn` function that was set to be called was set in a public state. Even though there is a `require(from == owner, “not owner”)` in the function, the from in the function can still be modified by any user. This could results in anyone burning other players NFTs at will.

_Reference_ - https://slowmist.medium.com/the-vulnerability-behind-the-sandbox-land-migration-2abf68933170

Special Mentions

https://twitter.com/immunefi

https://twitter.com/AshiqAmien


