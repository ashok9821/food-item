import React from 'react'
import { MdFastfood } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function Header({ onSearch, cartItems = [], removeFromCart, updateQuantity }) {
  const handleInputChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 20 : 0;
  const taxes = cartItems.length > 0 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + deliveryFee + taxes;

  return (
  <div className='header   mt-4'>
    <div className='container'>
        <div className='row justify-content-between'>
            <div className='col-2'>
              <div className='cart-box px-3 py-2 text-center'>
                <MdFastfood/>
              </div>
            </div>
            <div className='col-sm-8 col-6 d-flex bg-white ' style={{borderRadius:'10px'}}>
              <div className=' fs-3 text-center m-auto green'>
 <CiSearch/>
              </div>
               
             <input 
               type="text" 
               className="form-control py-3" 
               placeholder="eg pizza, pasta, etc" 
               name="search"
               onChange={handleInputChange}
             />
            </div>
            <div className='col-2 justify-content-end d-flex position-relative'>
              <span className='count-order'>{totalItems}</span>
               <button className='cart-box px-3 py-2 text-center border-0' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <FaCartPlus/>
               </button>
             
            </div>
        </div>


<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header border-bottom">
    <h5 id="offcanvasRightLabel" className="green fw-bold">Order Items</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body p-0">
    {cartItems.length > 0 ? (
      <div className="d-flex flex-column h-100">
        <div className="flex-grow-1 overflow-auto p-3">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-card mb-3 p-2 border rounded d-flex align-items-center">
              <img src={item.food_image} alt={item.food_name} className="cart-item-image" />
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1 fw-bold">{item.food_name}</h6>
                <p className="mb-1 text-success fw-bold">Rs {item.price}/-</p>
                <div className="d-flex align-items-center gap-2">
                  <button 
                    className="btn btn-sm btn-outline-success"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="fw-bold">{item.quantity}</span>
                  <button 
                    className="btn btn-sm btn-outline-success"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button 
                className="btn-remove text-danger"
                onClick={() => removeFromCart(item.id)}
              >
                <MdDelete size={24} />
              </button>
            </div>
          ))}
        </div>
        <div className="border-top p-3 bg-light">
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span>Rs {subtotal}/-</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Delivery Fee</span>
            <span>Rs {deliveryFee}/-</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Taxes</span>
            <span className="text-success">Rs {taxes}/-</span>
          </div>
          <div className="d-flex justify-content-between mb-3 fw-bold fs-5">
            <span>Total</span>
            <span className="text-success">Rs {total}/-</span>
          </div>
          <button className="btn w-100 text-white" style={{backgroundColor: 'rgb(66, 196, 66)'}}>
            Place Order
          </button>
        </div>
      </div>
    ) : (
      <div className="text-center mt-5">
        <p className="text-muted">Your cart is empty</p>
      </div>
    )}
  </div>
</div>
    </div>

  </div>
  )
}
