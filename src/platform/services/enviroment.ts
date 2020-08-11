// export default {
//   BASE_URL: "https://qapapi.armlon.co.uk/",
// };

export default {
  BASE_URL: (process.env.RAZZLE_ENV || '').trim() === 'staging' ? "https://alfaback.abmdemo.me/" :  "http://localhost:5011/"
  // BASE_URL: "http://192.168.0.106:5000/",
};
