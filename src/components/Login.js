import React, { useState, useEffect, useRef} from 'react';
import Home from './Home';
import { Routes, Route, Switch, BrowserRouter, useNavigate } from 'react-router-dom';
import './login.css'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { format, parseISO } from 'date-fns';

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

  const chartRef = useRef(null);

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

  const [load, SetLoad] = useState(false);

  function setload(){
    setload(!load);
  }

  // *******************************  Load Data *****************************************
  const [displaydates, SetDisplayDates] = useState('');
  const [displayamount, SetDisplayAmount] = useState('');
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

      const dates = data.items.map(item => new Date(item.date));
      const amounts = data.items.map(item => item.amount);

      SetDisplayAmount(amounts);
      SetDisplayDates(dates);

      setload();
    
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

    // Update

    const [updatestate, setUpdatestate] = useState(false)
    const [uid, setuiId] = useState('')
    const [udetails, setUdetails] = useState('')
    const [uamount, setUamount] = useState('')


      function ustatus(){
        setUpdatestate(!updatestate);
      };


    const updateData = async (e) => {
      e.preventDefault();
      try { 
        const response = await fetch('http://127.0.0.1:5000/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({uid, uamount, udetails}),
        });
  
        const data = await response.json();
      
      } catch (error) {
        console.error('Error:', error);
      }
      ustatus();
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
    <div className='add_data'>
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
      </div>
  );

  const del_data_form = (
    <div className='del_data'>
    <form onSubmit={deleteData}>
        <label>Enter the id to be deleted:</label>
        <input type="id" value={delid} onChange={(e) => setDelId(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
      </div>
    );

    const update_data_form = (
      <div className='update_data'>
      <form onSubmit={updateData}>
          <label>id:</label>
          <input type="id" value={uid} onChange={(e) => setuiId(e.target.value)} required />
          <label>detail:</label>
          <input type="detail" value={udetails} onChange={(e) => setUdetails(e.target.value)} required />
          <label>amount:</label>
          <input type="amount" value={uamount} onChange={(e) => setUamount(e.target.value)} required />
          <button type="submit">Submit</button>
        </form>
        </div>
      );

// ********************************* Chart Items ******************************

// ********************************* Login Signup ******************************
  const lform = (
    <div className='basic'>
      <div className='login'>
        <h2>Login:</h2>
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Submit</button>
        </form>
      </div>
      </div>
    )

    const sform = (
      <div>
      <div className='sign'>
        <h2>Sign up:</h2>
        <form onSubmit={handleAddUser}>
          <label>First Name:</label>
          <input type="text" value={addfirstname} onChange={(e) => setAddFirstName(e.target.value)} required />
          <label>Last Name:</label>
          <input type="text" value={addlastname} onChange={(e) => setAddLastName(e.target.value)} required />
          <br/>
          <label>Email:</label>
          <input type="email" value={addemail} onChange={(e) => setAddEmail(e.target.value)} required />
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
      <div className='intro'><h2>Account : {email}</h2></div>
      <div className='add_data'>{stat ? add_data_form : <button onClick={change_stat}>Add</button>} </div>
      <div className='deletedata'>{delState ? del_data_form : <button onClick={stat_delete}>Delete</button>} </div>
      <div className='update'>{updatestate?update_data_form:<button onClick={ustatus}>Update</button>}</div>
      <div className='list'><button onClick={loaddata}>Load Items</button></div>
      {items.items && items.items.map(items => {
            return(
              <div className='form_box'>
                <div key={items.id} className='row'>
                    <h5>email: {items.email} </h5>
                    <p>id: {items.id}</p> 
                    <p>date: {items.date}</p>
                    <p><mark>amount: {items.amount}</mark></p>
                    <p>details: {items.details}</p>
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
      <header><h2>Welcome to Expense Tracker</h2></header>
    <div className="login-form">
      {response==="True" ? <div>{home}</div>:<div className='bck'>{lform}{sform}</div>}
    </div>
  </div>
    
  );
};

export default Login;
