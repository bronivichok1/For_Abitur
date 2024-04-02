import React, { useState } from "react";
import "../style/Anketa.css";
import "../style/ButtonForNavigate.css"
import { useTranslation } from 'react-i18next';

export const FileUploader = () => {
 const { t, i18n } = useTranslation();
 const [images, setImages] = useState([]);
 const [imageURLs, setImageURLs] = useState([]);
 const [fileNames, setFileNames] = useState([]);
 const defaultImageURL = 'no_photo.jpg';



 const handleOnChange = (event) => {
   event.preventDefault();
   if (event.target.files && event.target.files.length) {
     const filesNew = Array.from(event.target.files).slice(0, 20);
     const files = filesNew.concat(images);
     setImages(files);
     files.forEach((file) => {
       const reader = new FileReader();
       reader.onloadend = () => {
        if (file.type === 'image/png') {
          setImageURLs((prevURLs) => [...prevURLs, reader.result]);
        } else {
          setImageURLs((prevURLs) => [...prevURLs, defaultImageURL]);
        }
         
         setFileNames((prevNames) => [...prevNames, file.name]); // Добавление имени файла
       };
       reader.readAsDataURL(file);
     });
   }
 };

 const removeImage = (event, index) => {
   event.stopPropagation();
   event.preventDefault();
   const newImages = [...images];
   const newURLs = [...imageURLs];
   const newNames = [...fileNames];
   if (index < images.length) {
     newImages.splice(index, 1);
     newURLs.splice(index, 1);
     newNames.splice(index, 1);
   }
   setImages(newImages);
   setImageURLs(newURLs);
   setFileNames(newNames);
 };

  const uploadFiles = async () => {
    const formData = new FormData();
    images.forEach((file) => {
      formData.append('files', file);
    });

    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Files uploaded successfully:', data);
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      });
  };

 return (
  <div className="col">
    <div className="file-uploader_button">
      <label align="center" htmlFor="file-loader-button" className="btn-9">
          {t('AttFile')}
      </label>
      <input
        id="file-loader-button"
        type="file"
        className="file-uploader__upload-button"
        onChange={handleOnChange}
        multiple 
      />
      </div>
    <div align="center" className="file-uploader">
      <div align="center" className="row">
        {images.map((image, index) => (
          <div className="row" align="center">
            <div key={index} className="col">
              <div className="row">
              <img
                src={imageURLs[index]}
                className="file-uploader__preview"
                alt={`preview-${index}`}
              />
                <button onClick={(event) => removeImage(event, index)} className="file-uploader__remove-button"></button>
              </div>
              <p className="file-uploader__filename">{fileNames[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>

 );
};
