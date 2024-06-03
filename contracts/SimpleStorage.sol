// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SimpleStorage {
    uint public myFavouriteNumber;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Person {
        uint favouriteNumber;
        string name;
    }

    Person[] public listOfPeople;

    mapping(address => Person) public peopleMapping;

    function storeTheNumberFromSomeone(
        uint _number,
        string memory _name
    ) public {
        peopleMapping[msg.sender] = Person(_number, _name);
        listOfPeople.push(Person(_number, _name));
    }

    function storeTheNumber(uint _number) public {
        myFavouriteNumber = _number;
    }

    function retrieveTheNumber() public view returns (uint) {
        return myFavouriteNumber;
    }

    function getPerson(uint _index) public view returns (uint, string memory) {
        Person memory person = listOfPeople[_index];
        return (person.favouriteNumber, person.name);
    }
}
