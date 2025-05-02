// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct Land {
        uint256 id;
        string location;
        uint256 area;
        address owner;
        address[] previousOwners;
    }

    uint256 public landCount;
    mapping(uint256 => Land) public lands;

    event LandRegistered(uint256 indexed id, address indexed owner);
    event LandTransferred(uint256 indexed id, address indexed from, address indexed to);

    modifier onlyOwner(uint256 _landId) {
        require(lands[_landId].owner == msg.sender, "Not the land owner");
        _;
    }

    function registerLand(string memory _location, uint256 _area) public {
        landCount++;
        lands[landCount] = Land(landCount, _location, _area, msg.sender, new address[](0));
        emit LandRegistered(landCount, msg.sender);
    }

    function transferLand(uint256 _landId, address _newOwner) public onlyOwner(_landId) {
        require(_newOwner != address(0), "Invalid new owner address");
        address previousOwner = lands[_landId].owner;
        lands[_landId].previousOwners.push(previousOwner);
        lands[_landId].owner = _newOwner;
        emit LandTransferred(_landId, previousOwner, _newOwner);
    }

    function getLandDetails(uint256 _landId) public view returns (string memory, uint256, address) {
        Land memory land = lands[_landId];
        return (land.location, land.area, land.owner);
    }

    function getPreviousOwners(uint256 _landId) public view returns (address[] memory) {
        return lands[_landId].previousOwners;
    }
} 
