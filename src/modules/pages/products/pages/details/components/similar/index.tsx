import * as React from 'react';

import Settings from 'platform/services/settings';
import { Shared } from 'modules';
import { IProductListResponseModel, IProductDetailsResponseModel } from 'platform/api/product/models/response';
import ProductController from 'platform/api/product';

import './style.scss';

interface IProps {
  data: IProductDetailsResponseModel;
};

const Similar = React.memo(({ data }: IProps) => {
  const [list, setList] = React.useState<IProductListResponseModel[]>([]);

  React.useEffect(() => {
    ProductController.GetRelated(data.id).then(result => {
      setList(result.data);
    })
  }, []);

  return list.length ? (
    <div className="P-product-details-similar">
      <h2 className="P-title">{Settings.translations.similar_products}</h2>
      <div className="P-list">
        {list.map(item => <Shared.Products.ListItem key={item.id} data={item} />)}
      </div>
    </div>
  ) : null;
});

export default Similar;