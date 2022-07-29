// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VotingToken is ERC20Votes, Ownable {
    constructor() ERC20("VotingToken", "VTK") ERC20Permit("VotingToken") {
        _mint(_msgSender(), 10000 * 10 ** decimals());
    }

    // It is inheriting rest of the functions from ERC20Votes.    
}