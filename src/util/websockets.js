// import Pusher from "pusher-js";
// import {getAccessToken} from "./authentication";
// import axios from "axios";
//
// export const connectWebSocket = (Vue, PUSHER_KEY, APP_HOST) => {
//   Vue.prototype.$pusher = new Pusher(PUSHER_KEY, {
//     cluster: 'ap2',
//     encrypted: true,
//     auth: {
//       headers: {
//         token: "Bearer " + getAccessToken()
//       }
//     },
//     authorizer: (channel, options) => {
//       return {
//         authorize: (socketId, callback) => {
//           axios.post(APP_HOST + '/api/pusher/auth', {
//             socket_id: socketId,
//             channel_name: channel.name
//           }, {
//             headers: {
//               Authorization: "Bearer " + getAccessToken()
//             }
//           })
//             .then(response => {
//               callback(null, response.data);
//             })
//             .catch(error => {
//               callback(error);
//             });
//         }
//       };
//     },
//   });
//
// }
