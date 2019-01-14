module.exports = function(express) {
  const router = express.Router();

  router.post("/create-project-okr-mapping", require("./project-okr-map"));

  return router;
}
