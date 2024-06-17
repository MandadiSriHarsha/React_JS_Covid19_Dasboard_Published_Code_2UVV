import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Header from '../Header'
import Footer from '../Footer'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const OverAllStatsCard = props => {
  const {
    itemClassName,
    itemHeadingClassName,
    itemHeadingValue,
    itemImageUrl,
    itemImageAltText,
    itemDescriptionClassName,
    itemDescriptionValue,
    cardId,
  } = props
  return (
    <li className={`overall-stats-card ${itemClassName}`} id={cardId}>
      <p className={`overall-stats-card-heading ${itemHeadingClassName}`}>
        {itemHeadingValue}
      </p>
      <img
        src={itemImageUrl}
        className="overall-stats-card-image"
        alt={itemImageAltText}
      />
      <p
        className={`overall-stats-card-description ${itemDescriptionClassName}`}
      >
        {itemDescriptionValue}
      </p>
    </li>
  )
}

class HomeRoute extends Component {
  state = {
    pageStatus: 'INITIAL',
    defaultSortValue: 'ASC',
    searchText: '',
    statsList: [],
    totalConfirmedCases: 0,
    totalActiveCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
  }

  componentDidMount() {
    this.startFetchingHomeRouteData()
  }

  startFetchingHomeRouteData = () => {
    this.setState({pageStatus: 'LOADING'}, this.fetchHomeRouteData)
  }

  fetchHomeRouteData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      let cumulativeConfirmedCases = 0
      let cumulativeActiveCases = 0
      let cumulativeRecoveredCases = 0
      let cumulativeDeceasedCases = 0
      const updatedList = statesList.map(eachitem => {
        const stateName = eachitem.state_name
        const stateCode = eachitem.state_code
        const confirmedCases = data[stateCode].total.confirmed
        const deceasedCases = data[stateCode].total.deceased
        const recoveredCases = data[stateCode].total.recovered
        const activeCases = confirmedCases - (deceasedCases + recoveredCases)
        const statePopulation = data[stateCode].meta.population
        const stateStatsObj = {
          stateName,
          stateCode,
          confirmedCases,
          deceasedCases,
          recoveredCases,
          activeCases,
          statePopulation,
        }
        cumulativeConfirmedCases += confirmedCases
        cumulativeActiveCases += activeCases
        cumulativeRecoveredCases += recoveredCases
        cumulativeDeceasedCases += deceasedCases
        return stateStatsObj
      })
      this.setState({
        pageStatus: 'SUCCESS',
        statsList: updatedList,
        totalConfirmedCases: cumulativeConfirmedCases,
        totalActiveCases: cumulativeActiveCases,
        totalDeceasedCases: cumulativeDeceasedCases,
        totalRecoveredCases: cumulativeRecoveredCases,
      })
    } else {
      this.setState({
        pageStatus: 'FAILURE',
        statsList: [],
        totalConfirmedCases: 0,
        totalActiveCases: 0,
        totalDeceasedCases: 0,
        totalRecoveredCases: 0,
      })
    }
  }

  onChangeSortValueToDESC = () => {
    this.setState({defaultSortValue: 'DESC'})
  }

  onChangeSortValueToASC = () => {
    this.setState({defaultSortValue: 'ASC'})
  }

  onChangeSearchText = event => {
    this.setState({searchText: event.target.value})
  }

  renderHomeRouteSuccessComponentInputCard = () => {
    const {searchText} = this.state
    return (
      <div className="input-bg-container">
        <BsSearch className="search-icon" />
        <input
          type="search"
          placeholder="Enter State Name or State Key"
          className="search-input"
          value={searchText}
          onChange={this.onChangeSearchText}
        />
      </div>
    )
  }

  renderHomeRouteSuccessComponentSearchResultListCard = () => {
    const {searchText} = this.state
    const searchList = statesList.filter(
      eachitem =>
        eachitem.state_name.toLowerCase().includes(searchText.toLowerCase()) ||
        eachitem.state_code.toLowerCase().includes(searchText.toLowerCase()),
    )
    return (
      <ul
        className="search-result-list-bg-container"
        id="searchResultsUnorderedList"
      >
        {searchList.map(eachitem => (
          <li className="search-result-item" key={eachitem.state_code}>
            <Link
              to={`/state/${eachitem.state_code}`}
              className="search-result-link-item"
            >
              <p className="search-result-link-item-heading">
                {eachitem.state_name}
              </p>
              <div className="search-result-link-item-badge">
                <p className="search-result-link-item-badge-name">
                  {eachitem.state_code}
                </p>
                <BiChevronRightSquare className="search-result-link-item-badge-icon" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderHomeRouteSuccessComponentOverAllStatsCard = () => {
    const {
      totalConfirmedCases,
      totalActiveCases,
      totalRecoveredCases,
      totalDeceasedCases,
    } = this.state
    return (
      <ul className="home-route-overall-stats-bg-container">
        <OverAllStatsCard
          itemClassName="overall-confirmed-cases-card"
          itemHeadingClassName="overall-confirmed-cases-card-heading"
          itemHeadingValue="Confirmed"
          itemImageUrl="https://res.cloudinary.com/dqqgljlsw/image/upload/v1692074484/cowin_dashboard_home_route_overall_stats_card_confirmed_image.png"
          itemImageAltText="country wide confirmed cases pic"
          itemDescriptionClassName="overall-confirmed-cases-card-description"
          itemDescriptionValue={totalConfirmedCases}
          cardId="countryWideConfirmedCases"
        />
        <OverAllStatsCard
          itemClassName="overall-active-cases-card"
          itemHeadingClassName="overall-active-cases-card-heading"
          itemHeadingValue="Active"
          itemImageUrl="https://res.cloudinary.com/dqqgljlsw/image/upload/v1692074476/cowin_dashboard_home_route_overall_stats_card_active_image.png"
          itemImageAltText="country wide active cases pic"
          itemDescriptionClassName="overall-active-cases-card-description"
          itemDescriptionValue={totalActiveCases}
          cardId="countryWideActiveCases"
        />
        <OverAllStatsCard
          itemClassName="overall-recovered-cases-card"
          itemHeadingClassName="overall-recovered-cases-card-heading"
          itemHeadingValue="Recovered"
          itemImageUrl="https://res.cloudinary.com/dqqgljlsw/image/upload/v1692074496/cowin_dashboard_home_route_overall_stats_card_recovery_image.png"
          itemImageAltText="country wide recovered cases pic"
          itemDescriptionClassName="overall-recovered-cases-card-description"
          itemDescriptionValue={totalRecoveredCases}
          cardId="countryWideRecoveredCases"
        />
        <OverAllStatsCard
          itemClassName="overall-deceased-cases-card"
          itemHeadingClassName="overall-deceased-cases-card-heading"
          itemHeadingValue="Deceased"
          itemImageUrl="https://res.cloudinary.com/dqqgljlsw/image/upload/v1692074490/cowin_dashboard_home_route_overall_stats_card_deceased_image.png"
          itemImageAltText="country wide deceased cases pic"
          itemDescriptionClassName="overall-deceased-cases-card-description"
          itemDescriptionValue={totalDeceasedCases}
          cardId="countryWideDeceasedCases"
        />
      </ul>
    )
  }

  renderHomeRouteSuccessComponentStatsAndTableCard = () => {
    const {statsList, defaultSortValue} = this.state
    let sortedStatsList
    if (defaultSortValue === 'ASC') {
      const referenceList = statsList.map(eachitem => eachitem.stateName)
      const sortedReferenceList = referenceList.sort()
      const updatedReferenceList = sortedReferenceList.map(eachitem => {
        const obj = statsList.filter(eachobj => eachobj.stateName === eachitem)
        return obj[0]
      })
      sortedStatsList = updatedReferenceList
    } else {
      const referenceList = statsList.map(eachitem => eachitem.stateName)
      const sortedReferenceList = referenceList.sort().reverse()
      const updatedReferenceList = sortedReferenceList.map(eachitem => {
        const obj = statsList.filter(eachobj => eachobj.stateName === eachitem)
        return obj[0]
      })
      sortedStatsList = updatedReferenceList
    }
    return (
      <>
        {this.renderHomeRouteSuccessComponentOverAllStatsCard()}
        <div
          id="stateWiseCovidDataTable"
          className="home-route-stats-table-bg-container"
        >
          <ul className="home-route-stats-table">
            <li
              className="home-route-stats-table-header-card"
              key="homeRouteStatsTableHeaderCard"
            >
              <div className="sort-card">
                <p className="sort-card-heading">States/UT</p>
                <button
                  className="sort-button"
                  type="button"
                  onClick={this.onChangeSortValueToASC}
                  id="ascendingSort" aria-label="AscendingSort"
                >
                  <FcGenericSortingAsc className="asc-icon" />
                </button>
                <button
                  className="sort-button"
                  type="button"
                  onClick={this.onChangeSortValueToDESC}
                  id="descendingSort" aria-label="DescendingSort"
                >
                  <FcGenericSortingDesc className="desc-icon" />
                </button>
              </div>
              <p className="stats-table-header-card-heading">Confirmed</p>
              <p className="stats-table-header-card-heading">Active</p>
              <p className="stats-table-header-card-heading">Recovered</p>
              <p className="stats-table-header-card-heading">Deceased</p>
              <p className="stats-table-header-card-heading">Population</p>
            </li>
            {sortedStatsList.map(eachitem => (
              <li
                className="home-route-stats-table-stat-item"
                key={eachitem.stateCode}
              >
                <p className="stat-item-state-name">{eachitem.stateName}</p>
                <p className="stat-item-confirmed-text">
                  {eachitem.confirmedCases}
                </p>
                <p className="stat-item-active-text">{eachitem.activeCases}</p>
                <p className="stat-item-recovered-text">
                  {eachitem.recoveredCases}
                </p>
                <p className="stat-item-deceased-text">
                  {eachitem.deceasedCases}
                </p>
                <p className="stat-item-population-text">
                  {eachitem.statePopulation}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderHomeRouteLoadingComponent = () => (
    <div className="home-route-loading-bg-container" id="homeRouteLoader">
      <Loader type="TailSpin" color="#00BBFF" height={60} width={60} />
    </div>
  )

  renderHomeRouteSuccessComponent = () => {
    const {searchText} = this.state
    return (
      <div className="home-route-success-bg-container">
        {this.renderHomeRouteSuccessComponentInputCard()}
        {searchText.length > 0
          ? this.renderHomeRouteSuccessComponentSearchResultListCard()
          : this.renderHomeRouteSuccessComponentStatsAndTableCard()}
        <Footer />
      </div>
    )
  }

  renderHomeRouteFailureComponent = () => (
    <div className="home-route-failure-bg-container">
      <button
        type="button"
        className="home-route-failure-button"
        onClick={this.startFetchingHomeRouteData}
      >
        Retry
      </button>
    </div>
  )

  renderHomeRoute = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'INITIAL':
        return null
      case 'LOADING':
        return this.renderHomeRouteLoadingComponent()
      case 'SUCCESS':
        return this.renderHomeRouteSuccessComponent()
      case 'FAILURE':
        return this.renderHomeRouteFailureComponent()
      default:
        return this.renderHomeRouteFailureComponent()
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderHomeRoute()}
      </>
    )
  }
}

export default HomeRoute
