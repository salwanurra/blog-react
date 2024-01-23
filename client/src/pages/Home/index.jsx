import React, { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import './home.scss'
import moment from 'moment'

const Home = () => {
    const [posts, setPosts] = useState([])
    const cat = useLocation().search
    const search = new URLSearchParams(cat).get('cat')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts${cat}`)
                setPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [cat])
    // const posts = [
    //     {
    //     id: 1,
    //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //     id: 2,
    //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //     id: 3,
    //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    // ]
    // console.log(posts)

    const showText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

  return (
    <div className='home'>
        <div className="tab-post">
            <NavLink 
                to={'/'}
                className={({isActive}) => (isActive && !search) ? 'active' : ''}
            >
                <h6>Relevant</h6>
            </NavLink>
            <NavLink 
                to={'/?cat=art'} 
                className={({isActive}) => (isActive && search === 'art') ? 'active' : ''}
            >
                <h6>ART</h6>
            </NavLink>
            <NavLink 
                to={'/?cat=science'} 
                className={({isActive}) => (isActive && search === 'science') ? 'active' : ''}
            >
                <h6>SCIENCE</h6>
            </NavLink>
            <NavLink 
                to={'/?cat=technology'}
                className={({isActive}) => (isActive && search === 'technology') ? 'active' : ''}
            >
                <h6>TECHNOLOGY</h6>
            </NavLink>
            <NavLink 
                to={'/?cat=cinema'}
                className={({isActive}) => (isActive && search === 'cinema') ? 'active' : ''}
            >
                <h6>CINEMA</h6>
            </NavLink>
            <NavLink 
                to={'/?cat=food'}
                className={({isActive}) => (isActive && search === 'food') ? 'active' : ''}
            >
                <h6>FOOD</h6>
            </NavLink>
        </div>
        <div className="posts">
            {posts.map((post) => (
                <Link className="post" key={post.id} to={`/post/${post.id}`}>
                {/* <div > */}
                    <div className="content">
                        <label className='p-detail'>By <span>{post.username}</span> <hr /> {moment(post.date).format("MMM DD, YYYY")}</label>
                        <h3>{post.title}</h3>
                        <p>{showText(post.desc)}</p>
                        {/* <button>Read More</button> */}
                        <h6>{post.category}</h6>
                    </div>
                    <div className="img">
                        <img src={`../upload/${post.img}`} alt="post" />
                    </div>
                {/* </div> */}
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Home