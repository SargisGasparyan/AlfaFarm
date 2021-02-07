import * as React from 'react';
import { IProductFilterRequestModel } from 'platform/api/product/models/request';
import Storage from 'platform/services/storage';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import CheckBox from 'rc-checkbox';
import { IProducerListResponseModel } from 'platform/api/producer/models/response';
import ProducerController from 'platform/api/producer';
import { infinityScrollMax } from 'platform/constants';
import useSubscriber from 'platform/hooks/use-subcriber';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import { buildFilters } from '../../../../services/helper';

interface IProps {
  body: IProductFilterRequestModel;
  onChange(body: IProductFilterRequestModel): void;
}

const Producers = ({ body, onChange }: IProps) => {
  const prevCategoryIdRef = React.useRef<number>();
  const prevDataRef = React.useRef<any>();
  const [open, setOpen] = React.useState(!!body.producerIds?.length);
  const [data, setData] = React.useState<IProducerListResponseModel[]>([]);

  React.useEffect(() => {
    const categoryId = body.categoryIds && body.categoryIds[0];

    if (categoryId !== prevCategoryIdRef.current || prevDataRef.current !== JSON.stringify(buildFilters())) {
      setTimeout(async () => {
        ProducerController.GetList({
          ...buildFilters(),
          pageNumber: 1,
          pageSize: infinityScrollMax,
          categoryId: body.categoryIds && body.categoryIds[0],
        }).then(result => {
          if (!result.aborted) {
            setData(result.data.list);
          }
        })
      });
    }

    prevCategoryIdRef.current = categoryId;
    prevDataRef.current = JSON.stringify(buildFilters());
  });

  useSubscriber(DispatcherChannels.ProductFilterClear, () => setOpen(false));

  const toggleItem = (id: number) => {
    const bodyCopy = {...body};

    if (bodyCopy.producerIds) {
      const query = new URLSearchParams(window.location.search);
      const existingIndex = bodyCopy.producerIds?.indexOf(id);

      if (existingIndex === -1) bodyCopy.producerIds.push(id);
      else bodyCopy.producerIds.splice(existingIndex, 1);
      
      bodyCopy.producerIds.length ? query.set('producerIds', bodyCopy.producerIds.join(',')) : query.delete('producerIds');
      window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
      // window.scrollTo(0, 0);

      onChange(body);
    }
  }

  return <>
    <h3 className="P-row-title" onClick={() => setOpen(!open)}>
      {Settings.translations.producer}
      <span className="G-orange-color">{open ? '-' : '+'}</span>
    </h3>

    {open ?
      <div className="P-row-content">
        {open && data.map(item => <label className="P-checkbox-row" onChange={() => toggleItem(item.id)} key={item.id}>
          <CheckBox checked={body.producerIds?.includes(item.id)} />
          <span className="P-name" title={item.name}>{item.name}</span>
        </label>)}
      </div>
    : null}
  </>;
};

export default Producers;