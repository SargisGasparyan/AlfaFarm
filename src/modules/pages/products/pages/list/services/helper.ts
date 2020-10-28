import { IProductFilterRequestModel } from 'platform/api/product/models/request';

export const buildFilters = () => {
  const query = new URLSearchParams(window.location.search);
  const categoryIds = query.get('categoryIds');
  const brandIds = query.get('brandIds');
  const producerIds = query.get('producerIds');
  const activeIngredientIds = query.get('activeIngredientIds');
  const minPrice = query.get('minPrice');
  const maxPrice = query.get('maxPrice');

  const body: IProductFilterRequestModel = {
    text: query.get('text') || '',
    categoryIds: categoryIds ? categoryIds.split(',').map(item => +item) : [],
    brandIds: brandIds ? brandIds.split(',').map(item => +item) : [],
    producerIds: producerIds ? producerIds.split(',').map(item => +item) : [],
    activeIngredientIds: activeIngredientIds ? activeIngredientIds.split(',').map(item => +item) : [],
    minPrice: minPrice ? +minPrice : undefined,
    maxPrice: maxPrice ? +maxPrice : undefined,
  };

  return body;
};