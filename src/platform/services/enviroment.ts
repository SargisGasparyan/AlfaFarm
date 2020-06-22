// export default {
//   BASE_URL: "https://qapapi.armlon.co.uk/",
// };

export default {
  BASE_URL: (process.env.RAZZLE_ENV || '').trim() === 'staging' ? "https://apistaging.ineed.am/" :  "https://api.ineed.am/"
  // BASE_URL: "http://localhost:4002/",
  // BASE_URL: "http://192.168.0.106:5000/",
  // https://api.ineed.am/
};
