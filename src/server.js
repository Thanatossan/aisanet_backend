const express = require("express");
const app = express();
const cors = require('cors');
const database = require('./database')
const initRoutes = require("./routes/web");


database.connect((err) => {
  if (err) throw err
  console.log("Database connected!!!");
})

app.use(cors());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
// app.use('/api', api)

let port = 3001;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});

