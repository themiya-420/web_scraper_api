// routes/scrapeRoutes.js
const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Fetch HTML content from a website
    const response = await axios.get(
      "https://en.wikipedia.org/wiki/JavaScript"
    );
    const html = response.data;

    // Parse HTML content using jsdom
    const dom = new JSDOM(response.data);

    console.log(response.data);
    const document = dom.window.document;

    // Wait for content to load
    await new Promise((resolve) => {
      document.addEventListener("DOMContentLoaded", resolve);
    });

    // Extract data using DOM manipulation
    const titleElement = document.querySelector("mw-page-title-main");
    const descriptionElement = document.querySelector("wikitable");

    // Check if elements exist before accessing properties
    const title = titleElement ? titleElement.textContent : "";
    const description = descriptionElement
      ? descriptionElement.textContent
      : title;

    // Send scraped data as JSON response
    res.json({ title, description });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while scraping the website" });
  }
});

module.exports = router;
