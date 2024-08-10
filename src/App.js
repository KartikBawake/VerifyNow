import React, { useState } from 'react';
import './App.css';
import Verify from './images/Verify.png';

function App() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState({
    responseTime: '',
    sslInfo: '',
    isUp: null,
    server: '',
    ipAddress: '',
    contentLength: '',
    contentType: '',
    websiteInfo: ''
  });

  const checkWebsite = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/check?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Error checking website:', error);
      setStatus(prevStatus => ({
        ...prevStatus,
        isUp: false,
        websiteInfo: 'Error checking website'
      }));
    }
  };

  return (
        <div className="container">
          <form onSubmit={checkWebsite}>
            <div className="upper_area">
              <div className="search_area_div">
                <div className="search_area">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.example.com/"
                    className="search_bar"
                  />
                </div>
              </div>
              <div className="search_btn_div">
                <button type="submit" className="search_btn">Verify</button>
              </div>
            </div>
          </form>
          <div className="content_area">
            <div className="main_content_area">
              <div className="main_content">
                <div className="main_content_divider_1">
                  <div className="box_1">
                    <div className="text-item small">Status:</div>
                    <div className="text-item large">
                      {status.isUp === null ? '' : status.isUp ? 'Website is Working' : 'Website is Down'}
                    </div>
                  </div>
                  <div className="box_1">
                    <div className="text-item small">Response Time in ms:</div>
                    <div className="text-item large">{status.responseTime}</div>
                  </div>
                </div>
                <div className="main_content_divider_2">
                  <div className="box_2">
                    <div className="text-item small">Security:</div>
                    <div className="text-item large">{status.sslInfo}</div>
                  </div>
                  <div className="box_2">
                    <div className="text-item small">IP Address:</div>
                    <div className="text-item large">{status.ipAddress}</div>
                  </div>
                </div>
                <div className="main_content_divider_3">
                  <div className="box_3">
                    <div className="text-item small">Server:</div>
                    <div className="text-item large">{status.server}</div>
                  </div>
                  <div className="box_3">
                    <div className="text-item small">Content Length:</div>
                    <div className="text-item large">{status.contentLength}</div>
                  </div>
                </div>
                <div className="main_content_divider_4">
                  <div className="box_4">
                    <div className="text-item small">Content Type:</div>
                    <div className="text-item large">{status.contentType}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="secondary_content_area">
              <div className="add_info_area_1">
                <img className='image_display_area' src={Verify} alt="imgagei"/>
              </div>
              <div className="add_info_area_2">
                <div className='description_h small'>Website Description:</div>
                <div className='description_b_container'>
                  <div className='description_b large'>{status.websiteInfo}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
  );
}

export default App;