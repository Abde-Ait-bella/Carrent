'use client'
import Layout from '@/app/(components)/layouts/PublicLayout'
import Link from 'next/link'
import { useState } from 'react'
import api from '../Api/axios'
import { ToastContainer, toast } from 'react-toastify'

export default function Register () {
  const [values, setValues] = useState()

  const handleChange = e => {
    const { name, value } = e.target

    const newObject = { ...values, [name]: value }

    setValues(newObject)
    console.log(values)
  }

  const handelSubmit = async () => {
    await api
      .post('/signup', values)
      .then(response => {
        const { status, data } = response

        if (status === 200) {
          toast.success(data.status)
          console.log(data.authorisation.token)
          if (values.remember) {
            localStorage.setItem('token', data.authorisation.token)
            localStorage.setItem('AUTHENTICATED', true)
          } else {
            sessionStorage.setItem('token', data.authorisation.token)
            sessionStorage.setItem('AUTHENTICATED', true)
          }
          window.location.href = '/dashboard'
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
              <div className='px-3 px-md-5 border rounded-3 register-content ptb-50'>
                <div className='text-center'>
                  <p className='d-inline-flex align-items-center bg-2 px-4 py-2 rounded-12 text-sm-bold neutral-1000'>
                    Register
                  </p>
                  <h4 className='neutral-1000'>Create an Account</h4>
                </div>
                <div className='form-login mt-30'>
                  <div className='form-group'>
                    <input
                      className='form-control username'
                      name='name'
                      onChange={handleChange}
                      type='text'
                      placeholder='Email / Username'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      className='form-control email'
                      name='email'
                      onChange={handleChange}
                      type='text'
                      placeholder='Email / Username'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      className='form-control password'
                      name='password'
                      onChange={handleChange}
                      type='password'
                      placeholder='***********'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      className='form-control password'
                      name='password_confirmation'
                      onChange={handleChange}
                      type='password'
                      placeholder='***********'
                    />
                  </div>
                  <div className='form-group my-3'>
                    <div className='box-remember-forgot'>
                      <div className='d-flex align-items-center remeber-me neutral-500'>
                        <input className='cb-remember' type='checkbox' />I agree
                        to term and conditions
                      </div>
                    </div>
                  </div>
                  <div className='form-group mb-30'>
                    <button
                      className='w-100 btn btn-primary'
                      onClick={handelSubmit}
                    >
                      Sign up
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
                    <Link className='mr-10 btn btn-login btn-google' href='#'>
                      <img
                        src='/assets/imgs/template/popup/google.svg'
                        alt='Carento'
                      />
                      <span className='text-sm-bold'>Sign up with Google</span>
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
                    Already have an account?{' '}
                    <Link className='neutral-1000' href='/login'>
                      Login Here !
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
