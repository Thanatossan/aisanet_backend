const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadDomainController = require("../controllers/upload_domain");

let routes = app => {
  router.get("/api/", homeController.getHome);

  router.post("/api/upload_domain", uploadDomainController.uploadDomain);
  router.get("/api/get_domain", uploadDomainController.showDomain);
  router.delete("/api/del_domain", uploadDomainController.deleteDomain);
  router.post("/api/del_domain", uploadDomainController.updateDomain);

  
  // router.post("/upload_gallery", uploadController.multipleUpload);
  // router.post("/upload_meettest", uploadController.multipleUpload);

  return app.use("/", router);
};

module.exports = routes;