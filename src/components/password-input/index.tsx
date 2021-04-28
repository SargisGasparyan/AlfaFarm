import * as React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import './style.scss';
import EyePassword from 'assets/images/icons/eye-password.svg';
import EyeText from 'assets/images/icons/eye-text.svg';
import HelperPureComponent from 'platform/classes/helper-pure-component';

interface IState {
    type?: string;
};

interface IProps extends RouteComponentProps<any> {
    value?: any;
    name?: any;
    placeholder?: string;
    className?: string;
    onChange?(e: React.SyntheticEvent<HTMLInputElement>): void;
};

class PasswordInput extends HelperPureComponent<IProps, IState> {

    public state: IState = {
        type: 'password',
    };

    private changeType = () => {
        const {type} = this.state;

        if (type === 'password') {
            this.safeSetState({type: 'text'});
        } else {
            this.safeSetState({type: 'password'});
        }
    }

    private change = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const { onChange } = this.props;
        onChange && onChange(e);
    }

    public render() {
        const {value, name, placeholder, className} = this.props;
        const {type} = this.state;

        return (
            <div>
                <input
                    type={type}
                    name={name}
                    className={className}
                    value={value}
                    placeholder={placeholder}
                    onChange={this.change}
                />

                <button type="button" className="P-change-type" onClick={this.changeType}>
                    {type === 'password' && <img src={EyePassword}/>}
                    {type !== 'password' && <img src={EyeText}/>}
                </button>
            </div>
        );
    }
}

export default withRouter(PasswordInput);
