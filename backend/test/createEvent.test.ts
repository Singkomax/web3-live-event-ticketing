import { main } from '../src/createEvent';

main({
  user_data: {
    name: 'Singkomax 1st Podcast',
    description: 'Walang kwentang podcast, wag na kayo gumastos hahaha!',
    date: 1735109750, // 2024-12-25
    baseURI: 'https://singkomax.com/podcast/1/',
  },
})
  .then(res => {
    console.log('Contract address:', res.contractAddress);
  })
  .catch(err => {
    console.error(err);
  });
