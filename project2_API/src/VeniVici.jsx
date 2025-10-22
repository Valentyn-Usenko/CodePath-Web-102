import React, { useEffect, useState } from "react";

/**
 * VeniVici.jsx — no try/catch version
 * Uses the Metropolitan Museum of Art public API to fetch artworks.
 * Displays one artwork at a time with image + 3 attributes (Artist, Title, Date).
 * Click any attribute to add it to the ban list; click ban list items to remove.
 */

const SEARCH_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=painting";
const OBJECT_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

export default function VeniVici() {
  const [objectIDs, setObjectIDs] = useState([]);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [banList, setBanList] = useState([]);
  const [error, setError] = useState(null);

  // Fetch initial object IDs once
  useEffect(() => {
    let cancelled = false;
    async function loadIDs() {
      const res = await fetch(SEARCH_URL);
      if (!cancelled) {
        if (res.ok) {
          const data = await res.json();
          setObjectIDs(data.objectIDs || []);
        } else {
          setError("Failed to load object IDs.");
        }
      }
    }
    loadIDs();
    return () => {
      cancelled = true;
    };
  }, []);

  const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  async function discover() {
    setError(null);
    if (!objectIDs || objectIDs.length === 0) {
      setError("No data loaded yet. Try again in a moment.");
      return;
    }

    setLoading(true);
    const maxAttempts = 15;
    let found = null;
    let attempt = 0;

    while (!found && attempt < maxAttempts) {
      attempt++;
      const randomID = randomFrom(objectIDs);
      const res = await fetch(OBJECT_URL + randomID);

      if (!res.ok) {
        continue; // skip invalid responses
      }

      const data = await res.json();

      const image = data.primaryImageSmall || data.primaryImage;
      const artist = data.artistDisplayName || "Unknown Artist";
      const title = data.title || "Untitled";
      const date = data.objectDate || "Unknown Date";

      if (!image) {
        continue;
      }

      const attrs = [artist, title, date];
      const blocked = attrs.some((val) => banList.includes(val));

      if (!blocked) {
        found = {
          id: randomID,
          image,
          artist,
          title,
          date,
          objectURL: data.objectURL || null,
        };
      }
    }

    if (found) {
      setCurrent(found);
    } else {
      setError(
        "No non-banned results found after several tries. Clear some bans or try again."
      );
    }

    setLoading(false);
  }

  function addBan(val) {
    if (!val) return;
    if (!banList.includes(val)) {
      const newList = [...banList, val];
      setBanList(newList);

      // Clear current if it now contains the banned value
      if (current && [current.artist, current.title, current.date].includes(val)) {
        setCurrent(null);
      }
    }
  }

  function removeBan(val) {
    const newList = banList.filter((v) => v !== val);
    setBanList(newList);
  }

  const AttrRow = ({ label, value }) => (
    <div className="vv-attr-row">
      <strong>{label}:</strong>{" "}
      <span
        className={`vv-attr-value ${value ? "clickable" : ""}`}
        onClick={() => value && addBan(value)}
        title="Click to add to ban list"
      >
        {value}
      </span>
    </div>
  );

  return (
    <div className="vv-root card">
      <h1 className="vv-title">VeniVici — Discover Art</h1>

      <div className="vv-controls">
        <button className="vv-btn" onClick={discover} disabled={loading}>
          {loading ? "Searching..." : "Discover"}
        </button>
        <button
          className="vv-btn vv-clear"
          onClick={() => setBanList([])}
          title="Clear all bans"
        >
          Clear bans
        </button>
      </div>

      <div className="vv-main">
        {error && <div className="vv-error">{error}</div>}

        {current ? (
          <div className="vv-card">
            <div className="vv-image-wrap">
              <img src={current.image} alt={current.title} className="vv-image" />
            </div>

            <div className="vv-attrs">
              <AttrRow label="Artist" value={current.artist} />
              <AttrRow label="Title" value={current.title} />
              <AttrRow label="Date" value={current.date} />
            </div>

            {current.objectURL && (
              <div className="vv-meta">
                <a href={current.objectURL} target="_blank" rel="noreferrer">
                  View on MetMuseum.org
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="vv-placeholder">
            <p>Click Discover to load a random artwork with an image.</p>
          </div>
        )}
      </div>

      <div className="vv-banlist">
        <h3>Ban list</h3>
        {banList.length === 0 ? (
          <p className="vv-muted">No bans yet. Click an attribute to ban it.</p>
        ) : (
          <ul>
            {banList.map((b) => (
              <li
                key={b}
                className="vv-ban-item"
                onClick={() => removeBan(b)}
                title="Click to remove from ban list"
              >
                {b}
                <span className="vv-remove-hint"> ×</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="vv-note vv-muted">
        Tip: Click Artist / Title / Date to ban them. Discover will skip banned values.
      </div>
    </div>
  );
}
