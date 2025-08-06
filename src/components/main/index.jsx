import React, { useState } from 'react'
import Item from './Item'
import SectionAlma from './SectionAlma'

function Main() {
    const lang = ['Azərbaycan', 'Rusca', 'Türkcə']
    const [activeLang, setActiveLang] = useState(0)

    return (
        <div className='px-4'>
            <div className='py-3'>
                <h3 className='text-[30px] text-text mb-[10px]'>Bugünün seçimləri</h3>
            </div>
            <div className='mb-4'>
                <ul className='flex'>
                    {
                        lang.map((item, i) =>( 
                        <li key={i}
                            onClick={() => {setActiveLang(i)}}
                            className={`mx-2 cursor-pointer 
                            ${activeLang === i ? 'text-text font-bold' : 'text-[#767676]'}`}>
                            {item}
                            {activeLang === i && <hr className='bg-red border-0 font-bold h-[3px] rounded-2xl' />}
                        </li> ))
                    }
                </ul>
            </div>
            <section>
                <Item activeLang={lang[activeLang]} setActiveLang={setActiveLang} type='bestseller' />
            </section>
            <section className='py-[30px]'>
                <h2 className='text-[24px] text-[#767676] pb-[15px] font-extralight '>Ən son baxdıqlarınız</h2>
                <div>
                    <Item type='yox' />
                </div>
            </section>
            <section className='py-[30px]'>
                <h2 className='text-[30px] text-text pb-[15px]'>TEAS Press</h2>
                <div>
                    <Item type='teasPress' />
                </div>
                <div className='text-center'>
                    <button className='text-text rounded-3xl border-2 border-red px-[15px] py-2 my-4'>Daha çox göstər</button>
                </div>
            </section>
            <section className='py-[30px]'>
                <h2 className='text-[30px] text-text pb-[15px]'>Ən çox <span className='text-red'>axtarılanlar</span></h2>
                <div>
                    <Item type='mostSearched' />
                </div>
            </section>
            <section className='py-[30px]'>
                <h2 className='text-[30px] text-text pb-[15px]'>Həftənin ən çox <span className='text-red'>baxılanları</span></h2>
                <div>
                    <Item type='weekMostViewed' />
                </div>
            </section>
            <section className='py-[30px]'>
                <h2 className='text-[30px] text-text pb-[15px]'> <span className='text-red'>Libraff</span>ın seçimləri </h2>
                <div>
                    <Item type='libraffchoice' />
                </div>
            </section>
            <section className='py-[30px]'>
                <h2 className='text-[30px] text-text pb-[15px]'> <span className='text-red'>3alma </span>ən yenilər</h2>
                <div>
                    <SectionAlma />
                </div>
            </section>
        </div>
    )
}

export default Main
