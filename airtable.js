const Airtable = require("airtable");
const Habitat = require("habitat");

const env = new Habitat("airtable", {
  requestTimeout: 300000,
  endpointUrl: "https://api.airtable.com"
});

Airtable.configure({
  apiKey: env.get("apiKey"),
  endpointUrl: env.get("endpointUrl"),
  requestTimeout: env.get("requestTimeout")
});

module.exports = Airtable;
