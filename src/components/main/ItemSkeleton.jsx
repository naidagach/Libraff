import React from 'react'

function ItemSkeleton() {
  return (
    <div role="status" className=" animate-pulse w-full border border-gray-300 rounded-2xl">
        <div className='h-[300px] flex flex-col justify-evenly p-2 rounded-2xl overflow-hidden'>
            <div className=' bg-gray-200 dark:bg-gray-300  overflow-hidden rounded-2xl h-[80%] grid place-items-center'>
            </div>
            <div className='flex flex-col gap-3 my-2'>
                <p className='bg-gray-200 dark:bg-gray-300 h-2 w-[70%] rounded-2xl'></p>
                <div className='flex items-center'>
                    <p className=' bg-gray-200 dark:bg-gray-300 h-2 w-[40%] rounded-2xl'></p>
                </div>
            </div>
        </div>
	</div>
  )
}

export default ItemSkeleton
