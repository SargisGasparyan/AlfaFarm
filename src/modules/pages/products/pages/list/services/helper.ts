import { IProductFilterRequestModel } from 'platform/api/product/models/request';
import * as React from 'react';

export const priceConfig = {
  maxPrice : 40000,
  maxPriceReal : 0
}

export const buildFilters = (makeEmpty = false) => {
  const body: IProductFilterRequestModel = {
    productText: '',
    categoryIds: [],
    brandIds: [],
    producerIds: [],
    activeIngredientIds: [],
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: undefined,
    hasDiscount: false,
  };

  if (makeEmpty) return body;

  const query = new URLSearchParams(window.location.search);
  const categoryIds = query.get('categoryIds');
  const brandIds = query.get('brandIds');
  const producerIds = query.get('producerIds');
  const activeIngredientIds = query.get('activeIngredientIds');
  const minPrice = query.get('minPrice');
  const maxPrice = query.get('maxPrice');
  const sortBy = query.get('sortBy');
  const hasDiscount = query.get('hasDiscount');

  body.productText = query.get('text') || '';
  body.categoryIds = categoryIds ? categoryIds.split(',').map(item => +item) : [];
  body.brandIds = brandIds ? brandIds.split(',').map(item => +item) : [];
  body.producerIds = producerIds ? producerIds.split(',').map(item => +item) : [];
  body.activeIngredientIds = activeIngredientIds ? activeIngredientIds.split(',').map(item => +item) : [];
  body.minPrice = minPrice ? +minPrice : undefined;
  body.maxPrice = maxPrice && +maxPrice === priceConfig.maxPrice ? (priceConfig.maxPriceReal > 0 ? +priceConfig.maxPriceReal : +priceConfig.maxPrice) : (maxPrice ? +maxPrice : undefined);
  body.sortBy = sortBy ? +sortBy : undefined;
  body.hasDiscount = !!hasDiscount;

  return body;
};
export const CREATE_FORM_AND_SUBMIT = (path: string, params: any, method: string = 'post') => {
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];
      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}
