const path = require("path");

const home = (req, res) => {
  // return res.sendFile(path.join(`${__dirname}/../views/index.html`));
  return res.json("data")
};

module.exports = {
  getHome: home
};
