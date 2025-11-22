import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLink } from "../api";

export default function Stats() {
  const { code } = useParams();
  const [link, setLink] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getLink(code);
      setLink(data);
    })();
  }, []);

  if (!link)
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.loader}></div>
      </div>
    );

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔗 Stats for <span style={styles.code}>{code}</span></h2>

        <div style={styles.row}>
          <span style={styles.label}>Target URL:</span>
          <a href={link.target} target="_blank" rel="noreferrer" style={styles.valueLink}>
            {link.target}
          </a>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Total Clicks:</span>
          <span style={styles.value}>{link.clicks}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Created:</span>
          <span style={styles.value}>
            {new Date(link.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    background: "#f5f7fb",
    minHeight: "100vh",
  },
  card: {
    background: "#ffffff",
    padding: "25px 30px",
    borderRadius: "18px",
    width: "450px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.08)",
    border: "1px solid #eaeaea",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "700",
    color: "#222",
  },
  code: {
    color: "#4e6bff",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#555",
  },
  value: {
    marginTop: "4px",
    fontSize: "16px",
    fontWeight: "500",
    color: "#111",
  },
  valueLink: {
    marginTop: "4px",
    fontSize: "16px",
    fontWeight: "500",
    textDecoration: "none",
    color: "#4e6bff",
    wordBreak: "break-all",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  loader: {
    width: "45px",
    height: "45px",
    border: "5px solid #eee",
    borderTop: "5px solid #4e6bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};
