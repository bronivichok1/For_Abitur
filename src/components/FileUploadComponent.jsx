import React, { useState } from "react";
import "../style/Anketa.css";
import "../style/ButtonForNavigate.css"
import { useTranslation } from 'react-i18next';

export const FileUploader = () => {
  const { t, i18n } = useTranslation()
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const handleOnChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const files = Array.from(event.target.files);
      setImages(files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageURLs((prevURLs) => [...prevURLs, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length) {
      const files = Array.from(event.dataTransfer.files);
      setImages(files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageURLs((prevURLs) => [...prevURLs, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div align="center" className="file-uploader">
      <label align="center" htmlFor="file-loader-button" className="file-uploader__custom-button">
        {t('AttFile')}
      </label>
      <input
        id="file-loader-button"
        type="file"
        className="file-uploader__upload-button"
        onChange={handleOnChange}
        multiple  // Добавьте атрибут multiple для разрешения выбора нескольких файлов
      />
      <div align="center" className="file-uploader__preview-container">
        {imageURLs.map((url, index) => (
          <img
            key={index}
            src={url}
            className="file-uploader__preview"
            alt={`preview-${index}`}
          />
        ))}
      </div>
      <div align="center" className="file-uploader__file-names">
        {images.map((file, index) => (
          <div key={index}>{file.name}</div>
        ))}
      </div>
    </div>
  );
        }