const Airtable = require("../../airtable");
const env = require("./env");

const allowedBases = env.get("allowedBases", []);

module.exports = function(req, res) {
  const { base, table, view, maxRecords } = req.body;

  if (allowedBases.indexOf(baseName) < 0) {
    console.error(`${baseName} is not an allowed base`);
    return res.sendStatus(400);
  }

  const Base = new Airtable().base(base);
  let results = [];

  Base(table).select({ view, maxRecords }).eachPage((records, fetchNextPage) => {
    results = [
      ...results,
      ...records.map(r => r.fields)
    ];
    fetchNextPage();
  }, err => {
    if (err) {
      console.error(
`Failed to fetch records from:
  Base: ${base},
  Table: ${table},
  View: ${view},
with: `, err
);
      return res.sendStatus(500);
    }

    res.status(200).json(results);
  });
};
