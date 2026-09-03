import React from 'react';

import './Banner.scss';

function Banner({ text }: { text: string }) {
  return <div className='banner'>{text}</div>;
}

export default Banner;
