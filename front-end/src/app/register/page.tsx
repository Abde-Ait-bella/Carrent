'use client'
import Layout from '@/app/(components)/layouts/PublicLayout'
import Link from 'next/link'
import { useState } from 'react'
import api from '../Api/axios'
import Button from '../(components)/elements/Button'
import ToastNotification from '../(components)/elements/ToastNotification'
import Cookies from 'js-cookie'

export default function Register () {
  const [state, setState] = useState<{
    values: any
    loading: boolean
    typeToast: string
    contentToast: string
    width: string
  }>({
    values: null,
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
    const { name, value } = e.target

    const values = { ...state.values, [name]: value }

    updateState({ values })

    console.log(state.values)
  }

  const handelSubmit = async () => {
    updateState({ loading: true })
    await api
      .post('/signup', state.values)
      .then(response => {
        const { status, data } = response

        if (status === 201) {
          updateState({
            loading: false,
            typeToast: 'success',
            contentToast: data.status
          })

          Cookies.set('AUTHENTICATED', String(true), { expires: 7, secure: true })
          if (state.values.remember) {
            localStorage.setItem('token', data.authorisation.token)
          } else {
            sessionStorage.setItem('token', data.authorisation.token)
          }
          window.location.href = '/dashboard'

          setTimeout(() => {
            updateState({ typeToast: '' });
          }, 3000);
        }
      })
      .catch(({ response }) => {
        updateState({
          loading: false,
          typeToast: 'error',
          contentToast: response?.data?.message || 'Une erreur est survenue !',
          width: '27rem'
        })
        setTimeout(() => {
          updateState({ typeToast: '', loading: false });
        }, 4000);
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
              <div className='bg-[#CCE5F6] px-3 px-md-5 border rounded-3 register-content ptb-50'>
                <div className='text-center'>
                  <p className='d-inline-flex align-items-center bg-2 px-4 py-2 rounded-12 text-sm-bold neutral-1000'>
                    Register
                  </p>
                  <h4 className='neutral-1000'>Create an Account</h4>
                </div>
                <div className='form-login mt-30'>
                    <div className='form-group'>
                      <input
                        className='focus:!bg-[#DDEDF8] form-control username'
                        name='name'
                        onChange={handleChange}
                        type='text'
                        placeholder='Email / Username '
                      />
                    </div>
                  <div className='form-group'>
                    <input
                      className='focus:!bg-[#DDEDF8] form-control email'
                      name='email'
                      onChange={handleChange}
                      type='text'
                      placeholder='Email'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      className='focus:!bg-[#DDEDF8] form-control password'
                      name='password'
                      onChange={handleChange}
                      type='password'
                      placeholder='***********'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      className='focus:!bg-[#DDEDF8] form-control password'
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
                    <Button isLoading={state.loading} onClick={handelSubmit} />
                  </div>
                  <p className='text-md-medium text-center neutral-500'>
                    Or connect with your social account
                  </p>
                  <div className='box-button-logins'>
                    {/* <Link className='mr-10 btn btn-login btn-google' href='#'>
                      <img
                        src='/assets/imgs/template/popup/google.svg'
                        alt='Carento'
                      />
                      <span className='text-sm-bold'>Sign up with Google</span>
                    </Link> */}
                    {/* <Link className='mr-10 btn btn-login' href='#'>
                      <img
                        src='/assets/imgs/template/popup/facebook.svg'
                        alt='Carento'
                      />
                    </Link> */}
                    {/* <Link className='btn btn-login' href='#'>
                      <img
                        src='/assets/imgs/template/popup/apple.svg'
                        alt='Carento'
                      />
                    </Link> */}
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
