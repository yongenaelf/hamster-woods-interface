import { BaseSignalr } from '@portkey/socket';

export const POINT_LIST_CHANGE = 'pointsListChange';
const listenList = [POINT_LIST_CHANGE];

const signalr = new BaseSignalr({ listenList: listenList });
export default signalr;
