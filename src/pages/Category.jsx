import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getBooksByCategoryCode, getCategory } from '../services'
import { HiBars3BottomLeft } from "react-icons/hi2";
import { FaChevronDown, FaChevronUp, FaMinus, FaPlus, FaXmark } from 'react-icons/fa6';
import Item from '../components/main/Item';

function Category() {
    const [category, setCategory] = useState({})
    const [catalog, setCatalog] = useState([])
    const [openOpt, setOpenOpt] = useState(false)
    const [openNum, setOpenNum] = useState(false)
    const [selectedOpt, setSelectedOpt] = useState("Əvvəlcə ucuz")
    const [selectedNum, setSelectedNum] = useState(16)
    const {firstcat, secondcat, thirdcat} = useParams()
    const code = thirdcat || secondcat || firstcat

    const options = [
        "Əvvəlcə ucuz",
        "Əvvəlcə yenilər",
        "A-dan Z-ə",
        "Z-dən A-ya",
        "Əvvəlcə baha",
        "Əvvəlcə populyar olanlar",
    ]
    const numbers = [16, 32, 64, 128]
    

    useEffect(() => {
        getBooksByCategoryCode(code, 1, 16).then( info => setCategory(info))
    }, [code])

    useEffect(() => {
        getCategory().then(info => setCatalog(info.menu))
    }, [])

    return (
        <div className='max-w-[1240px] mx-auto px-4'>
            <div className='pt-2'>
                <h3 className='text-[30px] font-black text-text'>{category.thirdCategory?.categoryName || category.secondCategory?.categoryName || category.firstCategory?.categoryName}</h3>
            </div>
            <div className='scrollx py-[5px] text-[#767676] text-[14px] flex overflow-x-scroll gap-2'>
				<a className='whitespace-nowrap cursor-pointer hover:text-red' href='/'>Əsas səhifə </a>
				{category.firstCategory?.categoryName && (
                    <span className='whitespace-nowrap cursor-pointer hover:text-red'>/ {category?.firstCategory?.categoryName}</span>
                )}
                {category.secondCategory?.categoryName && (
                    <span className='whitespace-nowrap cursor-pointer hover:text-red'>/ {category?.secondCategory?.categoryName}</span>
                )}
                {category.thirdCategory?.categoryName && (
                    <span className='whitespace-nowrap cursor-pointer hover:text-red'>/ {category?.thirdCategory?.categoryName}</span>
                )}
			</div>
            
            <div className='py-4 flex items-start gap-6'>
                <div>
                    <div className='hidden s:block p-[15px] rounded-xl border border-[#eee] m:min-w-[280px] min-w-[220px] '>
                        <p className='text-text font-black p-2'>Kateqoriyalar</p>
                        {catalog.map((item, i) => (
                            <div>
                                {item.name === category?.firstCategory?.categoryName && (
                                    <div 
                                    key={i}
                                    className='text-[14px] cursor-pointer hover:text-red hover:bg-[#eee]'>
                                        <p className='px-2 py-1 rounded-md'>
                                            {item.name}
                                        </p>
                                    </div>
                                )}
                                {item.subCategories.map((sub, i) => (
                                    sub.name === category?.secondCategory?.categoryName && (
                                        <div className='text-[#767676]'>
                                            <div
                                            key={i}
                                            className={`
                                            ${!category?.thirdCategory && sub.name === category?.secondCategory?.categoryName 
                                            ? 'border-l-2 border-red' 
                                            : ''} 
                                            text-[14px] cursor-pointer hover:text-red hover:bg-[#eee]`}>
                                                <p className='px-2 py-1 rounded-md'>
                                                {sub.name}
                                                </p>
                                            </div>
                                            {sub.subCategories.map((third, i) => (
                                                <div 
                                                key={i}
                                                className={`
                                                ${third.name === category?.thirdCategory?.categoryName ? 'border-l-2 border-red' : ''} 
                                                text-[14px] cursor-pointer hover:text-red hover:bg-[#eee]`}>
                                                    <p className='px-2 py-1 rounded-md'>
                                                    {third.name}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </div>
                            ))}
                    </div>
                    <div className='hidden s:block p-[15px] rounded-xl border border-[#eee] m:min-w-[280px] min-w-[220px] '>
                        <p className='text-text font-black p-2 border-b border-[#ccc]'>Filterlər</p>
                        <div>
                            <div className='flex items-center justify-between'>
                                <p className='text-text font-black p-2'>Dil</p>
                                <FaMinus className='text-[#767676] text-[20px] ' />
                            </div>
                            <input className='border border-[#ccc] rounded-md w-full px-2 py-1 text-[14px]' type="text" placeholder='Search' />
                            <div className='flex flex-col border-b border-[#eee] py-2'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-text font-black p-2'>Stok</p>
                                    <FaPlus className='text-[#767676] text-[20px] ' />
                                </div>
                                <div className='flex items-center gap-1 px-2'>
                                    <input className='peer appearance-none border border-[#ccc] checked:bg-red-500 checked:border-red-500 cursor-pointer rounded-md w-6 h-6' type="checkbox"  />
                                    <span className="pointer-events-none absolute w-4 pl-2 h-4 flex items-center justify-center text-white text-sm peer-checked:content-['✔']">✔</span>
                                    <p>Mövcuddur </p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-text font-black p-2'>Qiymət</p>
                                <FaPlus className='text-[#767676] text-[20px] ' />
                            </div>
                        </div>
                    </div>  
                </div>
                <div className='w-[70%]'>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2'>
                            <HiBars3BottomLeft className='2xs:hidden text-[20px] text-[#767676]' />
                            <p className='text-[#767676] text-[14px] hidden 2xs:block'>Çeşidlə: </p>
                            <div className='flex items-center gap-1 relative '>
                                <p onClick={() => setOpenOpt(!openOpt)} className='text-red text-[14px] cursor-pointer'>
                                    {selectedOpt}
                                </p>
                                {openOpt ? (
                                    <FaChevronUp className='text-[10px] text-red' />
                                ) : (<FaChevronDown className='text-[10px] text-red' />)}
                                {openOpt && (
                                    <div className='absolute z-[999] top-[25px] w-[200px] rounded-2xl  shadow-custom bg-white'>
                                        <div className='flex justify-between items-center font-black p-2 border-b border-[#eee]'>
                                            <p>Çeşidlə</p>
                                            <FaXmark onClick={() => setOpenOpt(false)} className='text-[25px] text-[#767676] cursor-pointer' />
                                        </div>
                                        <ul className='text-text text-[14px] py-1'>
                                            {options
                                            .filter(el => el !== selectedOpt)
                                            .map((elem, i) => (
                                                <li key={i}
                                                onClick={() => {setSelectedOpt(elem), setOpenOpt(false)}}
                                                className='rounded-2xl hover:bg-[#eee] px-2 py-1 cursor-pointer'>
                                                    {elem}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-[#767676] text-[14px] hidden 2xs:block'>Göstər: </p>
                            <div className='flex items-center gap-1 relative '>
                                <p onClick={() => setOpenNum(!openNum)} className='text-red text-[14px] cursor-pointer'>
                                    {selectedNum}
                                </p>
                                {openNum ? (
                                    <FaChevronUp className='text-[10px] text-red' />
                                ) : (<FaChevronDown className='text-[10px] text-red' />)}
                                {openNum && (
                                    <div className='absolute z-[999] top-[25px] right-2 w-[200px] rounded-2xl  shadow-custom bg-white'>
                                        <div className='flex justify-between items-center font-black p-2 border-b border-[#eee]'>
                                            <p>Məhsul sayı</p>
                                            <FaXmark onClick={() => setOpenNum(false)} className='text-[25px] text-[#767676] cursor-pointer' />
                                        </div>
                                        <ul className='text-text text-[14px] py-1'>
                                            {numbers
                                            .filter(el => el !== selectedNum)
                                            .map((elem, i) => (
                                                <li key={i}
                                                onClick={() => {setSelectedNum(elem), setOpenNum(false)}}
                                                className='rounded-2xl hover:bg-[#eee] px-2 py-1 cursor-pointer'>
                                                    {elem} məhsul
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='py-4'>
                        <Item type='category' code={code} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category
