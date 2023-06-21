import React from 'react'

export const Header = () => {
  return (
    <header className='flex items-center justify-between px-5 py-3 bg-black text-white mb-10'>
        <div className='font-bold text-xl'>Face App</div>
        <a href="https://github.com/ProDanish203" target='_blank'>
            <button className='cursor-pointer px-5 py-2 bg-red-500 rounded-md'>Github</button>
        </a>
    </header>
  )
}
