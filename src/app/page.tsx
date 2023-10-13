'use client';

import dynamic from 'next/dynamic';
export default dynamic(() => import('pageComponents/Recreation/index'), { ssr: false });
