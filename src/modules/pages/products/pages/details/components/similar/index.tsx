import * as React from 'react';

import Settings from 'platform/services/settings';
import { Shared } from 'modules';
import { IProductListResponseModel, IProductDetailsResponseModel } from 'platform/api/product/models/response';
import ProductController from 'platform/api/product';

import './style.scss';
import { Link } from 'react-router-dom';
import ROUTES from 'platform/constants/routes';

interface IProps {
  data: IProductDetailsResponseModel;
};

const Similar = React.memo(({ data }: IProps) => {
  const [list, setList] = React.useState<IProductListResponseModel[]>([]);

  React.useEffect(() => {
    ProductController.GetRelated(data.id, { pageNumber: 1, pageSize: 4 }).then(result => {
      setList((result.data && result.data.list) || []);
    })
  }, []);

  return list.length ? (
    <div className="P-product-details-similar">
      <h2 className="P-title">{Settings.translations.similar_products}</h2>
      <div className="P-list">
        {list.map(item => <Shared.Products.ListItem key={item.id} data={item} />)}
      </div>
      {list.length > 4 && <Link
        to={ROUTES.PRODUCTS.SIMILAR.replace(':id', data.id)}
        className="G-main-ghost-button G-ml-auto G-mr-auto"
      >{Settings.translations.show_all}</Link>}
    </div>
  ) : null;
});

export default Similar;