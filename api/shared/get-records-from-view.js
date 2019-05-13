const Airtable = require("../../airtable");
const env = require("./env");

const allowedBases = env.get("allowedBases", []);

module.exports = function(req, res) {
  const { base } = req.params;
  const { table, view, maxRecords } = req.query;

  if (allowedBases.indexOf(base) < 0) {
    console.error(`${base} is not an allowed base`);
    return res.sendStatus(400);
  }

  const Base = new Airtable().base(base);
  let results = [];

  Base(table).select({ view, maxRecords: maxRecords|0 }).eachPage((records, fetchNextPage) => {
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
