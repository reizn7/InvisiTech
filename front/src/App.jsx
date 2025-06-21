import { useEffect } from 'react'
import PythonBackCall from './pythonbackcall';
import './App.css'

function App() {
    useEffect(() => {
    const toggle = document.getElementById('toggleMode');
    const body = document.body;

    const handleToggle = () => {
      if (toggle && toggle.checked) {
        body.classList.add('light');
      } else {
        body.classList.remove('light');
      }
    };

    if (toggle) {
      toggle.addEventListener('change', handleToggle);
    }

    return () => {
      if (toggle) {
        toggle.removeEventListener('change', handleToggle);
      }
    };
  }, []);

  return (
     <div className="main">
      <div className="heading">InvisiTech</div>

      <div className="container">
        <p>Your real time invisibility cloak. Powered by YOLO.</p>

        <div className="video-area">
          <video id="webcam" autoPlay playsInline></video>
          {/* <canvas id="overlay"></canvas> */}
        </div>
        <PythonBackCall />
        <div className="note">Note: Your one step solution at cracking interviews.</div>

        <label className="toggle-switch">
          <input type="checkbox" id="toggleMode" />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  )
}

export default App
