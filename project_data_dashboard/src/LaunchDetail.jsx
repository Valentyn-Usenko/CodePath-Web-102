import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function LaunchDetail() {
  const { id } = useParams();
  const [launch, setLaunch] = useState(null);
  const [rocket, setRocket] = useState(null);
  const [launchpad, setLaunchpad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchLaunch = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
        const data = await res.json();
        setLaunch(data);

        if (data.rocket) {
          fetch(`https://api.spacexdata.com/v4/rockets/${data.rocket}`)
            .then((r) => r.json())
            .then((rdata) => setRocket(rdata))
            .catch(() => {});
        }
        if (data.launchpad) {
          fetch(`https://api.spacexdata.com/v4/launchpads/${data.launchpad}`)
            .then((r) => r.json())
            .then((p) => setLaunchpad(p))
            .catch(() => {});
        }
      } catch (err) {
        console.error("Error fetching launch detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunch();
  }, [id]);

  if (loading) {
    return <p style={{ padding: "1.5rem" }}>Loading details...</p>;
  }

  if (!launch) {
    return (
      <div style={{ padding: "1.5rem" }}>
        <p>Launch not found.</p>
        <Link to="/">Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "1.5rem", maxWidth: 900 }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: 12 }}>
        ← Back to dashboard
      </Link>

      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ width: 140 }}>
          <img
            src={launch.links?.patch?.small || "https://via.placeholder.com/120"}
            alt={launch.name}
            style={{ width: "100%", objectFit: "contain", borderRadius: 8 }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ marginTop: 0 }}>{launch.name}</h1>
          <p style={{ marginTop: 0 }}>
            <strong>Date:</strong> {new Date(launch.date_utc).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span style={{ color: launch.success ? "lightgreen" : "salmon", fontWeight: "bold" }}>
              {launch.success ? "Successful" : "Failed/Unknown"}
            </span>
          </p>

          <p style={{ maxWidth: 700 }}>
            <strong>Details:</strong>{" "}
            {launch.details ? launch.details : "No extended details available."}
          </p>

          <div style={{ marginTop: 12 }}>
            <p style={{ margin: 0 }}>
              <strong>Rocket:</strong> {rocket?.name || (launch.rocket ? launch.rocket : "N/A")}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Launchpad:</strong> {launchpad?.name || (launch.launchpad ? launch.launchpad : "N/A")}
            </p>
            {launch.links?.webcast && (
              <p style={{ marginTop: 8 }}>
                <a href={launch.links.webcast} target="_blank" rel="noreferrer">
                  Watch Webcast
                </a>
              </p>
            )}
            {launch.links?.article && (
              <p style={{ marginTop: 6 }}>
                <a href={launch.links.article} target="_blank" rel="noreferrer">
                  Article / Read more
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      {}
      {launch.payloads && launch.payloads.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <h3>Payload(s)</h3>
          <ul>
            {launch.payloads.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {}
      <div style={{ marginTop: 18, fontSize: 12, color: "#aaa" }}>
        Direct link to this page: <code>{window.location.href}</code>
      </div>
    </div>
  );
}
