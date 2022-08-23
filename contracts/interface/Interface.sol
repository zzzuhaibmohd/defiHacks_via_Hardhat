// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

interface ILand {
    function _burn(
        address from,
        address owner,
        uint256 id
    ) external;
    function _numNFTPerAddress(address) external view returns (uint256); 
}