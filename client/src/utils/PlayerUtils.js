import { CLIENT_ID } from '../constants/Config';

const prepareStreamUrl = s => `${s}?client_id=${CLIENT_ID}`;

export default prepareStreamUrl;
