import { Carousel } from "react-bootstrap";
import "./ImageHolder.css";
import { useState, useEffect } from "react";
const ImageHolder = ({ collectionId, collectionImages }) => {
  const [imageHovered, setImageHovered] = useState(null);
  useEffect(() => {
    if (collectionImages) {
      setImageHovered(collectionImages[0]?.image);
    }
  }, [collectionImages]);
  return (
    <>
      <div className="img-holder">
        <div className="main-img-holder">
          <img
          loading="lazy"
            className="main-img"
            src={`https://www.fradaksa.net/back/Laravel/public/Attachment/Collections/${collectionId}/${imageHovered}`}
            alt="frada ksa collection"
          />
        </div>
        <div className="small-images">
          {collectionImages &&
            collectionImages.length > 0 &&
            collectionImages.slice(0,6).map((image,index) => (
              <div className="img-container" key={index}>
                <img
                loading="lazy"
                  src={`https://www.fradaksa.net/back/Laravel/public/Attachment/Collections/${image?.CollectionID}/${image?.image}`}
                  alt="frada ksa collection"
                  onMouseOver={() => setImageHovered(image?.image)}
                />
              </div>
            ))}
        </div>
      </div>
      <Carousel>
      {collectionImages &&
            collectionImages.length > 0 &&
            collectionImages.slice(0,6).map((image,index) => (
              <Carousel.Item key={index}>
                <img
                loading="lazy"
                  src={`https://www.fradaksa.net/back/Laravel/public/Attachment/Collections/${image?.CollectionID}/${image?.image}`}
                  alt="frada ksa collection"
                  onMouseOver={() => setImageHovered(image?.image)}
                />
              </Carousel.Item>
            ))}
        
      </Carousel>
    </>
  );
};

export default ImageHolder;
