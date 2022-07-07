# defiHacks_via_Hardhat

**1. Alchemix Access Control Bug**

Any user could have called _setWhitelist()_ to give an attacker the ability to call the _harvest_ function or to call the _flush_ function. While these two actions are relatively harmless, an attacker could also front-run the intended keeper addresses to block _harvest()_ and _flush()_ from being called, effectively causing a _denial of service_.

_Reference_ - https://medium.com/immunefi/alchemix-access-control-bug-fix-debrief-a13d39b9f2e0

**2. 88mph Function Initialization Bug**

The _init()_ function used to initialize the NFT contract on 88mph’s platform, was missing an _onlyOwner_ modifier, and there was also no _initializer_ modifier to prevent a re-initialization as well. This vulnerability would have allowed a malicious attacker to have access to any user’s NFTs and deposits via _burn()_ and _mint()_ functions. 

_Note:_ The blockNumber of the hardhat config is set a block where in one of the NFT was minted.

_Reference_ - https://medium.com/immunefi/88mph-function-initialization-bug-fix-postmortem-c3a2282894d3

**3. CoinstoreNFT Public Burn Bug**

The _burn()_ function present in the ERC721 standard which destroys the token and removes it from blockchain is missing proper access control. 
As a result, this function can be called by anyone. 

_Reference_ - https://twitter.com/BlockSecTeam/status/1543928537882714112

**4. FlippazOne Missing Access Control**

The _ownerWithdrawAllTo()_ function is missing the _onlyOwner_ modifier check. Additionally, the check of whether the auction is over is also missing. As a result, any user can call the function and drain all the funds. Be sure to check out the tweet linked below to understand more about what happend - when one of the user sent the transaction to the public mempool.

_Reference_ - https://twitter.com/bertcmiller/status/1544496577338826752

Special Mentions

https://twitter.com/immunefi

https://twitter.com/AshiqAmien


