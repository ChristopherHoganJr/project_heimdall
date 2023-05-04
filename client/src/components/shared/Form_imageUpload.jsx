import React, { useState } from "react";
import axios from "axios";

const Form_imageUpload = ({ formInfo, setFormInfo }) => {
  const [imagePath, setImagePath] = useState("");

  const addImageByLink = async (e) => {
    e.preventDefault();
    if (imagePath.length < 1) {
    } else {
      const { data: filename } = await axios.post("/api/uploads/link", {
        link: imagePath,
        withCredentials: true,
      });
      setFormInfo({
        ...formInfo,
        image: [...formInfo.profileImage, filename],
      });
      setImagePath("");
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files;
    const data = new FormData();
    data.set("file", file[0]);
    axios
      .post("/api/uploads/image", data, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setFormInfo({
          ...formInfo,
          image: res.data,
        });
      });
  };

  return (
    <>
      <label htmlFor=''>Add Image</label>
      <input type='file' name='' id='' onChange={(e) => uploadImage(e)} />
    </>
  );
};

export default Form_imageUpload;
