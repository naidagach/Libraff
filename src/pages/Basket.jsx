import React, { useState } from 'react'
import { Link } from 'react-router'
import { useBasket } from '../context/BasketContext'
import { FaRegCircleXmark } from 'react-icons/fa6'

function Basket() {
    const [inpValue, setInpValue] = useState(1)
    const {basket, setBasket, removeFromBasket, clearBasket} = useBasket()

  return (
    <div className='px-4 max-w-[1240px] mx-auto'>
      <div>
        <div className='py-[5px] mb-[15px] text-[#767676] text-[14px] pt-[20px] flex overflow-x-scroll gap-2'>
            <a className='whitespace-nowrap cursor-pointer hover:text-red' href='/'>Əsas səhifə /</a>
            <p className="text-[#9c9c9c] text-[14px]">Səbətdə olanlar</p>
        </div>
        <h1 className='text-[28px] mb-[10px] font-black text-text '>Səbətdə olanlar</h1>
        <div className='s:hidden p-[15px] my-[15px] flex items-center justify-between bg-[#eee] rounded-2xl '>
            <Link>
                <button className='bg-[#1e1e1e] text-white rounded-3xl px-4 py-2'>
                    Alış-verişə davam et
                </button>
            </Link>
            <Link>
                <button className='bg-red text-white rounded-3xl px-4 py-2 flex items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    Sifarişi təsdiqlə
                </button>
            </Link>
        </div>
        <table className="w-full border border-[#ccc] rounded-2xl overflow-hidden">
            <thead className="hidden s:table-header-group ">
                <tr className='text-[14px] text-[#767676]'>
                    <th className="text-left p-2 border-b border-[#ccc]">Məhsul</th>
                    <th className="text-left p-2 border-b border-[#ccc]">Qiyməti</th>
                    <th className="text-left p-2 border-b border-[#ccc]">Say</th>
                    <th className="text-left p-2 border-b border-[#ccc]">Cəm (₼)</th>
                </tr>
            </thead>
            <tbody>
                {basket.map(item => (
                <tr key={item.id} className="border border-[#ccc] rounded-2xl mb-4 flex flex-col s:table-row">
                    <td className="s:table-cell flex gap-4 px-2 py-4 s:w-[70%] s:pl-8 max-s:border-b max-s:border-[#ccc]">
                        <span className="text-[#767676] text-[14px] w-[30%] s:hidden">Məhsul:</span>
                        <div className="flex flex-col s:flex-row s:gap-8 items-start">
                            <img className="h-[150px] w-[100px]" src={item.imageSource} alt={item.title} />
                            <div className='flex flex-col gap-2 items-start'>
                                <p className="text-red flex items-center gap-2">
                                    {item.title}
                                    <FaRegCircleXmark onClick={() => removeFromBasket(item.id)} className="text-red text-[18px] cursor-pointer"/>
                                </p>
                                <p className="text-[#767676] text-[12px]">Kod: {item.uniqueCode}</p>
                                <button className="bg-[#eee] text-red p-1 rounded-xl text-[12px] s:p-2 s:text-[14px]">
                                    Endirim
                                </button>
                            </div>
                        </div>
                    </td>
                    <td className="s:table-cell flex whitespace-nowrap gap-2 px-2 py-4 s:w-[10%] max-s:border-b max-s:border-[#ccc]">
                        <span className="text-[#767676] text-[14px] w-[30%] s:hidden">Qiyməti:</span>
                        <div className="flex gap-2 items-center">
                            <p className="text-red line-through text-[14px]">{item.discountedPrice} ₼</p>
                            <p className="text-text text-[14px]">{item.price} ₼</p>
                        </div>
                    </td>
                    <td className="s:table-cell flex  gap-2 px-2 py-4 s:w-[10%] max-s:border-b max-s:border-[#ccc]">
                        <span className="text-[#767676] text-[14px] w-[30%] s:hidden">Say:</span>
                        <input
                        onChange={e => {
                            const value = e.target.value
                            setBasket(prev => prev.map(
                                elem => elem.id === item.id ? {...elem, count: value} : elem
                            ))
                        }} 
                        onKeyDown={e => {
                            if(e.key === 'Enter' ) {
                                e.target.blur()
                            }
                        }} 
                        className="border w-full s:w-[40px] text-center border-[#ccc] px-2 py-1 rounded-md hover:border-red" 
                        type="number" 
                        value={item.count === null ? "" : item.count}/>
                    </td>
                    <td className="s:table-cell flex  gap-2 px-2 py-4 s:w-[10%]">
                        <span className="text-[#767676] text-[14px] w-[30%] s:hidden">Cəm (₼):</span>
                        <p className="font-black text-[14px]">{(item.price * item.count).toFixed(2)} ₼</p>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>

        <div className='mb-4 border border-[#ccc] rounded-2xl p-4'>
            <div className='s:w-[450px] border border-[#ccc] pl-2 flex items-center justify-between rounded-md hover:border-red'>
                <input className='' type="text" placeholder='Promokod' />
                <button className='bg-[#eee] px-4 py-2 text-[14px] text-text rounded-r-md border-l border-[#ccc]'>Tətbiq et</button>
            </div>
            <div className='border-t border-[#ccc] flex justify-end mt-4 p-2'>
                <div className='flex items-center justify-between w-[70%] s:w-[40%]'>
                    <p className='text-[20px] font-black text-[#a2a2a2]'>Cəm məbləğ (₼)</p>
                        <p className='font-black text-[20px]'>{basket.reduce((sum, item) => sum + item.count * item.price, 0).toFixed(2)} ₼</p>
                </div>
            </div>
        </div>
        <div className='hidden p-[15px] my-[15px] s:flex items-center justify-between bg-[#eee] rounded-2xl gap-2'>
            <Link>
                <button className='bg-[#1e1e1e] text-white rounded-3xl px-4 py-2 leading-4'>
                    Alış-verişə davam et
                </button>
            </Link>
            <button onClick={clearBasket} className='border-red border-2 rounded-3xl px-4 py-2 leading-4'>Səbəti təmizlə</button>
            <Link>
                <button className='bg-red text-white rounded-3xl px-4 py-2 flex items-center justify-center gap-2 leading-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    Sifarişi təsdiqlə
                </button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Basket
