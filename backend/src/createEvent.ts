import { ethers } from 'ethers';

const contractAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_eventName', type: 'string', internalType: 'string' },
      {
        name: '_eventStartDate',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_eventEndDate',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_eventLocation',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_eventOrganizer',
        type: 'address',
        internalType: 'address',
      },
      { name: '_baseURI', type: 'string', internalType: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'eventEndDate',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'eventLocation',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'eventOrganizer',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'eventStartDate',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getApproved',
    inputs: [{ name: 'tokenId', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isApprovedForAll',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'operator', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mintTickets',
    inputs: [
      {
        name: '_ticketTypes',
        type: 'tuple[]',
        internalType: 'struct EventTicket.TicketType[]',
        components: [
          { name: 'name', type: 'string', internalType: 'string' },
          { name: 'price', type: 'uint256', internalType: 'uint256' },
          { name: 'quantity', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownerOf',
    inputs: [{ name: 'tokenId', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      { name: 'from', type: 'address', internalType: 'address' },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      { name: 'from', type: 'address', internalType: 'address' },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setApprovalForAll',
    inputs: [
      { name: 'operator', type: 'address', internalType: 'address' },
      { name: 'approved', type: 'bool', internalType: 'bool' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [{ name: 'interfaceId', type: 'bytes4', internalType: 'bytes4' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ticketTypeOfToken',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ticketTypes',
    inputs: [{ name: '', type: 'string', internalType: 'string' }],
    outputs: [
      { name: 'name', type: 'string', internalType: 'string' },
      { name: 'price', type: 'uint256', internalType: 'uint256' },
      { name: 'quantity', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenURI',
    inputs: [{ name: 'tokenId', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      { name: 'from', type: 'address', internalType: 'address' },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'approved',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'approved',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'BatchMetadataUpdate',
    inputs: [
      {
        name: '_fromTokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: '_toTokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MetadataUpdate',
    inputs: [
      {
        name: '_tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'ERC721IncorrectOwner',
    inputs: [
      { name: 'sender', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
      { name: 'owner', type: 'address', internalType: 'address' },
    ],
  },
  {
    type: 'error',
    name: 'ERC721InsufficientApproval',
    inputs: [
      { name: 'operator', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'ERC721InvalidApprover',
    inputs: [{ name: 'approver', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'ERC721InvalidOperator',
    inputs: [{ name: 'operator', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'ERC721InvalidOwner',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'ERC721InvalidReceiver',
    inputs: [{ name: 'receiver', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'ERC721InvalidSender',
    inputs: [{ name: 'sender', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'ERC721NonexistentToken',
    inputs: [{ name: 'tokenId', type: 'uint256', internalType: 'uint256' }],
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
  },
];

const contractBytecode = {
  object:
    '0x60806040523480156200001157600080fd5b5060405162001caa38038062001caa833981016040819052620000349162000213565b60408051808201909152600381526211559560ea1b602082015282908790600062000060838262000367565b5060016200006f828262000367565b5050506001600160a01b038116620000a157604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b620000ac81620000fc565b50600c859055600d849055600e620000c5848262000367565b50600f80546001600160a01b0319166001600160a01b0384161790556009620000ef828262000367565b5050505050505062000433565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200017657600080fd5b81516001600160401b03808211156200019357620001936200014e565b604051601f8301601f19908116603f01168101908282118183101715620001be57620001be6200014e565b81604052838152602092508683858801011115620001db57600080fd5b600091505b83821015620001ff5785820183015181830184015290820190620001e0565b600093810190920192909252949350505050565b60008060008060008060c087890312156200022d57600080fd5b86516001600160401b03808211156200024557600080fd5b620002538a838b0162000164565b9750602089015196506040890151955060608901519150808211156200027857600080fd5b620002868a838b0162000164565b60808a015190955091506001600160a01b0382168214620002a657600080fd5b60a089015191935080821115620002bc57600080fd5b50620002cb89828a0162000164565b9150509295509295509295565b600181811c90821680620002ed57607f821691505b6020821081036200030e57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200036257600081815260208120601f850160051c810160208610156200033d5750805b601f850160051c820191505b818110156200035e5782815560010162000349565b5050505b505050565b81516001600160401b038111156200038357620003836200014e565b6200039b81620003948454620002d8565b8462000314565b602080601f831160018114620003d35760008415620003ba5750858301515b600019600386901b1c1916600185901b1785556200035e565b600085815260208120601f198616915b828110156200040457888601518255948401946001909101908401620003e3565b5085821015620004235787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61186780620004436000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c806370a08231116100c3578063a22cb4651161007c578063a22cb465146102b6578063b88d4fde146102c9578063c87b56dd146102dc578063e613da47146102ef578063e985e9c5146102f8578063f2fde38b1461030b57600080fd5b806370a0823114610258578063715018a6146102795780637514d7cb146102815780638da5cb5b1461029457806395d89b41146102a55780639eab643f146102ad57600080fd5b806323b872dd1161011557806323b872dd146101e257806329ea0b28146101f55780632a6ca7551461021757806342842e0e1461021f5780636352211e14610232578063690f0de41461024557600080fd5b806301ffc9a71461015257806306fdde031461017a578063081812fc1461018f578063095ea7b3146101ba5780631dd99119146101cf575b600080fd5b61016561016036600461111f565b61031e565b60405190151581526020015b60405180910390f35b610182610349565b6040516101719190611193565b6101a261019d3660046111a6565b6103db565b6040516001600160a01b039091168152602001610171565b6101cd6101c83660046111db565b610404565b005b6101826101dd3660046111a6565b610413565b6101cd6101f0366004611205565b6104ad565b610208610203366004611329565b61053d565b6040516101719392919061135e565b6101826105f2565b6101cd61022d366004611205565b6105ff565b6101a26102403660046111a6565b61061f565b6101cd610253366004611383565b61062a565b61026b61026636600461148d565b6107bd565b604051908152602001610171565b6101cd610805565b600f546101a2906001600160a01b031681565b6007546001600160a01b03166101a2565b610182610819565b61026b600d5481565b6101cd6102c43660046114a8565b610828565b6101cd6102d73660046114e4565b610833565b6101826102ea3660046111a6565b61084b565b61026b600c5481565b610165610306366004611560565b610925565b6101cd61031936600461148d565b610953565b60006001600160e01b03198216632483248360e11b1480610343575061034382610991565b92915050565b60606000805461035890611593565b80601f016020809104026020016040519081016040528092919081815260200182805461038490611593565b80156103d15780601f106103a6576101008083540402835291602001916103d1565b820191906000526020600020905b8154815290600101906020018083116103b457829003601f168201915b5050505050905090565b60006103e6826109e1565b506000828152600460205260409020546001600160a01b0316610343565b61040f828233610a1a565b5050565b600b602052600090815260409020805461042c90611593565b80601f016020809104026020016040519081016040528092919081815260200182805461045890611593565b80156104a55780601f1061047a576101008083540402835291602001916104a5565b820191906000526020600020905b81548152906001019060200180831161048857829003601f168201915b505050505081565b6001600160a01b0382166104dc57604051633250574960e11b8152600060048201526024015b60405180910390fd5b60006104e9838333610a27565b9050836001600160a01b0316816001600160a01b031614610537576040516364283d7b60e01b81526001600160a01b03808616600483015260248201849052821660448201526064016104d3565b50505050565b8051602081830181018051600a8252928201919093012091528054819061056390611593565b80601f016020809104026020016040519081016040528092919081815260200182805461058f90611593565b80156105dc5780601f106105b1576101008083540402835291602001916105dc565b820191906000526020600020905b8154815290600101906020018083116105bf57829003601f168201915b5050505050908060010154908060020154905083565b600e805461042c90611593565b61061a83838360405180602001604052806000815250610833565b505050565b6000610343826109e1565b610632610b20565b6008541561067b5760405162461bcd60e51b8152602060048201526016602482015275151a58dad95d1cc8185b1c9958591e481b5a5b9d195960521b60448201526064016104d3565b60005b815181101561040f57818181518110610699576106996115cd565b6020026020010151600a8383815181106106b5576106b56115cd565b6020026020010151600001516040516106ce91906115e3565b908152604051908190036020019020815181906106eb9082611645565b506020820151600182015560409091015160029091015560005b828281518110610717576107176115cd565b6020026020010151604001518110156107aa576008805490600061073a83611705565b9091555050600f54600854610758916001600160a01b031690610b4d565b82828151811061076a5761076a6115cd565b602002602001015160000151600b6000600854815260200190815260200160002090816107979190611645565b50806107a281611705565b915050610705565b50806107b581611705565b91505061067e565b60006001600160a01b0382166107e9576040516322718ad960e21b8152600060048201526024016104d3565b506001600160a01b031660009081526003602052604090205490565b61080d610b20565b6108176000610bb2565b565b60606001805461035890611593565b61040f338383610c04565b61083e8484846104ad565b6105373385858585610ca3565b6060610856826109e1565b506000828152600b60205260408120805461087090611593565b80601f016020809104026020016040519081016040528092919081815260200182805461089c90611593565b80156108e95780601f106108be576101008083540402835291602001916108e9565b820191906000526020600020905b8154815290600101906020018083116108cc57829003601f168201915b505050505090506009816108fc85610dce565b60405160200161090e9392919061172c565b604051602081830303815290604052915050919050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61095b610b20565b6001600160a01b03811661098557604051631e4fbdf760e01b8152600060048201526024016104d3565b61098e81610bb2565b50565b60006001600160e01b031982166380ac58cd60e01b14806109c257506001600160e01b03198216635b5e139f60e01b145b8061034357506301ffc9a760e01b6001600160e01b0319831614610343565b6000818152600260205260408120546001600160a01b03168061034357604051637e27328960e01b8152600481018490526024016104d3565b61061a8383836001610e61565b6000828152600260205260408120546001600160a01b0390811690831615610a5457610a54818486610f67565b6001600160a01b03811615610a9257610a71600085600080610e61565b6001600160a01b038116600090815260036020526040902080546000190190555b6001600160a01b03851615610ac1576001600160a01b0385166000908152600360205260409020805460010190555b60008481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b6007546001600160a01b031633146108175760405163118cdaa760e01b81523360048201526024016104d3565b6001600160a01b038216610b7757604051633250574960e11b8152600060048201526024016104d3565b6000610b8583836000610a27565b90506001600160a01b0381161561061a576040516339e3563760e11b8152600060048201526024016104d3565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038216610c3657604051630b61174360e31b81526001600160a01b03831660048201526024016104d3565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0383163b15610dc757604051630a85bd0160e11b81526001600160a01b0384169063150b7a0290610ce59088908890879087906004016117d7565b6020604051808303816000875af1925050508015610d20575060408051601f3d908101601f19168201909252610d1d91810190611814565b60015b610d89573d808015610d4e576040519150601f19603f3d011682016040523d82523d6000602084013e610d53565b606091505b508051600003610d8157604051633250574960e11b81526001600160a01b03851660048201526024016104d3565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b14610dc557604051633250574960e11b81526001600160a01b03851660048201526024016104d3565b505b5050505050565b60606000610ddb83610fcb565b600101905060008167ffffffffffffffff811115610dfb57610dfb611241565b6040519080825280601f01601f191660200182016040528015610e25576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610e2f57509392505050565b8080610e7557506001600160a01b03821615155b15610f37576000610e85846109e1565b90506001600160a01b03831615801590610eb15750826001600160a01b0316816001600160a01b031614155b8015610ec45750610ec28184610925565b155b15610eed5760405163a9fbf51f60e01b81526001600160a01b03841660048201526024016104d3565b8115610f355783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b5050600090815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b610f728383836110a3565b61061a576001600160a01b038316610fa057604051637e27328960e01b8152600481018290526024016104d3565b60405163177e802f60e01b81526001600160a01b0383166004820152602481018290526044016104d3565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b831061100a5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310611036576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061105457662386f26fc10000830492506010015b6305f5e100831061106c576305f5e100830492506008015b612710831061108057612710830492506004015b60648310611092576064830492506002015b600a83106103435760010192915050565b60006001600160a01b038316158015906111015750826001600160a01b0316846001600160a01b031614806110dd57506110dd8484610925565b8061110157506000828152600460205260409020546001600160a01b038481169116145b949350505050565b6001600160e01b03198116811461098e57600080fd5b60006020828403121561113157600080fd5b813561113c81611109565b9392505050565b60005b8381101561115e578181015183820152602001611146565b50506000910152565b6000815180845261117f816020860160208601611143565b601f01601f19169290920160200192915050565b60208152600061113c6020830184611167565b6000602082840312156111b857600080fd5b5035919050565b80356001600160a01b03811681146111d657600080fd5b919050565b600080604083850312156111ee57600080fd5b6111f7836111bf565b946020939093013593505050565b60008060006060848603121561121a57600080fd5b611223846111bf565b9250611231602085016111bf565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b6040516060810167ffffffffffffffff8111828210171561127a5761127a611241565b60405290565b604051601f8201601f1916810167ffffffffffffffff811182821017156112a9576112a9611241565b604052919050565b600067ffffffffffffffff8311156112cb576112cb611241565b6112de601f8401601f1916602001611280565b90508281528383830111156112f257600080fd5b828260208301376000602084830101529392505050565b600082601f83011261131a57600080fd5b61113c838335602085016112b1565b60006020828403121561133b57600080fd5b813567ffffffffffffffff81111561135257600080fd5b61110184828501611309565b6060815260006113716060830186611167565b60208301949094525060400152919050565b6000602080838503121561139657600080fd5b823567ffffffffffffffff808211156113ae57600080fd5b818501915085601f8301126113c257600080fd5b8135818111156113d4576113d4611241565b8060051b6113e3858201611280565b91825283810185019185810190898411156113fd57600080fd5b86860192505b838310156114805782358581111561141b5760008081fd5b86016060818c03601f19018113156114335760008081fd5b61143b611257565b898301358881111561144d5760008081fd5b61145b8e8c83870101611309565b8252506040838101358b83015291909201359082015282529186019190860190611403565b9998505050505050505050565b60006020828403121561149f57600080fd5b61113c826111bf565b600080604083850312156114bb57600080fd5b6114c4836111bf565b9150602083013580151581146114d957600080fd5b809150509250929050565b600080600080608085870312156114fa57600080fd5b611503856111bf565b9350611511602086016111bf565b925060408501359150606085013567ffffffffffffffff81111561153457600080fd5b8501601f8101871361154557600080fd5b611554878235602084016112b1565b91505092959194509250565b6000806040838503121561157357600080fd5b61157c836111bf565b915061158a602084016111bf565b90509250929050565b600181811c908216806115a757607f821691505b6020821081036115c757634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b600082516115f5818460208701611143565b9190910192915050565b601f82111561061a57600081815260208120601f850160051c810160208610156116265750805b601f850160051c820191505b81811015610dc557828155600101611632565b815167ffffffffffffffff81111561165f5761165f611241565b6116738161166d8454611593565b846115ff565b602080601f8311600181146116a857600084156116905750858301515b600019600386901b1c1916600185901b178555610dc5565b600085815260208120601f198616915b828110156116d7578886015182559484019460019091019084016116b8565b50858210156116f55787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60006001820161172557634e487b7160e01b600052601160045260246000fd5b5060010190565b600080855461173a81611593565b60018281168015611752576001811461176757611796565b60ff1984168752821515830287019450611796565b8960005260208060002060005b8581101561178d5781548a820152908401908201611774565b50505082870194505b50875192506117a9838560208b01611143565b602f60f81b939092019283528551916117c88382860160208a01611143565b91909201019695505050505050565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061180a90830184611167565b9695505050505050565b60006020828403121561182657600080fd5b815161113c8161110956fea264697066735822122037ac468161c0f9dfb6698f8e5f6a1e3dd86071c86b9f531ac854ae8d3cfdbad764736f6c63430008150033',
  sourceMap:
    '369:2139:42:-:0;;;1039:473;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;1380:113:28;;;;;;;;;;;;-1:-1:-1;;;1380:113:28;;;;1292:15:42;;1265:10;;-1:-1:-1;1446:13:28;1265:10:42;-1:-1:-1;1446:13:28;:::i;:::-;-1:-1:-1;1469:7:28;:17;1479:7;1469;:17;:::i;:::-;-1:-1:-1;;;;;;;;1273:26:23;;1269:95;;1322:31;;-1:-1:-1;;;1322:31:23;;1350:1;1322:31;;;4789:51:44;4762:18;;1322:31:23;;;;;;;1269:95;1373:32;1392:12;1373:18;:32::i;:::-;-1:-1:-1;1319:14:42::2;:32:::0;;;1361:12:::2;:28:::0;;;1399:13:::2;:30;1415:14:::0;1399:13;:30:::2;:::i;:::-;-1:-1:-1::0;1439:14:42::2;:32:::0;;-1:-1:-1;;;;;;1439:32:42::2;-1:-1:-1::0;;;;;1439:32:42;::::2;;::::0;;1481:13:::2;:24;1497:8:::0;1481:13;:24:::2;:::i;:::-;;1039:473:::0;;;;;;369:2139;;2912:187:23;3004:6;;;-1:-1:-1;;;;;3020:17:23;;;-1:-1:-1;;;;;;3020:17:23;;;;;;;3052:40;;3004:6;;;3020:17;3004:6;;3052:40;;2985:16;;3052:40;2975:124;2912:187;:::o;14:127:44:-;75:10;70:3;66:20;63:1;56:31;106:4;103:1;96:15;130:4;127:1;120:15;146:840;200:5;253:3;246:4;238:6;234:17;230:27;220:55;;271:1;268;261:12;220:55;294:13;;-1:-1:-1;;;;;356:10:44;;;353:36;;;369:18;;:::i;:::-;444:2;438:9;412:2;498:13;;-1:-1:-1;;494:22:44;;;518:2;490:31;486:40;474:53;;;542:18;;;562:22;;;539:46;536:72;;;588:18;;:::i;:::-;628:10;624:2;617:22;663:2;655:6;648:18;685:4;675:14;;730:3;725:2;720;712:6;708:15;704:24;701:33;698:53;;;747:1;744;737:12;698:53;769:1;760:10;;779:133;793:2;790:1;787:9;779:133;;;881:14;;;877:23;;871:30;850:14;;;846:23;;839:63;804:10;;;;779:133;;;954:1;932:15;;;928:24;;;921:35;;;;936:6;146:840;-1:-1:-1;;;;146:840:44:o;991:1058::-;1136:6;1144;1152;1160;1168;1176;1229:3;1217:9;1208:7;1204:23;1200:33;1197:53;;;1246:1;1243;1236:12;1197:53;1273:16;;-1:-1:-1;;;;;1338:14:44;;;1335:34;;;1365:1;1362;1355:12;1335:34;1388:61;1441:7;1432:6;1421:9;1417:22;1388:61;:::i;:::-;1378:71;;1489:2;1478:9;1474:18;1468:25;1458:35;;1533:2;1522:9;1518:18;1512:25;1502:35;;1583:2;1572:9;1568:18;1562:25;1546:41;;1612:2;1602:8;1599:16;1596:36;;;1628:1;1625;1618:12;1596:36;1651:63;1706:7;1695:8;1684:9;1680:24;1651:63;:::i;:::-;1757:3;1742:19;;1736:26;1641:73;;-1:-1:-1;1736:26:44;-1:-1:-1;;;;;;1791:31:44;;1781:42;;1771:70;;1837:1;1834;1827:12;1771:70;1911:3;1896:19;;1890:26;1860:5;;-1:-1:-1;1928:16:44;;;1925:36;;;1957:1;1954;1947:12;1925:36;;1980:63;2035:7;2024:8;2013:9;2009:24;1980:63;:::i;:::-;1970:73;;;991:1058;;;;;;;;:::o;2054:380::-;2133:1;2129:12;;;;2176;;;2197:61;;2251:4;2243:6;2239:17;2229:27;;2197:61;2304:2;2296:6;2293:14;2273:18;2270:38;2267:161;;2350:10;2345:3;2341:20;2338:1;2331:31;2385:4;2382:1;2375:15;2413:4;2410:1;2403:15;2267:161;;2054:380;;;:::o;2565:545::-;2667:2;2662:3;2659:11;2656:448;;;2703:1;2728:5;2724:2;2717:17;2773:4;2769:2;2759:19;2843:2;2831:10;2827:19;2824:1;2820:27;2814:4;2810:38;2879:4;2867:10;2864:20;2861:47;;;-1:-1:-1;2902:4:44;2861:47;2957:2;2952:3;2948:12;2945:1;2941:20;2935:4;2931:31;2921:41;;3012:82;3030:2;3023:5;3020:13;3012:82;;;3075:17;;;3056:1;3045:13;3012:82;;;3016:3;;;2656:448;2565:545;;;:::o;3286:1352::-;3406:10;;-1:-1:-1;;;;;3428:30:44;;3425:56;;;3461:18;;:::i;:::-;3490:97;3580:6;3540:38;3572:4;3566:11;3540:38;:::i;:::-;3534:4;3490:97;:::i;:::-;3642:4;;3706:2;3695:14;;3723:1;3718:663;;;;4425:1;4442:6;4439:89;;;-1:-1:-1;4494:19:44;;;4488:26;4439:89;-1:-1:-1;;3243:1:44;3239:11;;;3235:24;3231:29;3221:40;3267:1;3263:11;;;3218:57;4541:81;;3688:944;;3718:663;2512:1;2505:14;;;2549:4;2536:18;;-1:-1:-1;;3754:20:44;;;3872:236;3886:7;3883:1;3880:14;3872:236;;;3975:19;;;3969:26;3954:42;;4067:27;;;;4035:1;4023:14;;;;3902:19;;3872:236;;;3876:3;4136:6;4127:7;4124:19;4121:201;;;4197:19;;;4191:26;-1:-1:-1;;4280:1:44;4276:14;;;4292:3;4272:24;4268:37;4264:42;4249:58;4234:74;;4121:201;-1:-1:-1;;;;;4368:1:44;4352:14;;;4348:22;4335:36;;-1:-1:-1;3286:1352:44:o;4643:203::-;369:2139:42;;;;;;',
  linkReferences: {},
};

async function main(params: { user_data: any }) {
  const event = {
    id: params.user_data.udid,
    name: params.user_data.name,
    startDate: params.user_data.startDate,
    endDate: params.user_data.endDate,
    location: params.user_data.location,
    organizerAddress: params.user_data.organizerAddress,
    contractAddress: '',
  };

  // Deploy Event Ticket NFT
  const provider = new ethers.JsonRpcProvider(process.env.QUICKNODE_RPC_URL);

  const wallet = new ethers.Wallet(
    process.env.ADMIN_PRIVATE_KEY || 'letmeinplease',
    provider
  );

  const EventTicketNFT = new ethers.ContractFactory(
    contractAbi,
    contractBytecode,
    wallet
  );

  try {
    const contract = await EventTicketNFT.deploy(
      event.name,
      event.startDate,
      event.endDate,
      event.location,
      wallet.address,
      `https://nft.ticketworld.net/${event.id}/`
    );

    await contract.waitForDeployment();

    event.contractAddress = await contract.getAddress();
  } catch (error) {
    console.error(error);
    return {
      error: error,
    };
  }

  // Add event to database
  try {
    await qnLib.qnAddListItem('events', JSON.stringify(event));
    return {
      event,
    };
  } catch (error) {
    console.error(error);
    return {
      error: error,
    };
  }
}