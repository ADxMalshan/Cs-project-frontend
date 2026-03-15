import React from "react";
import "./LoadingPage.css";

export default function LoadingPage() {
  return (
    <div className="loading-container">
      <div className="loading-card">
        <div className="paw-animation">
          <span>🐾</span>
          <span>🐾</span>
          <span>🐾</span>
        </div>
        <h1 className="loading-text">Fetching your furry friend’s details...</h1>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}