'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link"
import { swiperGroup3 } from '@/util/swiperOptions'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchCars } from '@/lib/features/carsSlice'
import { openReservationForm } from '@/lib/features/reservationFormSlice'
import { Car } from '@/lib/features/carsSlice'
import BookingPage from "../booking/page";

export default function CarsListing1() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchCars())
	}, [dispatch])

	const cars = useAppSelector((state) => state.cars.cars)

	// Group cars into pairs for displaying in the slider
	const groupCarsInPairs = (carsArray: Car[]): Car[][] => {
		const result: Car[][] = [];
		for (let i = 0; i < carsArray.length; i += 2) {
			result.push(carsArray.slice(i, i + 2));
		}
		return result;
	}

	const carGroups = cars && cars.length > 0 ? groupCarsInPairs(cars) : [];

	// Function to handle booking button click
	const handleBookNow = (carId: number) => {
		dispatch(openReservationForm(carId));
	};

	return (
		<>
			{/* Booking form modal */}
			<BookingPage />
			
			<section className="section-box box-flights background-body">
				<div className="container">
					<div className="align-items-end row">
						<div className="col-md-9 wow fadeInUp">
							<h3 className="mb-5 title-svg neutral-1000">Vehicles</h3>
							<p className="text-bold text-lg-medium neutral-500">The world's leading car brands</p>
						</div>
						<div className="position-relative mb-30 col-md-3 wow fadeInUp">
							<div className="justify-content-end box-button-slider box-button-slider-team">
								<div className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-2">
									<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
										<path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</div>
								<div className="swiper-button-next swiper-button-next-style-1 swiper-button-next-2">
									<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
										<path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</div>
							</div>
						</div>
					</div>
					<div className="block-flights wow fadeInUp">
						<div className="mt-30 box-swiper">
							<Swiper {...swiperGroup3} className="swiper-group-3 swiper-group-journey swiper-container">
								<div className="swiper-wrapper">
									{carGroups.length > 0 ? (
										carGroups.map((group, groupIndex) => (
											<SwiperSlide key={`group-${groupIndex}`}>
												{group.map((car: Car) => (
													<div key={car.id} className="card-journey-small background-card hover-up">
														<div className="card-image">
															<Link href={`/cars-details-1?id=${car.id}`}>
																<img 
																	className="!h-[13rem] w-full object-cover"
																	src={car.image ? `http://127.0.0.1:8000/storage/${car.image}` : "/assets/imgs/cars-listing/cars-listing-1/car-1.png"} 
																	alt={`${car.brand} ${car.model}`} 
																/>
															</Link>
														</div>
														<div className="card-info">
															<div className="card-rating">
																<div className="card-left" />
																<div className="card-right">
																	<span className="rating">{car.stars}.0 <span className="text-sm-medium neutral-500">(Reviews)</span></span>
																</div>
															</div>
															<div className="card-title">
																<Link className="heading-6 neutral-1000" href={`/cars-details-1?id=${car.id}`}>
																	{car.brand} {car.model}
																</Link>
															</div>
															<div className="card-program">
																<div className="card-location">
																	<p className="text-location text-md-medium neutral-500">
																		{car.description ? car.description.substring(0, 30) + '...' : 'Available now'}
																	</p>
																</div>
																<div className="card-facitlities">
																	<p className="text-md-medium card-miles">{car.mileage} km</p>
																	<p className="text-md-medium card-gear">{car.engine || 'Automatic'}</p>
																	<p className="text-md-medium card-fuel">{car.year}</p>
																	<p className="text-md-medium card-seat">{car.quantity} available</p>
																</div>
																<div className="endtime">
																	<div className="card-price">
																		<p className="me-2 text-md-medium neutral-500">From</p>
																		<h6 className="heading-6 neutral-1000">{car.price_per_day} MAD</h6>
																	</div>
																	<div className="card-button">
																		<button 
																			className="btn btn-gray" 
																			onClick={() => handleBookNow(car.id)}
																		>
																			Book Now
																		</button>
																	</div>
																</div>
															</div>
														</div>
													</div>
												))}
											</SwiperSlide>
										))
									) : (
										<SwiperSlide>
											<div className="card-journey-small background-card hover-up">
												<div className="card-info text-center">
													<p className="text-lg-medium neutral-500 p-5">Loading cars...</p>
												</div>
											</div>
										</SwiperSlide>
									)}
								</div>
							</Swiper>
						</div>
					</div>
					<div className="d-flex justify-content-center">
						<Link className="text-nowrap btn btn-brand-2 wow fadeInUp" href="/cars-list-1">
							<svg className="me-2" xmlns="http://www.w3.org/2000/svg" width={19} height={18} viewBox="0 0 19 18" fill="none">
								<g clipPath="url(#clip0_117_4717)">
									<path d="M4.4024 14.0977C1.60418 11.2899 1.60418 6.71576 4.4024 3.90794L5.89511 5.40064V0.90332H1.39779L3.13528 2.64081C-0.378102 6.1494 -0.378102 11.8562 3.13528 15.3696C5.35275 17.5823 8.43896 18.403 11.2996 17.8175V15.9648C8.91413 16.584 6.26949 15.9648 4.4024 14.0977Z" fill="#101010" />
									<path d="M15.864 2.64036C13.6465 0.418093 10.5603 -0.402657 7.69971 0.182907V2.03559C10.0852 1.41643 12.7346 2.04519 14.5969 3.90748C17.4047 6.71531 17.4047 11.2894 14.5969 14.0973L13.1042 12.6045V17.1067H17.6063L15.8688 15.3692C19.3774 11.8558 19.3774 6.14894 15.864 2.64036Z" fill="#101010" />
								</g>
								<defs>
									<clipPath id="clip0_117_4717">
										<rect width={18} height={18} fill="white" transform="translate(0.5)" />
									</clipPath>
								</defs>
							</svg>
							Load More Cars
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}
