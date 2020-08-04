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
  const momentDate = moment(date);
  return momentDate.format(withHours ? 'YYYY MMM DD | HH:mm' : 'YYYY MMM DD');
}

export const formatTime = (time?: string) => {
  if (!time) return '';

  const splited = time.split(':');
  splited.pop();
  return splited.join(':');
}

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