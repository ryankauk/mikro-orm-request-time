import fetch from 'node-fetch';
export const run = async () => {
  await Promise.all(
    new Array(1000).fill(null).map(async () => {
      await fetch('http://localhost:5999/myEntity');
      console.log('fetched');
    })
  );
};

run()
  .then(() => console.log('done'))
  .catch(console.error);
