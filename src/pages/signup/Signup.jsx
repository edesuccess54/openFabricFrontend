import { useState } from 'react'
import signupStyles from './signupStyles.module.css'
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useSignup(`${process.env.REACT_APP_API_URL}/api/users/signup`)

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(name, email, password)
  }

  return (
    <div className={signupStyles.formWrapper}>
        <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className={signupStyles.inputGroup}>
                <label htmlFor="name"> Preferred Name</label>
                <input
                type="text"
                id='name'
            value={name}
            required
                onChange = {(e) => setName(e.target.value)}
                />
            </div>
              
            <div className={signupStyles.inputGroup}>
                <label htmlFor="email"> E-mail</label>
                <input
                type="text"
                id='email'
            value={email}
            required
                onChange = {(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={signupStyles.inputGroup}>
                <label htmlFor="pwd">Password</label>
                <input
                type="password"
                id='pwd'
            value={password}
            required
                onChange = {(e) => setPassword(e.target.value)}
                />
            </div>

           {error && <p className="error"> {error} </p> }

        {isLoading ? <button type='submit' className='btn' disabled="true">Processing...</button> : <button type='submit' className='btn'>Sign Up</button> }
        </form>
    </div>
  )
}

export default Signup
