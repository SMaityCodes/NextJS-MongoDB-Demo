'use client';
import { useState, useEffect } from 'react';

import './page.css';


function ComponentA() {
  const [ItemData, setItemData] = useState({ name: '', price: '' });
  const [message, setMessage] = useState('');
  
  // Handle input changes
  const handleChange = (e) => {
    	setItemData({ ...ItemData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
	    e.preventDefault();
	    const res = await fetch('/api/products', {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify({
		name: ItemData.name,
		price: parseInt(ItemData.price),
	      }),
	    });

	    if (res.ok) {
	      setMessage('Item added successfully!');
	      setItemData({ name: '', price: '' }); // Reseting ItemData for possible next insert
	    } else {
	      setMessage('Failed to add item.');
	    }
  };


  return (
    <main className="box">
    
      <h1>Add an Item</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      
        <input
          name="name"
          placeholder="Name"
          value={ItemData.name}
          onChange={handleChange}
          required
          className="input-box"
        />
        
        <input
          name="price"
          placeholder="price"
          type="number"
          value={ItemData.price}
          onChange={handleChange}
          required
          className="input-box"
        />
        
        <br />
        
        <button className="button blue" type="submit">Add</button>
        
      </form>
      
      <p style={{ color: 'blue', fontSize: '20px' }}> {message} </p>
	
    </main>
  );
}


function ComponentB() {
	const [items, setItems] = useState([]);
	
	const handleShow = async () => {
	   const res = await fetch('/api/products');
	   const data = await res.json();
	   setItems(data);
  	};
  
  
  	const handleClear = async () => {
	   setItems([]);
  	};
  	
	return (
		<div className="box">
			<div> <button className="button blue" onClick={handleShow}> Show Items </button> </div>
			 
			
			
			<div> <button className="button blue" onClick={handleClear}> Clear Display </button> </div>
			{items.length !== 0 && (
	      		<ul>
				{items.map((item, i) => (
				  <li key={i}> Product Name: {item.name}, Price: {item.price}</li>
				))}
	      		</ul>
      	       )
      	      }
		</div>
	);
}

function ComponentC() {
	const [name, setName] = useState('');
  	const [price, setPrice] = useState('')
	const [message, setMessage] = useState('');
	  
	  
	  
	  // Handle button submit
  	const handleSubmit = async () => {
  	    
  	    
	    if (!name || !price) {
      		alert('Please enter both name and price.');
      		return;
    	    }
	    const res = await fetch('/api/products', {
	      method: 'PATCH',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify({
          	filter: { name: name },
          	update: { price: parseFloat(price) }, // convert price to number
        	}),
	    });

	    if (res.ok) {
	      setMessage('Item updated successfully!');
	      setName(''); setPrice(''); // Reseting  for possible next insert
	    } else {
	      setMessage('Failed to update item - no such item.');
	      setName(''); setPrice(''); // Reseting  for possible next insert
	    }
  	};

	const handleShowPrice = async () => {
  	    
  	    
	    if (!name) {
      		alert('Please enter both name.');
      		return;
    	    }
	    const response = await fetch(`/api/products?name=${encodeURIComponent(name)}`);
	    const data = await response.json();
	    
	    if (response.ok) {
	      setMessage(`Price of ${data.name}: ${data.price}`);
	      setName(''); // Reseting  for possible next insert
	    } else {
	      setMessage('Failed : no such item.');
	      setName('');  // Reseting  for possible next insert
	    }
  	};
  	
  	
	  return(
		<div className="box">
	    
		<h1>Give details of Item to be updated (copy paste product-name from diplayed):-</h1>
	      
	       
	      
		<input
		  name="name"
		  placeholder="Name"
		  value={name}
		  onChange={(e) => setName(e.target.value)}
		  required
		  className="input-box"
		/>
		
		<input
		  name="price"
		  placeholder="price"
		  type="number"
		  value={price}
		  onChange={(e) => setPrice(e.target.value)}
		  required
		  className="input-box"
		/>
		
		<br />
		
		<button className="button blue" onClick={handleShowPrice}> Show Price </button>
		
		<button className="button blue" onClick={handleSubmit}> Update Item </button>
		
	      
	      
	      <p style={{ color: 'blue', fontSize: '20px' }}> {message} </p>
		
	    </div>
	    );
}

function ComponentD() {
	const [message, setMessage] = useState('');
	const [itemName, setItemName] = useState('');
	
	const handleDelete = async () => {
	      if (!itemName) {
      		alert('Please enter a name to delete.');
      		return;
    	      }
    	      
	      const res = await fetch('/api/products', {
	          method: 'DELETE',
	          headers: { 'Content-Type': 'application/json' },
	          body: JSON.stringify({ name: itemName }),
	      });

	    if (res.ok) {
	      setMessage('Item deleted successfully!');
	      setItemName('');
	      
	    } else {
	      setMessage('Failed to delete item - item not found!');
	      setItemName('');
	    }
  	};
  	
	return (
		<div className="box">
			<h2> Copy any of the Item Names Displayed Above: </h2>
			<input
				type="text"
				placeholder="Enter item name"
				value={itemName}
				onChange={(e) => setItemName(e.target.value)}
				className="input-box"
	      		/>
			<button className="button blue" onClick={handleDelete}> Delete Item </button>
			
			<p style={{ color: 'blue', fontSize: '20px' }}> {message} </p>
			
		</div>
	);
}


function Home() {
  return (
    <div className="grid-container">
      <ComponentA />
      <ComponentB />
      <ComponentC />
      <ComponentD />
    </div>
  );
}


export default Home;

