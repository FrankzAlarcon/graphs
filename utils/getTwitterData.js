// const Twit = require("twit");
import Twit from 'twit';

let twitter  = new Twit({
  consumer_key: 'eukrhMeOtHiGlpxzkzMaOUz9b',
  consumer_secret: 'W18F3RDZAb4VLGa7JXIhIFNQfz3HN4LR9IgD80jLniYxj6BYqO',
  access_token: '4865683485-OxjXay7efuS8rtImSZLSv4ocZqRUnCN4QEYq8bl',
  access_token_secret: '4RCc6jzLE9KksMJRS7eHwtdZY6lfwq0doGYlC2VMlqnXk'

})
function getData() {
  return twitter.get('https://api.twitter.com/2/users/4865683485/following', function(err, data, response) {
    console.log(data)
  })

}
// function getMyFollowings() {
//   return twitter.get('2/users/4865683485/following', (err, data, response) => {
//     console.log(data)
//   })
// }
export default getData;
// export {
//   twitter,
//   getMyFollowings
// };