const upload = require("../middleware/upload");
const database = require('../database')
const path = require("path");
const uploadDomain = async (req, res) => {
  try {
    await upload(req, res);
    if (req.files.length == 1){
    console.log(req.files);
    // const pathString = (path.relative(req.files[0].path,`/assets/upload/${req.url}`)).replaceAll( "\.\./", "" );
    // req.files.forEach((file)=>{
    //   console.log(file.path)
    // })
    
    console.log(req.body.domain_name)
    const domain_name = String(req.body.domain_name).replaceAll(/["']/g, "\"");
    const domain_description = String(req.body.domain_description).replaceAll(/["']/g, "\"");
    const pathString = (path.relative(req.files[0].path,`/assets/upload/${req.url}`)).replaceAll( "\.\./", "" );
    const pathIndex = (req.files[0].path).indexOf(pathString);
    const image_path = (req.files[0].path).substring(pathIndex);
    const link_url =  String(req.body.link_url);
    // const upload_img = "INSERT INTO `upload_domain` ( `domain_name`,`domain_description`,`image_path`,`link_url`) VALUES('" + domain_name + "','" + domain_description + "'," + image_path +","+ link_url + ")"
    const upload_img = `INSERT INTO upload_domain (domain_name,domain_description,image_path,link_url) VALUES('${domain_name}','${domain_description}','${image_path}','${link_url}');`

    database.query(upload_img)
    
    return res.send(`Files has been uploaded.`);
  }
    
    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }
    return res.send(`Select only 1 file`);
  } catch (error) {
    console.log(error);
    console.log(error.code);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};
const showDomain = async (req,res) => {
  const selectQuery = 'SELECT id,domain_name,domain_description,image_path,link_url FROM upload_domain'
  database.query(selectQuery, (err, data) => {
    // console.log(data);
    res.json(data)
  })
}
const deleteDomain = async (req,res) => {
  const id = req.params.id;
  const deleteData = 'DELETE FROM upload_domain WHERE id =' + id
  database.query(deleteData)
  console.log("Deleted!!")
}
const updateDomain = async(req,res) =>{
  const domain_name = req.body.domain_name;
  const domain_description = req.body.domain_description;
  const image_path = "'"+ String(req.files[0].path)+"'" ;
  const link_url ="'"+ String(req.body.link_url)+"'";
  const id = req.params.id;
  const selectId = 'SELECT id FROM upload_domain WHERE id = ' + id
  database.query(id, (err, data) => {
    // const idMax = data[0].id
    const updateData = "UPDATE `upload_domain` SET `domain_name` = '" + domain_name + "',`domain_description` = '" + domain_description + "', `image_path` = " + image_path + ", `link_url` = '" + link_url + "' WHERE `id` = " + selectId
    database.query(updateData)
    res.send("Updated!!")
    res.end()
})
}

module.exports = {
  uploadDomain,
  showDomain,
  deleteDomain,
  updateDomain
};