'use client'
import ReservationList from '@/app/(components)/ReservationList'
import DashboardLayout from '../(components)/layouts/DashboardLayout'
import Statistical from './statistical/page'

function Dashboard () {


  return (
    <div>
      {/* <!-- Cards --> */}
      <Statistical/>

      {/* <!-- reservations --> */}
      <ReservationList />
    </div>
  )
}

Dashboard.getLayout = function getLayout (page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Dashboard
