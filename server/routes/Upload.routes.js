const Upload = require("../controllers/Upload.controllers");
const { authenticate } = require("../config/jwt.config");

const multer = require("multer");
const imageUpload = multer({ dest: "./uploads/" });

module.exports = (app) => {
  app.post(
    "/api/uploads/image",
    imageUpload.single("file"),
    authenticate,
    Upload.fileUpload
  );
  app.post("/api/uploads/image", authenticate, Upload.linkUpload);
};
