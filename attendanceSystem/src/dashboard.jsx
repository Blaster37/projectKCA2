import React, { useState } from 'react'; 
import "./dashboard.css"
import { QRCodeSVG } from 'qrcode.react';
const StudentAttendance = () => {
  const [status, setStatus] = useState('');
  const[showQR,setShowQR] =useState(false)

  const markAttendance = () => {
    setShowQR(true)
    setStatus('Scanning QR Code...');
    
    setTimeout(() => {
      setStatus('Attendance marked successfully!');
    }, 1500);
  };

  return (
    <div className="container">
      <h2>Student Attendance</h2>
      <p>Scan QR Code to mark attendance</p>

      <button onClick={markAttendance}>Scan QR Code</button>

      {showQR && (
        <div className="qr-code">
          <QRCodeSVG value="https://example.com/attendance" size={180} />
        </div>
      )}
      
      
      <div id="status">{status}</div>
    </div>
  );
};

export default StudentAttendance;