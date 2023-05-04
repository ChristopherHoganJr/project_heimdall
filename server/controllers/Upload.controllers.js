const download = require("image-downloader");
const fs = require("fs");

module.exports = {
  fileUpload: async (req, res) => {
    const { path, originalname } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newImage = path + "." + ext;
    fs.renameSync(path, newImage);

    res.status(200).json(newImage);
  },
  linkUpload: async (req, res) => {
    let { link } = req.body;
    const newName = "image-" + Date.now() + ".jpg";
    await download.image({
      url: link,
      dest: "../../uploads/" + newName,
    });
    res.json(newName);
  },
};
