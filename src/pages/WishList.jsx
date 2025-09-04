import React from 'react'
import { useWishList } from '../context/wishListContext'
import { FaRegCircleXmark } from "react-icons/fa6"
import { TbTrashXFilled } from "react-icons/tb"
import { Link } from 'react-router'

function WishList() {
	const {wishList, removeLike, clearLikes} = useWishList()
	
	return (
		<div className='px-4 max-w-[1240px] mx-auto '>
			<div>
				<div className='py-[5px] mb-[15px] text-[#767676] text-[14px] pt-[20px] flex overflow-x-scroll gap-2'>
					<a className='whitespace-nowrap cursor-pointer hover:text-red' href='/'>Əsas səhifə /</a>
					<p className="text-[#9c9c9c] text-[14px]">Əlavə edilmişlər</p>
				</div>
				<h1 className='text-[28px] mb-[10px] font-black text-text '>Əlavə edilmişlər</h1>
				{wishList.length === 0 ? (
					<div className="flex max-w-[1240px] mx-auto p-2 gap-4 m-2 w-full">
						{Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className="bg-[#f9f9f9] rounded-md grid sm:w-1/4 place-items-center h-[200px] w-full">
								<p className="text-[#cdcdcd]">Boş</p>
							</div>
						))}
					</div>
				) : (
					<div className="flex flex-wrap gap-4 py-4">
						{wishList.map(item => (
								<Link to={`/kitab/${encodeURIComponent(item.title)}/${item.id}`} key={item.id} className="group relative hover:shadow-custom rounded-2xl p-2 h-[485px] flex flex-col justify-evenly 4xs:w-[47%] 3xs:w-[30%] 2xs:w-[47%] xs:w-[30%] sm:w-[23%] m:w-[18%] sm:max-w-[225px]">
									<FaRegCircleXmark onClick={(e) => {e.preventDefault(), removeLike(item.id)}} className="hover:text-red group-hover:block hidden absolute top-5 right-5 text-[22px] text-red" />
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
						))}
					</div>
				)}
				<div className='my-4 p-4 bg-[#f5f5f5] rounded-2xl flex justify-between'> 
					{wishList.length !== 0 ? (
						<button onClick={clearLikes} className='border-2 border-red rounded-3xl px-4 flex gap-2 items-center py-2'>
							<TbTrashXFilled className='text-[18px]' /> Siyahını sıfırla
						</button> ) : ''}
					<Link  className='bg-[#1e1e1e] text-white rounded-3xl px-4 py-2'>
						Alış-verişə davam et
					</Link>
					
				</div>
			</div>
		</div>
	)
}

export default WishList
