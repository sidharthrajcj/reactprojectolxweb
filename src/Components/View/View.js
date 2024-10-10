import React from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './View.css';

function View() {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return <p>No product data available.</p>;
  }

  
  const uniqueImageUrls = product.imageUrls ? [...new Set(product.imageUrls)] : [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="viewParentDiv">
      
      <div className="imageShowDiv">
        {uniqueImageUrls.length > 1 ? (
          
          <Slider {...settings}>
            {uniqueImageUrls.map((url, index) => (
              <div key={index} className="sliderImageWrapper">
                <img
                  src={url}
                  alt={`${product.name || 'Product'} - Image ${index + 1}`}
                  className="productImage"
                />
              </div>
            ))}
          </Slider>
        ) : uniqueImageUrls.length === 1 ? (
          
          <div className="singleImageWrapper">
            <img
              src={uniqueImageUrls[0]}
              alt={product.name || 'Product'}
              className="productImage"
            />
          </div>
        ) : (
          
          <p>No images available</p>
        )}
      </div>

      
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product.price}</p>
          <span>{product.name}</span>
          <p>{product.category}</p>
          <span>{new Date(product.createdAt.seconds * 1000).toDateString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{product.sellerName || 'No name'}</p>
          <p>{product.sellerContact || 'No contact'}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
