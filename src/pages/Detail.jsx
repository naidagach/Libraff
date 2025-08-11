import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getBookById } from '../services'
import { FiCopy } from "react-icons/fi"
import { RiShoppingBag4Line } from 'react-icons/ri'
import { FaRegHeart, FaXmark } from 'react-icons/fa6'
import { MdOutlineAnnouncement } from "react-icons/md"
import { FaStoreAlt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast'
import Item from '../components/main/Item'


function Detail() {
    const [book, setBook] = useState({})
    const {id, name} = useParams()
	const [activeDiv, setActiveDiv] = useState("desc")

	useEffect(() => {
		getBookById(id).then(info => setBook(info))

		// if (book && book.id) {
		// 	const recentBooks = JSON.parse(localStorage.getItem('viewedBooks') || [])
		// 	const updated = [
		// 		book,
		// 		...recentBooks.filter(b => b.id !== book.id)
		// 	  ]
		// 	  localStorage.setItem('viewedBooks', JSON.stringify(updated.slice(0, 10)))
		// }
	}, [id, name])


	function handleToast() {
		navigator.clipboard.writeText(book?.uniqueCode || '')

		toast.custom((t) => (
			<div className={`${
				t.visible ? 'animate-enter' : 'animate-leave'
			  } w-[290px] h-[50px] bg-[#e4f6cb] shadow-lg rounded-xl transition-all duration-200 pointer-events-auto flex justify-between ring-opacity-5`}>
				<div className="ml-3 flex items-center justify-center">
					<p className="text-sm font-medium text-gray-900">Məhsul kodu kopyalandı</p>
				</div>
				<div className="flex border-l border-gray-200">
					<button
					onClick={() => toast.dismiss(t.id)}
					className="w-full p-4 flex items-center justify-center ">
					<FaXmark className='text-[20px] hover:rotate-90 transition'  />
					</button>
				</div>
			</div>
		  ))
	}
    
  return (
    <div>
		<Toaster position="top-right" reverseOrder={false} />
		<div className="px-4 pb-[30px] border-b border-[#bdc3c7] max-w-[1240px] mx-auto">
			<div className='scrollx py-[5px] mb-[15px] text-[#767676] text-[14px] flex overflow-x-scroll gap-2'>
				<a className='whitespace-nowrap cursor-pointer hover:text-red' href='/'>Əsas səhifə /</a>
				<p className='whitespace-nowrap cursor-pointer hover:text-red'>{book?.firstCategory?.categoryName} /</p>
				<p className='whitespace-nowrap cursor-pointer hover:text-red'>{book?.secondCategory?.categoryName} /</p>
				<p className='whitespace-nowrap cursor-pointer hover:text-red'>{book?.thirdCategory?.categoryName} /</p>
				<p className='whitespace-nowrap text-[#9c9c9c]'>{book?.title}</p>
			</div>
			<div className=' flex flex-col gap-4 s:flex-row s:items-start'>
				<div className='bg-[#f6f6f8] overflow-hidden s:w-[55%] rounded-2xl w-full grid place-items-center'>
					<img className='max-2xs:w-[80%] 2xs:max-h-[560px] mx-auto' src={book?.imageSource} alt={book?.title} />
				</div>
				<div className='flex flex-col gap-8 s:w-[45%] overflow-y-scroll'>
					<p className='text-[#767676] text-[12px] flex gap-1 items-center'>Kod:
						<span onClick={handleToast} className='cursor-pointer flex items-center gap-1'>
						<FiCopy className='text-[16px] hover:text-red' /> {book?.uniqueCode}
						</span>
					 </p>
					<div className='flex flex-col items-start'>
						<h1 className='text-[32px] mb-[5px] pr-[15px] text-[#1e293b]'>{book?.title}</h1>
						<p className='underline text-[#64748b] font-extralight cursor-pointer hover:text-red'>{book?.authorName}</p>
					</div>
					<div className='flex flex-col'>
						<p className='text-[28px] font-extrabold '>{book?.price}₼</p>
						<div className='flex items-center gap-2'>
							<p className='line-through text-[18px] text-[#767676]'>{book.discountedPrice}₼</p>
							<p className='bg-red text-white px-1.5 py-0.5 rounded-md text-[12px]'>{book?.discountPercentage}%</p>
						</div>
					</div>
					<div>
						<button className='bg-red w-full px-8 py-3 text-white flex items-center justify-center gap-2 text-[18px] rounded-4xl'>
							<RiShoppingBag4Line className='text-[24px]' />Səbətə əlavə et
						</button>
					</div>
					<div className='flex justify-between items-center'>
						<div className='itemHeart relative flex items-center text-[#767676] gap-1 cursor-pointer hover:text-red'>
							<FaRegHeart className='text-[24px]' />
							<p className='text-[14px] font-extralight '>Seçilmiş</p>
							<div className='itemDiv absolute'> 
								<div>
									<img className='w-[20px] absolute top-[100%] right-[20px]' alt="" />
								</div>
								<div className='bg-[#000000c9] text-white text-[14px] absolute right-0 p-2 m-2 top-[100%] w-[150px] rounded-md'>
									<p>Seçilən məhsulların siyahısına əlave edin</p>
								</div>
							</div>
						</div>
						<div className='flex items-center text-[#767676] gap-1 cursor-pointer hover:text-red'>
							<MdOutlineAnnouncement className='text-[24px]' />
							<p className='text-[14px] font-extralight'>Sizə necə kömək edə bilərik?</p>
						</div>
					</div>
					<div>
						<h4 className='text-[18px] font-black py-2 text-[#1e293b]'>Çatdırılma haqqında</h4>
						<p className='text-[#475569] text-[14px] py-1 font-extralight'>Bakı şəhəri üçün təxmini müddət və qiymətlər.</p>
						<p className='text-[#475569] text-[14px] font-extralight flex gap-2 py-1 items-center'>
							<FaStoreAlt className='text-[18px]' />
							Mağazadan təhvil alma — <span className='text-[#000] font-black'>  pulsuz.</span></p>
						<div className='text-[#475569] text-[14px] font-extralight flex gap-2 py-1 items-start justify-start mr-2'>
							<TbTruckDelivery className='text-[18px]' />
							<p>
								Kuryer ilə — operator təsdiqindən sonra 
								<span className='text-[#000]  font-black'> 24 saat ərzində</span>. 30 AZN və yuxarı sifarişlərdə — 
								<span className='text-[#000] font-black'>pulsuz.</span>
							</p>
						</div>
							<p className='border-[0.5px] my-2 border-dashed text-[#475569] font-extralight'></p>
							<p className='text-[#475569] text-[14px] py-1 font-extralight'>Bölgələrə çatdırılma <span className='text-[#000] font-black'>3-5 iş günü</span> ərzində.</p>
					</div>
				</div>
			</div>
			<div className='py-8'>
				<div className='flex justify-between items-center text-[#767676] text-[20px] font-medium border-b border-[#bdc3c7]'>
					<p onClick={() => setActiveDiv("desc")} className={`${activeDiv === 'desc' ? 'border-b-2 border-red text-black' : ''} hover:text-black cursor-pointer`}>Təsvir</p>
					<p onClick={() => setActiveDiv("xususi")} className={`${activeDiv === 'xususi' ? 'border-b-2 border-red text-black' : ''} hover:text-black cursor-pointer`}>Xüsusiyyəti</p>
					<p onClick={() => setActiveDiv("reyler")} className={`${activeDiv === 'reyler' ? 'border-b-2 border-red text-black' : ''} hover:text-black cursor-pointer whitespace-nowrap`}>İstifadəçi rəyləri</p>
				</div>
				<div className='max-w-[840px] mx-auto'> 
					{activeDiv === "desc" && (
						<div>
							<p className="text-[18px] text-text">{book?.description}</p>
						</div>
					)}
					
					{activeDiv === "xususi" && (
						<div className='max-w-[840px] mx-auto'>
							<div className='flex items-center justify-start gap-1'>
								<p className='text-[#767676]'>Cild</p>
								<p className='border-b border-dotted w-[100px] pt-2'></p>
								<p className='text-text py-1'>{book?.cover}</p>
							</div>
							<div className='flex items-center justify-start gap-1'>
								<p className='text-[#767676]'>Dil</p>
								<p className='border-b border-dotted w-[100px] pt-2'></p>
								<p className='text-text py-1'>{book?.language}</p>
							</div>
							<div className='flex items-center justify-start gap-1'>
								<p className='text-[#767676]'>Müəllif</p>
								<p className='border-b border-dotted w-[100px] pt-2'></p>
								<p className='text-text py-1'>{book?.authorName}</p>
							</div>
							<div className='flex items-center justify-start gap-1'>
								<p className='text-[#767676]'>Səhifə</p>
								<p className='border-b border-dotted w-[100px] pt-2'></p>
								<p className='text-text py-1'>{book?.pageCount}</p>
							</div>
						</div>
					)}
					{activeDiv === "reyler" && (
						<div>
							<div className='p-[15px] bg-[#f5f5f7] flex flex-col justify-center items-center max-w-[840px] rounded-2xl mx-auto'>
								<p className='text-[20px] mb-1 text-text'>Məhsul haqqında rəy yazın</p>
								<p className='text-[14px] mx-6 text-text'>Fikirlərinizi digər istifadəçilərlə bölüşün</p>
								<button className='bg-[#1e1e1e] text-white mt-4 px-[15px] py-2 rounded-3xl'>Rəy yaz</button>
							</div>
							<div className='py-[60px] px-[20px] text-[#bdc3c7] text-center'>
								<p>Hələki rəy yoxdur</p>
							</div>
						</div>
					)}
				</div>
				<div>
					<div className='py-3 border-b border-[#eee]'>
						<h3 className='text-[24px] text-[#767676] mb-[10px]'>Oxşar məhsullar</h3>
					</div>
					<div className='py-4'>
						<Item book={book} type='similar' />
					</div>
					<div className='py-3 border-b border-[#eee]'>
						<h3 className='text-[24px] text-[#767676] mb-[10px]'>Birgə alınanlar</h3>
					</div>
					<div className='py-4'>
						<Item book={book} type='complect' />
					</div>
					<div className='py-3 border-b border-[#eee]'>
						<h3 className='text-[24px] text-[#767676] mb-[10px]'>Ən son baxdıqlarınız</h3>
					</div>
					<div className='py-4'>
						<Item type='recent' />
					</div>
				</div>
			</div>
		</div>
    </div>
  )
}

export default Detail
