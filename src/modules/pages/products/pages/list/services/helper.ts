import { IProductFilterRequestModel } from 'platform/api/product/models/request';
import * as React from 'react';

export const priceConfig = {
  maxPrice : 40000,
  maxPriceReal : 0
}

export const buildFilters = () => {
  const query = new URLSearchParams(window.location.search);
  const categoryIds = query.get('categoryIds');
  const brandIds = query.get('brandIds');
  const producerIds = query.get('producerIds');
  const activeIngredientIds = query.get('activeIngredientIds');
  const minPrice = query.get('minPrice');
  const maxPrice = query.get('maxPrice');
  const sortBy = query.get('sortBy');
  const hasDiscount = query.get('hasDiscount');

  const body: IProductFilterRequestModel = {
    productText: query.get('text') || '',
    categoryIds: categoryIds ? categoryIds.split(',').map(item => +item) : [],
    brandIds: brandIds ? brandIds.split(',').map(item => +item) : [],
    producerIds: producerIds ? producerIds.split(',').map(item => +item) : [],
    activeIngredientIds: activeIngredientIds ? activeIngredientIds.split(',').map(item => +item) : [],
    minPrice: minPrice ? +minPrice : undefined,
    maxPrice: maxPrice && +maxPrice === priceConfig.maxPrice ? (priceConfig.maxPriceReal > 0 ? +priceConfig.maxPriceReal : +priceConfig.maxPrice) : (maxPrice ? +maxPrice : undefined),
    sortBy: sortBy ? +sortBy : undefined,
    hasDiscount: !!hasDiscount,
  };

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
