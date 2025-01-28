"use client"
import './ImagesHolder.css'
import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
export default function ImagesHolder(props) {
    
    const [hoveredPhoto, setHoveredPhoto] = useState(null);
    const photo = (`https://www.fradaksa.net/back/Laravel/public/Attachment/${props.id}/${props.colorid}/${props.images[0]}`)
    const handlePhotoHover = (photo) => {
        setHoveredPhoto(photo);
    };
    useEffect(() => {
        setHoveredPhoto(`https://www.fradaksa.net/back/Laravel/public/Attachment/${props.id}/${props.colorid}/${props.images[0]}`)
    }, [props.images, props.id, props.colorid]);
    return (
        <div >
            <div className='images-holder'>
                <div className='mainimage-holder'>
                    <img src={hoveredPhoto === null ? (photo) : (hoveredPhoto)} width={500} height={500} alt={'main-img'} />
                </div>
                <div className='subimage-holder'>
                    {props.images.length > 0 ? props.images.slice(0,6).map((image, index) => (
                        <div key={index} className='image-hover' onMouseEnter={() => handlePhotoHover(`https://www.fradaksa.net/back/Laravel/public/Attachment/${props.id}/${props.colorid}/${image}`)}>
                            <img loading='lazy' src={`https://www.fradaksa.net/back/Laravel/public/Attachment/${props.id}/${props.colorid}/${image}`} width={80} height={80} alt={"IMAGE"} className="ml-2" />
                        </div>
                    )) : null}
                </div>
            </div>
            <div className='slider-single-mo' >
                <Carousel className='slider-single' interval={2000}>
                    {props.images.length > 0 ? props.images.slice(0,6).map((image, index) => (
                        <Carousel.Item key={index}>
                            <Carousel.Caption key={index}>
                                <img loading='lazy' src={`https://www.fradaksa.net/back/Laravel/public/Attachment/${props.id}/${props.colorid}/${image}`} alt={"IMAGE"} className="ml-2" />
                            </Carousel.Caption>
                        </Carousel.Item>
                    )) : (<div>none</div>)}
                </Carousel>
            </div>
        </div>
    )
}
