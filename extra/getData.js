/*import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

async function getDataAPI() {
  const URL = 'https://api.twitter.com/2/users/4865683485/following';
  const oauth = OAuth({
    consumer: {
      key: 'eukrhMeOtHiGlpxzkzMaOUz9b',
      secret: 'W18F3RDZAb4VLGa7JXIhIFNQfz3HN4LR9IgD80jLniYxj6BYqO'
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
    }
  });
  const token = {
    key: '4865683485-OxjXay7efuS8rtImSZLSv4ocZqRUnCN4QEYq8bl',
    secret: '4RCc6jzLE9KksMJRS7eHwtdZY6lfwq0doGYlC2VMlqnXk'
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