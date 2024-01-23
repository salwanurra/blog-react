import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './auth.scss'
import { AuthContext } from '../../context/authContext'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState()
  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  // console.log(currentUser)

  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate('/')
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
            <input required type="text" name='username' placeholder='username' onChange={handleChange} />
            <input required type="password" name='password' placeholder='password' onChange={handleChange} />
            <button onClick={handleSubmit}>Login</button>
            {error && <p>{error}</p>}
            <span>Don't you have an account? <Link to={'/register'}>Register</Link></span>
        </form>
    </div>
  )
}

export default Login