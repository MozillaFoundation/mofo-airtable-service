const env = require("./env");
const base = require("./base");

const projectOKRMapTable = base.table(env.get("projectOkrMap"));
const month = new Intl.DateTimeFormat("en-US", { month: "long" });

module.exports = async function(req, res) {
  let { projectID, okrs = "", launchDate } = req.body;
  okrs = okrs.split(",", 4);

  if (!okrs.length) {
    return res.sendStatus(200);
  }

  for (let okr of okrs) {
    try {
      await projectOKRMapTable.create({
        "OKR": [ okr ],
        "Launched Project": [ projectID ],
        "Project Launch Month": launchDate ? month.format(new Date(launchDate)) : "No Month Specified"
      });
    } catch (err) {
      console.error(`Failed to add ${okr} - ${projectID} map with: `, err);
    }
  }



  res.sendStatus(200);
};
