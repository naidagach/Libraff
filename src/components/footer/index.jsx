import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'

function Footer() {
	const [openDrop, setOpenDrop] = useState(null	)
	const footerData = [
		{
		  title: "Hesabım",
		  items: ["Daxil ol", "Qeydiyyatdan keç" ]
		},
		{
		  title: "Şirkət",
		  items: ["Haqqımızda", "Əlaqə", "Vakansiyalar", "Sayt Xəritəsi"]
		},
		{
		  title: "Müştəri Xidməti",
		  items: ["Dəyişdirilmə və qaytarılma", "Ödəniş və çatdırılma", "Sifarişiniz haqqında", "Seçilmişlər"]
		},
		{
		  title: "Əlaqə",
		  items: ["Bakı, Badamdar qəs., Mikayıl Müşfiq küç. 1c (Badamdar Estates)", "+994-50-290-44-96", "B.e.-B. 9.00 - 18.00","online@libraff.az"]
		}
	  ];
	  
	return (
		<div className='bg-[#f9fafc] px-6 border-t border-[#eee] mx-auto '>
			<div className='font-[900] pt-[15px] pb-[10px] mx-auto '>
				{footerData.map((item, i) => (
					<ul className='s:hidden'>
						<li onClick={() => setOpenDrop(openDrop === i ? null : i)} key={i} className={`h-[50px] flex justify-between items-center
							${openDrop == i ? 'border-0' : 'border-b'} border-[#eee]`}> {item.title}
							{openDrop == i ? <FaMinus className='text-[20px] text-[#a7abb3] '/> : <FaPlus className='text-[20px]'/>}
						</li>
							{openDrop === i && 
								<ul className='text-[14px] pb-2 font-extralight text-[#1e1e1e]'>
									{item.items.map((li, j) => (
										<li key={j}><a>{li}</a></li>
									))}
								</ul>
							}
					</ul>
				))}
				<ul className='hidden s:flex justify-between px-8'>
				{footerData.map((item, i) => (
					<li className='text-text text-[18px] font-extralight '>{item.title}
						<ul className='text-[14px] pb-2 font-extralight text-[#363535] max-w-[150px] l:max-w-[300px] py-2'>
							{item.items.map((li, j) => (
								<li className='py-1' key={j}><a>{li}</a></li>
							))}
						</ul>
					</li>
					))}
				</ul>
			</div>
			<p className='text-[#1e1e1e] font-extralight text-[14px] py-[10px]'>© 2017 - {new Date().getFullYear()} Libraff.</p>
		</div>
	)
}

export default Footer
