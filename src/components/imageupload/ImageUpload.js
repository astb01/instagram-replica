import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";

import { storage, db } from "../../config/firebase";
import firebase from "firebase";

import "./ImageUpload.css";

const ImageUpload = ({ username }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (evt) => {
    if (evt.target.files[0]) {
      setImage(evt.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress logic:
        const progressSoFar = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressSoFar);
      },
      (err) => {
        // failed to upload:
        console.log(err);
        alert(err.message);
      },
      () => {
        // completed upload:
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // put image to firebase db:
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
          });

        setProgress(0);
        setCaption("");
        setImage(null);
      }
    );
  };

  return (
    <div className="imageupload">
      <progress value={progress} max="100" className="imageupload__progress" />

      <Input
        type={"text"}
        placeholder={"Enter a caption"}
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <Input type={"file"} onChange={handleChange} />

      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default ImageUpload;
