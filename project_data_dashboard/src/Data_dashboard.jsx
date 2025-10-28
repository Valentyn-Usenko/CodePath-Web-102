import React, { useState, useEffect } from "react";

function DataDashboard() {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.spacexdata.com/v4/launches");
        const data = await res.json();
        setLaunches(data);
        setFilteredLaunches(data);
      } catch (err) {
        console.error("Error fetching SpaceX data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = launches;

    if (filterStatus !== "All") {
      const success = filterStatus === "Successful";
      filtered = filtered.filter((l) => l.success === success);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((l) =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLaunches(filtered);
  }, [searchTerm, filterStatus, launches]);

  const totalLaunches = launches.length;
  const successfulLaunches = launches.filter((l) => l.success).length;
  const successRate =
    totalLaunches > 0 ? ((successfulLaunches / totalLaunches) * 100).toFixed(1) : 0;

  if (loading) return <p>Loading SpaceX data...</p>;

  return (
    <div className="dashboard">
      <h1>🚀 SpaceX Launch Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{totalLaunches}</h2>
          <p>Total Launches</p>
        </div>
        <div className="stat-card">
          <h2>{successfulLaunches}</h2>
          <p>Successful Launches</p>
        </div>
        <div className="stat-card">
          <h2>{successRate}%</h2>
          <p>Success Rate</p>
        </div>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by mission name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All</option>
          <option>Successful</option>
          <option>Failed</option>
        </select>
      </div>

      <div className="launch-grid">
        {filteredLaunches.slice(0, 50).map((launch) => (
          <div key={launch.id} className="launch-card">
            <img
              src={launch.links.patch.small || "https://via.placeholder.com/100"}
              alt={launch.name}
            />
            <h3>{launch.name}</h3>
            <p>{new Date(launch.date_utc).toLocaleDateString()}</p>
            <p
              style={{
                color: launch.success ? "lightgreen" : "salmon",
                fontWeight: "bold",
              }}
            >
              {launch.success ? "Successful" : "Failed"}
            </p>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              {launch.details
                ? launch.details.slice(0, 80) + "..."
                : "No details available."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataDashboard;
