// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/Counter.sol";

contract TestCounter is Test {
    Counter c;

    function setUp() public {
        c = new Counter(100);
    }

    function testIncrement() public {
        c.increment();
        c.increment();
        assertEq(c.num(), 102, "ok");
    }

    function testDecerement() public {
        c.decrement();
        c.decrement();
        assertEq(c.num(), 98, "ok");
    }
}
