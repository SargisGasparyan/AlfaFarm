import * as React from 'react';

import { IProduct } from 'platform/api/product';
import { ProducInfoEnum } from '../../constants/enums';
import Settings from 'platform/services/settings';

import './style.scss';

const Info = React.memo(({ details }: { details: IProduct }) => {
  const [activeTab, setActiveTab] = React.useState(ProducInfoEnum.Description);

  const Features = () => <div className="P-info-features">
    {details.features.map(item => <div key={item._id}>
      <h3 className="P-feature-title">{item.title}</h3>
      <h3>{item.description}</h3>
    </div>)}
  </div>
  
  return <div className="P-product-info">
    <div className="P-info-tabs">
      <h2
        onClick={() => setActiveTab(ProducInfoEnum.Description)}
        className={activeTab === ProducInfoEnum.Description ? 'P-choosed' : ''}
      >{Settings.translations.description}</h2>
      {!!details.features.length && <h2
        onClick={() => setActiveTab(ProducInfoEnum.Features)}
        className={activeTab === ProducInfoEnum.Features ? 'P-choosed' : ''}
      >{Settings.translations.features}</h2>}
    </div>
    {activeTab === ProducInfoEnum.Description ? <div
      className="P-info-description"
      dangerouslySetInnerHTML={{ __html: details.description }}
    /> : <Features />}
  </div>;
});

export default Info;