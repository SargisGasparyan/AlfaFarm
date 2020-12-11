// export default {
//   BASE_URL: "https://qapapi.armlon.co.uk/",
// };

import * as CONFIG from '../../../config.json';

export default {
  BASE_URL: (process.env.RAZZLE_ENV || '').trim() === 'staging' ? "https://alfaback.abmdemo.me/" :  "https://alfaback.abmdemo.me/",
  WHOLESALE: CONFIG.wholesale,
  // BASE_URL: "http://192.168.0.110:7777/",
};
