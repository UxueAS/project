import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const login = await AuthService.login(email, password);
    if(login){
      navigate('/')
    } else {
      setError(AuthService.getError());
      console.log(AuthService.getError());
    }
        
     
  };
  return (
    <div className='mx-auto max-w-7xl w-full py-8'>
      <h2 className='font-bold text-4xl w-3/4'>Crea tu cuenta y descubre todo lo que hemos preparado para ti.</h2>
      <div className='flex flex-wrap'>
        <div className='w-1/2 px-12 py-4 border-r border-gray-300'>
          <form className='mt-8 space-y-4' action='#' method='POST'>
            <h3 className='font-bold text-2xl mb-2'>Registrarse</h3>
            <div>
              <label htmlFor='username' className='sr-only'>Nombre de usuario</label>
              <input
                id='username'
                name='username'
                type='text'
                autoComplete='username'
                required
                className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                placeholder='Nombre de usuario'
              />
            </div>
            <div>
              <label htmlFor='email-address' className='sr-only'>Correo electrónico</label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                placeholder='Correo electrónico'
              />
            </div>
            <div>
              <label htmlFor='phone' className='sr-only'>Teléfono</label>
              <input
                id='phone'
                name='phone'
                type='tel'
                autoComplete='tel'
                required
                className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                placeholder='Teléfono'
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>Contraseña</label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='new-password'
                required
                className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                placeholder='Contraseña'
              />
            </div>
            <div>
              <label htmlFor='confirm-password' className='sr-only'>Confirmar contraseña</label>
              <input
                id='confirm-password'
                name='confirm-password'
                type='password'
                autoComplete='new-password'
                required
                className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                placeholder='Confirmar contraseña'
              />
            </div>
            <div>
              <label htmlFor='language' className='sr-only'>Idioma</label>
              <select
                id='language'
                name='language'
                required
                className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
              >
                <option value='euskera'>Euskera</option>
                <option value='espanol'>Español</option>
                <option value='frances'>Francés</option>
              </select>
            </div>
            <div className='flex'>
              <input type="radio" name="policy" id="policy" required className='mr-4'/>
              <label htmlFor="policy">He leído y acepto las condiciones de uso, la cláusula de privacidad y la política de cookies</label>
            </div>
            <div>
              <button
                type='submit'
                className='group relative w-72 flex justify-center py-2 px-4 mx-auto border border-transparent text-base font-light text-black uppercase bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
        <div className='w-1/2 px-12 py-4 flex flex-col justify-center'>
          <form className='space-y-4' action='#' method='POST'>
            <h3 className='font-bold text-2xl mb-2'>Iniciar sesión</h3>
            {error && <p className='text-red-500'>{error.message}</p>}
            <div>
              <label htmlFor='email-address' className='sr-only'>Correo electrónico</label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                placeholder='Correo electrónico'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>Contraseña</label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                placeholder='Contraseña'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type='submit'
                onClick={handleLogin}
                className='group relative w-72 flex justify-center py-2 px-4 mx-auto border border-transparent text-base font-light text-black uppercase bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;