import * as React from 'react';
import * as moment from 'moment';

import Settings from './settings';
import { IDropdownOption } from '../constants/interfaces';
import { IUserResponseModel } from '../api/user/models/response';
import enviroment from './enviroment';

export const scrolledToBottom = () => (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 1500;
export const configedMoment = (date: string | number | Date) => moment.utc(date);

export const preventFieldSubmit = (e: KeyboardEvent) => {
  const entered = e.which === 13;
  entered && e.preventDefault();
  return entered;
};

export const getViewEnum = (obj: {}, withTranslations = true) => {
  const enumObj = { ...obj };

  for (const key in enumObj) {
    if (withTranslations) {
      const label = getTranslationLabel(key);
      enumObj[enumObj[key]] = label;
    } else enumObj[enumObj[key]] = key;
  }

  return enumObj;
}

export const getTranslationLabel = (value: string) => {
  const arrayValue = value.split('');
  return arrayValue.map((letter, index) => {
    if (!index) return letter.toLowerCase();
    else if (letter === letter.toUpperCase()) return `_${letter.toLowerCase()}`;
    else return letter;
  }).join('');
}

export const enumToSelectOptions = <Value extends number>(obj: object, withTranslations: boolean = true, notIncludeValues: Value[] = []) => {
  const options: Array<IDropdownOption<Value>> = [];
  Object.keys(obj).map(item => {
    if (!isNaN(+item) && notIncludeValues.indexOf(+item as Value) === -1) options.push({
      name: withTranslations ? Settings.translations[getTranslationLabel(obj[item])] : obj[item],
      value: +item as Value,
    });

    return true;
  });

  return options;
};

export const getUserName = (profile: IUserResponseModel) => profile.fullName || profile.username;

export const formatDate = (date?: string | number, withHours = true) => {
  if (!date) return '';
  const momentDate = moment(formatISOString(date));
  return momentDate.format(withHours ? 'YYYY MMM DD | HH:mm' : 'YYYY MMM DD');
}

export const formatTime = (time?: string) => {
  if (!time) return '';

  const splited = time.split(':');
  splited.pop();
  return splited.join(':');
}

export const formatISOString = (date: string | number | Date) => {
  if (typeof date !== 'string') return date;
  return date + (date[date.length - 1].toLowerCase() === 'z' ? '' : 'Z');
}

export const getUpcomingMonths = (() => {
  const getMonth = (date: moment.Moment) => {
    const splitedName = date.format("MMMM").split('');
    splitedName[0] = splitedName[0].toUpperCase();

    return {
      date: date.toDate(),
      name: splitedName.join(''),
    };
  };

  return (count: number) => {
    const date = moment();
    const months = [getMonth(date)];
  
    for (let i = 1; i <= count - 1; i++) {
      date.add(1, 'months');
      date.set("date", 1);
      months.push(getMonth(date));
    }
  
    return months;
  };
})();

export const getMonthDays = (() => {
  const getDay = (date: moment.Moment) => {
    const isToday = moment(date).isSame(new Date(), 'day');
    return {
      date: date.toDate(),
      name: isToday ? Settings.translations.today : date.date(),
    }
  };
  
  return (startDate: Date, pushToday = true) => {
    const date = moment(startDate);
    const endDate = moment(date).endOf('month');
    const days = [];

    while(date.diff(endDate, 'days') < 0) {
      const isToday = moment(date).isSame(new Date(), 'day');
      (!isToday || pushToday) && days.push(getDay(date));
      date.add(1, 'days');
    }
      
    return days;
  };
})();

export const getHoverDirection = (e: React.MouseEvent, element?: HTMLElement) => {
  const node = element || e.target as HTMLElement;

  if (node) {
    const { width, height, top, left } = node.getBoundingClientRect();
    const l = e.pageX - (left + window.pageXOffset);
    const t = e.pageY - (top + window.pageYOffset);
    const x = (l - (width / 2) * (width > height ? (height / width) : 1));
    const y = (t - (height / 2) * (height > width ? (width / height) : 1));

    return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  }

  return null
};

export const getMediaPath = (path?: string | null) => path ? enviroment.BASE_URL + path : '';