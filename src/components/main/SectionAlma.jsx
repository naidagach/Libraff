import React, { useEffect, useState } from 'react'
import { get3Alma } from '../../services'
import { Link } from 'react-router'

function SectionAlma() {

    const [books, setBooks] = useState([])

	useEffect(() => {
        get3Alma().then(info => setBooks(info))
	}, [])

    if(books.length === 0 ) {
        return (
            <div role="status" className="flex flex-col gap-4 xs:grid xs:grid-cols-2 xs:grid-rows-3 m:grid-cols-3 m:grid-rows-2 animate-pulse size-full rounded-2xl">
                <div className='h-[270px] xs:col-span-1 xs:row-span-1 justify-evenly p-2 rounded-2xl overflow-hidden'>
                    <div className='size-full bg-gray-100 dark:bg-gray-200  overflow-hidden rounded-2xl grid place-items-center'></div>
                </div>
                <div className='h-[270px] xs:col-span-1 xs:row-start-2 xs:row-span-1 justify-evenly p-2 rounded-2xl overflow-hidden'>
                    <div className='size-full bg-gray-100 dark:bg-gray-200  overflow-hidden rounded-2xl grid place-items-center'></div>
                </div>
                <div className='h-full xs:col-start-2 xs:row-start-1 xs:row-span-2 xs:col-span-1 justify-evenly p-2 rounded-2xl overflow-hidden'>
                    <div className='size-full bg-gray-100 dark:bg-gray-200  overflow-hidden rounded-2xl grid place-items-center'></div>
                </div>
                <div className='h-[270px] xs:col-span-1 xs:row-start-3 m:col-start-3 m:row-start-1 justify-evenly p-2 rounded-2xl overflow-hidden'>
                    <div className='size-full bg-gray-100 dark:bg-gray-200  overflow-hidden rounded-2xl grid place-items-center'></div>
                </div>
                <div className='h-[270px] xs:col-span-1 xs:row-start-3 m:col-start-3 m:row-start-2 xs:col-start-2 justify-evenly p-2 rounded-2xl overflow-hidden'>
                    <div className='size-full bg-gray-100 dark:bg-gray-200  overflow-hidden rounded-2xl grid place-items-center'></div>
                </div>
            </div>
    )}
    return (
        <div className='mx-[15px] flex flex-col gap-4 xs:grid xs:grid-cols-2 xs:grid-rows-3 m:grid-cols-3 m:grid-rows-2'>
            {books.map((item, i) => (
                <Link key={i} to={`/kitab/${encodeURIComponent(item.title)}/${item.id}`}
                className={`rounded-2xl overflow-hidden xs:size-full
                    ${
                    i === 0 ? 'bg-[#f8fafc] xs:col-span-1 xs:row-span-1': 
                    i === 1 ? 'bg-[#fef2f2] xs:col-span-1 xs:row-start-2 xs:row-span-1': 
                    i === 2 ? 'bg-[#fef3c7] h-[520px] flex flex-col-reverse justify-center items-center xs:col-start-2 xs:row-start-1 xs:row-span-2 xs:col-span-1':
                    i === 3 ? 'bg-[#f7fee7] xs:col-span-1 xs:row-start-3 m:col-start-3 m:row-start-1' : 
                              'bg-[#eff6ff] xs:col-span-1 xs:row-start-3 m:col-start-3 m:row-start-2 xs:col-start-2 '
                    }`}>
                    <div className='flex justify-between items-center h-full'>
                        <div className='flex flex-col justify-center gap-1 px-[30px] py-[20px] text-text w-1/2'>
                        <p className='capitalize text-[16px] pb-[6px]'>{item.author}</p>
                        <p className='text-[24px]'>{item.title}</p>
                        <p className='text-[14px] mt-[6px]'>{item.description.slice(0, 73)}...</p>
                        </div>
                        <div className={`${i === 3 ? 'px-[30px]' : ''} w-1/2 py-[20px]`}>
                        <img className={`${i === 3 ? 'w-[200px]' : ''} w-[150px]`} src={item.imageSource} alt={item.title} />
                        </div>
                    </div>
                </Link>
            ))}
        </div>

  )
}

export default SectionAlma
