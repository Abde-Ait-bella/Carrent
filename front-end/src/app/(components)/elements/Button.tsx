import {  SpinnerRoundFilled } from 'spinners-react'

function button ({isLoading, onClick}) {
  return (
      <button className='w-100 btn btn-primary' onClick={onClick}>
        Sign in
        {isLoading ? <SpinnerRoundFilled color='#85C1E9' thickness={100} size={30} /> : null}
      </button>
  )
}

export default button
