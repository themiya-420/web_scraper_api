const express = require("express");
const scrapeRoutes = require("./routes/scraper");

const app = express();
const PORT = 3000;

// Use scrapeRoutes for '/scrape' endpoint
app.use("/scrape", scrapeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
