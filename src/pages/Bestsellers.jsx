import React, { useState } from 'react'
import Item from '../components/main/Item'

function Bestsellers() {
    const lang = ['Azərbaycan', 'Rusca', 'Türkcə', 'Uşaq ədəbiyyatı']
    const [activeLang, setActiveLang] = useState(0)

  return (

    <div className='max-w-[1240px] mx-auto px-4'>
        <div className='scrollx py-[5px] text-[#767676] text-[14px] flex overflow-x-scroll gap-2'>
            <a className='whitespace-nowrap cursor-pointer hover:text-red' href='/'>Əsas səhifə </a>
            <p className='whitespace-nowrap text-[#9c9c9c] cursor-pointer hover:text-red' href='/'> / Avqust ayının ən çox satılan kitabları – Bestsellerlər (2025) </p>
        </div>
        <div>
            <h1 className='text-[28px] mb-[10px] font-black text-text '>Avqust ayının ən çox satılan kitabları – Bestsellerlər (2025)</h1>
            <p className='mb-4 text-[14px] text-text font-extralight'>
                Hər ay minlərlə oxucu növbəti kitabını tapmaq üçün fiziki mağazalarımızı və onlayn mağaza rəflərimizi ziyarət edir. Biz aylıq bestseller siyahılarımızda oxucular tərəfindən ən çox alınan kitabları təqdim edirik.
                Ayın ən çox oxunan kitabları azərbaycanca, türkcə, rusca və uşaq ədəbiyyatı olmaqla dörd bölmədə təqdim olunur. Siyahıya əsasən son aylarda Azərbaycanda ən çox oxunan kitablar haqqında məlumat əldə edə bilərsiniz.
            </p>
            <p className='mb-4 text-[14px] text-text font-extralight'>
                Unudulmaz hekayələrdən ilhamverici fikirlərə, klassiklərdən yeni nəşrlərə qədər – bu siyahı oxucuların qəlbinə toxunan, söhbətlərə səbəb olan və rəflərdən sürətlə yoxa çıxan kitablardan ibarətdir.
            </p>
            <p className='mb-4 text-[14px] text-text font-extralight'>
                Siyahımızda minlərlə oxucunun seçdiyi bu kitablar arasında ruhunuza toxunan bir əsər mütləq ki tapılar.
            </p>
        </div>
        <div className='flex items-center gap-4 text-[#333] text-[14px] py-2 border-b border-[#eee]'>
            {
                lang.map((item, i) =>( 
                <div key={i}
                    onClick={() => {setActiveLang(i)}}
                    className={` cursor-pointer px-4 py-2 border rounded-3xl
                    ${activeLang === i ? 'bg-red text-white' : 'text-[#333] border-red'}`}>
                    {item}
                    {activeLang === i && <hr className='bg-red border-0 font-bold h-[3px] rounded-2xl' />}
                </div> ))
            }
        </div>
        <div>
            <Item type='bestsellerSection' />
        </div>
    </div>
  )
}

export default Bestsellers
