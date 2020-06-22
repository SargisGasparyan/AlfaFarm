import { IRequestAddModel, RequestPackStatusEnum } from 'platform/api/request';
import { RequestSendTypeEnum } from 'platform/api/request';

export const productRequestToFormData = (data: IRequestAddModel, type: RequestSendTypeEnum) => {
  const form = new FormData();
  form.append('type', type.toString());
  if (data.photo.length) data.photo.map(item => form.append('photo', item));
  if (data.video.length) data.video.map(item => form.append('video', item));
  if (data.audio.length) data.audio.map(item => form.append('audio', item));
  if (data.doc.length) data.doc.map(item => form.append('doc', item));

  if (type === RequestSendTypeEnum.Form) {
    if (data.category) form.append('category', data.category);
    if (data.mu) form.append('mu', data.mu);
    form.append('count', data.count.toString());
    form.append('iNeed', data.iNeed);
    form.append('description', data.description);  
  }
  
  return form;
}

export const productRequestFormValid = (data: IRequestAddModel | null, type: RequestSendTypeEnum) => {
  if (!data) return false;
  if (type === RequestSendTypeEnum.Form) return data.iNeed.length > 1 && data.mu && data.count && data.description.length >= 2;
  else return data.photo.length || data.video.length || data.audio.length || data.doc.length;
}

export const requestStatusClass = (status: RequestPackStatusEnum) => {
  switch (status) {
    case RequestPackStatusEnum.Canceled: return 'P-G-pink';
    case RequestPackStatusEnum.Finished: return 'P-G-main-color';
    default: return '';
  }
}