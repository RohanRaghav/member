import React, { useState, useEffect } from 'react';

export default function Component() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formHeight, setFormHeight] = useState(260);
  const [formPosition, setFormPosition] = useState(-30);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      const foldInterval = setInterval(() => {
        setFormHeight((prevHeight) => {
          if (prevHeight > 0) {
            return prevHeight - 5;
          } else {
            clearInterval(foldInterval);
            return 0;
          }
        });
        setFormPosition((prevPosition) => {
          if (prevPosition < 0) {
            return prevPosition + 1;
          } else {
            return 0;
          }
        });
      }, 20);
    }
  }, [isSubmitted]);

  const formStyle = {
    width: '260px',
    height: `${formHeight}px`,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '20px',
    transition: 'height 0.25s, transform 0.25s',
    overflow: 'hidden',
    transformOrigin: 'top',
    transform: `translateY(${formPosition}px) ${isSubmitted ? 'perspective(1000px) rotateX(-90deg)' : 'rotateX(0)'}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const envelopeStyle = {
    width: '340px',
    height: '340px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #999',
    position: 'relative',
    overflow: 'hidden',
    display: 'grid',
    placeItems: 'center',
  };

  const flapStyle = {
    width: '0',
    height: '0',
    borderLeft: '170px solid transparent',
    borderRight: '170px solid transparent',
    borderTop: '120px solid #e0e0e0',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: isSubmitted ? 'rotateX(0)' : 'rotateX(-180deg)',
    transformOrigin: 'top',
    transition: 'transform 1s',
    transitionDelay: '0.75s',
  };

  const inputStyle = {
    width: '100%',
    marginBottom: '10px',
    padding: '5px',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={envelopeStyle}>
        <div style={flapStyle}></div>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input type="text" placeholder="Name" style={inputStyle} />
          <input type="email" placeholder="Email" style={inputStyle} />
          <textarea placeholder="Message" style={{ ...inputStyle, height: '100px', resize: 'none' }} />
          <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
