import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#4caf50", "#f44336"];

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

  // helper: launches per year
  const launchesPerYear = React.useMemo(() => {
    const map = {};
    launches.forEach((l) => {
      if (!l.date_utc) return;
      const year = new Date(l.date_utc).getFullYear();
      map[year] = (map[year] || 0) + 1;
    });
    const arr = Object.keys(map)
      .map((y) => ({ year: y, launches: map[y] }))
      .sort((a, b) => a.year - b.year);
    return arr;
  }, [launches]);

  // helper: success vs failed totals
  const successSummary = React.useMemo(() => {
    const success = launches.filter((l) => l.success).length;
    const failed = launches.filter((l) => l.success === false).length;
    const unknown = launches.length - success - failed;
    // We'll combine unknown with failed for a simple two-slice pie (or keep 3 slices if we want)
    return [
      { name: "Success", value: success },
      { name: "Failed/Unknown", value: failed + unknown },
    ];
  }, [launches]);

  const totalLaunches = launches.length;
  const successfulLaunches = launches.filter((l) => l.success).length;
  const successRate =
    totalLaunches > 0
      ? ((successfulLaunches / totalLaunches) * 100).toFixed(1)
      : 0;

  if (loading) return <p style={{ padding: "2rem" }}>Loading SpaceX data...</p>;

  return (
    <div className="dashboard" style={{ padding: "1.5rem" }}>
      <h1 style={{ marginTop: 0 }}>🚀 SpaceX Launch Dashboard</h1>

      <div className="stats-grid" style={{ marginTop: 12 }}>
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

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, marginTop: 20 }}>
        <section style={{ background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Launches per Year</h3>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={launchesPerYear}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="launches" fill="#3182ce" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: 12, color: "#aaa" }}>
            Shows how many launches occurred each year.
          </p>
        </section>

        <section style={{ background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Success vs Failed (total)</h3>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={successSummary}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {successSummary.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: 12, color: "#aaa" }}>
            Overall success vs failures (unknowns counted with failed for simplicity).
          </p>
        </section>
      </div>

      <div className="filter-bar" style={{ marginTop: 18 }}>
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

      <div className="launch-grid" style={{ marginTop: 18 }}>
        {filteredLaunches.slice(0, 50).map((launch) => (
          <Link
            to={`/launch/${launch.id}`}
            key={launch.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="launch-card" style={{ cursor: "pointer" }}>
              <img
                src={launch.links?.patch?.small || "https://via.placeholder.com/100"}
                alt={launch.name}
              />
              <h3 style={{ marginBottom: 6 }}>{launch.name}</h3>
              <p style={{ margin: 0 }}>{new Date(launch.date_utc).toLocaleDateString()}</p>
              <p
                style={{
                  color: launch.success ? "lightgreen" : "salmon",
                  fontWeight: "bold",
                  margin: "6px 0",
                }}
              >
                {launch.success ? "Successful" : "Failed"}
              </p>
              <p style={{ fontSize: "0.9rem", opacity: 0.85 }}>
                {launch.details ? launch.details.slice(0, 80) + "..." : "No details available."}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DataDashboard;
