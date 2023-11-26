import React, { useState, useEffect } from 'react'

function Home(props) {
    const [email, setEmail] = useState("");
    const [items, setItems] = useState("");

    const loaddata = async (e) => {
        e.preventDefault();
        setEmail(props.email);
        try {
          const response = await fetch('http://127.0.0.1:5000/getitemsbyemail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
          });
    
          const data = await response.json();
          setItems(data);
        
        } catch (error) {
          console.error('Error:', error);
        }
        };
    
  return (
    <div>
    <div>Home</div>

    <div>Welcome : {props.email}</div>
    <div>Items : <button onClick={loaddata}>Load Items</button> </div>
    <div>{items.amount}</div>
    <div>{items.date}</div>
    <div>{items.description}</div>
    </div>
  )
}

export default Home