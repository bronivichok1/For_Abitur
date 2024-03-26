import React, { useState } from "react";
import "../style/Anketa.css";
import "../style/ButtonForNavigate.css"
import { useTranslation } from 'react-i18next';

export const FileUploader = () => {
  const { t, i18n } = useTranslation();
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const handleOnChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const filesNew = Array.from(event.target.files).slice(0, 15);
      const files=filesNew.concat(images)
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

  const removeImage = (event, index) => {
    event.stopPropagation(); // Предотвращает дальнейшее всплытие
     event.preventDefault();
    const newImages = [...images]; // Создаем копию массива images
    const newURLs = [...imageURLs]; // Создаем копию массива imageURLs
    newImages.splice(index, 1); // Удаляем изображение по индексу
    newURLs.splice(index, 1); // Удаляем URL изображения по индексу
    setImages(newImages); // Обновляем состояние images
    setImageURLs(newURLs); // Обновляем состояние imageURLs
  };

  return (
    <div align="center" className="file-uploader">
      <label align="center" 
      htmlFor="file-loader-button" 
      className="file-uploader__custom-button">
        {t('AttFile')}
      </label>
      <input
        id="file-loader-button"
        type="file"
        className="file-uploader__upload-button"
        onChange={handleOnChange}
        multiple
      />
      <div align="center" className="file-uploader__preview-container">
        {images.map((image, index) => (
          <div key={index} className="file-uploader__image-container">
            <img
              src={imageURLs[index]}
              className="file-uploader__preview"
              alt={`preview-${index}`}
            />
            <button onClick={(event) => removeImage(event, index)} className="file-uploader__remove-button">
              &#10060;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};




