import React from 'react';
import MusteriApp from './MusteriApp';
import SoforiPad from './SoforiPad';

export default function App() {
  // Şimdilik sadece birini gösterelim ki beyaz ekran gitsin
  return (
    <div>
      <MusteriApp />
      {/* <SoforiPad /> */} 
    </div>
  );
}