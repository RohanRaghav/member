import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    uid: '',
    department: '',
    occupation: '',
    email: '',
  });

  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showLogoSeal, setShowLogoSeal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLogoSeal(true); // Show logo seal
    setSubmitted(true); // Mark form as submitted
    setMessage('Applied successfully');
    // Convert UID to lowercase before submitting
    const updatedFormData = {
      ...formData,
      uid: formData.uid.toLowerCase(),
    };

    const animateEnvelope = () => {
      const envelope = document.querySelector('.envelope');
      const formContainer = document.querySelector('.form-container');

      envelope.classList.add('show-envelope'); // Show envelope
      formContainer.classList.add('animate'); // Trigger form fade-out
      setTimeout(() => {
        animateEnvelope();
      }, 100);
      // Show the logo seal after a delay (envelope animation duration)
      setTimeout(() => {
        setShowLogoSeal(true);
      }, 1000); // Adjust delay based on envelope animation duration
    };

  //   try {
  //     const response = await fetch('http://localhost:3001/api/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updatedFormData),
  //     });

  //     const data = await response.json();
  //     if (response.status === 201) {
  //       setMessage('Applied successfully');
  //       setSubmitted(true);

  //       // Trigger animations after a slight delay
  //       setTimeout(() => {
  //         animateEnvelope();
  //       }, 100); // Adjust delay if needed
  //     } else {
  //       setMessage(data.message);
  //     }
  //   } catch (error) {
  //     setMessage('Error submitting form');
  //   }
   };

  return (
    <div className="container">
      <video className="video-background" autoPlay loop muted>
        <source src="back.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`form-wrapper ${submitted ? 'submitted' : ''}`}>
        <div className="form-container">
          {message ? (
            <h2>{message}</h2>
          ) : (
            <form onSubmit={handleSubmit} className="application-form">
              <div>
                <h1 className="abc">Register Now!</h1>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  style={{ marginTop: 30 }}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="uid"
                  placeholder="UID"
                  value={formData.uid}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="Student">Student</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Designer">Designer</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <button type="submit">Apply</button>
            </form>
          )}
        </div>

        {/* Envelope remains hidden until submitted */}
        <div
        style={{marginLeft:300}}
          id="envelope"
          className={`envelope ${submitted ? 'show-envelope' : ''} ${
            showLogoSeal ? 'show-logo' : ''
          }`}
        >
          <div className="envelope-flap"></div>
          <div>
            <img className="logoseal" src="Cac_logo.png" alt="Logo Seal" />
          </div>
          <div className="envelope-content">Thank you for applying!</div>
        </div>
      </div>
      <div className="info-container">
        {submitted ? (
          <>
            <h1 className="prob">With us</h1>
          </>
        ) : (
          <>
            <h1>
              Create <span style={{ color: '#B22A2A' }}>memories</span> of life
              time
            </h1>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
