import { ethers } from "ethers"

function main() {
  const wallet = ethers.Wallet.createRandom()
  return {
    walletAddress: wallet.address
  }
}

console.log('WalletAddress: ', main().walletAddress)
