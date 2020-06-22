import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import Maps from 'components/maps';
import LoaderContent from 'components/loader-content';
import { geolocation } from 'platform/constants';
import { isValidEmail, isValidPhoneOnly } from 'platform/services/validator';
import SupportController, { ISupportRequestModel } from 'platform/api/support';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

const markers = [{ position: geolocation }];

interface IState {
  form: ISupportRequestModel;
  submited: boolean;
  submitLoading: boolean;
};

@byRoute(ROUTES.CONTACT)
class ContactUs extends HelperComponent<{}, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    form: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  };

  private change = (e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form });
    this.safeSetState({submitted: false});
  }

  private send = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { submited } = this.state;
    if (submited) {    
      this.safeSetState({ submited : false });
    } else {
      this.safeSetState({ submited : true });
      this.checkForSend();
    };
  }
  private checkPhone = (phone: string) => {
    const { form } = this.state;   
    if (form.phone[0] === '0') {
      return form.phone = '374' + form.phone.slice(1);
    } else if (form.phone[0] === '+') {
      return form.phone = form.phone.slice(1);
    } else {
       return true;
    }
   }

  private checkForSend = async () => {
    const { form } = this.state;
    if(!this.checkPhone(form.phone) || form.phone.length < 11 || form.phone.length > 15 || form.name.length < 1 ||  form.message.length < 1 || !isValidEmail(form.email)) {
      return false;
    };
      const result = await SupportController.Send(form);
      if (result.success) {
        window.routerHistory.push('/home');
        const alertifys = await import('alertifyjs');      
       return alertifys.success(Settings.translations. message_sent, 5);
      } return this.safeSetState({submitLoading: false}); 
  }

  public render() {
    const { submited, submitLoading, form } = this.state;

    return (
      <section className="P-G-page P-contact-page">
        <h1 className="P-G-page-title">{Settings.translations.contact_us}</h1>
        <div className="P-contact-texts">
          {Settings.translations.contact_text}
        </div>
        <form className="P-G-fields-form P-contact-form">
          <div className="P-G-field-wrap">
            <h4>{Settings.translations.full_name}</h4>
            <div className={`P-G-field ${submited && !form.name ? 'P-G-invalid-field' : ''}`}>
              <input
                type="text"
                name="name"
                onChange={this.change}
              />
            </div>
          </div>
          <div className="P-G-field-wrap">
            <h4>{Settings.translations.email}</h4>
            <div className={`P-G-field ${submited && !isValidEmail(form.email) ? 'P-G-invalid-field' : ''}`}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={this.change}
              />
            </div>
          </div>
          <div className="P-G-field-wrap">
            <h4>{Settings.translations.phone_number}</h4>
            <div className={`P-G-field ${submited && !isValidPhoneOnly(form.phone) ? 'P-G-invalid-field' : ''}`}>
              <input
                type="text"
                name="phone"
                onChange={this.change}
              />
            </div>
          </div>
          <div className="P-G-field-wrap">
            <h4>{Settings.translations.message}</h4>
            <div className={`P-G-field P-G-field-textarea ${submited && !form.message ? 'P-G-invalid-field' : ''}`}>
              <textarea
                name="message"
                value={form.message}
                onChange={this.change}
              />
            </div>
          </div>
          <LoaderContent
            loading={submitLoading}
            className="P-G-form-button"
            onClick={this.send}
          >
            {Settings.translations.send}
          </LoaderContent>
        </form>
        <div className="P-contact-maps">
          <Maps markers={markers} />
        </div>
      </section>
    );
  }
};

export default ContactUs;