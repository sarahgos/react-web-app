import React, { useState } from "react";
import ImageUploading from 'react-images-uploading';
import './UploadImage.css';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from 'uuid';

// Component used to upload an image.
const ImportImage = (props) => {

    const [images, setImages] = useState([]);
    const [file, setFile] = useState();
    const [fileRef, setFileRef] = useState();
    const [uploaded, setUploaded] = useState();
    const imageId = uuid();
    const storage = getStorage();
    const storageRef = ref(storage, imageId);

   // Upload image to storage.
    const storeImage = () => {
        uploadBytes(storageRef, file).then((snapshot) => {
            setUploaded(true);
            props.func(imageId);
        })
    }

    // Set the image.
    const onChange = (imageList) => {
      setImages(imageList);
      if (imageList[0] !== undefined)
      {
        setFile(imageList[0]['file']);
        setFileRef(imageList[0]['data_url']);
      }
    };
    
    return(
        <div>
        <ImageUploading
        value={images}
        onChange={onChange}
        dataURLKey="data_url"
        >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
        }) => (
          <div>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="200" />
                <div className="image-item__btn-wrapper">
                  {uploaded ? null : <button className='uploadButton' onClick={() => onImageRemove(index)}>Remove</button>}
                </div>
              </div>
            ))}
            {uploaded ? <h4>Image successfully uploaded!</h4> : <button className='uploadButton' onClick={onImageUpload}>Browse</button>}
            {uploaded ? null : <button className='uploadButton' onClick={storeImage}>Upload</button>}
            &nbsp;

          </div>
        )}
        </ImageUploading>
        </div>
    )
}

export default ImportImage;