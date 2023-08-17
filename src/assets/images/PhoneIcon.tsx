import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const PhoneSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.73342 0.666504C4.62884 0.666504 3.7334 1.56193 3.7334 2.6665V21.3332C3.7334 22.4377 4.62884 23.3332 5.73342 23.3332H18.2669C19.3714 23.3332 20.2669 22.4377 20.2669 21.3332V2.6665C20.2669 1.56193 19.3714 0.666504 18.2669 0.666504H5.73342ZM5.73145 4.00472C5.73145 3.26834 6.3284 2.67139 7.06479 2.67139H16.9315C17.6679 2.67139 18.2649 3.26834 18.2649 4.00472V16.6668C18.2649 17.4032 17.6679 18.0002 16.9315 18.0002H7.06479C6.3284 18.0002 5.73145 17.4032 5.73145 16.6668V4.00472ZM10.332 20.3193C10.332 19.8407 10.7201 19.4526 11.1987 19.4526H12.7987C13.2774 19.4526 13.6654 19.8407 13.6654 20.3193C13.6654 20.798 13.2774 21.186 12.7987 21.186H11.1987C10.7201 21.186 10.332 20.798 10.332 20.3193Z"
      fill="#244CBD"
    />
  </svg>
);

export default function PhoneIcon({ ...props }: Partial<CustomIconComponentProps>) {
  return <Icon component={PhoneSvg} {...props} />;
}
