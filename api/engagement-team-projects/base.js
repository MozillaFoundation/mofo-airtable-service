const Airtable = require("../../airtable");
const env = require("./env");

module.exports = new Airtable().base(env.get("base"));
