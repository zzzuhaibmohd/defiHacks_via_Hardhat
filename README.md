# defiHacks_via_Hardhat

**1. Alchemix Access Control Bug**

Any user could have called _setWhitelist()_ to give an attacker the ability to call the _harvest_ function or to call the _flush_ function. While these two actions are relatively harmless, an attacker could also front-run the intended keeper addresses to block _harvest()_ and _flush()_ from being called, effectively causing a _denial of service_.
