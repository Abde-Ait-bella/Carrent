'use client'
import Layout from '@/app/(components)/layouts/PublicLayout'
import api from '../Api/axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useSearchParams, useRouter } from "next/navigation";

export default function Login () {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); 
  const email = searchParams.get("email"); 
  const router = useRouter()


  const [values, setValues] = useState({
    token,
    email
  })

  

  const handleChange = e => {
    const { name, value } = e.target

    const newObject = { ...values, [name]: value }

    setValues(newObject)
  console.log(values);
  
  }

  const handelSubmit = async e => {
    e.preventDefault()
    console.log(values)

    await api
      .post('/resetPassword', values )
      .then(response => {
        const { status } = response
        if (status === 201 ) {
          toast.success(
            "Votre mot de passe a été changé avec succès !",
            {
              theme: 'colored',
              style: { background: '#8cb369', color: '#F2F9FE', width: '25rem' }
            }
          )
          router.push('/login');
        }
      })
      .catch(({ response }) => {
        if (response) {
          toast.error(response.data.message, {
            style: { color: "#e07a5f", width : "45rem" },
            theme: 'dark'
          })
        } else {
          toast.error('Problème de connexion au serveur !', {
            position: 'top-left',
            autoClose: 5000,
            theme: 'dark'
          })
        }
      })
  }

  return (
    <>
      <ToastContainer style={{ width: '20rem' }} />
      <Layout footerStyle={1}>
        <div className='pt-140 pb-170 container'>
          <div className='row'>
            <div className='mx-auto col-lg-5'>
              <div className='bg-[#CCE5F6] px-3 px-md-5 border rounded-3 ptb-50'>
                <div className='login-content'>
                  <div className='text-center'>
                    <p className='d-inline-flex align-items-center bg-2 px-4 py-2 rounded-12 text-sm-bold neutral-1000'>
                      Reset Passowrd
                    </p>
                    <h4 className='neutral-1000'>Welcome back</h4>
                  </div>
                  <div className='form-login mt-30'>
                    <div className='form-group'>
                      <input
                        className='focus:!bg-[#DDEDF8] form-control password'
                        onChange={handleChange}
                        name='password'
                        type='password'
                        placeholder='Password'
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        className='focus:!bg-[#DDEDF8] form-control password'
                        onChange={handleChange}
                        name='password_confirmation'
                        type='password'
                        placeholder='Password confirmation'
                      />
                    </div>
                    <div className='form-group mb-30'>
                      <button
                        className='w-100 btn btn-primary'
                        onClick={handelSubmit}
                      >
                        Send
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
