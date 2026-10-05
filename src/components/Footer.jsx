// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "20px 0",
        background: "#111827",
        color: "white",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        &copy; {new Date().getFullYear()} ProTask. All rights reserved.{" "}
        <Link to="/" style={{ color: "#3b82f6", textDecoration: "none" }}>
          Home
        </Link>
      </div>
    </footer>
  );
}
