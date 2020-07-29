import * as React from 'react';

import Settings from 'platform/services/settings';
import { IDropdownOption } from 'platform/constants/interfaces';
import Select from 'components/select';
import Storage from 'platform/services/storage';
import { IRequestAddModel } from 'platform/api/request';
import NumberInput from 'components/number-input';
import { RequestSendTypeEnum } from 'platform/api/request';
import HelperComponent from 'platform/classes/helper-component';

import Photo from 'assets/images/photo.png';
import Video from 'assets/images/video.png';
import Audio from 'assets/images/audio.png';
import Doc from 'assets/images/doc.png';

import './style.scss';

interface IProps {
  type: RequestSendTypeEnum;
  onChange(form: any): void;
  onDelete?: (() =>  void) | null;
  form?: IRequestAddModel | null;
  submited: boolean;
  deleteIcon?: boolean;
};

interface IState {
  categories: Array<IDropdownOption<string>>;
  mues: Array<IDropdownOption<string>>;
  form: IRequestAddModel;
};

class ProductRequestItem extends HelperComponent<IProps, IState> {

  public state: IState = {
    categories: [],
    mues: [],
    form: {
      count: 0,
      description: '',
      iNeed: '',
      doc: [],
      audio: [],
      photo: [],
      video: [],
    }
  };

  public componentDidMount() {
    const categories = Storage.categories.map(item => ({ name: item.name, value: item._id }));
    const mues = Storage.mues.map(item => ({ name: item.name, value: item._id }));

    const newState: {
      categories: Array<IDropdownOption<string>>;
      mues: Array<IDropdownOption<string>>;
      form?: IRequestAddModel,
    } = {
      categories,
      mues,
    };

    if (this.props.form) newState.form = this.props.form;
    else this.props.onChange(this.state.form);
    this.safeSetState(prev => ({
      ...prev,
      ...newState,
    }));
  };

  private changeCategory = (option: IDropdownOption<string> | null) => {
    const { form } = this.state;
    if (option) form.category = option.value;
    else delete form.category;
    this.safeSetState({ form }, this.updateParent);
  };

  private changeMU = (option: IDropdownOption<string>) => {
    const { form } = this.state;
    if (option) form.mu = option.value;
    else delete form.mu;
    this.safeSetState({ form }, this.updateParent);
  };

  private changeQuantity = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form.count = +e.currentTarget.value;
    this.safeSetState({ form }, this.updateParent);
  };

  private changeField = (e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form }, this.updateParent);
  };

  private fileAttach = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const { form } = this.state;
      const { files } = e.currentTarget;
      Array.from(files).map(item => {
        if (item.type.includes('audio')) form.audio.push(item);
        else if (item.type.includes('video')) form.video.push(item);
        else if (item.type.includes('image')) form.photo.push(item);
        else if (item.type.includes('application')) form.doc.push(item);
      })

      this.safeSetState({ form }, this.updateParent);
    }
  };

  private removeAttached = (files: File[], index: number) => {
    files.splice(index, 1);
    this.safeSetState({ form: this.state.form }, this.updateParent);
  }

  private updateParent = () => this.props.onChange(this.state.form);

  private Uploads = () => {
    const { form } = this.state;

    return <>
      {form.photo.map((item, index) => <div key={index} className="P-request-attached" title={item.name}>
        <img src={Photo} alt="photo" />
        <h4>{item.name}</h4>
        <i className="icon-close" onClick={() => this.removeAttached(form.photo, index)} />
      </div>)}
      {form.video.map((item, index) => <div key={index} className="P-request-attached" title={item.name}>
        <img src={Video} alt="video" />
        <h4>{item.name}</h4>
        <i className="icon-close" onClick={() => this.removeAttached(form.video, index)} />
      </div>)}
      {form.audio.map((item, index) => <div key={index} className="P-request-attached" title={item.name}>
        <img src={Audio} alt="audio" />
        <h4>{item.name}</h4>
        <i className="icon-close" onClick={() => this.removeAttached(form.audio, index)} />
      </div>)}
      {form.doc.map((item, index) => <div key={index} className="P-request-attached" title={item.name}>
        <img src={Doc} alt="doc" />
        <h4>{item.name}</h4>
        <i className="icon-close" onClick={() => this.removeAttached(form.doc, index)} />
      </div>)}
      <label>
        <i className="icon-attach" />
        {Settings.translations.attach_file}
        <input type="file" accept="image/*, video/*, audio/*, .pdf, .doc, .docx, .xls, .xlsx" onChange={this.fileAttach} />
      </label>
    </>;
  };

  private Form = () => {
    const { submited, onDelete } = this.props;
    const { form, categories, mues } = this.state;

    return <>
      {onDelete && <i className="icon-close P-delete-icon" onClick={onDelete} />}
      <div className="P-request-main">
        <div className="P-request-field">
          <h4>{Settings.translations.category}</h4>
          <Select<string>
            value={form.category}
            onChange={this.changeCategory}
            options={categories}
            placeholderOpacity={true}
            placeholder={Settings.translations.choose}
            clear={true}
          />
        </div>
        <div className="P-request-field">
          <h4>{Settings.translations.i_need}</h4>
          <input
            value={form.iNeed}
            name="iNeed"
            className={submited && form.iNeed.length < 2 ? 'G-invalid-field' : ''}
            placeholder={Settings.translations.write}
            onChange={this.changeField}
          />
        </div>
        <div className="P-request-field P-half">
          <h4>{Settings.translations.m_u}</h4>
          <Select<string>
            value={form.mu}
            className={submited && !form.mu ? 'G-invalid-select' : ''}
            onChange={this.changeMU}
            options={mues}
            placeholderOpacity={true}
            placeholder={Settings.translations.choose}
          />
        </div>
        <div className="P-request-field P-half">
          <h4>{Settings.translations.quantity}</h4>
          <NumberInput
            value={form.count}
            placeholder={Settings.translations.write}
            className={submited && !form.count ? 'G-invalid-field' : ''}
            onChange={this.changeQuantity}
            int={true}
          />
        </div>
      </div>
      <div className="P-request-field">
        <h4>{Settings.translations.description}</h4>
        <textarea
          name="description"
          value={form.description}
          placeholder={Settings.translations.write}
          className={submited && form.description.length < 2 ? 'G-invalid-field' : ''}
          onChange={this.changeField}
        />
      </div>
      <this.Uploads />
    </>;
  }

  private filesUploaded = () => {
    const { form } = this.state;
    return form.photo.length || form.video.length || form.audio.length || form.doc.length;
  };

  public render() {
    const { type } = this.props;

    return (
      <div className={`
        P-product-request-item
        ${type === RequestSendTypeEnum.OnlyFiles ? 'P-only-files' : ''}
        ${this.filesUploaded() ? 'P-files-uploaded' : ''}
      `}>
        {type === RequestSendTypeEnum.Form ? <this.Form /> : <this.Uploads />}
      </div>
    );
  }
};

export default ProductRequestItem;
