'use client'
import Layout from '@/app/(components)/layouts/PublicLayout'
import Link from 'next/link'
import api from '../Api/axios'
import { useState } from 'react'
import Button from '@/app/(components)/elements/Button'
import ToastNotification from '../(components)/elements/ToastNotification'
import Cookies from 'js-cookie'
import { stat } from 'fs'

export default function Login () {
  const [state, setState] = useState<{
    values: any
    loading: boolean
    typeToast: string
    contentToast: string
    width: string
  }>({
    values: null, // ou {} selon ce que tu attends
    loading: false,
    typeToast: '',
    contentToast: '',
    width: ''
  })

  const updateState = (newState: Partial<typeof state>) => {
    setState(prevState => ({
      ...prevState,
      ...newState
    }))
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    let newValue

    if (type == 'checkbox') {
      newValue = checked
    } else {
      newValue = value
    }

    const values = { ...state.values, [name]: newValue }

    updateState({values})

        
  }

  const handelSubmit = async (e: any) => {
    updateState({ loading: true })

    e.preventDefault()
    await api
      .post('/login', state.values)
      .then(response => {
        const { status, data } = response

        if (status === 200) {
          updateState({
            loading: false,
            typeToast: 'success',
            contentToast: 'Connexion réussie !',
            width: '22rem'
          })
          Cookies.set('role', data.user_role, { expires: 7, secure: true })
          Cookies.set('AUTHENTICATED', true, { expires: 7, secure: true })
          if (state.values.remember) {
            localStorage.setItem('token', data.authorisation.token)
          } else {
            sessionStorage.setItem('token', data.authorisation.token)
          }
          window.location.href = '/dashboard'
        }
      })
      .catch(({ response }) => {
        updateState({
          loading: false,
          typeToast: 'error',
          contentToast: response?.data?.message || 'Une erreur est survenue !',
          width: '27rem'
        })
      })
  }

  return (
    <>
      {state.typeToast ? (
        <ToastNotification
          type={state.typeToast}
          content={state.contentToast}
          width={state.width}
        />
      ) : null}
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
                            <input
                              className='cb-remember'
                              onChange={handleChange}
                              name='remember'
                              type='checkbox'
                            />
                            Remember me{' '}
                          </label>
                        </div>
                        <div className='forgotpass'>
                          <Link
                            className='text-xs-medium neutral-500'
                            href='/forget-password'
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='form-group mb-30'>
                      <Button
                        isLoading={state.loading}
                        onClick={handelSubmit}
                      />
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
