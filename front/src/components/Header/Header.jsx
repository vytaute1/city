import { useState } from 'react'
import { NavLink } from 'react-router'
import './Header.scss'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

  return (
    <header>
        <nav>
            <button className='hamburger' onClick={toggleMenu}>
                ☰
            </button>
            <ul className={`menu-list ${isMenuOpen ? 'open' : ''}`}>
                <li>
                    <NavLink to='/' onClick={closeMenu}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/users' onClick={closeMenu}>
                        Users
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header