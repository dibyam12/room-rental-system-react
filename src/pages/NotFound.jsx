// import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {
  return (
     <div className="flex justify-center items-center h-full flex-col mt-16">
            <h1 className="text-8xl font-bold text-gray-700">404 Page not found</h1>
            <Link to={'/'}>
              <button className="h-16 mt-6 px-6 font-semibold rounded-md border mr-2 hover:text-cyan-600 hover:bg-white hover:border-cyan-600 text-white bg-cyan-600">
                Goto Home
              </button>
            </Link>
          </div>
  )
}

export default NotFound