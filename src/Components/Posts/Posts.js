import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs, orderBy, query, limit, where } from 'firebase/firestore'; 
import FirebaseContext , { AuthContext }from '../../Store/FirebaseContext'; 
import Heart from '../../assets/Heart';
import { useNavigate } from 'react-router-dom';
import './Post.css';

function Posts({ searchTerm }) {
  const { db } = useContext(FirebaseContext); 
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let queryRef = collection(db, 'products');

        
        if (searchTerm) {
          queryRef = query(queryRef, where('name', '==', searchTerm));
        }

        const querySnapshot = await getDocs(queryRef);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);

        
        const latestQuery = query(
          collection(db, 'products'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const latestSnapshot = await getDocs(latestQuery);
        const latestProductsData = latestSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLatestProducts(latestProductsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [db, searchTerm]);

  const handleProductClick = (product) => {
    if(user){
      navigate('/view', { state: { product } });
    } else {
      navigate('/login')
    }
  };

  const getRandomImage = (imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      return imageUrls[randomIndex];
    }
    return '';
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.length > 0 ? (
            products.map(product => (
              <div className="card" key={product.id} onClick={() => handleProductClick(product)}>
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={getRandomImage(product.imageUrls)} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{new Date(product.createdAt?.toDate()).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {latestProducts.length > 0 ? (
            latestProducts.map(product => (
              <div className="card" key={product.id} onClick={() => handleProductClick(product)}>
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={getRandomImage(product.imageUrls)} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{new Date(product.createdAt?.toDate()).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No fresh recommendations available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
