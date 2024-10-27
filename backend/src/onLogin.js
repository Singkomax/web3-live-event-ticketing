const ethers = require('ethers')
const axios = require('axios')

async function main(params) {

    // Extract user data from params, if any
    const userData = params.user_data;
    
    const auth0ManageApiKey = await qnLib.qnGetSet('AUTH0_MANAGEMENT_API_TOKEN')

    const { data: user } = await axios.get(`https://dev-arf03mfw5s0bw6fn.us.auth0.com/api/v2/users/${userData.userId}`, {
      headers: {
        'Content-Type': 'application/json',
          Authorization: `Bearer ${auth0ManageApiKey}`
      }
    })

    if (!user.user_metadata?.address) {
      const wallet = ethers.Wallet.createRandom();

      await axios.patch(`https://dev-arf03mfw5s0bw6fn.us.auth0.com/api/v2/users/${userData.userId}`, {
        'user_metadata': {
          'address': wallet.address
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${auth0ManageApiKey}`
        }
      })

      await qnLib.qnAddSet(wallet.address, wallet.mnemonic.phrase)

      return {
        ...user,
        user_data: {
          address: wallet.address
        }
      }
    }
    
    
    return user
}
