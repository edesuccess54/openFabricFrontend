import navbarStyles from './navBar.module.css'
import { NavLink, Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import {GiHamburgerMenu} from 'react-icons/gi'
import { useEffect, useState } from 'react'


function NavList({ name, to }) {
    if (name === 'Home') {
        return <NavLink to={to}>{name}</NavLink>
    }
    return  <NavLink to={to}>{name}</NavLink>
}

export const NavBar = () => {
    const { logOut } = useLogout()
    const { user } = useAuthContext()
    const [toggleMenu, setToggleMenu] = useState(false)

    const handleLogout = (e) => {
        e.preventDefault();

        logOut()
    }

    const handleToggle = (e) => {
        if (!toggleMenu) {
            setToggleMenu(true)
        } else {
            setToggleMenu(false)
        }
    }

    useEffect(() => {
        setToggleMenu(false)
    }, [])

    return (
      <div className={navbarStyles.navbar}>
            <div className={navbarStyles.brand}><Link to="/" >Brand Logo</Link></div>

            <div className={navbarStyles.largeMenu}>
                <span className={navbarStyles.hamburger} onClick={handleToggle}><GiHamburgerMenu /></span>
                <nav className={navbarStyles.nav}>
                    {user && ( 
                    <>
                    <span>{ user.email }</span>
                    <NavList name="Home" to="/" />
                    <NavList name="Add Product" to="/add-product" />
                    <button className='btn' onClick={handleLogout}>Logout</button>    
                    </>
                    )}

                    {!user &&
                    <div>
                        <NavList name="Login" to="/login" />
                        <NavList name="Signup" to="/signup" />
                    </div>
                    }
                </nav>
            </div>

            <div className={`${navbarStyles.mobileMenu} ${toggleMenu ? navbarStyles.show : ''}`}>
                <div className="menuWrapper">
                    <nav className={navbarStyles.mobileNav}>
                        {user && ( 
                        <>
                        <NavList name="Home" to="/" />
                        <NavList name="Add Product" to="/add-product" />
                        <button className='btn' onClick={handleLogout}>Logout</button>    
                        </>
                        )}

                        {!user &&
                        <div>
                            <NavList name="Login" to="/login" />
                            <NavList name="Signup" to="/signup" />
                        </div>
                        }
                    </nav>
                </div>
            </div>
      </div>
  )
}
