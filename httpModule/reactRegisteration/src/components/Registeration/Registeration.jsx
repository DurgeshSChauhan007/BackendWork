import React from 'react';
import './Registeration.css'

function Registration() {
    async function sendData(e) {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        console.log(name, email, password);
        
        const response = await fetch("http://localhost:3002/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        const res = await response.json();
        alert(res.message);
    }

    return (
        <div className="registration-container">
            <h2>Register Here</h2>
            <form onSubmit={sendData} className="registration-form">
                <label>Name:</label>
                <input type="text" name="name" required placeholder="Enter Name" />
                
                <label>Email:</label>
                <input type="email" name="email" required placeholder="Enter Email" />
                
                <label>Password:</label>
                <input type="password" name="password" required placeholder="Enter Password" />
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Registration;
