import * as React from 'react';
import { IProductFilterRequestModel } from 'platform/api/product/models/request';
import Storage from 'platform/services/storage';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import CheckBox from 'rc-checkbox';
import ActiveIngredientController from 'platform/api/activeIngredient';
import { infinityScrollMax } from 'platform/constants';
import { IActiveIngredientListResponseModel } from 'platform/api/activeIngredient/models/response';

interface IProps {
  body: IProductFilterRequestModel;
  onChange(body: IProductFilterRequestModel): void;
}

const ActiveIngredients = ({ body, onChange }: IProps) => {
  const prevCategoryIdRef = React.useRef<number>();
  const [open, setOpen] = React.useState(!!body.activeIngredientIds?.length);
  const [data, setData] = React.useState<IActiveIngredientListResponseModel[]>([]);

  React.useEffect(() => {
    const categoryId = body.categoryIds && body.categoryIds[0];

    categoryId !== prevCategoryIdRef.current && ActiveIngredientController.GetList({
      pageNumber: 1,
      pageSize: infinityScrollMax,
      categoryId: body.categoryIds && body.categoryIds[0],
    }).then(result => setData(result.data.list));

    prevCategoryIdRef.current = categoryId;
  });

  const toggleItem = (id: number) => {
    const bodyCopy = {...body};

    if (bodyCopy.activeIngredientIds) {
      const query = new URLSearchParams(window.location.search);
      const existingIndex = bodyCopy.activeIngredientIds?.indexOf(id);

      if (existingIndex === -1) bodyCopy.activeIngredientIds.push(id);
      else bodyCopy.activeIngredientIds.splice(existingIndex, 1);
      
      bodyCopy.activeIngredientIds.length ? query.set('activeIngredientIds', bodyCopy.activeIngredientIds.join(',')) : query.delete('activeIngredientIds');
      window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
      // window.scrollTo(0, 0);

      onChange(body);
    }
  }

  return <>
    <h3 className="P-row-title" onClick={() => setOpen(!open)}>
      {Settings.translations.active_ingredient}
      <span className="G-orange-color">{open ? '-' : '+'}</span>
    </h3>

    {open ?
      <div className="P-row-content">
        {data.map(item => <label className="P-checkbox-row" onChange={() => toggleItem(item.id)} key={item.id}>
          <CheckBox checked={body.activeIngredientIds?.includes(item.id)} />
          <span className="P-name" title={item.name}>{item.name}</span>
        </label>)}
      </div>
    : null}
    
  </>;
};

export default ActiveIngredients;