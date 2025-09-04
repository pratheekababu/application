//Step 1:Imports
import React, { useEffect, useState } from "react";
import axios from "axios";

//Step 2: Backend Api Address
const API ="http://localhost:4000";

export default function App(){
  //state Variabkle to store
  const [people,setpeople]=useState([]);
  const [form,setForm] = useState({name :"", age :""});

  async function load() {
    //Ask backend to give data
    const res = await axios.get(`${API}/`);
    setpeople(res.data);  
  }
  useEffect(()=> {
    load();
  },[]);

  async function addPerson(e){
    e.preventDefault();
    if(!form.name|| !form.age)
      return alert("Enter name & age");
     
    const res = await axios.post(`${API}/`,{
    name: form.name,
    age:Number(form.age)
  });
  }
    
  
  //Return

  return(
    <div style={{fontFamily:"sans-serif",maxWidth:520,margin:"auto"}}>
      <h1>List of Peoples</h1>
    <form onSubmit={addPerson}>
      <input type="text" placeholder="Enter your name" value={form.name} 
      onChange={e => setForm({...form,name:e.target.value})} required />
      <input type="number" placeholder="Enter your age" value={form.name} 
      onChange={e => setForm({...form,name:e.target.value})} required />
      <button>Add User</button>
      </form> 


      {people.length === 0? (
        <p>No People found.</p>
      ) : (
        <ul>
          {people.map(p =>(
            <li key={p.id}>
              <strong>{p.name}</strong> - age{p.age}
            </li>
          ))}
         
        </ul>
      )
    }

    </div>
  );
}