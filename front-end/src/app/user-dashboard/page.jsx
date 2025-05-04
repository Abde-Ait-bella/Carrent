'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchUserReservations } from '../../lib/features/reservationSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCar, faMoneyBillWave, faClock, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { Quicksand, Poppins } from 'next/font/google';
import Navbar  from '../../app/(components)/Navbar';

const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

// Fonction utilitaire pour formater la durée de réservation
const formatReservationDuration = (reservation) => {
  const start = new Date(reservation.rental_start);
  const end = new Date(reservation.rental_end);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return `${diffDays} ${diffDays > 1 ? 'jours' : 'jour'}`;
};

// Fonction pour afficher l'état de la réservation
const getStatusBadge = (state) => {
  switch (state) {
    case 'confirmed':
      return <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Confirmée</span>;
    case 'pending':
      return <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full">En attente</span>;
    case 'cancelled':
      return <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Annulée</span>;
    default:
      return <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">Inconnue</span>;
  }
};

function UserDashboard() {
  const dispatch = useAppDispatch();
  const { userReservations, loading, error } = useAppSelector(state => state.reservation);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil((userReservations?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = userReservations?.slice(startIndex, startIndex + itemsPerPage) || [];
  
  useEffect(() => {
    dispatch(fetchUserReservations());
  }, [dispatch]);

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8">
      <h1 className={`text-3xl font-bold mb-6 ${poppins.className}`}>Mon tableau de bord</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className={`text-2xl font-semibold mb-4 ${poppins.className}`}>Mes réservations</h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-blue-600">Chargement...</div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
            Une erreur est survenue: {error}
          </div>
        ) : userReservations?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 border-b font-semibold text-gray-500 text-xs text-left uppercase tracking-wide">
                  <th className={`px-4 py-3 text-sm ${quicksand.className}`}>Voiture</th>
                  <th className={`px-4 py-3 text-sm ${quicksand.className}`}>Date début</th>
                  <th className={`px-4 py-3 text-sm ${quicksand.className}`}>Date fin</th>
                  <th className={`px-4 py-3 text-sm ${quicksand.className}`}>Prix</th>
                  <th className={`px-4 py-3 text-sm ${quicksand.className}`}>État</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {paginatedData.map(reservation => (
                  <tr key={reservation.id} className="text-gray-700 hover:bg-gray-50">
                    <td className={`px-4 py-3 ${quicksand.className}`}>
                      <div className="flex items-center">
                        <div className="hidden md:block relative mr-3 rounded-md w-12 h-12 overflow-hidden">
                          {reservation.car?.image ? (
                            <img 
                              src={`${process.env.NEXT_PUBLIC_API_URL_SAP}/storage/${reservation.car.image}`} 
                              alt={`${reservation.car?.brand} ${reservation.car?.model}`}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                              <FontAwesomeIcon icon={faCar} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className={`font-medium ${quicksand.className}`}>
                            {reservation.car?.brand} {reservation.car?.model}
                          </p>
                          <p className="text-sm text-gray-500">{reservation.car?.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-sm ${quicksand.className}`}>
                      {new Date(reservation.rental_start).toLocaleDateString('fr-FR')}
                    </td>
                    <td className={`px-4 py-3 text-sm ${quicksand.className}`}>
                      {new Date(reservation.rental_end).toLocaleDateString('fr-FR')}
                    </td>
                    <td className={`px-4 py-3 text-sm ${quicksand.className}`}>
                      {reservation.total_price} DH
                    </td>
                    <td className={`px-4 py-3 text-sm ${quicksand.className}`}>
                      {getStatusBadge(reservation.state)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-50 px-4 py-3 border-t">
                <span className="flex justify-center sm:justify-start items-center col-span-1 text-sm text-gray-700">
                  Page {currentPage} sur {totalPages}
                </span>
                <nav className="flex justify-center sm:justify-end col-span-1">
                  <ul className="inline-flex items-center">
                    <li>
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`${
                          currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'
                        } flex items-center justify-center px-3 h-8 rounded-l-md text-white`}
                      >
                        Préc.
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i}>
                        <button
                          onClick={() => setCurrentPage(i + 1)}
                          className={`${
                            currentPage === i + 1 ? 'bg-blue-600' : 'bg-gray-300'
                          } flex items-center justify-center px-3 h-8 text-white`}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`${
                          currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'
                        } flex items-center justify-center px-3 h-8 rounded-r-md text-white`}
                      >
                        Suiv.
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400 text-4xl mb-4" />
            <p className={`text-gray-600 text-lg ${poppins.className}`}>
              Vous n'avez pas encore de réservation.
            </p>
            <Link href="/cars" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Découvrir nos voitures
            </Link>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default UserDashboard;