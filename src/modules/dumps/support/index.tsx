import * as React from 'react';
import Collapsible from 'react-collapsible';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import Chat from './components/chat';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IState { collapsed: number[]; }

@byRoute(ROUTES.FAQ)
class FAQ extends HelperComponent<{}, IState> {

  public state: IState = { collapsed: [] };

  private toggleAccordionItem = (index: number) => {
    const { collapsed } = this.state;
    const collapsedIndex = collapsed.indexOf(index);

    if (collapsedIndex !== -1) collapsed.splice(collapsedIndex, 1);
    else collapsed.push(index);

    this.safeSetState({ collapsed });
  }

  public render() {
    const { collapsed } = this.state;

    return (
      <section className="G-page P-faq-page">
        <h1 className="G-page-title">{Settings.translations.faq}</h1>
        <div className="P-content">
          <Chat />
          <div className="P-help-info">
            {Settings.translations.faq_texts.map((item, index) => <Collapsible
              key={index}
              open={collapsed.indexOf(index) !== -1}
              easing="ease"
              accordionPosition={index}
              handleTriggerClick={this.toggleAccordionItem}
              trigger={<>{item.title} <span className="P-accordion-icon">{collapsed.indexOf(index) !== -1 ? <>&minus;</> : <>&#43;</>}</span></>}
              transitionTime={400}
            >
              {item.description}
            </Collapsible>)}
          </div>
        </div>
      </section>
    );
  }
};

export default FAQ;