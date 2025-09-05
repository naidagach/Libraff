import React from 'react';
import { Pagination } from 'antd';
const itemRender = (_, type, originalElement) => {
  if (type === 'prev') {

    return (
        <button className='px-2 py-1 uppercase! text-red! border border-[#eee] rounded-md'>
            gerİ
        </button>)
  }
  if (type === 'next') {
    return (
        <button className='px-2 py-1 uppercase! text-red! border border-[#eee] rounded-md'>
            İrəlİ
        </button>)
  }
  return originalElement;
};
const PagePaginate = () => <Pagination total={500} itemRender={itemRender} />;
export default PagePaginate;