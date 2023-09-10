import {useState} from 'react'
import {Link, withRouter, useLocation} from 'react-router-dom'

import {AiFillCloseCircle} from 'react-icons/ai'
import {MdOutlinePlaylistPlay} from 'react-icons/md'

import './index.css'

const MobileHeader = props => {
  const [isMenuClicked, onToggleMenuBar] = useState(false)

  const {match} = props
  const {params} = match
  const {stateId} = params

  const path = useLocation().pathname

  let applyMobileHomeOptionStyle
  let applyDesktopHomeOptionStyle
  if (path === '/' || path === `/state/${stateId}`) {
    applyMobileHomeOptionStyle =
      'apply-mobile-navbar-menu-card-content-card-home-option-item-style'
    applyDesktopHomeOptionStyle =
      'apply-desktop-navbar-menu-card-home-item-style'
  } else {
    applyMobileHomeOptionStyle = null
    applyDesktopHomeOptionStyle = null
  }

  let applyMobileVaccinationOptionStyle
  let applyDesktopVaccinationOptionStyle
  if (path === '/vaccination') {
    applyMobileVaccinationOptionStyle =
      'apply-mobile-navbar-menu-card-content-card-vaccination-option-item-style'
    applyDesktopVaccinationOptionStyle =
      'apply-desktop-navbar-menu-card-vaccination-item-style'
  } else {
    applyMobileVaccinationOptionStyle = null
    applyDesktopVaccinationOptionStyle = null
  }

  let applyMobileAboutOptionStyle
  let applyDesktopAboutOptionStyle
  if (path === '/about') {
    applyMobileAboutOptionStyle =
      'apply-mobile-navbar-menu-card-content-card-about-option-item-style'
    applyDesktopAboutOptionStyle =
      'apply-desktop-navbar-menu-card-about-item-style'
  } else {
    applyMobileAboutOptionStyle = null
    applyDesktopAboutOptionStyle = null
  }

  const onShowMobileMenuCard = () => {
    onToggleMenuBar(true)
  }

  const onCloseMobileMenuCard = () => {
    onToggleMenuBar(false)
  }

  return (
    <nav className="application-navbar">
      <div className="navbar-display-card">
        <Link to="/" className="navbar-title">
          <h1 className="navbar-title-text">
            COVID19<span className="navbar-title-text-span">INDIA</span>
          </h1>
        </Link>
        <div className="navbar-menu-card">
          <button
            className="mobile-navbar-show-menu-card-button"
            type="button"
            onClick={onShowMobileMenuCard}
          >
            <MdOutlinePlaylistPlay className="mobile-navbar-show-menu-card-button-icon" />
          </button>
          <ul className="desktop-navbar-menu-card">
            <li
              key="desktopNavbarMenuCardListItemOne"
              style={{padding: '0px 0px 0px 0px', margin: '0px 0px 0px 0px'}}
            >
              <Link
                to="/"
                className={`desktop-navbar-menu-card-item ${applyDesktopHomeOptionStyle}`}
              >
                Home
              </Link>
            </li>
            <li
              key="desktopNavbarMenuCardListItemTwo"
              style={{padding: '0px 0px 0px 0px', margin: '0px 0px 0px 0px'}}
            >
              <Link
                to="/vaccination"
                className={`desktop-navbar-menu-card-item ${applyDesktopVaccinationOptionStyle}`}
              >
                Vaccination
              </Link>
            </li>
            <li
              key="desktopNavbarMenuCardListItemThree"
              style={{padding: '0px 0px 0px 0px', margin: '0px 0px 0px 0px'}}
            >
              <Link
                to="/about"
                className={`desktop-navbar-menu-card-item ${applyDesktopAboutOptionStyle}`}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {isMenuClicked && (
        <div className="mobile-navbar-menu-card">
          <ul className="mobile-navbar-menu-card-content-card">
            <li
              key="mobileNavbarMenuCardListItemOne"
              className="mobile-navbar-menu-card-content-card-item"
            >
              <Link
                to="/"
                className={`mobile-navbar-menu-card-content-card-option-item ${applyMobileHomeOptionStyle}`}
              >
                Home
              </Link>
            </li>
            <li
              key="mobileNavbarMenuCardListItemTwo"
              className="mobile-navbar-menu-card-content-card-item"
            >
              <Link
                to="/vaccination"
                className={`mobile-navbar-menu-card-content-card-option-item ${applyMobileVaccinationOptionStyle}`}
              >
                Vaccination
              </Link>
            </li>
            <li
              key="mobileNavbarMenuCardListItemThree"
              className="mobile-navbar-menu-card-content-card-item"
            >
              <Link
                to="/about"
                className={`mobile-navbar-menu-card-content-card-option-item ${applyMobileAboutOptionStyle}`}
              >
                About
              </Link>
            </li>
          </ul>
          <button
            className="mobile-navbar-close-menu-card-button"
            type="button"
            onClick={onCloseMobileMenuCard}
          >
            <AiFillCloseCircle className="mobile-navbar-close-menu-card-button-icon" />
          </button>
        </div>
      )}
    </nav>
  )
}

export default withRouter(MobileHeader)
