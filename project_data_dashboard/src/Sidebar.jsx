import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const loc = useLocation();

  const linkStyle = (path) => ({
    display: "block",
    padding: "0.6rem 1rem",
    textDecoration: "none",
    color: loc.pathname === path ? "white" : "#ddd",
    background: loc.pathname === path ? "#222" : "transparent",
    borderRadius: 6,
    marginBottom: 6,
  });

  return (
    <aside
      style={{
        width: 200,
        padding: "1rem",
        borderRight: "1px solid rgba(255,255,255,0.03)",
        background: "#0f0f0f",
      }}
    >
      <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>SpaceX</h2>
      <nav>
        <Link to="/" style={linkStyle("/")}>
          Dashboard
        </Link>

      </nav>

      <div style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#aaa" }}>
        Click a launch card to view details.
      </div>
    </aside>
  );
}
