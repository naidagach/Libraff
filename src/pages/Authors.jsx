import React, { useEffect, useState } from 'react'
import { getAuthors } from '../services'
import axios from 'axios'

function Authors() {
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        axios.get('https://libdata.vercel.app/getAuthors')
        .then(info => setAuthors(info.data.authors)
        )
        // getAuthors().then(info => setAuthors(info))
    }, [])

  return (
    <div className='max-w-[1240px] mx-auto px-4'>
        <div className='scrollx py-[5px] text-[#767676] text-[14px] flex overflow-x-scroll gap-2'>
            <a className='whitespace-nowrap cursor-pointer hover:text-red' href='/'>Əsas səhifə </a>
            <p className='whitespace-nowrap text-[#9c9c9c] cursor-pointer hover:text-red' href='/'> / Müəlliflər </p>
        </div>
        <h1 className='text-[28px] mb-[10px] font-black text-text '>Müəlliflər</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {authors.map(item => (
                <div key={item.id}>
                <h2 className="text-[18px] font-bold text-red mb-3">
                    {item.initialLetter}
                </h2>
                <ul className="space-y-2 pl-2 border-l border-red">
                    {item.authors.map((elem, i) => (
                    <li key={i} className="text-[14px] text-gray-600 hover:text-red-500 cursor-pointer">
                        {elem.fullName}
                    </li>
                    ))}
                </ul>
                </div>
            ))}
            </div>

    </div>
  )
}

export default Authors
