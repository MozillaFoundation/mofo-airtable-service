const env = require("./env");
const base = require("./base");

const projectOKRMapTable = base.table(env.get("projectOKRMap"));

module.exports = async function(req, res) {
  const { projectID, okrs = [] } = req.body;

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
