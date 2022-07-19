// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.6.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.6.0/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts@4.6.0/access/Ownable.sol";

contract MyToken is ERC20, ERC20Snapshot, Ownable {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function snapshot() public onlyOwner {
        _snapshot();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        super._burn(msg.sender, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
