import React, { useState } from 'react';
import Home from './Home';
import { Routes, Route, Switch, BrowserRouter, useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const [addemail, setAddEmail] = useState('');
  const [addpassword, setAddPassword] = useState('');
  const [addfirstname, setAddFirstName] = useState('');
  const [addlastname, setAddLastName] = useState('');
  const [addresp, SetAddResp] = useState('');
  const [cemail, SetCEmail] = useState('');
  const [cfirstname, SetCFirstname] = useState('');
  const [items, setItems] = useState("");


// API Function

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Auth Info
    try {
      const response = await fetch('http://127.0.0.1:5000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        
      });

      const data = await response.json();
      setResponse(data.message);
      SetCEmail(data.email);
      SetCFirstname(data.firstname)
    
    } catch (error) {
      console.error('Error:', error);
    }
    };
    
    // Add user
    const handleAddUser = async (e) => {
      e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ addemail, addpassword, addfirstname, addlastname}),
      });

      const data = await response.json();
      SetAddResp(data.message);
    
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // load data
  const loaddata = async (e) => {
    e.preventDefault();
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
    
    function change_stat(){
      setStat(true)
    };
  
    function change_stat_false(){
      setStat(false)
    };

      const [delState, setDelState] = useState(false)
      const [delid, setDelId] = useState('')

      function stat_delete(){
        setDelState(!delState);
      };

      function stat_delete_false(){
        setDelState(!delState);
      };

      const deleteData = async (e) => {
        e.preventDefault();
        try { 
          const response = await fetch('http://127.0.0.1:5000/deleteitems', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({delid}),
          });
    
          const data = await response.json();
        
        } catch (error) {
          console.error('Error:', error);
        }
        stat_delete_false();
        };

    // Add items
    const addData = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://127.0.0.1:5000/additems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({date, amount, details, email}),
        });
  
        const data = await response.json();
        setItems(data);
      
      } catch (error) {
        console.error('Error:', error);
      }
      change_stat_false();
      };

  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const [amount, setAmount] = useState('');
  const [stat, setStat] = useState(false);


  const add_data_form = (
    <form onSubmit={addData}>
        <label>Email: {email}</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Details:</label>
        <input type="details" value={details} onChange={(e) => setDetails(e.target.value)} required />

        <label>Amount:</label>
        <input type="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      
        <button type="submit">Submit</button>
      </form>
  );

  const del_data_form = (
    <form onSubmit={deleteData}>
        <label>id: {delid}</label>
        <input type="id" value={delid} onChange={(e) => setDelId(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    );


// ********************************* Login Signup ******************************
  const form = (
    <div>
    <div>
      <p>Login:</p>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      
        <button type="submit">Submit</button>
      </form>
      
    </div>
    <div>
      <p>Signup:</p>
    <form onSubmit={handleAddUser}>
        <label>First Name:</label>
        <input type="text" value={addfirstname} onChange={(e) => setAddFirstName(e.target.value)} required />
        <br/>
        <label>Last Name:</label>
        <input type="text" value={addlastname} onChange={(e) => setAddLastName(e.target.value)} required />
        <br/>
        <label>Email:</label>
        <input type="email" value={addemail} onChange={(e) => setAddEmail(e.target.value)} required />
        <br/>
        <label>Password:</label>
        <input type="password" value={addpassword} onChange={(e) => setAddPassword(e.target.value)} required />
        <br/>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );

  function updateItems(){

  };

  function deleteItems(){

  };



  // ******************************  Home Form ********************************
  const home = (
    
      <div>
      <div>Home</div>
  
      <div>Welcome : {email}</div>
      <div>{stat ? add_data_form : <button onClick={change_stat}>Add</button>} </div>
      <div>{delState ? del_data_form : <button onClick={stat_delete}>Delete</button>} </div>
      <div>Items : <button onClick={loaddata}>Load Items</button> </div>
      {items.items && items.items.map(items => {
            return(
                <div key={items.id} className='row'>
                    <h5>email: {items.email} </h5>
                    <p>id: {items.id}</p> 
                    <p> date: {items.date}</p>
                    <p>amount: {items.amount}</p>
                    <p>details: {items.details}</p>
                    <div className='row'>
                       <div className='col-md-1'> <button className='btn btn-primary' onClick={() => updateItems(items)}>Update</button></div>
                       <div className='col'><button className='btn btn-danger'
                        onClick={() => deleteItems(items)}>Delete</button></div>
                    </div>
                </div>
            )
        })
        }
      </div>
    
  );


// ******************************** Function Return **************************
  return (
    <div className="app">
    <div className="login-form">
      {response=="True" ? <div>{home}</div>: <div>{form}</div>}
    </div>
  </div>
    
  );
};

export default Login;
