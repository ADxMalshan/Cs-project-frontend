import { useEffect, useState } from "react";
import "./css/firstPage.css"
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faHeartPulse, faHouse, faPersonWalking, faScissors } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { array, func } from "prop-types";
import ProductCard from "../../components/product-card";
import LoadingPage from "../../components/loader";
export default function FirstPage() {
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState("");
    const [product, setProduct] = useState([]);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const navigate = useNavigate();
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [hash]);

    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem("token");
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/getUserDetails", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                setLoaded(true);
                setUser(res.data.user);
            }).catch((err) => {
                console.log(err);
            })
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then((res) => {
                setProduct(res.data);

            }).catch((err) => {
                console.log(err);
            })
            return;
        }

    }, [loaded])
    const gotoAppointment = (service) => {
        navigate("/appointment", { state: { selectedService: service } });
    }
    /* ---------- STATS COUNTER ---------- */

    function growingStats() {

        let valueDisplay = document.querySelectorAll(".stats .display");

        valueDisplay.forEach((value) => {

            let targetValue = parseInt(value.getAttribute("data-value"));
            let currentValue = 0;
            let increment = targetValue / 150;

            let interval = setInterval(() => {

                currentValue += increment;

                if (currentValue >= targetValue) {
                    clearInterval(interval);
                    value.textContent = targetValue + "+";
                } else {
                    value.textContent = Math.round(currentValue) + "+";
                }

            }, 40);

        });

    }


    /* ---------- EXPERIENCE COUNTER ---------- */

    function growingExperience() {

        let valueDisplay = document.querySelectorAll(".experience .display");

        valueDisplay.forEach((value) => {

            let targetValue = parseInt(value.getAttribute("data-value"));
            let currentValue = 0;
            let increment = targetValue / 150;

            let interval = setInterval(() => {

                currentValue += increment;

                if (currentValue >= targetValue) {
                    clearInterval(interval);
                    value.textContent = targetValue + "+";
                } else {
                    value.textContent = Math.round(currentValue) + "+";
                }

            }, 40);

        });

    }


    /* ---------- SCROLL TRIGGER ---------- */

    const statsSection = document.querySelector(".stats");
    const experienceSection = document.querySelector(".experience");

    let statsAnimated = false;
    let experienceAnimated = false;

    window.addEventListener("scroll", () => {

        const windowHeight = window.innerHeight;

        const statsTop = statsSection.getBoundingClientRect().top;
        const experienceTop = experienceSection.getBoundingClientRect().top;


        /* Trigger stats animation */
        if (!statsAnimated && statsTop < windowHeight - 100) {
            growingStats();
            statsAnimated = true;
        }


        /* Trigger experience animation */
        if (!experienceAnimated && experienceTop < windowHeight - 100) {
            growingExperience();
            experienceAnimated = true;
        }

    });
    console.log(product);
    return (
        <>
            {loaded &&
                <div className="firstPageContainer">

                    {/* HERO */}
                    <section className="hero">
                        <div className="hero-content">

                            <span className="badge">🐾 Your Trusted Pet Care Partner</span>

                            <h1>
                                Everything Your Pet Needs <br />
                                <span>in One Place</span>
                            </h1>

                            <p className="subtitle">
                                Professional Pet Care Services for Your Furry Friends
                            </p>

                            <p className="description">
                                PetsVCare animal hospitals provide a wide variety of services including
                                Vaccination, Consultation, Surgeries, Dental Scaling, Microchipping and much more.
                                Experienced doctors will always care for your precious furry friends.
                            </p>

                            <div className="hero-buttons">
                                <Link className="btn-cta" to="/appointment">Book Appointment</Link>
                                <Link className="btn-outline" to="/contact">Contact Us</Link>
                            </div>

                        </div>

                        <div className="hero-image">
                            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b" alt="Pets" />
                        </div>
                    </section>


                    {/* SERVICES */}
                    <section className="services" id="services">

                        <div className="service-card orange" onClick={() => gotoAppointment("boarding")}>
                            <FontAwesomeIcon icon={faHouse} />
                            <h3>Pet Boarding</h3>
                        </div>

                        <div className="service-card blue" onClick={() => gotoAppointment("walking")}>
                            <FontAwesomeIcon icon={faPersonWalking} />
                            <h3>Dog Walking</h3>
                        </div>

                        <div className="service-card purple" onClick={() => gotoAppointment("grooming")}>
                            <FontAwesomeIcon icon={faScissors} />
                            <h3>Grooming & Spa</h3>
                        </div>

                        <div className="service-card green" onClick={() => gotoAppointment("veterinary")}>
                            <FontAwesomeIcon icon={faHeartPulse} />
                            <h3>Veterinary Care</h3>
                        </div>

                    </section>


                    {/* IMPORTANT NOTICE */}
                    <section className="notice">

                        <h2>⚠ Important Notice</h2>

                        <p>
                            Our hospital operates until <b>10:00 PM</b>. However, to ensure quality care for
                            ongoing treatments and follow-ups, we stop admitting new cases at <b>9:00 PM</b>.
                        </p>

                        <p>
                            Please bring your pets for consultations before 9:00 PM.
                            Thank you for your understanding and cooperation.
                        </p>

                    </section>


                    {/* OPEN HOURS */}
                    <section className="open-hours">

                        <div className="hours-card">
                            <h1>365</h1>
                            <p>Days Open</p>
                        </div>

                        <div className="hours-card">
                            <h2>Weekdays & Weekends</h2>
                            <p>08:30 AM – 10:00 PM</p>
                        </div>

                    </section>


                    {/* DIAGNOSTICS */}
                    <section className="diagnostics">

                        <div className="diag-text">

                            <h2>State of the Art Modern Diagnostics</h2>

                            <p>
                                Our hospital is equipped with modern diagnostic facilities such as
                                Digital Radiography, Ultrasound scanning, Echography, Blood Pressure monitoring,
                                Ultrasonic dental scaling and many more advanced technologies.
                            </p>

                        </div>

                        <div className="diag-image">
                            <img src="https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Veterinarian examining a dog" />
                        </div>

                    </section>


                    {/* LABORATORY */}
                    <section className="laboratory">

                        <h2>Clinical Laboratory</h2>

                        <p>
                            We have a fully functional on-site clinical laboratory with modern
                            diagnostic facilities and internal and external quality control systems
                            to assure accurate test results.
                        </p>

                        <p>
                            Experienced and qualified laboratory technicians operate our laboratory
                            under the guidance of veterinary doctors.
                        </p>

                        <div className="section-image">
                            <img
                                src="https://images.pexels.com/photos/5626401/pexels-photo-5626401.jpeg?auto=compress&cs=tinysrgb&w=900"
                                alt="Clinical Laboratory Equipment"
                            />
                        </div>

                    </section>


                    {/* EXPERIENCE */}
                    <section className="experience">

                        <div>
                            <h1 className="display" data-value="23">23+</h1>
                            <p>Years Experience in Veterinary Field</p>
                        </div>

                        <div>
                            <h1 className="display" data-value="40000">40000+</h1>
                            <p>Mobile Service Sessions</p>
                        </div>

                        <div>
                            <h1 className="display" data-value="365">365</h1>
                            <p>Days Available</p>
                        </div>

                    </section>
                    {/* product */}
                    <div className="product-section">
                        {
                            [...product] 
                                .sort(() => Math.random() - 0.5)
                                .map((prct) => (
                                    <div className="product-wrapper" key={prct.productId}>
                                        <ProductCard product={prct} />
                                    </div>
                                ))
                        }
                    </div>

                    {/* <ProductCard product={product} stock={stock} /> */}

                    {/* MOBILE SERVICE */}
                    <section className="mobile-service">

                        <h2>Mobile Veterinary Service</h2>

                        <p>
                            The convenience of our ambulatory services is enjoyed by over
                            <b>40,000 satisfied sessions</b>.
                        </p>

                        <p>
                            Our patients receive personal attentive care from annual vaccination
                            to complicated medical conditions.
                        </p>

                        <p>
                            The mobile service provides the best possible care in the comfort
                            of your pet’s own home, resulting in a stress-free experience.
                        </p>

                        <div className="section-image">
                            <img
                                src="https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=900"
                                alt="Veterinarian examining a dog"
                            />
                        </div>

                    </section>


                    {/* INTENSIVE CARE */}
                    <section className="intensive-care">

                        <h2>Compassionate Intensive Care</h2>

                        <p>
                            Our dedicated staff always takes care of your precious companions
                            as part of our family.
                        </p>

                        <div className="section-image">
                            <img
                                src="https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=900"
                                alt="Pet Intensive Care Unit"
                            />
                        </div>

                    </section>


                    {/* SPECIAL SERVICES */}
                    <section className="special-services">

                        <h2>Domestic, Livestock & Wildlife Veterinary Care</h2>

                        <p>
                            Our experienced doctors provide veterinary services to:
                        </p>

                        <ul>
                            <li>Sri Lankan Police Kennels Division</li>
                            <li>Sri Lankan Police Mounted Division</li>
                            <li>Dehiwala Zoological Garden</li>
                        </ul>

                    </section>


                    {/* STATS */}
                    <section className="stats">

                        <div className="stats-content">

                            <div>
                                <h2 className="display" data-value="1000">1000+</h2>
                                <p>Total Pets Cared For</p>
                            </div>

                            <div>
                                <h2 className="display" data-value="500">500+</h2>
                                <p>Happy Pet Parents</p>
                            </div>

                            <div>
                                <h2 className="display" data-value="24">24/7</h2>
                                <p>Availability</p>
                            </div>

                        </div>

                    </section>


                    {/* FOOTER */}
                    <footer className="footer">

                        <div className="socials">
                            <i className="fab fa-facebook-f"></i>
                            <i className="fab fa-instagram"></i>
                            <i className="fab fa-twitter"></i>
                        </div>

                        <p>© 2026 Paws & Care. All rights reserved.</p>

                    </footer>

                </div>
            }
            {!loaded && <LoadingPage />}
        </>
    )

}