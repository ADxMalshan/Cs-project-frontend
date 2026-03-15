import { Link } from "react-router-dom"
import "./css/notFoundPage.css"

export default function NotFound() {

    return (

        <div className="notfound-container">

            {/* Floating paws */}
            <div className="paws">
                <span>🐾</span>
                <span>🐾</span>
                <span>🐾</span>
                <span>🐾</span>
                <span>🐾</span>
            </div>

            <div className="notfound-card">

                <h1 className="notfound-number">404</h1>

                <h2 className="notfound-title">
                    Oops! This page ran away 🐾
                </h2>

                <p className="notfound-text">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <Link to="/" className="notfound-btn">
                    Back to Home
                </Link>

            </div>

        </div>

    )
}