const API = "http://localhost:4000/api/links";

export async function createLink(data) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function getLinks() {
  const res = await fetch(API);
  return await res.json();
}

export async function getLink(code) {
  const res = await fetch(`${API}/${code}`);
  return await res.json();
}

export async function deleteLink(code) {
  const res = await fetch(`${API}/${code}`, { method: "DELETE" });
  return await res.json();
}
