import * as React from 'react';
import { IProductFilterRequestModel } from 'platform/api/product/models/request';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import CheckBox from 'rc-checkbox';
import { infinityScrollPageLimit } from 'platform/constants';
import BrandController from 'platform/api/brand';
import { IBrandListResponseModel } from 'platform/api/brand/models/response';
import useSubscriber from 'platform/hooks/use-subcriber';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import { IPagingResponse } from 'platform/constants/interfaces';
import { scrolledToBottomOfElement } from 'platform/services/helper';
import { buildFilters } from '../../../../services/helper';

interface IProps {
  body: IProductFilterRequestModel;
  onChange(body: IProductFilterRequestModel): void;
  close?: () => void;
}

const Brands = ({ body, onChange }: IProps) => {
  const prevCategoryIdRef = React.useRef<number>();
  const prevDataRef = React.useRef<any>();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [open, setOpen] = React.useState(!!body.brandIds?.length);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<IPagingResponse<IBrandListResponseModel>>();

  React.useEffect(() => {
    const categoryId = body.categoryIds && body.categoryIds[0];

    if (categoryId !== prevCategoryIdRef.current || prevDataRef.current !== JSON.stringify(buildFilters())) {
      setPageNumber(1);
      fetchData();
    }

    prevCategoryIdRef.current = categoryId;
    prevDataRef.current = JSON.stringify(buildFilters());
  });

  useSubscriber(DispatcherChannels.ProductFilterClear, () => setOpen(false));

  const toggleItem = (id: number) => {
    const bodyCopy = {...body};

    if (bodyCopy.brandIds) {
      const query = new URLSearchParams(window.location.search);
      const existingIndex = bodyCopy.brandIds?.indexOf(id);

      if (existingIndex === -1) bodyCopy.brandIds.push(id);
      else bodyCopy.brandIds.splice(existingIndex, 1);
      
      bodyCopy.brandIds.length ? query.set('brandIds', bodyCopy.brandIds.join(',')) : query.delete('brandIds');
      window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
      // window.scrollTo(0, 0);

      onChange(body);
    }
  }

  const fetchData = async () => {
    setLoading(true);
    setTimeout(async () => {
      const result = await BrandController.GetList({
        ...buildFilters(),
        pageNumber,
        pageSize: infinityScrollPageLimit,
        categoryId: body.categoryIds && body.categoryIds[0],
      });
  
      if (!result.aborted) {
        if (data) setData({ ...data, list: pageNumber === 1 ? result.data.list : [...data.list, ...result.data.list] });
        else setData(result.data);
      }
  
      setLoading(false);
    });
  }

  const scrolled = (e: React.SyntheticEvent) => {
    if (scrolledToBottomOfElement(e.currentTarget as HTMLElement) && !loading && data && pageNumber < data.pageCount) {
      setPageNumber(pageNumber + 1);
      fetchData();
    }
  }

  return  <>
    <h3 className="P-row-title" onClick={() => setOpen(!open)}>
      {Settings.translations.brand}
      <span className="G-clr-orange">{open ? '-' : '+'}</span>
    </h3>

    {open && data ?
      <div className="P-row-content" onScroll={scrolled}>
        {data.list.map((item, index) => <label className="P-checkbox-row" onChange={() => toggleItem(item.id)} key={index}>
          <CheckBox checked={body.brandIds?.includes(item.id)} />
          <span className="P-name" title={item.name}>{item.name}</span>
        </label>)}
      </div>
    : null}
  </>;
};

export default Brands;