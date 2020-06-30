import * as React from 'react';

import ProductController, { IProduct, IProductListItem } from 'platform/api/product';
import Settings from 'platform/services/settings';
import { paginationPageLimit } from 'platform/constants';
import { Shared } from 'modules';

import './style.scss';

const Similar = React.memo(({ details, opacity }: { details: IProduct, opacity: boolean }) => {
  let mounted = true;
  const [list, setList] = React.useState<IProductListItem[]>([]);

  React.useEffect(() => {
    ProductController.Similar(details._id, paginationPageLimit)
      .then(result => mounted && setList(result.data));

    return () => { mounted = false; }
  }, [false]);

  return list.length ? (
    <div className="P-product-similar">
      <h2>{Settings.translations.similar}</h2>
      <div className="P-list">
        {list.map(item => <Shared.Products.ListItem key={item._id} data={item} />)}
      </div>
    </div>
  ) : null;
});

export default Similar;