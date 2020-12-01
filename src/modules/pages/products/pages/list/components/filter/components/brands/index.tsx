import * as React from 'react';
import { IProductFilterRequestModel } from 'platform/api/product/models/request';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import CheckBox from 'rc-checkbox';
import { infinityScrollMax } from 'platform/constants';
import BrandController from 'platform/api/brand';
import { IBrandListResponseModel } from 'platform/api/brand/models/response';

interface IProps {
  body: IProductFilterRequestModel;
  onChange(body: IProductFilterRequestModel): void;
}

const Brands = ({ body, onChange }: IProps) => {
  const prevCategoryIdRef = React.useRef<number>();
  const [open, setOpen] = React.useState(!!body.brandIds?.length);
  const [data, setData] = React.useState<IBrandListResponseModel[]>([]);

  React.useEffect(() => {
    const categoryId = body.categoryIds && body.categoryIds[0];

    categoryId !== prevCategoryIdRef.current && BrandController.GetList({
      pageNumber: 1,
      pageSize: infinityScrollMax,
      categoryId: body.categoryIds && body.categoryIds[0],
    }).then(result => setData(result.data.list));

    prevCategoryIdRef.current = categoryId;
  });

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

  return <>
    <h2 className="P-row-title" onClick={() => setOpen(!open)}>
      {Settings.translations.brand}
      <span className="G-orange-color">{open ? '-' : '+'}</span>
    </h2>

    {open ?
      <div className="P-row-content">
        {data.map(item => <label className="P-checkbox-row" onChange={() => toggleItem(item.id)} key={item.id}>
          <CheckBox checked={body.brandIds?.includes(item.id)} />
          <span className="P-name" title={item.name}>{item.name}</span>
        </label>)}
      </div>
    : null}
  </>;
};

export default Brands;