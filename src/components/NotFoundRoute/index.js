import './index.css'

const NotFoundRoute = props => {
  const onNavigateToHomeScreen = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-route-bg-container">
      <img
        src="https://res.cloudinary.com/dqqgljlsw/image/upload/v1692001053/cowin_dashboard_not_found_route_image.png"
        alt="not-found-pic"
        className="not-found-route-image"
      />
      <h1 className="not-found-route-heading">PAGE NOT FOUND</h1>
      <p className="not-found-route-description">
        We are sorry, the page you requested could not be found
      </p>
      <button
        className="not-found-route-button"
        type="button"
        onClick={onNavigateToHomeScreen}
      >
        To Home Page
      </button>
    </div>
  )
}

export default NotFoundRoute
