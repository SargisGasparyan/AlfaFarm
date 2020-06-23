import * as React from 'react';

import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import BusinessImage from 'assets/images/business.jpg';
import { Link } from 'react-router-dom';

import { IBecomePartner } from 'platform/constants/interfaces';
import { byRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import LoaderContent from 'components/loader-content';
import { isValidEmail, isValidPhoneOnly } from 'platform/services/validator';
import AddressController from 'platform/api/partner';

import './style.scss';

interface IState {
  form: IBecomePartner;
  submitted: boolean;
  submitLoading: boolean;
}


@byRoute(ROUTES.BUSINESS)

class Business extends HelperPureComponent<{}, {}> {
  
public state : IState ={

  submitted:false,

  submitLoading:false,

  form: {
    vatid        : '1',
    name         : '',
    email        : '',
    message      : '',
    phoneNumber  : '',
    contactperson: '',
  },
}

private change = (e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   const { form } = this.state;
   form[e.currentTarget.name]= e.currentTarget.value;
   this.safeSetState({ form });
   this.safeSetState({submitted: false})
}


private send = (e: React.SyntheticEvent) => {
  e.preventDefault();
  const { submitted } = this.state;
  if (submitted) {    
    this.safeSetState({ submitted : false });
  } else {
    this.safeSetState({ submitted : true });
    this.checkForSend();
  };
}

private checkPhone = (phoneNumber: string) => {
  const { form } = this.state;
  if (form.phoneNumber[0] === '0') {
    return form.phoneNumber = '374' + form.phoneNumber.slice(1);
  } else if (form.phoneNumber[0] === '+') {
    return form.phoneNumber = form.phoneNumber.slice(1);
  } return true;
}

private checkForSend = async () => {
  const { form } = this.state;
  const alertifys = await import('alertifyjs');   
  if(!this.checkPhone(form.phoneNumber) || form.phoneNumber.length < 11 || form.phoneNumber.length > 15 || form.name.length < 1 || form.contactperson.length < 1 
  || form.message.length < 1 || !isValidEmail(form.email)) {
    return false;
  } else  {
    const result =  await AddressController.SendRequest(form);
    if(result && result.success){
      window.routerHistory.push('/home');
      return alertifys.success(Settings.translations.success_partner, 5);
    } else {
     this.safeSetState({submitLoading: false}); 
    }
  }
}

 

  public render() {
    
    const { submitted, submitLoading, form } = this.state;

    return (
      <section className="G-page P-business-page">
        <div className="business-page-structure">
        <div className="P-content left-bar">
            <div
              className="P-image"
              style={{ background: `url("${BusinessImage}") center/cover`}}
              >{Settings.translations.business}</div>
              <div className="P-texts">
              {Settings.translations.business_text}
            </div>
          </div>
          <div className="P-content right-bar">
            <h1 className="G-page-title">{Settings.translations.become_partner}</h1>
            <span className="right-bar-text">
              {Settings.translations.businnes_description}
            </span>
            <div className="become-partner-form">
              <form className="G-fields-form P-contact-form">

                <div className="G-field-wrap">
                <h4>{Settings.translations.company_name}</h4>
                <div className={`G-field ${submitted && !form.name ? 'G-invalid-field' : ''}`}>
                  <input
                    type="text"
                    name="name" 
                    onChange={this.change}
                  />
                  </div>
                </div>
                <div className="G-field-wrap">
                <h4>{Settings.translations.contact_person}</h4>
                <div className={`G-field ${submitted && !form.contactperson ? 'G-invalid-field' : ''}`}>
                  <input
                    type="text"
                    name="contactperson" 
                    onChange={this.change}
                  />
                  </div>
                </div>
                <div className="G-field-wrap">
                <h4>{Settings.translations.phone_number}</h4>
                <div className={`G-field ${submitted && !isValidPhoneOnly(form.phoneNumber) ? 'G-invalid-field' : ''}`}>
                  <input
                    type="text"
                    name="phoneNumber" 
                    onChange={this.change}
                  />
                  </div>
                </div>
                <div className="G-field-wrap">
                <h4>{Settings.translations.email}</h4>
                <div className={`G-field ${submitted && !isValidEmail(form.email) ? 'G-invalid-field' : ''}`}>
                  <input
                    type="email"
                    name="email" 
                    onChange={this.change}
                  />
                  </div>
                </div>
                <div className="G-field-wrap">
                  <h4>{Settings.translations.message}</h4>
                  <div className={`G-field G-field-textarea ${submitted && !form.message ? 'G-invalid-field' : ''}`}>
                    <textarea
                      name="message"
                      onChange={this.change}
                    />
                  </div>
                </div>
                <span className="read-privacy-policy">
                  <Link to={ROUTES.CONFIDENTIALITY_CONDITIONS}>{Settings.translations.privacy_policy}</Link>
                </span>
                <LoaderContent
                  loading={submitLoading}
                  className="G-form-button"
                  onClick={this.send}
                >
                  {Settings.translations.send_request}
                </LoaderContent>

              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Business;