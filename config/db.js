const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database connection established",
      connect.connection.host,
      connect.connection.port
    );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectDb;
