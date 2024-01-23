import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import './navbar.scss'

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext)
    const [menu, setMenu] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!ref.current?.contains(event.target)) {
            setMenu(false);
          }
        };
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
          }
      }, [ref]);

    // console.log(menu)

  return (
    <div className='navbar'>
        <div className="container">
            <div className="logo">
                <Link to={'/'}>
                    <img src='../img/logo.png' alt='logo' />
                </Link>
            </div>
            <div className="links">
                {/* <Link className='link' to={'/?cat=art'}>
                    <h6>ART</h6>
                </Link>
                <Link className='link' to={'/?cat=science'}>
                    <h6>SCIENCE</h6>
                </Link>
                <Link className='link' to={'/?cat=technology'}>
                    <h6>TECHNOLOGY</h6>
                </Link>
                <Link className='link' to={'/?cat=cinema'}>
                    <h6>CINEMA</h6>
                </Link>
                <Link className='link' to={'/?cat=food'}>
                    <h6>FOOD</h6>
                </Link> */}
                { currentUser ? 
                    <div className='user-profile' ref={ref}>
                        <div className='button-profile' onClick={() => setMenu(prev => !prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon-s">
                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                            </svg>
                            <span>{currentUser?.username}</span>
                        </div>

                        {menu && 
                            <div className='menu-user'>
                                <span>
                                    <Link className='link' to={'/profile'}>My Profile</Link> 
                                </span>
                                <span className='write'>
                                    <Link className='link' to={'/write'}>Write</Link>
                                </span>
                                <span onClick={logout}>Logout</span> 
                            </div>
                        }
                    </div>
                    : 
                    <Link className='link' to={'/login'}>Login</Link>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar