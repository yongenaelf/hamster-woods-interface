import { isMobileDevices } from 'utils/isMobile';

export const pc_resource: Array<string> = [];
export const mobile_resource: Array<string> = [];

export default isMobileDevices() ? mobile_resource : pc_resource;
