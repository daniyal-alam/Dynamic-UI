const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

const userRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
connectToMongo();
