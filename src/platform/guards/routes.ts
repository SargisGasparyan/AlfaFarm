import enviroment from 'platform/services/enviroment';

export const onlyForUsers = () => !enviroment.WHOLESALE;
export const onlyForWholesaleUsers = () => enviroment.WHOLESALE;