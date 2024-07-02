// SPDX-License-Identifier: MIT

// compiler version using 

pragma solidity ^0.8.10;
// importing ERC 721 library
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
 
  // definimg contract Forum and it  inherits from ERC721 

contract Forum is ERC721 {
    // defining variables
    address public owner;
    uint256 public totalSupply;
    uint256 public totalChannels;
    // defining struct to store channels id,name,and cost

    struct Channel {
        uint256 id;
        string name;
        uint256 cost;
    }
    // to check used already joined 
    mapping (uint256 => Channel) public channels;    
    mapping (uint256 => mapping (address => bool)) public hasJoined;
    //defining modifier "onlyOwner" to limit some fuction access only to contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    } 
    // to initialize nft name and symbol
    constructor(string memory _name, string memory _symbol) 
        ERC721(_name, _symbol)
    {    // setting deployer as owner  
        owner = msg.sender;
    }
    
    //finction to create new channel(only owner can)
    function createChannel(string memory _name, uint256 _cost) public onlyOwner { 
        //after creation increment channels count and store and update to 'channels'
        totalChannels++; 
        channels[totalChannels] = Channel(totalChannels, _name, _cost);
    }
    //function to join in channels by minting(for new user)
    function mint(uint256 _id) public payable {
        // checkking channel id is not 0
        require(_id != 0, "Invalid channel ID");
        // checking channel id is valid
        require(_id <= totalChannels, "Channel does not exist");
        //if user already joined redirect to channel without any fee
        require(hasJoined[_id][msg.sender] == false, "Already joined");
        //ensuring user payed enough fees
        require(msg.value >= channels[_id].cost, "Insufficient payment");
       
        _safeMint(msg.sender, totalSupply);
         //confirming user joined in channel
        hasJoined[_id][msg.sender] = true;
        //icrement total supply of nft by 1 
        totalSupply++;

        //sending fees to owner of contract
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Transfer to owner failed");
    }
    
    //function to retrive information of channel by its id 
    function getChannel(uint256 _id) public view returns (Channel memory) {
        return channels[_id];
    }
}
