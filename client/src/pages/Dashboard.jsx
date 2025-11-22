import React, { useState, useEffect } from "react";
import { createLink, getLinks } from "../api.js";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [target, setTarget] = useState("");
  const [links, setLinks] = useState([]);

  async function load() {
    const data = await getLinks();
    setLinks(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!target) return;

    await createLink({ target });   // backend expects "target"
    setTarget("");
    load();
  }

  return (
    <div className="dashboard">
      <h2>Shorten URL</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter long URL"
        />
        <button>Add</button>
      </form>

      <h3>Your Links</h3>
      <ul>
        {links.map((l) => (
          <li key={l.code}>
            {/* <a href={`/${l.code}`} target="_blank" rel="noreferrer">
              {l.code}
            </a> */}
            <a href={`http://localhost:4000/${l.code}`} target="_blank">
  {l.code}
</a>

            &nbsp; → &nbsp; {l.target}
            &nbsp; | &nbsp;
            <Link to={`/code/${l.code}`}>Stats</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
