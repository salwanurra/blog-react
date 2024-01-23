import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Menu from "../../components/Menu"
import { AuthContext } from '../../context/authContext'
import moment from 'moment'
import './post.scss'

const Detail = () => {
    const [post, setPost] = useState({})
    const location = useLocation()
    const navigate = useNavigate()

    const postId = location.pathname.split("/")[2]

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`)
                setPost(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [postId])

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${postId}`)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='single'>
        <div className="content">
            <img src={`../upload/${post?.img}`} alt="" />
            <div className="user">
                {post.userImg && <img src={post.userImg} alt="" />}
            {/* </div> */}
            <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username && <div className="action">
                <Link to={`/write?edit=2`} state={post} className='edit'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='icon-action'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </Link>

                <div className='delete' onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='icon-action'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </div>

            </div>}
        </div>
        <h1>{post.title}</h1>
        {post.desc}
        </div>
        <Menu cat={post.category}/>
    </div>
  )
}

export default Detail