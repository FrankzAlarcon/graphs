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