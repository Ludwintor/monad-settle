// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0 <= 0.8.24;

contract Voting {
    uint private immutable resetTime;

    uint private left;
    uint private right;
    uint private totalLeft;
    uint private totalRight;
    address private lastLeftVoter;
    address private lastRightVoter;
    uint private nextReset;

    constructor(uint _resetTime) {
        resetTime = _resetTime;
        nextReset = block.timestamp;
    }

    function voteLeft() external {
        processReset();
        left++;
        totalLeft++;
        lastLeftVoter = msg.sender;
    }

    function voteRight() external {
        processReset();
        right++;
        totalRight++;
        lastRightVoter = msg.sender;
    }

    function getData() external view returns (uint, uint, address, uint, uint, address, uint) {
        uint blockTime = block.timestamp;
        uint _left = blockTime >= nextReset ? 0 : left;
        uint _right = blockTime >= nextReset ? 0 : right;
        return (_left, totalLeft, lastLeftVoter, _right, totalRight, lastRightVoter, nextReset);
    }

    function processReset() private {
        uint blockTime = block.timestamp;
        if (blockTime >= nextReset) {
            left = 0;
            right = 0;
            nextReset = blockTime + resetTime;
        }
    }
}