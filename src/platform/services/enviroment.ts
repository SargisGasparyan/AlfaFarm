// export default {
//   BASE_URL: "https://qapapi.armlon.co.uk/",
// };

import * as CONFIG from '../../../config.json';

export default {
  BASE_URL: (process.env.RAZZLE_ENV || '').trim() === 'staging' ? "http://alfaback.abmdemo.me/" :  "http://localhost:5011/",
  WHOLESALE: CONFIG.wholesale,
  // BASE_URL: "http://192.168.0.106:5000/",
};
