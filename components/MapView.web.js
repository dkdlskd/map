// components/MapView.web.js
import React from 'react';

export default function WebMap() {
  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCB-2te3cxT-AfYwAEYsJBtH4Vgo4r92xo&q=홍익대학교`}
        allowFullScreen
      ></iframe>
    </div>
  );
}
