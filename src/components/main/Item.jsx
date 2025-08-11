import React, { useEffect, useState } from 'react'
import { getBestsellers, getMostSearched, getWeekMostViewed } from '../../services'
import ItemSkeleton from './ItemSkeleton'
import { FaRegHeart } from 'react-icons/fa6'
import { Link } from 'react-router'

function Item({activeLang, type='bestseller', count, book}) {

	const [books, setBooks] = useState([])

	useEffect(() => {
		if (type === 'bestseller') {
			getBestsellers().then(info => setBooks(info.books) )
		} else if (type === 'mostSearched') {
			getMostSearched().then(info => setBooks(info.books) )
		} else if (type === 'weekMostViewed') {
			getWeekMostViewed().then(info => setBooks(info.books) )
		} else if (type === 'teasPress') {
			getBestsellers().then(info => {
				const filterPublisher = info.books.filter(elem => elem.publisher === 'Teas Press').slice(0, count)
				setBooks(filterPublisher)
			})
		} else if (type === 'similar') {
			getBestsellers().then(info => {
				const similarBooks = info.books.filter(elem => elem.id !== book.id && (
					elem?.secondCategory?.categoryCode === book?.secondCategory?.categoryCode
				)).slice(0, 12)
				setBooks(similarBooks)
			})
		} else if (type === 'complect') {
			getBestsellers().then(info => {
				const complectBooks = info.books.filter(elem => elem.id !== book.id && (
					elem?.thirdCategory?.categoryCode === book?.thirdCategory?.categoryCode
				)).slice(0, 15)
				setBooks(complectBooks)
			})
		} else if (type === 'recent') {
			// const recentBooks = JSON.parse(localStorage.getItem('viewedBooks') || [])
		}
	}, [])

	const lang = {
		'Azərbaycan': 'AZE',
		'Rusca': 'RUS',
		'Türkcə': 'TUR'
	}
	const filterLang = activeLang ? books.filter(item => item.language === lang[activeLang]) : books
	if (books.length === 0 ) {
		return (
			<div className='flex flex-wrap w-full gap-2'>
				<div className='w-[48%] 3xs:w-[32%] 2xs:w-[49%] xs:w-[30%] sm:w-[24%] l:w-[19%]'>
					<ItemSkeleton />
				</div>
				<div className='w-[48%] 3xs:w-[32%] 2xs:w-[49%] xs:w-[30%] sm:w-[24%] l:w-[19%]'>
					<ItemSkeleton />
				</div>
				<div className='w-[48%] 3xs:w-[32%] 2xs:w-[49%] xs:w-[30%] sm:w-[24%] l:w-[19%]'>
					<ItemSkeleton />
				</div>
				<div className='w-[48%] 3xs:w-[32%] 2xs:w-[49%] xs:w-[30%] sm:w-[24%] l:w-[19%]'>
					<ItemSkeleton />
				</div>
				<div className='w-[48%] 3xs:w-[32%] 2xs:w-[49%] xs:w-[30%] sm:w-[24%] l:w-[19%]'>
					<ItemSkeleton />
				</div>
				<div className='w-[48%] 3xs:w-[32%] 2xs:w-[49%] xs:w-[30%] sm:w-[24%] l:w-[19%]'>
					<ItemSkeleton />
				</div>
			</div>
		)
	}
	return (
			<div className='flex gap-2 flex-wrap w-full'>
				{
					filterLang.length === 0 ? (
						<p className="text-center text-gray-500">Kitab tapılmadı.</p>
					) :
					(filterLang.map((item, i) => {
						return (
							<Link key={i} to={`/kitab/${encodeURIComponent(item.title)}/${item.id}`}
								className='relative group 4xs:w-[48%] 3xs:w-[32%] 2xs:w-[49%] xs:w-[30%] sm:w-[24%] l:w-[19%] h-[485px] flex flex-col justify-evenly p-2 rounded-2xl overflow-hidden hover:shadow-custom'>
								<div className='itemHeart absolute top-6 right-6 text-xl text-gray-500 hover:text-red hidden group-hover:block'>
									<FaRegHeart className='group' />
									<div className='itemDiv hidden'> 
										<div>
											<img className='w-[20px] absolute top-[100%] right-[75px]' alt="" />
										</div>
										<div className='bg-[#000000c9] text-white text-[14px] absolute right-0 p-2 m-2 top-[100%] w-[150px] rounded-md'>
											<p>Seçilən məhsulların siyahısına əlave edin</p>
										</div>
									</div>
								</div>
								<div className='bg-[#f6f6f8] overflow-hidden rounded-2xl h-[80%] grid place-items-center'>
									<img className=' mx-auto' src={item.imageSource} alt={item.title} />
								</div>
								<div className='flex flex-col gap-3'>
									<p>{item.title.slice(0, 200)}</p>
									<div className='flex items-center'>
										<p className='text-[18px] pr-2 font-bold'>{item.price}₼</p>
											{item.discountedPrice &&
												<>
													<p className='text-[#767676] text-[14px] line-through'>{item.discountedPrice}</p>
													<span className='text-[#767676] text-[14px] pl-1'>₼</span>
												</>
											}
									</div>
								</div>
							</Link>
						)
					}))
				}
			</div>
	)
}

export default Item
