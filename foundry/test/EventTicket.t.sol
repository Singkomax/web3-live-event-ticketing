// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Test, console } from 'forge-std/Test.sol';
import { EventTicket } from '../src/EventTicket.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';

contract EventTicketTest is Test {
  EventTicket public eventTicket;
  address public organizer = vm.addr(1);

  function setUp() public {
    eventTicket = new EventTicket(
      'Making your first NFT',
      'Learn how to make your first NFT',
      1719849600,
      organizer,
      'https://mydomain.com/tickets/'
    );
  }

  function test_EventInfo() public view {
    assertEq(eventTicket.name(), 'Making your first NFT');
    assertEq(eventTicket.symbol(), 'EVT');
    assertEq(
      eventTicket.eventDescription(),
      'Learn how to make your first NFT'
    );
    assertEq(eventTicket.eventDate(), 1719849600);
    assertEq(eventTicket.eventOrganizer(), organizer);
  }

  function test_MintTickets() public {
    EventTicket.TicketType[] memory ticketTypes = new EventTicket.TicketType[](
      3
    );

    ticketTypes[0] = EventTicket.TicketType({
      name: 'Regular',
      price: 100 ether,
      quantity: 5
    });

    ticketTypes[1] = EventTicket.TicketType({
      name: 'Special',
      price: 150 ether,
      quantity: 5
    });

    ticketTypes[2] = EventTicket.TicketType({
      name: 'VIP',
      price: 200 ether,
      quantity: 5
    });

    vm.prank(organizer);
    eventTicket.mintTickets(ticketTypes);
    vm.stopPrank();

    assertEq(eventTicket.balanceOf(organizer), 15);
    assertEq(eventTicket.ticketTypeOfToken(1), 'Regular');
    assertEq(eventTicket.ticketTypeOfToken(6), 'Special');
    assertEq(eventTicket.ticketTypeOfToken(11), 'VIP');
    assertEq(eventTicket.tokenURI(1), 'https://mydomain.com/tickets/Regular/1');
    assertEq(eventTicket.tokenURI(6), 'https://mydomain.com/tickets/Special/6');
    assertEq(eventTicket.tokenURI(11), 'https://mydomain.com/tickets/VIP/11');
  }

  function test_RevertWhenNotOwner() public {
    EventTicket.TicketType[] memory ticketTypes = new EventTicket.TicketType[](
      1
    );
    ticketTypes[0] = EventTicket.TicketType('General Admission', 100, 1 ether);

    vm.expectRevert(
      abi.encodeWithSelector(
        Ownable.OwnableUnauthorizedAccount.selector,
        address(this)
      )
    );
    eventTicket.mintTickets(ticketTypes);
  }

  function test_RevertWhenAlreadyMinted() public {
    EventTicket.TicketType[] memory ticketTypes = new EventTicket.TicketType[](
      1
    );

    ticketTypes[0] = EventTicket.TicketType({
      name: 'Regular',
      price: 100 ether,
      quantity: 5
    });

    // First mint will succeed
    vm.prank(organizer);
    eventTicket.mintTickets(ticketTypes);

    // Further attempt to mint will revert
    vm.prank(organizer);
    vm.expectRevert('Tickets already minted');
    eventTicket.mintTickets(ticketTypes);
    vm.stopPrank();
  }
}
