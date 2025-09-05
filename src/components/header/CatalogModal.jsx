import React, { useEffect, useState } from 'react'
import { getCategory } from '../../services'
import { FaChevronRight } from "react-icons/fa6";
import CatalogSkeleton from './CatalogSkeleton';
import { Link } from 'react-router';
import axios from 'axios';

function CatalogModal({setOpenCat}) {
    const [category, setCategory] = useState([])
    const [active, setActive] = useState(0)
    const [subActive, setSubActive] = useState(0)

    // useEffect(() => {
    //     getCategory().then(info => setCategory(info.menu))
    // }, [])

    useEffect(() => {
        axios.get('https://libdata.vercel.app/getCategories')
            .then(info => setCategory(info.data.menu))
    })
    if (category.length === 0) {
        return (
            <div className="fixed inset-0 top-[16%] bg-white h-[75%] mx-auto rounded-2xl p-6 flex justify-between w-[100%] gap-4">
                {Array.from({length: 3}).map((_, i) => (
                    <div key={i} className='w-[25%] '>
                    <CatalogSkeleton  />
                    </div>
                ))}
            </div>
        )
    }
    return (
        <div onClick={e => e.stopPropagation()} className="flex items-center top-[16%] fixed inset-0 bg-white h-[75%] w-[98%] mx-auto rounded-2xl scale-100 transform transition-all ease-out duration-300">
           <div className='w-[25%] border-r border-[#dbdcdf] h-full py-6'>
                <ul className='w-full text-[14px] text-text'>
                    {category?.map((item, i) => (
                    <Link to={`/catalog/${item.code}`}
                     key={i}
                     onClick={() => setOpenCat(false)}
                     onMouseEnter={() => setActive(i)}
                     className={`py-2 px-4 flex justify-between items-center whitespace-nowrap ${active === i ? 'bg-[#f5f5f7] font-semibold ' : ''} group`}>
                        {item.name}
                        <FaChevronRight className={`text-[12px] text-[#dbdcdf] ${active === i ? 'text-red' : ''} group-hover:text-red`} />
                    </Link>
                    ))}
                </ul>
           </div>
           <div className='bg-[#f5f5f7] h-full py-6 w-[25%]'>
                <ul className='w-full text-[14px] text-text'>
                    {
                    active !== null &&
                    category[active]?.subCategories?.map((item, i) => (
                    <Link to={`/catalog/${category[active]?.code}/${item.code}`}
                     key={i}
                     onClick={() => setOpenCat(false)}
                     onMouseEnter={() => setSubActive(i)}
                     className='py-2 px-4 flex justify-between items-center whitespace-nowrap hover:bg-white  hover:text-red group'>
                            {item.name}
                            {item.subCategories.length !== 0 ? 
                            <FaChevronRight className='text-[12px] text-[#dbdcdf] group-hover:text-red' />
                            : null }
                    </Link>
                    ))}
                </ul>     
           </div>
           <div className='h-full py-6 w-[50%] overflow-y-scroll'>
                <ul className='w-full text-[14px] text-[#0f172abf] sm:columns-2 l:columns-3 xl:columns-4'>
                    {
                    active !== null && subActive !== null &&
                    category[active]?.subCategories[subActive]?.subCategories?.map((item, i) => (
                    <Link to={`/catalog/${category[active]?.code}/${category[active]?.subCategories[subActive]?.code}/${item.code}`}
                        key={i}  
                        onClick={() => setOpenCat(false)}
                        className='break-inside-avoid pb-1 px-4 flex justify-between items-center hover:underline hover:text-red'>
                            {item.name}
                    </Link>
                    ))}
                </ul>     
           </div>
        </div>
    )
}

export default CatalogModal
