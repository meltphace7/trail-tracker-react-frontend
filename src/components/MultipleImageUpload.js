import React from 'react'
import { storage } from "../firebase";

const MultipleImageUpload = () => {
     const [image, setImage] = useState("");
     const [images, setImages] = useState([]);
     const [urls, setUrls] = useState([]);

     const imageUploadHandler = (e) => {
       for (let i = 0; i < e.target.files.length; i++) {
         const newImage = e.target.files[i];
         newImage["id"] = Math.random();
         setImages((prevState) => [...prevState, newImage]);
       }
     };

     const handleUpload = function () {
       const promises = [];
       images.map((image) => {
         const uploadTask = storage.ref(`images/${image.name}`).put(image);
         promises.push(uploadTask);
         uploadTask.on(
           "state_changed",
           (snapshot) => {},
           (error) => {
             console.log(error);
           },
           async () => {
             await storage
               .ref("images")
               .child(image.name)
               .getDownloadURL()
               .then((urls) => {
                 setUrls((prevState) => [...prevState, urls]);
               });
           }
         );
       });
       Promise.all(promises)
         .then(() => alert("All images uploaded"))
         .catch((err) => console.log(err));
     };
    return (
    <form onSubmit={handleUpload}>
      <input type="file" multiple onChange={imageUploadHandler}>Choose IMAGES</input>
        </form>
    )
}

export default MultipleImageUpload
