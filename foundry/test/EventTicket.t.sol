// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Test, console } from 'forge-std/Test.sol';
import { EventTicket } from '../src/EventTicket.sol';

contract EventTicketTest is Test {
  EventTicket public eventTicket;
  address public organizer = vm.addr(1);

  function setUp() public {
    eventTicket = new EventTicket(
      'Making your first NFT',
      'Learn how to make your first NFT',
      1719849600,
      organizer
    );
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
  }
}
