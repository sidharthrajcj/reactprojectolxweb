import React, { Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../Store/FirebaseContext'; 
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 

const Create = () => {
  const { db, storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext); 
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState(user?.phoneNumber || ''); 
  const [images, setImages] = useState(null); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !price || images.length === 0) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      
      const productsQuery = query(
        collection(db, 'products'),
        where('name', '==', name),
        where('price', '==', parseFloat(price)),
        
      );

      const querySnapshot = await getDocs(productsQuery);
      if (!querySnapshot.empty) {
        alert('A product with the same name and price already exists.');
        return;
      }

      const imageUrls = [];
      for (const image of images) {
        const imageRef = ref(storage, `products/${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);
        imageUrls.push(imageUrl); 
      }

      await addDoc(collection(db, 'products'), {
        name,
        category,
        price: parseFloat(price),
        imageUrls,
        sellerName: user.displayName || 'Anonymous', 
        sellerContact: contact || 'No contact provided',
        createdAt: new Date(), 
      });
      

      alert('Product created successfully!');
      navigate('/'); 
      setName('');
      setCategory('');
      setPrice('');
      setImages([]);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again.');
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv"> 
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
          <br />
          <label htmlFor="contact">Contact</label>
          <br />
          <input
            className="input"
            type="text"
            id="contact"
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter your contact"
          />
          <br/>
          <input
            type="file"
            accept="image/*"
            multiple 
            onChange={(e) => setImages(e.target.files)} 
          />
          <br />
          <button className="uploadBtn" type="submit">Upload and Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
