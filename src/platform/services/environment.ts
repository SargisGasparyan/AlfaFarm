// export default {
//   BASE_URL: "https://qapapi.armlon.co.uk/",
// };

import * as CONFIG from '../../../config.json';

export default {
  BASE_URL: (process.env.RAZZLE_ENV || '').trim() === 'staging' ? "https://alfaback.abmdemo.me/" : "http://localhost:5011/",
  WHOLESALE: CONFIG.wholesale,
};
