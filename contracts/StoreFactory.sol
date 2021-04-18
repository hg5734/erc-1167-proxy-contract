// SPDX-License-Identifier: MIT

/**
 * @summary: Proxy Contract
 * @author: Himanshu Goyal
 */

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Store.sol";
import "./CloneFactory.sol";

contract StoreFactory is CloneFactory, Ownable {
    address public impl;
    address[] public storeContracts;

    constructor(address _impl) public {
        impl = _impl;
    }

    function cloneStore() public onlyOwner {
        address clone = createClone(impl);
        Store(clone).init("test");
        storeContracts.push(clone);
    }

    function getAddress(uint256 i) external view returns (address) {
        return storeContracts[i];
    }
}
