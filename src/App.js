import React, { useState } from 'react';
import './App.css';
import Modal from './Modal';
import Verify from './images/Verify.png';
import facebook from './images/facebook icon.png';
import git from './images/git icon.png';
import instagram from './images/instagram icon.png';
import linkedin from './images/linkedIn icon.png';
import xicon from './images/x icon.png';
import whatsapp from './images/whatsapp icon.png';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const openModal = (title, content) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

          <div className="navbar_container_div">
            <div className="navbar_container">
              <div className="navbar">
                <div className="nav_btn" onClick={() => openModal('About Us', "Welcome to VerifyNow, your go-to tool for quickly and accurately checking the status of any website. Whether you're a developer, a business owner, or simply someone who wants to ensure their favorite website is up and running, VerifyNow offers a comprehensive solution to meet your needs. At VerifyNow, we provide essential information, including website ping times, content availability, operational status, and content length. Our mission is to offer a reliable and user-friendly platform that helps you stay informed about the websites you care about. Founded by Kartik Bawake, VerifyNow is built on the principles of transparency, efficiency, and accessibility. We understand how crucial it is to have immediate access to accurate website data, and we are committed to delivering just that. Thank you for choosing VerifyNow as your trusted resource for website verification. We’re here to help you stay connected and informed, every step of the way.")}>
                  About us
                </div>
              </div>
              <div className="navbar">
              <div className="nav_btn">Home</div>
              </div>
              <div className="navbar">
                <div className="nav_btn" onClick={() => openModal('Privacy Policy', "Welcome to VerifyNow. VerifyNow is owned and operated by Kartik Bawake. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website, https://verifynow.site. By using our Site, you agree to the terms outlined in this Privacy Policy. When you enter a URL into our Site, we collect and analyze information related to that specific website, such as ping, website content, website status, content length, and other related metrics. When you enter a URL into our Site, we collect and analyze information related to that specific website, such as ping, website content, website status, content length, and other related metrics. If you have any questions or concerns about this Privacy Policy, please contact us.")}>
                  Privacy policy
                </div>
              </div>
            </div>
          </div>

          <div className="social_div">
            <div className="social">
              <a href="https://www.facebook.com/kartik.bawake.92" target="blank">
                <img className="social_icons" src={facebook} alt="facebook logo"/>
              </a>
            </div>
            <div className="social">
              <img className="social_icons" src={whatsapp} alt="whatsapp logo"/>
            </div>
            <div className="social">
              <a href="https://x.com/Karthik_Bawake" target="blank">
                <img className="social_icons" src={xicon} alt="x logo"/>
              </a>
            </div>
            <div className="social">
              <a href="https://simonsmith.github.io/github-user-search/#/KartikBawake" target="blank">
                <img className="social_icons" src={git} alt="github logo"/>
              </a>
            </div>
            <div className="social">
              <a href="https://in.linkedin.com/in/kartik-bawake-99a70a" target="blank">
                <img className="social_icons" src={linkedin} alt="linkedin logo"/>
              </a>
            </div>
            <div className="social">
              <a href="https://www.instagram.com/k_artikkkk/" target="blank">
                <img className="social_icons" src={instagram} alt="instagram logo"/>
              </a>
            </div>
          </div>

          <form onSubmit={checkWebsite}>
            <div className="upper_area">
              <div className="search_area_div">
                <div className="search_bar_wrapper">
                  <div className="search_area">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://www.example.com/"
                      className="search_bar"
                    />
                    <button type="submit" className="search_button"> &#128269; </button>
                  </div>
                </div>
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

          <div className='note'>
            <div className="note_text_header"><b> &nbsp; Note: &nbsp; </b></div>
            <div className="note_text">&#8226; Some servers have the ability to block our requests which can result in responding with an unexpected error</div>
            <div className="note_text">&#8226; The results provided are based on various technical parameters and may not always reflect the true status of a website</div>
            <div className="note_text">&#8226; Some servers may block certain parameters used in our checks, resulting in "N/A" or nothing being shown</div>
          </div>

          <div className="warning">
            <div>&#9888; Currently this Website is not compatible for/with smartphones and mini-tablets!!! Try accessing this website with a PC or a Laptop for best results </div>
          </div>

          <div className="footer">
            <div>Copyright &copy; 2024 VerifyNow | Kartik Bawake</div>
          </div>

          <Modal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            title={modalContent.title} 
            content={modalContent.content}
          />

        </div>
  );
}

export default App;