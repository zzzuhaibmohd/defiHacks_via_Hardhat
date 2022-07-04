# defiHacks_via_Hardhat

**1. Alchemix Access Control Bug**

Any user could have called _setWhitelist()_ to give an attacker the ability to call the _harvest_ function or to call the _flush_ function. While these two actions are relatively harmless, an attacker could also front-run the intended keeper addresses to block _harvest()_ and _flush()_ from being called, effectively causing a _denial of service_.

**2. 88mph Function Initialization Bug**

The _init()_ function used to initialize the NFT contract on 88mph’s platform, was missing an _onlyOwner_ modifier, and there was also no _initializer_ modifier to prevent a re-initialization as well. This vulnerability would have allowed a malicious attacker to have access to any user’s NFTs and deposits via _burn()_ and _mint()_ functions. 

_Note:_ The blockNumber of the hardhat config is set a block where in one of the NFT was minted.


Special Mentions

https://twitter.com/zuhaib44
https://twitter.com/AshiqAmien
