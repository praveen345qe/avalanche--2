// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event InterestCalculated(uint256 principal, uint256 interest);
    event FundsIncremented(uint256 amount);
    event ROICalculated(uint256 investment, uint256 returnsAmount);

    constructor(uint256 initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        balance += _amount;
        emit Deposit(_amount);
    }

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(balance >= _withdrawAmount, "Insufficient balance for withdrawal");
        balance -= _withdrawAmount;
        emit Withdraw(_withdrawAmount);
    }

    function calculateInterest(uint256 _principal, uint256 _rate, uint256 _time) public pure returns (uint256) {
        require(_rate > 0, "Interest rate must be greater than 0");
        require(_time > 0, "Time period must be greater than 0");
        return (_principal * _rate * _time) / 100;
    }

    function incrementFunds(uint256 _incrementAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(_incrementAmount > 0, "Increment amount must be greater than 0");
        balance += _incrementAmount;
        emit FundsIncremented(_incrementAmount);
    }

    function calculateROI(uint256 _investment, uint256 _returns) public pure returns (uint256) {
        require(_investment > 0, "Investment amount must be greater than 0");
        require(_returns >= 0, "Returns must be equal to or greater than 0");
        return (_returns * 100) / _investment;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }
}
