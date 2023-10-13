import copy from 'copy-to-clipboard';
import { displayMessageOnce } from 'utils/displayMessageOnce';

export const copyText = (text: string) => {
  copy(text);
  displayMessageOnce('Copied!', 'success');
};
