const auth = require("../auth");

module.exports = function(express) {
  const router = express.Router();

  router.get("/getrecordsfromview", auth, require("./get-records-from-view"));

  return router;
}
