const Habitat = require("habitat");

const API_KEY = (new Habitat()).get("apiKey");

module.exports = function(req, res, next) {
//   const auth = req.get("authorization");
  
//   console.log('All headers: ', req.headers);

//   if (!auth) {
//     return res.sendStatus(401);
//   }

//   if (auth.indexOf("Basic ") === 0 && auth.slice(6) === API_KEY) {
    next();
//   } else {
//     res.sendStatus(403);
//   }
};
