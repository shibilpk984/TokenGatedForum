// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Forum is ERC721 {

    address public owner;
    uint256 public totalSupply;
    uint256 public totalChannels;

    struct Channel {
        uint256 id;
        string name;
        uint256 cost;
    }

    mapping (uint256 => Channel) public channels;
    mapping (uint256 => mapping (address => bool)) public hasJoined;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(string memory _name, string memory _symbol) 
        ERC721(_name, _symbol)
    {
        owner = msg.sender;
    }

    function createChannel(string memory _name, uint256 _cost) public onlyOwner { 
        totalChannels++; 
        channels[totalChannels] = Channel(totalChannels, _name, _cost);
    }

    function mint(uint256 _id) public payable {
        require(_id != 0, "Invalid channel ID");
        require(_id <= totalChannels, "Channel does not exist");
        require(hasJoined[_id][msg.sender] == false, "Already joined");
        require(msg.value >= channels[_id].cost, "Insufficient payment");

        hasJoined[_id][msg.sender] = true;
        totalSupply++;
        _safeMint(msg.sender, totalSupply);

        // Automatically send ETH to the owner
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Transfer to owner failed");
    }

    function getChannel(uint256 _id) public view returns (Channel memory) {
        return channels[_id];
    }
}

