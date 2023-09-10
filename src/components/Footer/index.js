import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-bg-container">
    <h1 className="footer-heading">
      COVID19<span className="footer-heading-span">INDIA</span>
    </h1>
    <p className="footer-description">
      We stand with everyone fighting on the front lines
    </p>
    <div className="footer-icons-container">
      <a href="https://www.github.com" target="_blank" rel="noreferrer">
        <VscGithubAlt className="footer-icon" />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
        <FiInstagram className="footer-icon" />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
        <FaTwitter className="footer-icon" />
      </a>
    </div>
  </div>
)

export default Footer
