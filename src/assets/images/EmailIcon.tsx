import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const EmailSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.666992 4.78763C0.666992 3.6496 1.58956 2.72705 2.72762 2.72705H21.2732C22.4113 2.72705 23.3338 3.6496 23.3338 4.78763V5.69715V19.2117C23.3338 20.3497 22.4113 21.2722 21.2732 21.2722H2.72761C1.58956 21.2722 0.666992 20.3497 0.666992 19.2117V5.69715V4.78763ZM2.72762 7.97246V18.1814C2.72762 18.7504 3.1889 19.2117 3.75793 19.2117H20.2429C20.8119 19.2117 21.2732 18.7504 21.2732 18.1814V7.97246L13.4805 12.2229C12.5579 12.7261 11.4429 12.7261 10.5203 12.2229L2.72762 7.97246Z"
      fill="#244CBD"
    />
  </svg>
);

export default function EmailIcon({ ...props }: Partial<CustomIconComponentProps>) {
  return <Icon component={EmailSvg} {...props} />;
}
