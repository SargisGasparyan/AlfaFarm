// export default {
//   BASE_URL: "https://qapapi.armlon.co.uk/",
// };

import * as CONFIG from '../../../config.json';

export default {
  BASE_URL: (process.env.RAZZLE_ENV || '').trim() === 'staging' ? "https://api.alfapharm.am/" : "https://api.alfapharm.am/",
  WHOLESALE: CONFIG.wholesale,
};
