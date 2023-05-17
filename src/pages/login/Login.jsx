import { useState } from 'react';
import loginStyles from './loginStyles.module.css';
import {useLogin} from '../../hooks/useLogin'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error} = useLogin(`${process.env.REACT_APP_API_URL}/api/users/login`)
  
  const handleLogin = async (event) => {
    event.preventDefault();

    await login(email, password);
   }

  return (
    <div className={loginStyles.formWrapper}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div className={loginStyles.inputGroup}>
              <label htmlFor="email"> E-mail</label>
                <input 
                  type="text"
                  id='email'
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={loginStyles.inputGroup}>
                <label htmlFor="pwd">Password</label>
                <input
                  type="password"
                  id='pwd'
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
            />
            </div>

        {error && <p className="error">{error }</p> }

        {isLoading ? <button type='submit' className='btn' disabled>Processing...</button> : <button type='submit' className='btn'>Login</button> }
        </form>
    </div>
  )
}

export default Login
