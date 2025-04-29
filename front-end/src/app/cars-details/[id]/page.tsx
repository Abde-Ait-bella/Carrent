'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../(components)/layout/Layout'
import Slider from 'react-slick'
import Marquee from 'react-fast-marquee'
import ModalVideo from 'react-modal-video'
import MyDatePicker from '../../(components)/elements/MyDatePicker'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { openreservation } from '@/lib/features/reservationSlice'
// Import your car fetching action if you have one
import { fetchCarById } from '@/lib/features/carsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faPalette } from '@fortawesome/free-solid-svg-icons'
import BookingPage from '@/app/(components)/booking/page'

export default function CarDetails() {
    // Get the id from the URL params
    const params = useParams();
    const id = params.id;

    console.log('Car ID:', id);


    // You could fetch the car data based on the ID
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (id) {
            dispatch(fetchCarById(id));

        }
    }, [id, dispatch]);
    const car = useAppSelector((state) => state.cars.currentCar);

    console.log('Car Details:', car);

    const [isOpen, setOpen] = useState(false)
    const [nav1, setNav1] = useState(null)
    const [nav2, setNav2] = useState(null)
    const [slider1, setSlider1] = useState(null)
    const [slider2, setSlider2] = useState(null)

    useEffect(() => {
        // Reset sliders on page refresh/mount to ensure they initialize properly
        setNav1(null);
        setNav2(null);
        setSlider1(null);
        setSlider2(null);

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            setNav1(slider1);
            setNav2(slider2);
        }, 100);

        return () => clearTimeout(timer);
    }, [slider2, slider1])

    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        // prevArrow: <SlickArrowLeft />,
        // nextArrow: <SlickArrowRight />,
    }

    const settingsThumbs = {
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: nav1,
        dots: false,
        focusOnSelect: true,
        vertical: false,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 700, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } },
        ],
    }
    const [isAccordion, setIsAccordion] = useState(null)

    const handleAccordion = (key: any) => {
        setIsAccordion(prevState => prevState === key ? null : key)
    }

    const handleBookNow = (carId: number) => {
        console.log('Book Now clicked for car ID:', carId);
        
        dispatch(openreservation(carId));
    };

    // Format price for display
    const pricePerDay = parseFloat(car?.price_per_day).toFixed(2)

    return (
        <>
            <BookingPage />
        
            <style jsx global>{`
                .modal-video {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                    background-color: rgba(0, 0, 0, 0.5);
                }
            `}</style>

            <Layout footerStyle={1}>
                <div>
                    <section className="box-section box-breadcrumb background-body">
                        <div className="container">
                            <ul className="breadcrumbs">
                                <li>
                                    <Link href="/">Home</Link>
                                    <span className="arrow-right">
                                        <svg width={7} height={12} viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </li>
                                <li>
                                    <Link href="/cars">Cars Rental</Link>
                                    <span className="arrow-right">
                                        <svg width={7} height={12} viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </li>
                                <li><span className="text-breadcrumb">{car?.brand} {car?.model} {car?.year}</span></li>
                            </ul>
                        </div>
                    </section>
                    <section className="section-box box-banner-home2 background-body">
                        <div className="container">
                            <div className="container-banner-activities">
                                <div className="box-banner-activities">
                                    <Slider
                                        {...settingsMain}
                                        asNavFor={nav2 as any}
                                        ref={(slider) => setSlider1(slider as any)}
                                        className="banner-activities-detail">
                                        <div className="banner-slide-activity">
                                            <img src="/assets/imgs/cars-details/banner.png" alt={`${car?.brand} ${car?.model}`} />
                                        </div>
                                        <div className="banner-slide-activity">
                                            <img src="/assets/imgs/cars-details/banner2.png" alt={`${car?.brand} ${car?.model}`} />
                                        </div>
                                        <div className="banner-slide-activity">
                                            <img src="/assets/imgs/cars-details/banner3.png" alt={`${car?.brand} ${car?.model}`} />
                                        </div>
                                        <div className="banner-slide-activity">
                                            <img src="/assets/imgs/cars-details/banner4.png" alt={`${car?.brand} ${car?.model}`} />
                                        </div>
                                    </Slider>
                                    <div className="box-button-abs">
                                        <Link className="btn btn-primary rounded-pill" href="#">
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 8V2.75C20 2.3375 19.6625 2 19.25 2H14C13.5875 2 13.25 2.3375 13.25 2.75V8C13.25 8.4125 13.5875 8.75 14 8.75H19.25C19.6625 8.75 20 8.4125 20 8ZM19.25 0.5C20.495 0.5 21.5 1.505 21.5 2.75V8C21.5 9.245 20.495 10.25 19.25 10.25H14C12.755 10.25 11.75 9.245 11.75 8V2.75C11.75 1.505 12.755 0.5 14 0.5H19.25Z" fill="currentColor" />
                                                <path d="M20 19.25V14C20 13.5875 19.6625 13.25 19.25 13.25H14C13.5875 13.25 13.25 13.5875 13.25 14V19.25C13.25 19.6625 13.5875 20 14 20H19.25C19.6625 20 20 19.6625 20 19.25ZM19.25 11.75C20.495 11.75 21.5 12.755 21.5 14V19.25C21.5 20.495 20.495 21.5 19.25 21.5H14C12.755 21.5 11.75 20.495 11.75 19.25V14C11.75 12.755 12.755 11.75 14 11.75H19.25Z" fill="currentColor" />
                                                <path d="M8 8.75C8.4125 8.75 8.75 8.4125 8.75 8V2.75C8.75 2.3375 8.4125 2 8 2H2.75C2.3375 2 2 2.3375 2 2.75V8C2 8.4125 2.3375 8.75 2.75 8.75H8ZM8 0.5C9.245 0.5 10.25 1.505 10.25 2.75V8C10.25 9.245 9.245 10.25 8 10.25H2.75C1.505 10.25 0.5 9.245 0.5 8V2.75C0.5 1.505 1.505 0.5 2.75 0.5H8Z" fill="currentColor" />
                                                <path d="M8 20C8.4125 20 8.75 19.6625 8.75 19.25V14C8.75 13.5875 8.4125 13.25 8 13.25H2.75C2.3375 13.25 2 13.5875 2 14V19.25C2 19.6625 2.3375 20 2.75 20H8ZM8 11.75C9.245 11.75 10.25 12.755 10.25 14V19.25C10.25 20.495 9.245 21.5 8 21.5H2.75C1.505 21.5 0.5 20.495 0.5 19.25V14C0.5 12.755 1.505 11.75 2.75 11.75H8Z" fill="currentColor" />
                                            </svg>
                                            See All Photos
                                        </Link>
                                        <a className="btn btn-white-md popup-youtube" onClick={() => setOpen(true)}>
                                            <img src="/assets/imgs/page/activities/video.svg" alt="Video" />Video Clips
                                        </a>
                                    </div>
                                </div>
                                <div className="slider-thumnail-activities">
                                    <Slider
                                        {...settingsThumbs}
                                        asNavFor={nav1 as any}
                                        ref={(slider) => setSlider2(slider as any)}
                                        className="slider-nav-thumbnails-activities-detail">
                                        <div className="banner-slide"><img src="/assets/imgs/page/car/banner-thumn.png" alt="Thumbnail 1" /></div>
                                        <div className="banner-slide"><img src="/assets/imgs/page/car/banner-thumn2.png" alt="Thumbnail 2" /></div>
                                        <div className="banner-slide"><img src="/assets/imgs/page/car/banner-thumn3.png" alt="Thumbnail 3" /></div>
                                        <div className="banner-slide"><img src="/assets/imgs/page/car/banner-thumn4.png" alt="Thumbnail 4" /></div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="box-section box-content-tour-detail background-body">
                        <div className="container">
                            <div className="tour-header">
                                <div className="tour-rate">
                                    <div className="rate-element">
                                        <span className="rating">{car?.stars}.0 <span className="text-sm-medium neutral-500">(Rating)</span></span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="tour-title-main">
                                            <h4 className="neutral-1000">{car?.brand} {car?.model} {car?.year} - {car?.color}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="tour-metas">
                                    <div className="tour-meta-left">
                                        <p className="text-md-medium neutral-1000 mr-20 tour-location">
                                            <svg className="invert" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <path d="M7.99967 0C4.80452 0 2.20508 2.59944 2.20508 5.79456C2.20508 9.75981 7.39067 15.581 7.61145 15.8269C7.81883 16.0579 8.18089 16.0575 8.38789 15.8269C8.60867 15.581 13.7943 9.75981 13.7943 5.79456C13.7942 2.59944 11.1948 0 7.99967 0ZM7.99967 8.70997C6.39211 8.70997 5.0843 7.40212 5.0843 5.79456C5.0843 4.187 6.39214 2.87919 7.99967 2.87919C9.6072 2.87919 10.915 4.18703 10.915 5.79459C10.915 7.40216 9.6072 8.70997 7.99967 8.70997Z" fill="#101010" />
                                            </svg>
                                            Location (Available)
                                        </p>
                                        <p className="text-md-medium neutral-1000 mr-30 tour-code">
                                            <svg className="invert" xmlns="http://www.w3.org/2000/svg" width={20} height={18} viewBox="0 0 20 18" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.2729 0.273646C13.4097 0.238432 13.5538 0.24262 13.6884 0.28573L18.5284 1.83572L18.5474 1.84209C18.8967 1.96436 19.1936 2.19167 19.4024 2.4875C19.5891 2.75202 19.7309 3.08694 19.7489 3.46434C19.7494 3.47622 19.7497 3.4881 19.7497 3.49998V15.5999C19.7625 15.8723 19.7102 16.1395 19.609 16.3754C19.6059 16.3827 19.6026 16.39 19.5993 16.3972C19.476 16.6613 19.3017 16.8663 19.1098 17.0262C19.1023 17.0324 19.0947 17.0385 19.087 17.0445C18.8513 17.2258 18.5774 17.3363 18.2988 17.3734L18.2927 17.3743C18.0363 17.4063 17.7882 17.3792 17.5622 17.3133C17.5379 17.3081 17.5138 17.3016 17.4901 17.294L13.4665 16.0004L6.75651 17.7263C6.62007 17.7614 6.47649 17.7574 6.34221 17.7147L1.47223 16.1647C1.46543 16.1625 1.45866 16.1603 1.45193 16.1579C1.0871 16.0302 0.813939 15.7971 0.613929 15.5356C0.608133 15.528 0.602481 15.5203 0.596973 15.5125C0.395967 15.2278 0.277432 14.8905 0.260536 14.5357C0.259972 14.5238 0.259689 14.5119 0.259689 14.5V2.39007C0.246699 2.11286 0.301239 1.83735 0.420015 1.58283C0.544641 1.31578 0.724533 1.10313 0.942417 0.93553C1.17424 0.757204 1.45649 0.6376 1.7691 0.61312C2.03626 0.583264 2.30621 0.616234 2.56047 0.712834L6.56277 1.99963L13.2729 0.273646ZM13.437 1.78025L6.72651 3.50634C6.58929 3.54162 6.44493 3.53736 6.31011 3.49398L2.08011 2.13402C2.06359 2.1287 2.04725 2.12282 2.03113 2.11637C2.00054 2.10413 1.96854 2.09972 1.93273 2.10419C1.91736 2.10611 1.90194 2.10756 1.88649 2.10852C1.88649 2.10852 1.88436 2.10866 1.88088 2.11001C1.8771 2.11149 1.86887 2.11532 1.85699 2.12447C1.81487 2.15686 1.79467 2.18421 1.77929 2.21715C1.76189 2.25446 1.75611 2.28942 1.75823 2.32321C1.7592 2.33879 1.75969 2.35439 1.75969 2.36999V14.4772C1.76448 14.5336 1.78316 14.5879 1.81511 14.6367C1.86704 14.7014 1.90866 14.7272 1.94108 14.7398L6.59169 16.2199L13.3028 14.4937C13.44 14.4584 13.5844 14.4626 13.7192 14.506L17.8938 15.8482C17.9184 15.8537 17.9428 15.8605 17.9669 15.8685C18.0209 15.8865 18.0669 15.8902 18.1034 15.8862C18.1214 15.8833 18.1425 15.8759 18.1629 15.8623C18.1981 15.8309 18.2196 15.8024 18.2346 15.7738C18.2473 15.7399 18.2533 15.7014 18.2511 15.6668C18.2502 15.6512 18.2497 15.6356 18.2497 15.62V3.52464C18.2453 3.48222 18.2258 3.42174 18.1769 3.3525C18.147 3.3102 18.1062 3.2784 18.0582 3.26022L13.437 1.78025Z" fill="#101010" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M6.55957 2.01953C6.97375 2.01953 7.30957 2.35532 7.30957 2.76953V16.9195C7.30957 17.3338 6.97375 17.6695 6.55957 17.6695C6.14533 17.6695 5.80957 17.3338 5.80957 16.9195V2.76953C5.80957 2.35532 6.14533 2.01953 6.55957 2.01953Z" fill="#101010" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.4893 0.330078C13.9035 0.330078 14.2393 0.665862 14.2393 1.08008V15.2301C14.2393 15.6443 13.9035 15.9801 13.4893 15.9801C13.0751 15.9801 12.7393 15.6443 12.7393 15.2301V1.08008C12.7393 0.665862 13.0751 0.330078 13.4893 0.330078Z" fill="#101010" />
                                            </svg>
                                            Reg Number: {car?.registration_number}
                                        </p>
                                    </div>
                                    <div className="tour-meta-right">
                                        <Link className="btn btn-share" href="#">
                                            <svg width={16} height={18} viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13 11.5332C12.012 11.5332 11.1413 12.0193 10.5944 12.7584L5.86633 10.3374C5.94483 10.0698 6 9.79249 6 9.49989C6 9.10302 5.91863 8.72572 5.77807 8.37869L10.7262 5.40109C11.2769 6.04735 12.0863 6.46655 13 6.46655C14.6543 6.46655 16 5.12085 16 3.46655C16 1.81225 14.6543 0.466553 13 0.466553C11.3457 0.466553 10 1.81225 10 3.46655C10 3.84779 10.0785 4.20942 10.2087 4.54515L5.24583 7.53149C4.69563 6.90442 3.8979 6.49989 3 6.49989C1.3457 6.49989 0 7.84559 0 9.49989C0 11.1542 1.3457 12.4999 3 12.4999C4.00433 12.4999 4.8897 11.9996 5.4345 11.2397L10.147 13.6529C10.0602 13.9331 10 14.2249 10 14.5332C10 16.1875 11.3457 17.5332 13 17.5332C14.6543 17.5332 16 16.1875 16 14.5332C16 12.8789 14.6543 11.5332 13 11.5332Z" fill="currentColor" />
                                            </svg>
                                            Share
                                        </Link>
                                        <Link className="btn btn-wishlish" href="#">
                                            <svg width={20} height={18} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.2222 2.3638C4.34203 0.243977 7.65342 0.0419426 10.0004 1.7577C12.3473 0.0419426 15.6587 0.243977 17.7786 2.3638C20.1217 4.70695 20.1217 8.50594 17.7786 10.8491L12.1217 16.5059C10.9501 17.6775 9.05063 17.6775 7.87906 16.5059L2.2222 10.8491C-0.120943 8.50594 -0.120943 4.70695 2.2222 2.3638Z" fill="currentColor" />
                                            </svg>
                                            Wishlist
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-30">
                                <div className="col-lg-8">
                                    <div className="box-feature-car">
                                        <div className="list-feature-car">
                                            <div className="item-feature-car w-md-25">
                                                <div className="item-feature-car-inner flex gap-3">
                                                    <div className="feature-image"><img src="/assets/imgs/page/car/km.svg" alt="Mileage" /></div>
                                                    <div className="feature-info">
                                                        <h6 className="text-md-bold neutral-1000">Mileage</h6>
                                                        <span className="text-md neutral-500">{car?.mileage} km</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-feature-car w-md-25">
                                                <div className="item-feature-car-inner flex gap-3 ">
                                                    <div className="feature-image"><img src="/assets/imgs/template/icons/automatic.svg" alt="Engine" /></div>
                                                    <div className="feature-info">
                                                        <h6 className="text-md-bold neutral-1000">Engine</h6>
                                                        <span className="text-md neutral-500">{car?.engine}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-feature-car w-md-25">
                                                <div className="item-feature-car-inner flex gap-3">
                                                    <div className="feature-image"><FontAwesomeIcon icon={faPalette} /></div>
                                                    <div className="feature-info">
                                                        <h6 className="text-md-bold neutral-1000">Color</h6>
                                                        <span className="text-md neutral-500">{car?.color}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-feature-car w-md-25">
                                                <div className="item-feature-car-inner flex gap-3">
                                                    <div className="feature-image"><FontAwesomeIcon icon={faCarSide} /></div>
                                                    <div className="feature-info">
                                                        <h6 className="text-md-bold neutral-1000">Seats</h6>
                                                        <span className="text-md neutral-500">{car?.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-collapse-expand">
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="booking-form">
                                        <div className="head-booking-form">
                                            <p className="text-xl-bold neutral-1000">Rent This Vehicle</p>
                                        </div>
                                        <div className="content-booking-form">
                                            <div className="item-line-booking last-item pb-0">
                                                <strong className="text-md-medium neutral-1000">Price per day</strong>
                                                <div className="line-booking-right">
                                                    <span className="text-md-bold neutral-1000">${pricePerDay}</span>
                                                </div>
                                            </div>
                                            <div className="item-line-booking last-item pb-0">
                                                <strong className="text-md-medium neutral-1000">Status</strong>
                                                <div className="line-booking-right">
                                                    <span className="text-md-bold text-success">{car?.status}</span>
                                                </div>
                                            </div>
                                            <div className="box-button-book mt-3">
                                                <button className="btn btn-book" onClick={() => handleBookNow(car.id)}>
                                                    Book Now
                                                    <svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="box-need-help">
                                                <Link href="#">
                                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.96917 2.5C5.85547 2.5 2.5 5.85547 2.5 9.96917C2.5 14.0837 5.85547 17.4383 9.96917 17.4383C14.0837 17.4383 17.4392 14.0837 17.4392 9.96917C17.4392 7.99004 16.6636 6.09607 15.2839 4.71541C13.9033 3.33577 12.0093 2.5 9.96917 2.5ZM0.833008 9.96917C0.833008 4.93489 4.93489 0.833008 9.96917 0.833008C12.3997 0.833008 14.6649 1.82534 16.3047 3.46516C17.9445 5.10498 18.9058 7.37106 18.9058 9.96917C18.9058 15.0043 14.8048 19.105 9.96917 19.105C5.13447 19.105 0.833008 15.0043 0.833008 9.96917Z" fill="currentColor" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.96734 7.46205C9.52351 7.46205 9.16325 7.82231 9.16325 8.26614C9.16325 8.70996 9.52351 9.07023 9.96734 9.07023C10.4112 9.07023 10.7714 8.70996 10.7714 8.26614C10.7714 7.82231 10.4112 7.46205 9.96734 7.46205ZM7.49609 8.26614C7.49609 6.90082 8.60202 5.79489 9.96734 5.79489C11.3327 5.79489 12.4386 6.90082 12.4386 8.26614C12.4386 9.63146 11.3327 10.7374 9.96734 10.7374C8.60202 10.7374 7.49609 9.63146 7.49609 8.26614Z" fill="currentColor" />
                                                    </svg>
                                                    Need some help?
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="background-100 pt-55 pb-55 mt-100">
                            <div className="container">
                                <Marquee direction='left' pauseOnHover={true} className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center wow fadeIn">
                                    <ul className="carouselTicker__list">
                                        <li className="carouselTicker__item">
                                            <div className="item-brand">
                                                <img className="light-mode" src="/assets/imgs/page/homepage2/lexus.png" alt="Lexus" />
                                                <img className="dark-mode" src="/assets/imgs/page/homepage2/lexus-w.png" alt="Lexus" />
                                            </div>
                                        </li>
                                        <li className="carouselTicker__item">
                                            <div className="item-brand">
                                                <img className="light-mode" src="/assets/imgs/page/homepage2/mer.png" alt="Mercedes" />
                                                <img className="dark-mode" src="/assets/imgs/page/homepage2/mer-w.png" alt="Mercedes" />
                                            </div>
                                        </li>
                                        <li className="carouselTicker__item">
                                            <div className="item-brand">
                                                <img className="light-mode" src="/assets/imgs/page/homepage2/bmw.png" alt="BMW" />
                                                <img className="dark-mode" src="/assets/imgs/page/homepage2/bmw-w.png" alt="BMW" />
                                            </div>
                                        </li>
                                        <li className="carouselTicker__item">
                                            <div className="item-brand">
                                                <img className="light-mode" src="/assets/imgs/page/homepage2/toyota.png" alt="Toyota" />
                                                <img className="dark-mode" src="/assets/imgs/page/homepage2/toyota-w.png" alt="Toyota" />
                                            </div>
                                        </li>
                                    </ul>
                                </Marquee>
                            </div>
                        </div>
                    </section>
                    <ModalVideo channel='youtube' isOpen={isOpen} videoId="JXMWOmuR1hU" onClose={() => setOpen(false)} />
                </div>
            </Layout>
        </>
    )
}