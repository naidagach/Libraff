import React from 'react'

function CatalogSkeleton() {
  return (
    <div role="status" className="m-4 animate-pulse">
		<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-full m-3" />
		<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-full m-3" />
		<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-full m-3" />
		<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-full m-3" />
		<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-full m-3" />
		<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-full m-3" />
		<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-full m-3" />
		
		<span className="sr-only">Loading...</span>
	</div>

  )
}

export default CatalogSkeleton
