import React, { useEffect, useState } from 'react'
import { getBestsellers, getBooksByCategoryCode, getMostSearched, getWeekMostViewed } from '../../services'
import ItemSkeleton from './ItemSkeleton'
import { FaRegHeart, FaXmark } from 'react-icons/fa6'
import { Link } from 'react-router'
import { useWishList } from '../../context/wishListContext'
import axios from 'axios'

function Item({activeLang, type='bestseller', count, book, code, pageCount=16, pageNumber=1}) {

	const [books, setBooks] = useState([])
	const [activeLike, setActiveLike] = useState(false)
	const [clicked, setClicked] = useState(null)
	const {wishList, addLike} = useWishList()


	function handleLikes(e, item) {
		e.preventDefault()
		e.stopPropagation()
		addLike(item)
		setActiveLike(true)
		setClicked({...item, count: 1})
		setTimeout(() => setActiveLike(false), 6000)
	}

	useEffect(() => {
		if (type === 'bestseller') {
			axios.get('https://libdata.vercel.app/getBestsellers')
				.then(info => setBooks(info.data.books))
			// getBestsellers().then(info => setBooks(info.books) )
		} else if (type === 'mostSearched') {
			axios.get('https://libdata.vercel.app/mostSearchedBooks')
				.then(info => setBooks(info.data.books))
			// getMostSearched().then(info => setBooks(info.books) )
		} else if (type === 'weekMostViewed') {
			axios.get('https://libdata.vercel.app/thisWeekMostViewedBooks')
				.then(info => setBooks(info.data.books))
			// getWeekMostViewed().then(info => setBooks(info.books) )
		} else if (type === 'teasPress') {
			axios.get('https://libdata.vercel.app/getBestsellers').then(info => {
				const filterPublisher = info.data.books.filter(elem => elem.publisher === 'Teas Press').slice(0, count)
				setBooks(filterPublisher)
			})
		} else if (type === 'similar') {
			axios.get('https://libdata.vercel.app/getBestsellers').then(info => {
				const similarBooks = info.data.books.filter(elem => elem.id !== book.id && (
					elem?.secondCategory?.categoryCode === book?.secondCategory?.categoryCode
				)).slice(0, 12)
				setBooks(similarBooks)
			})
		} else if (type === 'complect') {
			axios.get('https://libdata.vercel.app/getBestsellers').then(info => {
				const complectBooks = info.data.books.filter(elem => elem.id !== book.id && (
					elem?.thirdCategory?.categoryCode === book?.thirdCategory?.categoryCode
				)).slice(0, 15)
				setBooks(complectBooks)
			})
		} else if (type === 'recent') {
			setBooks(() => {
				try {
					const data = JSON.parse(localStorage.getItem('viewedBooks'))
					return Array.isArray(data) ? data : []
				} catch {
					return []
				}
			})
		} 
		// else if (type === 'category') {
		// 	getBooksByCategoryCode(code, pageNumber, pageCount).then(info => setBooks(info.books))
		// }
	}, [type, count, code, pageNumber, pageCount])

	// useEffect(() => {
	// 	if (type === 'recent') {
	// 		setBooks(() => {
	// 			try {
	// 				const data = JSON.parse(localStorage.getItem('viewedBooks'))
	// 				return Array.isArray(data) ? data : []
	// 			} catch (error) {
	// 				return []
	// 			}
	// 		})
	// 	}
	// }, [])

	useEffect(() => {
		if (activeLike) {
		  	document.body.style.overflow = "hidden"
			} else {
		  		document.body.style.overflow = "auto"
			}
			return () => {
		  		document.body.style.overflow = "auto"
		}
	  }, [activeLike])

	const lang = {
		'Azərbaycan': 'AZE',
		'Rusca': 'RUS',
		'Türkcə': 'TUR'
	}
	const filterLang = activeLang ? books.filter(item => item.language === lang[activeLang]) : books
	if (books.length === 0) {
		if (type !== "category") {
		  return (
			<div className="flex flex-wrap w-full gap-2">
			  {Array.from({ length: 5 }).map((_, i) => (
				<div key={i} className="w-[48%] sm:w-[24%]">
				  <ItemSkeleton />
				</div>
			  ))}
			</div>
		  )
		}
		return (
				<p className="text-center text-gray-400 py-[60px] px-[20px] m:px-[200px]">
					Bu kateqoriyada məhsul mövcud deyil.
				</p>
		)
	  }
	return (
		<div className='flex gap-2 flex-wrap w-full'>
			{
				(filterLang.map((item, i) => {
					return (
						<Link key={i} to={`/kitab/${encodeURIComponent(item.title)}/${item.id}`}
							className={`relative group 4xs:w-[48%] 3xs:w-[32%] 2xs:w-[49%]
								${type === 'category' ? 's:w-[49%] sm:w-[30%] l:w-[24%]' : 'sm:w-[24%] l:w-[19%]'} 
								xs:w-[30%] h-[485px] flex flex-col justify-evenly p-2 rounded-2xl overflow-hidden hover:shadow-custom`}>
								<div className='itemHeart absolute top-6 right-6 text-xl text-gray-500 '>
									<FaRegHeart onClick={e => handleLikes(e, item)} className={`hover:text-red ${wishList.find(el => el.id === item.id) ? 'text-red': 'group-hover:block hidden'} `} />
									{activeLike && clicked &&
									<div className='bg-[#0000000f] inset-0 z-[999] fixed  flex items-center justify-center w-screen'>
										<div onClick={e => e.preventDefault()} className='max-s:fixed z-[999] max-s:bottom-0 s:inset-0 s:w-[500px] mx-auto  s:rounded-2xl s:overflow-hidden left-0 right-0 bg-white'>
											<div className='flex justify-between items-center px-[15px] py-[10px] border-b border-[#eee]'>
												<h1 className='text-[22px] text-text'>Məhsul seçilmişlər siyahısına əlavə edildi</h1>
												<FaXmark onClick={() => setActiveLike(!activeLike)} className='cursor-pointer text-[22px]' />
											</div>
											<div className='s:flex s:justify-between p-4' key={clicked.id}>
												<img className='w-[80px] py-2 max-s:mx-auto' src={clicked.imageSource} alt={clicked.title} />
												<div className='s:w-[50%] flex justify-between items-center text-[14px] mb-[15px] px-[15px] py-[10px]'>
													<p className='text-red'>{clicked.title}</p>
													<p>{clicked?.count} x {clicked.price}₼</p>
												</div>
											</div>
											<div className='max-s:h-[200px] py-2 bg-[#f6f6f8] flex justify-center items-center '>
												<Link to={'/wish-list'}>
													<button className='rounded-3xl border border-text s:bg-[#000] px-[15px] py-2 text-text s:text-white text-[16px]'>Seçilmiş məhsulların siyahısına baxın</button>
												</Link>
											</div>
										</div>
									</div>
									}
									<div className='itemDiv hidden'> 
										<div className='bg-[#000000c9] text-white text-[14px] absolute right-0 p-2 m-2 top-[100%] w-[180px] rounded-md'>
											{ wishList.find(el => el.id === item.id) ? 
												<p>Məhsul artıq seçilmişlər siyahısına elavə edildi</p> :
												<p>Seçilən məhsulların siyahısına əlave edin</p>
											}
										</div>
									</div>
								</div>
								<div className='bg-[#f6f6f8] overflow-hidden rounded-2xl h-[80%] grid place-items-center'>
									<img className=' mx-auto' src={item.imageSource} alt={item.title} />
								</div>
								<div className='flex flex-col gap-3'>
									<p>{item.title.slice(0, 40)}</p>
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
