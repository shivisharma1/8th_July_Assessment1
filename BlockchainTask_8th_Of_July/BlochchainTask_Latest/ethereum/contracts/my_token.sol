// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./IERC20.sol";

/* ERC-20 TOKEN */
contract MyToken is IERC20{
    address private OWNER;
    uint256 private TOTAL_SUPPLY;
    uint8 private DECIMALS;
    string private NAME;
    string private SYMBOL;
    mapping (address => uint256) private balance;
    mapping (address => mapping ( address => uint256)) private allowed;
    constructor () {
        balance[msg.sender] = 100000;
        TOTAL_SUPPLY = 100000;
        DECIMALS = 0;
        OWNER = msg.sender;
        NAME = '<YOUR TOKEN NAME>';
        SYMBOL = '<YOUR TOKEN SYMBOL>';
    }
    event Transfer ( address indexed _from, address indexed _to, uint256 _value);
    event Approval ( address indexed _owner, address indexed _spender, uint256 _value);
    modifier canNotBeZero (uint256 _value) {
        require(_value > 0, "Can't transfer 0 token");
        _;
    }
    modifier trezerMoreThanZero (uint256 _value) {
        require(balance[msg.sender] >= _value, "Insufficient Balance");
        _;
    }
    modifier onBehalf (address _from, uint256 _value) {
        require(_value <= allowed[_from][msg.sender], "Insufficient Balance");
        _;
    }
    modifier checkAddress (address _to) {
        require(msg.sender != _to, "You can't send money to yourself");
        _;
    }

    function name() public view override returns (string memory) {
        return NAME;
    }

    function symbol() public view override returns (string memory) {
        return SYMBOL;
    }

    function decimals() public view override returns (uint8) {
        return DECIMALS;
    }

    function totalSupply () public view override returns (uint256) {
        return TOTAL_SUPPLY;
    }

    function balanceOf(address _owner) public view override returns (uint256) {
        return balance[_owner];
    }

    function send (address _from, address _to, uint256 _value) private returns (bool) {
        balance[_from] -= _value;
        balance[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function transfer (address _to, uint256 _value) override  trezerMoreThanZero(_value) canNotBeZero(_value) checkAddress(_to) public returns (bool) {
        return send(msg.sender, _to, _value);
    }

    function transferFrom (address _from, address _to, uint256 _value) override  onBehalf(_from,_value) canNotBeZero(_value) public returns (bool) {
        return send(_from, _to, _value);
    }

    function approve (address _spender, uint256 _value) canNotBeZero(_value) override  checkAddress(_spender) public returns (bool) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance (address _owner, address _spender) public view override returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}