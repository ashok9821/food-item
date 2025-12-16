import React, { useState } from 'react'
import Header from '../component/header'
import { categories } from '../categorize/category'
import { food_items } from '../categorize/food-type'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const addToCart = (food) => {
    const existingItem = cartItems.find(item => item.id === food.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      toast.success(`${food.food_name} quantity increased!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
      toast.success(`${food.food_name} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const removeFromCart = (foodId) => {
    const item = cartItems.find(item => item.id === foodId);
    setCartItems(cartItems.filter(item => item.id !== foodId));
    if (item) {
      toast.error(`${item.food_name} removed from cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const updateQuantity = (foodId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(foodId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === foodId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const filteredFoods = food_items.filter((food) => {
    const matchesSearch = food.food_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           food.food_category.toLowerCase() === selectedCategory.toLowerCase().replace(' ', '_');
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div>
    <ToastContainer />
    <Header onSearch={handleSearch} cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
    <div className='container mt-4'>
      <div className='row row-cols-3 row-cols-md-4 row-cols-lg-7'>
        {categories.map((item)=>{
          return(
            <div className='col text-center  p-sm-3 p-1' key={item.id}>
              <div 
                className={`category-box py-sm-4 py-3 ${selectedCategory === item.name ? 'active-category' : ''}`}
                onClick={() => handleCategoryClick(item.name)}
                style={{ cursor: 'pointer' }}
              >
                 <div>{item.image}</div>
              <div className='fw-bold'>{item.name}</div>
                </div>          
            </div>
          )
        })
        }
      </div>
    </div>

  <div className='container mb-5'>
    <div className='row justify-content-center'>
      {filteredFoods.length > 0 ? (
        filteredFoods.map((food)=>{
          return(
            <div className='col-lg-3 col-md-4 col-sm-6 col-12 mt-4' key={food.id}>
              <div className='food-card h-100'>
                    <div><img src={food.food_image} alt='food' className='img-fluid img-height'/></div>
                    <div className='food-name fw-bold pt-3'>{food.food_name}</div>
                    <div className='d-flex justify-content-between pt-2'>
                      <p className='food-price'>{"Rs "+food.price +"/-"}</p>
                      <p className='food-price'>{food.food_type}</p>
                      </div>
                      <div className='text-center'>
                        <button onClick={() => addToCart(food)} className='btn'>Add to Cart</button>
                        </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className='col-12 text-center mt-5'>
          <h3>No food items found</h3>
          <p>Try searching with a different keyword</p>
        </div>
      )}
    </div>
  </div>

    </div>
  )
}
