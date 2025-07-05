import fetch from 'node-fetch';
// Send request to the backend server
const PORT = 8080;
fetch(`http://localhost:${PORT}/categories`)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    return res.json(); 
  })
  .then((data) => {
    console.dir(data, { depth: null }); // Log full tree structure
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
