import { useEffect, useState } from "react";
import "./css/firstPage.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { faHeartPulse, faHouse, faPersonWalking, faScissors } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { array, func } from "prop-types";
export default function FirstPage() {
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState("");
    const [isIntersecting, setIsIntersecting] = useState(false);
    const navigate = useNavigate();
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
                console.log(res.data.user);
            })
            return;

        }

    }, [loaded])

    function growing() {
        let valueDisplay = document.querySelectorAll(".display");

        valueDisplay.forEach((value) => {
            let targetValue = parseInt(value.getAttribute("data-value"));
            let currentValue = 0;
            let increment = targetValue / 100;
            let interval = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    clearInterval(interval);
                    value.textContent = targetValue + "+";
                } else {
                    value.textContent = Math.floor(currentValue) + "+";
                }
            }, 40);
        });
    }
    const statsSection = document.querySelector(".stats");
    let hasAnimated = false;

    window.addEventListener("scroll", () => {
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (!hasAnimated && sectionTop < windowHeight - 100) { // 100px before section
            growing();
            hasAnimated = true; // run only once
        }
    });
    return (
        <div className="firstPageContainer">
            <section className="hero">
                <div className="hero-content">
                    <span className="badge">🐾 Your Trusted Pet Care Partner</span>

                    <h1>
                        We Love Your Pets <br />
                        <span>and Care for Them</span>
                    </h1>

                    <p className="subtitle">
                        Professional Pet Care Services for Your Furry Friends.
                    </p>

                    <p className="description">
                        Paws & Care is a leading full-service pet care provider dedicated to keeping your furry friends happy, healthy, and safe.
                    </p>

                    <div className="hero-buttons">
                        <button className="btn-primary">Get a Free Consultation</button>
                        <button className="btn-outline">View Services</button>
                    </div>
                </div>

                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b" alt="Pets"></img>

                </div>
            </section>
            <section className="services">
                <div className="service-card orange">
                    <FontAwesomeIcon icon={faHouse} />
                    <h3>Pet Boarding</h3>
                </div>

                <div className="service-card blue">
                    <FontAwesomeIcon icon={faPersonWalking} />
                    <h3>Dog Walking</h3>
                </div>

                <div className="service-card purple">
                    <FontAwesomeIcon icon={faScissors} />
                    <h3>Grooming & Spa</h3>
                </div>

                <div className="service-card green">
                    <FontAwesomeIcon icon={faHeartPulse} />

                    <h3>Veterinary Care</h3>
                </div>
            </section>
            {/* ================= STATS + STARS ================= */}
            <section className="stats">
                {/* Stats content */}
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
            {/* Footer */}
            <footer className="footer">
                <div className="socials">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-twitter"></i>
                </div>
                <p>© 2026 Paws & Care. All rights reserved.</p>
            </footer>
        </div>

    )

}