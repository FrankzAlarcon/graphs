/*import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

async function getDataAPI() {
  const URL = 'https://api.twitter.com/2/users/4865683485/following';
  const oauth = OAuth({
    consumer: {
      key: 'e9b',
      secret: 'O'
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
    }
  });
  const token = {
    key: '4865ZLSv8bl',
    secret: '4RCMlqnXk'
  }
  const requestData = {
    url: URL,
    method: 'GET'
  }
  console.log(oauth.toHeader(oauth.authorize(requestData, token)));
  const data = await fetch(URL, {
    mode: 'cors',
    headers: {
      ...oauth.toHeader(oauth.authorize(requestData, token))
    }
  })
  .then(response => {
    console.log(response)
    return response;
  })
  .then(data => data)
  .catch(error => console.log(error))
  return data;
}

export default getDataAPI;*/
// import Twitter from 'twitter-v2';

// let twitter  = new Twitter({
//   consumer_key: 'eukrhMeOtHiGlpxzkzMaOUz9b',
//   consumer_secret: 'W18F3RDZAb4VLGa7JXIhIFNQfz3HN4LR9IgD80jLniYxj6BYqO',
//   access_token_key: '4865683485-OxjXay7efuS8rtImSZLSv4ocZqRUnCN4QEYq8bl',
//   access_token_secret: '4RCc6jzLE9KksMJRS7eHwtdZY6lfwq0doGYlC2VMlqnXk'
// });

// /**Parametros: 1,2,3,4 */
// async function getData(codigo) {
//   const data = await twitter.get(`https://api.twitter.com/2/users/${codigo}/following?user.fields=public_metrics&max_results=10`)
//   .then(response => {
//     return response.data
//   })
//   .catch(error => console.log(error));

//   return data || 'error';
// }
// async function getOwnerData(username) {
//   const {data} = await twitter.get(`https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`).then(res => res.json())
//   return data || 'error';
// }

// function get() {
//   return getOwnerData('Frankz472');
// }
// console.log(get())