import environment from 'platform/services/environment';

export const onlyForUsers = () => !environment.WHOLESALE;
export const onlyForWholesaleUsers = () => environment.WHOLESALE;
