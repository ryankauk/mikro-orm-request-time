import fetch from 'node-fetch';
const numberOfRequests = process.argv[2] ? parseInt(process.argv[2], 10) : 1;
export const run = async () => {
  await Promise.all(
    new Array(numberOfRequests).fill(null).map(async () => {
      await fetch('http://localhost:5999/myEntity/mongoose');
      console.log('fetched');
    })
  );
};

run()
  .then(() => console.log('done'))
  .catch(console.error);
