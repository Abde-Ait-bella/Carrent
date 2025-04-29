'use client'
import { useEffect } from 'react'
import Layout from '../(components)/layout/Layout'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchCars } from '@/lib/features/carsSlice'
import { useRouter } from 'next/navigation'

export default function Cars() {
    const dispatch = useAppDispatch()
    const { cars, status, error } = useAppSelector(state => state.cars)
    const router = useRouter()
    
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCars())
        }
    }, [status, dispatch])
    
    const handleCarClick = (carId: number) => {
        router.push(`/cars-details-1/${carId}`)
    }
    
    return (
        <Layout>
            <section className="section-box box-cars background-body">
                <div className="container">
                    <h3 className="text-heading-1 text-center">Available Cars</h3>
                    
                    {status === 'loading' && (
                        <div className="text-center my-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                    
                    {status === 'failed' && (
                        <div className="text-center my-5">
                            <p className="text-danger">Error loading cars: {error}</p>
                        </div>
                    )}
                    
                    <div className="row mt-50">
                        {cars.map((car) => (
                            <div key={car.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <div onClick={() => handleCarClick(car.id)} style={{cursor: 'pointer'}}>
                                    <CarCard
                                        image={car.image}
                                        title={`${car.brand} ${car.model} ${car.year}`}
                                        price={car.price_per_day}
                                        color={car.color}
                                        seat={car.quantity}
                                        engine={car.engine}
                                        status={car.status}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    )
}