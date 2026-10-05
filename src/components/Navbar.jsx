import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/app-context";

export default function Navbar() {
  const { state, dispatch } = useContext(AppContext);
  const { darkMode } = state;

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  return (
    <nav
      style={{
        width: "100%",
        height: "70px",
        background: darkMode ? "#F8F8FF" : "#111827", //f9fafb
        color: darkMode ? "#111827" : "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        fontSize: "22px",
        fontWeight: "600",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        transition: "all 0.3s",
      }}
    >
      <div>
        <Link
          to="/"
          style={{
            color: darkMode ? "#111827" : "white",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
        >
          ProTask
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          fontSize: "18px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "25px", fontSize: "18px" }}>
          <Link
            to="/"
            style={{
              color: darkMode ? "#111827" : "white",
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              transition: "all 0.3s",
              marginRight: "auto",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = darkMode ? "#e5e7eb" : "#1f2937";
            }}
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
          >
            Dashboard
          </Link>
        </div>

        {/* Dark Mode */}
        <button
          onClick={toggleDarkMode}
          style={{
            background: "transparent",
            border: "none",
            color: darkMode ? "#111827" : "white",
            fontSize: "24px",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "6px",
            transition: "all 0.3s",
            display: "flex",
            alignItems: "center",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = darkMode ? "#e5e7eb" : "#1f2937";
          }}
          onMouseLeave={(e) => (e.target.style.background = "transparent")}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <i className={darkMode ? "bi bi-moon-fill" : "bi bi-sun-fill"}></i>
        </button>
      </div>
    </nav>
  );
}
