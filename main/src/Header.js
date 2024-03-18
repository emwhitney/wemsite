import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import './Header.css'

function Header() {
  const [activePage, setActivePage] = useState('About');

  function handlePageClick(page) {
    setActivePage(page)
  }

  return (
    <nav className="flex align-center">
      <span className='flex-grow'>
        <Link to="/about" onClick={()=>handlePageClick('about')}
          className={activePage === 'about' ? 'active' : ''}>About</Link>
      </span>
      <span className='flex-shrink'> 
          <Link to="/projects" onClick={()=>handlePageClick('projects')}
          className={activePage === 'projects' ? 'active' : ''}>Projects</Link>
           <Link to="/writing" onClick={()=>handlePageClick('blog')}
          className={activePage === 'writing' ? 'active ssl' : 'ssl'}>Blog</Link>
      </span>
    </nav>
  )
}

export default Header