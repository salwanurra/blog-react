import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'

const UpdateProfile = () => {
    const { currentUser } = useContext(AuthContext)
    const [form, setForm] = useState({
        username: currentUser.username || '',
        email: currentUser.email,
        job: currentUser?.job,
        desc: currentUser?.desc,
    })

    const handleForm = (e) => {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`/profile/edit/${currentUser.id}/${currentUser.username}`, form)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    console.log("form", form)

  return (
    <div className='form-profile'>
        <h1>Edit Profile</h1>
        <div className="input-edit">
            <input type="text" placeholder='Username' value={form.username} name="username" onChange={(e) => handleForm(e)} />
            <input type="text" placeholder='Email' value={form.email} name="email" onChange={(e) => handleForm(e)} />
            <input type="text" placeholder='Job' value={form?.job} name="job" onChange={(e) => handleForm(e)} />
            <input type="text" placeholder='Description' value={form?.desc} name="desc" onChange={(e) => handleForm(e)} />
            <button type='submit' onClick={handleUpdate}>Update Profile</button>
        </div>
    </div>
  )
}

export default UpdateProfile