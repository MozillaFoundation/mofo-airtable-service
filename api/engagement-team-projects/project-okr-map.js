const env = require("./env");
const base = require("./base");

const projectOKRMapTable = base.table(env.get("projectOkrMap"));

module.exports = async function(req, res) {
  let { projectID, okrs = "" } = req.body;
  okrs = okrs.split(",", 4);

  if (!okrs.length) {
    return res.sendStatus(200);
  }

  for (let okr of okrs) {
    try {
      await projectOKRMapTable.create({
        "OKR": [ okr ],
        "Launched Project": [ projectID ]
      });
    } catch (err) {
      console.error(`Failed to add ${okr} - ${projectID} map with: `, err);
    }
  }

  res.sendStatus(200);
};
