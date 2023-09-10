import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import Footer from '../Footer'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class AboutRoute extends Component {
  state = {pageStatus: 'INITIAL', faqsList: []}

  componentDidMount() {
    this.startFetchingAboutRouteData()
  }

  startFetchingAboutRouteData = () => {
    this.setState({pageStatus: 'LOADING'}, this.fetchAboutRouteData)
  }

  fetchAboutRouteData = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedList = data.faq.map(eachitem => ({
        qno: eachitem.qno,
        category: eachitem.category,
        question: eachitem.question,
        answer: eachitem.answer,
      }))
      this.setState({pageStatus: 'SUCCESS', faqsList: updatedList})
    } else {
      this.setState({pageStatus: 'FAILURE'})
    }
  }

  renderAboutRouteLoadingComponent = () => (
    <div className="about-route-loading-bg-container" id="aboutRouteLoader">
      <Loader type="TailSpin" color="#007BBF" height={60} width={60} />
    </div>
  )

  renderAboutRouteSuccessComponent = () => {
    const {faqsList} = this.state
    return (
      <div className="about-route-success-bg-container">
        <div className="about-route-success-content-card">
          <h1 className="about-route-success-content-card-heading">About</h1>
          <p className="about-route-success-content-card-description-1">
            Last update on march 28th 2021.
          </p>
          <p className="about-route-success-content-card-description-2">
            COVID-19 vaccines be ready for distribution
          </p>
          <ul
            id="faqsUnorderedList"
            className="about-route-success-faqs-list-bg-container"
          >
            {faqsList.map(eachitem => (
              <li
                className="about-route-success-faqs-list-item"
                key={`faqNo${eachitem.qno}`}
              >
                <p className="about-route-success-faqs-list-item-heading">
                  {eachitem.qno}) {eachitem.question}
                </p>
                <p className="about-route-success-faqs-list-item-description">
                  {eachitem.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  renderAboutRouteFailureComponent = () => (
    <div className="about-route-failure-bg-container">
      <button
        type="button"
        className="about-route-failure-button"
        onClick={this.startFetchingAboutRouteData}
      >
        Retry
      </button>
    </div>
  )

  renderAboutRoute = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'INITIAL':
        return null
      case 'LOADING':
        return this.renderAboutRouteLoadingComponent()
      case 'SUCCESS':
        return this.renderAboutRouteSuccessComponent()
      case 'FAILURE':
        return this.renderAboutRouteFailureComponent()
      default:
        return this.renderAboutRouteFailureComponent()
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderAboutRoute()}
      </>
    )
  }
}

export default AboutRoute
