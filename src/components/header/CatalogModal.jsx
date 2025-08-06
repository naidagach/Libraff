import React, { useEffect, useState } from 'react'
import { getCategory } from '../../services'
import { FaChevronRight } from "react-icons/fa6";
import CatalogSkeleton from './CatalogSkeleton';

function CatalogModal() {
    const [category, setCategory] = useState([])
    const [active, setActive] = useState(0)
    const [subActive, setSubActive] = useState(0)

    useEffect(() => {
        getCategory().then(info => setCategory(info.menu))
    }, [])

    if (category.length === 0) {
        return (
            <div className="fixed inset-0 top-[16%] bg-white h-[75%] mx-auto rounded-2xl p-6 flex justify-between w-[100%] gap-4">
                <div className='w-[25%] '>
                <CatalogSkeleton  />
                </div>
                <div className='w-[25%] '>
                <CatalogSkeleton  />
                </div>
                <div className='w-[50%] '>
                <CatalogSkeleton  />
                </div>
            </div>
        )
    }
    return (
        <div onClick={e => e.stopPropagation()} className="flex items-center top-[16%] fixed inset-0 bg-white h-[75%] w-[98%] mx-auto rounded-2xl scale-100 transform transition-all ease-out duration-300">
           <div className='w-[25%] border-r border-[#dbdcdf] h-full py-6'>
                <ul className='w-full text-[14px] text-text'>
                    {category?.map((item, i) => (
                    <li
                     key={i}
                     onMouseEnter={() => setActive(i)}
                     className={`py-2 px-4 flex justify-between items-center whitespace-nowrap ${active === i ? 'bg-[#f5f5f7] font-semibold ' : ''} group`}>
                     {item.name}
                        <FaChevronRight className={`text-[12px] text-[#dbdcdf] ${active === i ? 'text-red' : ''} group-hover:text-red`} />
                    </li>
                    ))}
                </ul>
           </div>
           <div className='bg-[#f5f5f7] h-full py-6 w-[25%]'>
                <ul className='w-full text-[14px] text-text'>
                    {
                    active !== null &&
                    category[active]?.subCategories?.map((item, i) => (
                    <li
                     key={i}
                     onMouseEnter={() => setSubActive(i)}
                    className='py-2 px-4 flex justify-between items-center whitespace-nowrap hover:bg-white  hover:text-red group'>
                        {item.name}
                        {item.subCategories.length !== 0 ? 
                        <FaChevronRight className='text-[12px] text-[#dbdcdf] group-hover:text-red' />
                         : null }
                    </li>
                    ))}
                </ul>     
           </div>
           <div className='h-full py-6 w-[50%] overflow-y-scroll'>
                <ul className='w-full text-[14px] text-[#0f172abf] sm:columns-2 l:columns-3 xl:columns-4'>
                    {
                    active !== null && subActive !== null &&
                    category[active]?.subCategories[subActive]?.subCategories?.map((item, i) => (
                    <li
                     key={i}    
                     className='break-inside-avoid pb-1 px-4 flex justify-between items-center hover:underline hover:text-red'>
                        {item.name}
                    </li>
                    ))}
                </ul>     
           </div>
        </div>
    )
}

export default CatalogModal
