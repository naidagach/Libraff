import React, { useState } from 'react'
import { TbLayoutGrid } from "react-icons/tb";
import { FaChevronDown, FaChevronUp, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { FaRegHeart, FaRegUserCircle} from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { GoTriangleRight, GoTriangleUp } from "react-icons/go";
import CatalogModal from './CatalogModal';
import logo from '../../assets/logo-libraff.png';
import { Link } from 'react-router';
import { useWishList } from '../../context/wishListContext';
import { useBasket } from '../../context/BasketContext';


function Header() {
    const [openLang, setOpenLang] = useState(false)
    const [openCat, setOpenCat] = useState(false)
    const [openHes, setOpenHes] = useState(false)
    const [openShop, setOpenShop ] = useState(false)
    const {wishList} = useWishList()
    const {basket, removeFromBasket} = useBasket()

    return (
        <div className="hidden s:block">
            <div className='px-4 flex justify-between items-center max-w-[1240px] mx-auto'>
                <div className='py-10'>
                    <a href="/">
                        <img className='w-[175px]' src={logo} alt="LibraffLogo" />
                    </a>
                </div>
                <div className='flex gap-4 justify-between'>
                    <div className='flex gap-4 '>
                        <div onClick={() => setOpenCat(!openCat)} className='bg-red hover:bg-[#ef1522] cursor-pointer px-[15px] py-[10px] rounded-[22px] flex gap-2 l:px-6 z-[999]'>
                            {!openCat ? 
                            <TbLayoutGrid className='w-[24px] h-[24px] text-white' /> : <FaXmark className="w-[24px] h-[24px] text-white" /> }
                            
                            <p  className='hidden l:block text-white'>Kataloq</p>
                        </div>
                        {openCat &&
                            <div onClick={() => setOpenCat(false)} className='bg-[#00000094] fixed inset-0 z-[99] scale-100 transform transition-all ease-out duration-300'>
                                <GoTriangleUp className='text-white z-[999] absolute top-[75px] left-[250px] text-[40px]' />
                                <CatalogModal setOpenCat={setOpenCat}/>
                            </div>
                        }
                        <div className='hidden min-w-[540px] hover:shadow-custom hover:border-1 duration-200 m:flex justify-between items-center border-2 border-[#cbd5e1] bg-[#f8fafc] rounded-3xl px-3'>
                            <input className='text-[14px] placeholder:text-text placeholder:font-[100]' type="search" placeholder='Növbəti kitabınızı axtarın' />
                            <FaMagnifyingGlass />
                        </div>
                    </div>
                    <div className='flex items-center gap-4 relative'>
                        <FaMagnifyingGlass className='m:hidden mx-4 text-[20px]' />
                        <div onClick={() => setOpenLang(!openLang)} className='flex items-center gap-2 mr-2 cursor-pointer duration-300'>
                            <p className='text-[#334155]'>AZ</p>
                            { !openLang ? <FaChevronDown className='text-[12px]' /> : <FaChevronUp className='text-[12px]' /> } 
                        </div>
                        {
                        openLang &&
                        <div className='bg-white absolute top-[100%] left-[-5px] rounded-2xl px-1.5 py-2 shadow-custom text-red'>
                            <ul className='text-[14px]'>
                                <li className='px-2 py-[2px] hover:bg-[#f5f5f7] hover:text-text rounded-xl duration-200 cursor-pointer'>RU</li>
                                <li className='px-2 py-[2px] hover:bg-[#f5f5f7] hover:text-text rounded-xl duration-200 cursor-pointer'>AZ</li>
                            </ul>
                        </div>
                         }

                        <div 
                            onClick={() => setOpenHes(!openHes)}
                            className='relative l:bg-[#f4f6fb] l:flex items-center gap-2 l:py-[10px] l:px-3 rounded-3xl cursor-pointer'>
                            <FaRegUserCircle className={`${openHes === true ? 'text-red' : ''} text-[25px] max-l:mr-4`} />
                            <p className='hidden l:block'>Hesabım</p>
                            {openHes === true ? <FaChevronUp className='text-[12px]' /> : <FaChevronDown className='hidden l:block text-[12px]'/>   }
                            
                        </div>
                        <div
                        className={`bg-white absolute z-[999] top-[100%] right-[100px] w-[350px] pt-[10px] rounded-2xl shadow-custom overflow-hidden
                          origin-top-right transition-all duration-300 ease-in-out
                          ${openHes ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}`}>
                                <GoTriangleUp className='fixed text-white text-[40px] top-15 right-43 ' />
                                <p className='text-[14px] text-text mx-[10px] py-[7px] px-[10px] hover:bg-gray-100 rounded-4xl'>Sifarişlər</p>
                                <p className='text-[14px] text-text mx-[10px] py-[7px] px-[10px] hover:bg-gray-100 rounded-4xl'>Qaytarma sorğuları</p>
                                <p className='text-[14px] text-text mx-[10px] py-[7px] px-[10px] hover:bg-gray-100 rounded-4xl'>Seçilmişlər</p>
                                <div className='bg-gray-100 h-full w-full py-[10px] '>
                                    <p className='text-[14px] text-[#767676] mx-[10px] py-[7px] px-[10px]'>Sifarişi izləmək</p>
                                    <div className='flex mx-4 border border-[#bbb] rounded-[10px] overflow-hidden '>
                                        <input type="text" placeholder='Sifariş nömrəsi/E-poçt' className='bg-white p-2 w-full text-[14px] ' />
                                        <div className='bg-[#eee] border-l border-[#bbb] '>
                                            <GoTriangleRight className='text-[30px] my-1 text-[#808080] ' />
                                        </div>
                                    </div>
                                    <div className='flex justify-between m-4 '>
                                        <button className='h-[40px] px-[15px] rounded-3xl text-white bg-black '>Daxil ol</button>
                                        <button className='h-[40px] px-[15px] rounded-3xl text-white bg-red '>Qeydiyyat</button>
                                    </div>
                                </div>
                            </div>
                        <Link to='/wish-list'>
                        <div className='cursor-pointer group relative'>
                            <FaRegHeart className='text-[27px]' />
                            <div className='group-hover:block hidden'> 
                                <div>
                                    <img className='w-[20px] absolute top-[100%] right-[75px] ' src=" " alt="" />
                                </div>
                                <div className='bg-[#000000c9] text-white text-[14px] absolute right-[60px] p-2 m-2 top-[100%] w-[200px] rounded-md'>
                                    <p>Seçilmiş məhsulların siyahısına baxın</p>
                                </div>
                            </div>
                            {wishList.length !== 0 ?
                           ( <div className='absolute top-[-5px] right-[-8px] rounded-full bg-red text-white px-1.5 text-[12px]'>
                                <p>{wishList.length}</p>
                            </div>) : ''
                            }
                        </div>
                        </Link>
                        <div className='relative'>
                            {basket.length !== 0 ?
                            ( <div className='absolute top-[-5px] right-[-8px] rounded-full bg-red text-white px-1.5 text-[12px]'>
                                    <p>{basket.length}</p>
                                </div>) : ''
                            }
                            <RiShoppingBag4Line onClick={() => setOpenShop(!openShop)} className='text-[27px] cursor-pointer' />
                            <div className={`bg-white absolute z-[999] top-[100%] right-0 w-[350px] rounded-2xl shadow-custom overflow-hidden origin-top-right transition-all duration-300 ease-in-out
                                    ${openShop ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}`}>
                                        <div>
                                            <div className="flex justify-between items-center text-lg font-semibold border-b py-2 px-4 ">
                                                <p className='text-[14px] text-text font-bold '>Səbətdəki məhsullar:</p>
                                                <div className="cursor-pointer text-gray-500 hover:text-black">
                                                    <FaXmark onClick={() => setOpenShop(!openShop)} className='text-[28px] ' />
                                                </div>
                                            </div>
                                            {basket.length === 0 ? (
                                                <div className="text-center text-gray-500 py-6 min-h-[110px] text-[14px] flex items-center justify-center "> Səbət boşdur </div>
                                                
                                            ) : (
                                                <div className='py-[10px] px-[20px]'>
                                                    {basket.map(item => (
                                                        <div key={item.id} className='relative group flex items-center gap-4 py-2 border-b border-[#eee]'>
                                                            <div onClick={() => removeFromBasket(item.id)} className='absolute right-0 bottom-[50%] group-hover:block hidden'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#434343"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                                                            </div>
                                                            <img className='w-[40px]! h-[40px] ' src={item.imageSource} alt={item.title} />
                                                            <div className='text-[14px] flex flex-col justify-start'>
                                                                <p className='text-red '>{item.title}</p>
                                                                <p className='py-2'>{item.count} x {item.price} ₼</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className='bg-gray-100  text-center text-[#403f3f] font-extralight'>
                                                <div className='text-[14px] flex justify-between items-center pt-4 px-4 '>
                                                    <p>Cəmi:</p>
                                                    <p>{basket.reduce((sum, item) => sum + item.count, 0)} əd. qiymət
                                                        <span className='font-black text-black pl-1'> {basket.reduce((sum, item) =>  sum + item.count * item.price, 0).toFixed(2)} ₼</span>  
                                                    </p>
                                                </div>
                                                <Link to={'/basket'} onClick={() => setOpenShop(!openShop)}>
                                                    <button className='text-text cursor-pointer rounded-3xl mx-auto border-2 border-red px-[15px] py-2 my-4 w-[90%] '>Səbət</button>
                                                </Link>
                                            </div>
                                        </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-4 flex justify-between max-w-[1240px] mx-auto border-b border-[#ccc]'>
                <ul className='flex gap-4 text-[15px] font-bold'>
                    <li>Bestseller – İyun</li>
                    <li>Endirimlər</li>
                    <li>Müəlliflər</li>
                    <li>Klassiklər</li>
                </ul>
                <ul className='flex gap-4 text-[15px] text-[#334155] font-extralight'>
                    <li>Ödəniş və çatdırılma</li>
                    <li>Loyallıq Kartı</li>
                    <li>FAQ</li>
                    <li>Əlaqə</li>
                </ul>
            </div>  
        </div>
    )
}

export default Header
