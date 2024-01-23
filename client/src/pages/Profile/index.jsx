import axios from 'axios'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const Profile = () => {
    const { currentUser } = useContext(AuthContext)
    const [myPost, setMyPost] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/`)
                const data = res.data.filter(post => post.uid === currentUser.id)
                setMyPost(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [currentUser.id])

    // console.log(myPost)
  return (
    <div className='my-profile'>
      <div className='user-info'>
        <div className='user-title'>
          <img src={currentUser.img ? `../upload/${currentUser.img}` : '../img/profile.png'} alt='user' />
          <div className=''>
            <h1>{currentUser.username}</h1>
            <p>Designer</p>
          </div>
        </div>

        <div className='user-desc'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!</p>
        </div>
        <Link to={`/profile/edit/${currentUser.id}/${currentUser.username}`}> Edit Profile</Link>
      </div>

      <div className="my-post">
        <h2>Latest Post</h2>
        <div className="post">
          {myPost.map((post) => (
            <div className="card-myPost">
              <img src={`../upload/${post.img}`} alt="mypost" />
              <div className={`cat-${post.category}`}>
                {post.category}
              </div>
              <h1>{post.title}</h1>
              <p>{moment(post.date).format("DD MMMM YYYY")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile