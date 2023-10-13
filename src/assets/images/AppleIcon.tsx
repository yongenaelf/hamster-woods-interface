import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const AppleSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
    <path
      d="M18.1023 12.1758C18.0912 10.2873 18.9469 8.86393 20.6748 7.81444C19.7084 6.42987 18.2463 5.66836 16.319 5.5216C14.4941 5.37761 12.4976 6.58494 11.7665 6.58494C10.9939 6.58494 9.22724 5.57145 7.83714 5.57145C4.96833 5.61575 1.91953 7.85874 1.91953 12.4223C1.91953 13.7708 2.16598 15.1637 2.65888 16.5981C3.31793 18.4866 5.69384 23.1138 8.17221 23.0391C9.46816 23.0086 10.3847 22.1197 12.0711 22.1197C13.7077 22.1197 14.555 23.0391 16.0005 23.0391C18.501 23.0031 20.6499 18.7968 21.2757 16.9027C17.9223 15.3215 18.1023 12.2727 18.1023 12.1758Z"
      fill="white"
    />
    <path
      d="M15.1918 3.73001C16.5957 2.063 16.4683 0.545517 16.4268 0C15.1862 0.0719972 13.7518 0.844583 12.9349 1.79439C12.035 2.81343 11.5061 4.07338 11.6196 5.49394C12.9599 5.5964 14.1838 4.90689 15.1918 3.73001Z"
      fill="white"
    />
  </svg>
);

export default function AppleIcon({ ...props }: Partial<CustomIconComponentProps>) {
  return <Icon component={AppleSvg} {...props} />;
}
