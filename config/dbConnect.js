const mongoose = require("mongoose");

module.exports = mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(`Erorrs Occur in MongoDb Connection ${err}`));
