module.exports = function(express) {
  const router = express.Router();

  router.get("/getrecordsfromview/:base", require("./get-records-from-view"));

  return router;
}
