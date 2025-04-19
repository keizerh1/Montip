// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title MonTip
 * @dev A contract for sending time-locked tips with progressive release options
 */
contract MonTip {
    // Tip structure to store all tip details
    struct Tip {
        uint256 id;
        address sender;
        address recipient;
        string message;
        uint256 amount;
        uint256 unlockTime;
        uint256 unlockDelay;
        bool isProgressive;
        uint256 releaseRate; // Percentage per day (1-100)
        uint256 withdrawnAmount;
        uint256 lastWithdrawalTime;
        bool isCanceled;
    }

    // Array to store all tips
    Tip[] public tips;
    uint256 public nextTipId = 1;

    // Events
    event TipSent(
        uint256 indexed tipId,
        address indexed sender,
        address indexed recipient,
        uint256 amount,
        uint256 unlockTime,
        bool isProgressive,
        string message
    );

    event TipWithdrawn(
        uint256 indexed tipId,
        address indexed recipient,
        uint256 amount
    );

    event TipCanceled(
        uint256 indexed tipId,
        address indexed sender
    );

    /**
     * @dev Send a time-locked tip
     * @param recipient The address receiving the tip
     * @param message A message to include with the tip
     * @param unlockDelay Seconds until the tip can be withdrawn
     * @param isProgressive Whether the tip releases progressively
     * @param releaseRate Percentage per day for progressive release (1-100)
     */
    function sendTipLocked(
        address recipient,
        string memory message,
        uint256 unlockDelay,
        bool isProgressive,
        uint256 releaseRate
    ) external payable {
        require(recipient != address(0), "Invalid recipient address");
        require(msg.value > 0, "Tip amount must be greater than 0");
        require(unlockDelay > 0, "Unlock delay must be greater than 0");
        
        if (isProgressive) {
            require(releaseRate > 0 && releaseRate <= 100, "Release rate must be between 1 and 100");
        }

        uint256 unlockTime = block.timestamp + unlockDelay;
        uint256 tipId = nextTipId++;

        tips.push(Tip({
            id: tipId,
            sender: msg.sender,
            recipient: recipient,
            message: message,
            amount: msg.value,
            unlockTime: unlockTime,
            unlockDelay: unlockDelay,
            isProgressive: isProgressive,
            releaseRate: releaseRate,
            withdrawnAmount: 0,
            lastWithdrawalTime: 0,
            isCanceled: false
        }));

        emit TipSent(
            tipId,
            msg.sender,
            recipient,
            msg.value,
            unlockTime,
            isProgressive,
            message
        );
    }

    /**
     * @dev Withdraw a tip after it's unlocked
     * @param tipId The ID of the tip to withdraw
     */
    function withdrawTip(uint256 tipId) external {
        require(tipId > 0 && tipId < nextTipId, "Invalid tip ID");
        
        Tip storage tip = tips[tipId - 1];
        
        require(msg.sender == tip.recipient, "Only recipient can withdraw");
        require(!tip.isCanceled, "Tip was canceled");
        require(block.timestamp >= tip.unlockTime, "Tip is still locked");
        require(tip.withdrawnAmount < tip.amount, "Tip already fully withdrawn");

        uint256 withdrawableAmount = calculateWithdrawableAmount(tipId);
        require(withdrawableAmount > 0, "No funds available to withdraw");

        tip.withdrawnAmount += withdrawableAmount;
        tip.lastWithdrawalTime = block.timestamp;

        (bool success, ) = msg.sender.call{value: withdrawableAmount}("");
        require(success, "Transfer failed");

        emit TipWithdrawn(tipId, msg.sender, withdrawableAmount);
    }

    /**
     * @dev Cancel a tip before it's unlocked
     * @param tipId The ID of the tip to cancel
     */
    function cancelTip(uint256 tipId) external {
        require(tipId > 0 && tipId < nextTipId, "Invalid tip ID");
        
        Tip storage tip = tips[tipId - 1];
        
        require(msg.sender == tip.sender, "Only sender can cancel");
        require(!tip.isCanceled, "Tip already canceled");
        require(block.timestamp < tip.unlockTime, "Tip already unlocked");
        require(tip.withdrawnAmount == 0, "Tip already partially withdrawn");

        tip.isCanceled = true;
        
        (bool success, ) = msg.sender.call{value: tip.amount}("");
        require(success, "Transfer failed");

        emit TipCanceled(tipId, msg.sender);
    }

    /**
     * @dev Get all tips stored in the contract
     * @return All tips
     */
    function getAllTips() external view returns (Tip[] memory) {
        return tips;
    }

    /**
     * @dev Get all tips received by the caller
     * @return Tips received by msg.sender
     */
    function getMyTips() external view returns (Tip[] memory) {
        uint256 count = 0;
        
        // First count how many tips match
        for (uint256 i = 0; i < tips.length; i++) {
            if (tips[i].recipient == msg.sender) {
                count++;
            }
        }
        
        // Then create and populate the result array
        Tip[] memory result = new Tip[](count);
        uint256 index = 0;
        
        for (uint256 i = 0; i < tips.length; i++) {
            if (tips[i].recipient == msg.sender) {
                result[index] = tips[i];
                index++;
            }
        }
        
        return result;
    }

    /**
     * @dev Calculate how much is available for withdrawal
     * @param tipId The ID of the tip to check
     * @return Amount available for withdrawal
     */
    function calculateWithdrawableAmount(uint256 tipId) public view returns (uint256) {
        require(tipId > 0 && tipId < nextTipId, "Invalid tip ID");
        
        Tip storage tip = tips[tipId - 1];
        
        if (tip.isCanceled || block.timestamp < tip.unlockTime) {
            return 0;
        }
        
        if (!tip.isProgressive) {
            return tip.amount - tip.withdrawnAmount;
        }
        
        // For progressive tips, calculate based on days passed
        uint256 startTime = tip.lastWithdrawalTime > 0 ? tip.lastWithdrawalTime : tip.unlockTime;
        uint256 daysPassed = (block.timestamp - startTime) / 1 days;
        
        if (daysPassed == 0) {
            return 0;
        }
        
        uint256 totalAvailable = tip.amount;
        uint256 dailyAmount = (totalAvailable * tip.releaseRate) / 100;
        uint256 maxAvailable = tip.withdrawnAmount + (dailyAmount * daysPassed);
        
        if (maxAvailable > totalAvailable) {
            maxAvailable = totalAvailable;
        }
        
        return maxAvailable - tip.withdrawnAmount;
    }
}
