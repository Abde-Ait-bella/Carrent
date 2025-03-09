"use client";
import Layout from '@/app/(components)/layouts/PublicLayout'
import Link from 'next/link'
import api from '../Api/axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

export default function Login () {
  const [values, setValues] = useState()

  const handleChange = e => {
	const {name, value, type, checked} = e.target;
	let newValue;

	if (type == "checkbox") {
		newValue = checked
	}else{
		newValue = value
	}

	const newObject = { ...values, [name]: newValue}

	setValues(newObject)
	
  }
  const handelSubmit = async () => {
    await api
      .post('/login', values)
      .then(response => {
        const { status, data } = response
		
        if (status === 200) {
			console.log('status', response);
			toast.success(data.status)
			console.log(data.authorisation.token);
			if (values.remember) {
				localStorage.setItem('token', data.authorisation.token)
				localStorage.setItem('AUTHENTICATED', true)
			  } else {
				sessionStorage.setItem('token', data.authorisation.token)
				sessionStorage.setItem('AUTHENTICATED', true)
			  }
			window.location.href = "/dashboard"
        }
      })
      .catch(({ response }) => {
        toast.error(response?.data?.message || 'Une erreur est survenue !')
      }) 
  }

  return (
    <>
      <ToastContainer />
      <Layout footerStyle={1}>
        <div className='pt-140 pb-170 container'>
          <div className='row'>
            <div className='mx-auto col-lg-5'>
              <div className='px-3 px-md-5 border rounded-3 ptb-50'>
                <div className='login-content'>
                  <div className='text-center'>
                    <p className='d-inline-flex align-items-center bg-2 px-4 py-2 rounded-12 text-sm-bold neutral-1000'>
                      Sign in
                    </p>
                    <h4 className='neutral-1000'>Welcome back</h4>
                  </div>
                  <div className='form-login mt-30'>
                      <div className='form-group'>
                        <input
                          className='form-control username'
                          onChange={handleChange}
                          name='email'
                          type='email'
                          placeholder='Email / Username'
                        />
                      </div>
                      <div className='form-group'>
                        <input
                          className='form-control password'
                          onChange={handleChange}
                          name='password'
                          type='password'
                          placeholder='****************'
                        />
                      </div>
                      <div className='form-group'>
                        <div className='box-remember-forgot'>
                          <div className='remeber-me'>
                            <label className='text-xs-medium neutral-500'>
                              {' '}
                              <input className='cb-remember' onChange={handleChange} name='remember' type='checkbox' />
                              Remember me{' '}
                            </label>
                          </div>
                          <div className='forgotpass'>
                            <Link
                              className='text-xs-medium neutral-500'
                              href='#'
                            >
                              Forgot password?
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className='form-group mb-30'>
                        <button
                          className='w-100 btn btn-primary'
                          onClick={handelSubmit}
                        >
                          Sign in
                          <svg
                            width={16}
                            height={16}
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M8 15L15 8L8 1M15 8L1 8'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </button>
                      </div>
                      <p className='text-md-medium text-center neutral-500'>
                        Or connect with your social account
                      </p>
                      <div className='box-button-logins'>
                        <Link
                          className='mr-10 btn btn-login btn-google'
                          href='#'
                        >
                          <img
                            src='/assets/imgs/template/popup/google.svg'
                            alt='Carento'
                          />
                          <span className='text-sm-bold'>
                            Sign up with Google
                          </span>
                        </Link>
                        <Link className='mr-10 btn btn-login' href='#'>
                          <img
                            src='/assets/imgs/template/popup/facebook.svg'
                            alt='Carento'
                          />
                        </Link>
                        <Link className='btn btn-login' href='#'>
                          <img
                            src='/assets/imgs/template/popup/apple.svg'
                            alt='Carento'
                          />
                        </Link>
                      </div>
                      <p className='mt-70 text-sm-medium text-center neutral-500'>
                        Don’t have an account?{' '}
                        <Link className='neutral-1000' href='/register'>
                          Register Here !
                        </Link>
                      </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
