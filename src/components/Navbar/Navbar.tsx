import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <React.Fragment>
            <nav className='fixed top-0 z-40 shadow-sm flex justify-between items-center w-screen md:px-6 md:py-4 px-4 py-4 bg-gray-200'>
                <Link to={'/'} className="px-2 py-2 active:translate-y-[6px] transition-all  duration-300 ease-in-out  bg-gray-400 rounded-full inline-block">
                    <ChevronLeft className='size-5 flex justify-center items-center' />
                </Link>
                <h1 className='md:text-3xl text-sm leading-6 tracking-wide font-medium md:font-bold'>List View</h1>

                <div className="inline-block">
                    <Link to={'/create-list'} className='rounded-xl px-4 py-2 bg-blue-500 text-white text-sm font-medium leading-7 tracking-wide'>Create list</Link>
                </div>
            </nav>
        </React.Fragment>
    )
}
