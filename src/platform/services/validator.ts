// export const isValidEmail = (value?: string | null): boolean => {
//   const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (!value && value !== '') {
//     return false;
//   } else if (regex.test(value)) {
//     return true
//   }   return false
// };

export const onlyNumbersWithoutCode = (str: string) => {
  const reg = /^\+?[0-9]*$/;

  return reg.test(str) && str.length >= 8;
}

export const isValidEmail = (value?: string | null): boolean => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const beeline = '91|99|96|43|33';
  const ucom = '55|95|41|44|60';
  const mts = '93|94|77|49|98';
  const Mobregex = new RegExp(`^(374)((?:${mts}|${beeline}|${ucom})([0-9]{6}))$`);
  if (!value) return false;
  return regex.test(value) || Mobregex.test(value);
}

export const isValidPassword = (value?: string | null): boolean => {
  if (!value) return false;
  return value.length >= 6;
}

export const isValidDateRange = (from?: string | Date, to?: string | Date, optional = true) => {
  const onlyTo = !from && to;
  const onlyFrom = !to && from;

  if (optional && (onlyTo || onlyFrom)) return true;

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    return fromDate <= toDate;
  }

  return false;
}

export const isValidNonCityPhone = (value?: string | null): boolean => {
  if (!value && value !== '') return false;
  const beeline = '91|99|96|43|33';
  const ucom = '55|95|41|44|45';
  const mts = '93|94|77|49|98';
  const KT = '97';

  const regex = new RegExp(`^(374)((?:${mts}|${beeline}|${ucom}|${KT})([0-9]{6}))$`);
  return regex.test(value);
};

export const isValidPhone = (value?: string | null): boolean => {
  const beeline = '91|99|96|43|33';
  const ucom = '55|95|41|44|45';
  const mts = '93|94|77|49|98';
  const home = '10|11';
  const KT = '97';

  if (!value && value !== '') return false
  const regex = new RegExp(`^(374)?((?:${mts}|${beeline}|${ucom}|${home}|${KT})([0-9]{6}))$`);
  return regex.test(value);
};

export const isValidPhoneOnly = (value?: any | null) => {
  if (value.length > 12 || value.length < 9) return false;
  return value;
};

export const phoneFieldPattern = "[0-9]{1,8}";
export const promoCodeFieldPattern = "[A-Za-z0-9]{1,8}";