'use client'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../lib/hooks'
import { Bar, Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from 'chart.js'
import { Quicksand } from 'next/font/google'

// Enregistrement des éléments de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title)

const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] })

function AdvancedStats() {
  // États pour stocker les statistiques calculées
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [averageReservationPrice, setAverageReservationPrice] = useState(0)
  const [monthlyRevenue, setMonthlyRevenue] = useState([])
  const [popularCars, setPopularCars] = useState([])
  const [reservationsByStatus, setReservationsByStatus] = useState({})

  // Récupération des données du state Redux
  const { reservations } = useAppSelector(state => state.reservation)
  const { cars } = useAppSelector(state => state.cars)

  useEffect(() => {
    if (reservations && reservations.length > 0 && cars) {
      // Calcul du revenu total
      const total = reservations.reduce((sum, reservation) => {
        return sum + (reservation.price || 0)
      }, 0)
      setTotalRevenue(total)

      // Calcul du prix moyen des réservations
      setAverageReservationPrice(total / reservations.length)

      // Calcul des revenus par mois
      const revenueByMonth = reservations.reduce((acc, reservation) => {
        const date = new Date(reservation.date_start || reservation.created_at)
        const month = date.toLocaleString('default', { month: 'short' })
        acc[month] = (acc[month] || 0) + (reservation.price || 0)
        return acc
      }, {})
      setMonthlyRevenue(revenueByMonth)

      // Calcul des voitures les plus populaires
      const carReservations = reservations.reduce((acc, reservation) => {
        const carId = reservation.car_id
        acc[carId] = (acc[carId] || 0) + 1
        return acc
      }, {})

      const popularCarsData = cars.map(car => ({
        id: car.id,
        name: `${car.brand} ${car.model}`,
        count: carReservations[car.id] || 0
      })).sort((a, b) => b.count - a.count).slice(0, 5)

      setPopularCars(popularCarsData)

      // Réservations par statut
      const statusCount = reservations.reduce((acc, reservation) => {
        const status = reservation.state || 'unknown'
        acc[status] = (acc[status] || 0) + 1
        return acc
      }, {})
      setReservationsByStatus(statusCount)
    }
  }, [reservations, cars])

  // Données pour le graphique à barres des revenus mensuels
  const barChartData = {
    labels: Object.keys(monthlyRevenue),
    datasets: [
      {
        label: 'Revenus mensuels',
        data: Object.values(monthlyRevenue),
        backgroundColor: '#6083B7',
        borderColor: '#3B5998',
        borderWidth: 1
      }
    ]
  }

  // Données pour le graphique circulaire des statuts de réservation
  const pieChartData = {
    labels: Object.keys(reservationsByStatus),
    datasets: [
      {
        data: Object.values(reservationsByStatus),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2
      }
    ]
  }

  // Données pour le graphique linéaire des voitures populaires
  const lineChartData = {
    labels: popularCars.map(car => car.name),
    datasets: [
      {
        label: 'Nombre de réservations',
        data: popularCars.map(car => car.count),
        fill: false,
        tension: 0.1,
        backgroundColor: '#6083B7',
        borderColor: '#3B5998'
      }
    ]
  }

  return (
    <div className="mb-8">
      <h2 className={`text-2xl font-bold mb-6 text-gray-800 ${quicksand.className}`}>
        Statistiques détaillées
      </h2>
      
      {/* Cartes de statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <h3 className={`text-lg font-semibold text-gray-700 mb-2 ${quicksand.className}`}>Revenu total</h3>
          <p className="text-3xl font-bold text-blue-600">{totalRevenue.toLocaleString()} €</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <h3 className={`text-lg font-semibold text-gray-700 mb-2 ${quicksand.className}`}>Prix moyen</h3>
          <p className="text-3xl font-bold text-green-600">{averageReservationPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })} €</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <h3 className={`text-lg font-semibold text-gray-700 mb-2 ${quicksand.className}`}>Réservations totales</h3>
          <p className="text-3xl font-bold text-purple-600">{reservations?.length || 0}</p>
        </div>
      </div>
      
      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className={`text-lg font-semibold text-gray-700 mb-4 ${quicksand.className}`}>Revenus mensuels</h3>
          <div className="h-80">
            <Bar 
              data={barChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                }
              }} 
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className={`text-lg font-semibold text-gray-700 mb-4 ${quicksand.className}`}>Statuts des réservations</h3>
          <div className="h-80">
            <Pie 
              data={pieChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false
              }} 
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h3 className={`text-lg font-semibold text-gray-700 mb-4 ${quicksand.className}`}>Voitures les plus réservées</h3>
          <div className="h-80">
            <Line 
              data={lineChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedStats