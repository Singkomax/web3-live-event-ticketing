// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract EventTicket is ERC721URIStorage, Ownable {
    using Strings for uint256;

    uint256 private _nextTokenId;
    string private _baseTokenURI;

    struct TicketType {
        string name;
        uint256 price;
        uint256 quantity;
    }

    // Mapping from ticket type to its details
    mapping(string => TicketType) public ticketTypes;

    // Mapping from tokenId to ticket type (to track which ticket type an NFT belongs to)
    mapping(uint256 => string) public ticketTypeOfToken;

    // Event information
    uint256 public eventStartDate;
    uint256 public eventEndDate;
    string public eventLocation;
    address public eventOrganizer;

    constructor(
        string memory _eventName,
        uint256 _eventStartDate,
        uint256 _eventEndDate,
        string memory _eventLocation,
        address _eventOrganizer,
        string memory _baseURI
    ) ERC721(_eventName, "EVT") Ownable(_eventOrganizer) {
        eventStartDate = _eventStartDate;
        eventEndDate = _eventEndDate;
        eventLocation = _eventLocation;
        eventOrganizer = _eventOrganizer;
        _baseTokenURI = _baseURI;
    }

    function mintTickets(TicketType[] memory _ticketTypes) public onlyOwner {
        if (_nextTokenId > 0) {
            revert("Tickets already minted");
        }

        // Set up the ticket types and pre-mint the tickets
        for (uint256 i = 0; i < _ticketTypes.length; i++) {
            ticketTypes[_ticketTypes[i].name] = _ticketTypes[i];

            // Pre-mint all tickets of this type
            for (uint256 j = 0; j < _ticketTypes[i].quantity; j++) {
                _nextTokenId++;
                _mint(eventOrganizer, _nextTokenId); // Mint to the event organizer
                ticketTypeOfToken[_nextTokenId] = _ticketTypes[i].name;
            }
        }
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireOwned(tokenId);
        string memory ticketType = ticketTypeOfToken[tokenId];
        return
            string.concat(_baseTokenURI, ticketType, "/", tokenId.toString());
    }
}
