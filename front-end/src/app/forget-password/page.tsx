'use client'
import Layout from '@/app/(components)/layouts/PublicLayout'
import Link from 'next/link'
import api from '../Api/axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
// import Cookies from 'js-cookie'

export default function Login () {
  const [values, setValues] = useState()

  // toast.success("Succès !", {
  //   position: "top-right",
  //   autoClose: 3000, // Temps d'affichage (3s)
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "colored",
  // });

  const handleChange = (e:any) => {
    const { name, value } = e.target

    const newObject = { ...values, [name]: value }

    setValues(newObject)
  }

  const handelSubmit = async e => {
    e.preventDefault()
    console.log(values)

    await api
      .post('/sendPasswordResetLink', values)
      .then(response => {
        const { status, data } = response
        if (status === 200 && data) {
          toast.success("Nous vous avons envoyé un lien pour réinitialiser votre mot de passe. Vérifiez votre adresse e-mail.", {
            // position: "top-right",
            // autoClose: false, // Temps d'affichage (3s)
            // hideProgressBar: false,
            // closeOnClick: true,
            // pauseOnHover: true,
            // draggable: true,
            // progress: undefined,
            theme: "colored",
            style: { background: "#6083B7", color: "#F2F9FE", width : "45rem" }
          });
        }
      })
      .catch(({response}) => {
        console.log();
        if (response) {
          toast.error(response.data.error || 'Une erreur est survenue !')
        }else{
      toast.error("Problème de connexion au serveur !", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
      });
        }
      })
  }

  return (
    <>
      <ToastContainer style={{ width: "20rem" }} />
      <Layout footerStyle={1}>
        <div className='pt-140 pb-170 container'>
          <div className='row'>
            <div className='mx-auto col-lg-5'>
              <div className='bg-[#CCE5F6] px-3 px-md-5 border rounded-3 ptb-50'>
                <div className='login-content'>
                  <div className='text-center'>
                    <p className='d-inline-flex align-items-center bg-2 px-4 py-2 rounded-12 text-sm-bold neutral-1000'>
                      Forget Passowrd
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
