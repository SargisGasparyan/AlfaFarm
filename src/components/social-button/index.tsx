import * as React from 'react';
import SocialLogin from 'react-social-login';

import LoaderContent from '../loader-content';
 
interface IProps { [key: string]: any };

const Button = ({ children, triggerLogin, ...props }: IProps) => (
  <LoaderContent loading={!!props.loading} onClick={triggerLogin} {...props}>
    {children}
  </LoaderContent>
);
 
export default SocialLogin(Button);