import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import StateSpecificChart from '../StateSpecificChart'

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

const StateSpecificOverAllStatsCard = props => {
  const {
    itemClassName,
    itemHeadingClassName,
    itemHeadingValue,
    itemImageUrl,
    itemImageAltText,
    itemDescriptionClassName,
    itemDescriptionValue,
    isActive,
    onChangeCategory,
    categoryValue,
    stateCardId,
  } = props

  const changeCategory = () => {
    onChangeCategory(categoryValue)
  }
  return (
    <li
      style={{
        width: '100%',
        maxWidth: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      id={stateCardId}
    >
      <button
        onClick={changeCategory}
        className={`state-specific-overall-stats-card ${itemClassName} ${isActive}`}
        type="button"
      >
        <p
          className={`state-specific-overall-stats-card-heading ${itemHeadingClassName}`}
        >
          {itemHeadingValue}
        </p>
        <img
          src={itemImageUrl}
          className="state-specific-overall-stats-card-image"
          alt={itemImageAltText}
        />
        <p
          className={`state-specific-overall-stats-card-description ${itemDescriptionClassName}`}
        >
          {itemDescriptionValue}
        </p>
      </button>
    </li>
  )
}

class StateSpecificRoute extends Component {
  state = {
    pageStatus: 'INITIAL',
    totalConfirmedCases: 0,
    totalActiveCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
    totalTestedCasesCount: 0,
    defaultSelectedCategory: 'Confirmed',
    totalDistrictWiseConfirmedCasesList: [],
    totalDistrictWiseActiveCasesList: [],
    totalDistrictWiseRecoveredCasesList: [],
    totalDistrictWiseDeceasedCasesList: [],
    stateName: '',
    lastUpdatedDate: '',
    stateId: '',
  }

  componentDidMount() {
    this.setState({pageStatus: 'LOADING'}, this.fetchStateSpecificRouteData)
  }

  fetchStateSpecificRouteData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateId} = params
    const isStateIdValid = statesList.filter(
      eachitem => eachitem.state_code === stateId,
    )
    const updatedStateId =
      isStateIdValid.length > 0 ? isStateIdValid[0].state_code : 'AP'
    const url = 'https://apis.ccbp.in/covid19-state-wise-data/'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()

      const stateObj = data[updatedStateId]

      const stateName = statesList.filter(
        eachitem => eachitem.state_code === updatedStateId,
      )

      const cumulativeTestedCasesCount = stateObj.total.tested
      const cumulativeConfirmedCases = stateObj.total.confirmed
      const cumulativeActiveCases =
        stateObj.total.confirmed -
        (stateObj.total.recovered + stateObj.total.deceased)
      const cumulativeRecoveredCases = stateObj.total.recovered
      const cumulativeDeceasedCases = stateObj.total.deceased

      const districtNamesKeys = Object.keys(stateObj.districts)

      const cumulativeDistrictWiseConfirmedCasesList = districtNamesKeys.map(
        eachitem => {
          const casesCount =
            typeof stateObj.districts[eachitem].total.confirmed === 'number'
              ? stateObj.districts[eachitem].total.confirmed
              : 0
          return {
            districtName: eachitem,
            casesCount,
          }
        },
      )
      const cumulativeDistrictWiseActiveCasesList = districtNamesKeys.map(
        eachitem => {
          const confirmedValue = stateObj.districts[eachitem].total.confirmed
          const recoveredValue = stateObj.districts[eachitem].total.recovered
          const deceasedValue = stateObj.districts[eachitem].total.deceased
          let casesCount
          if (
            typeof confirmedValue === 'number' &&
            typeof recoveredValue === 'number' &&
            typeof deceasedValue === 'number'
          ) {
            casesCount = confirmedValue - (recoveredValue + deceasedValue)
          } else {
            casesCount = 0
          }
          return {
            districtName: eachitem,
            casesCount,
          }
        },
      )
      const cumulativeDistrictWiseRecoveredCasesList = districtNamesKeys.map(
        eachitem => {
          const casesCount =
            typeof stateObj.districts[eachitem].total.recovered === 'number'
              ? stateObj.districts[eachitem].total.recovered
              : 0
          return {
            districtName: eachitem,
            casesCount,
          }
        },
      )
      const cumulativeDistrictWiseDeceasedCasesList = districtNamesKeys.map(
        eachitem => {
          const casesCount =
            typeof stateObj.districts[eachitem].total.deceased === 'number'
              ? stateObj.districts[eachitem].total.deceased
              : 0
          return {
            districtName: eachitem,
            casesCount,
          }
        },
      )

      this.setState({
        pageStatus: 'SUCCESS',
        totalConfirmedCases: cumulativeConfirmedCases,
        totalActiveCases: cumulativeActiveCases,
        totalRecoveredCases: cumulativeRecoveredCases,
        totalDeceasedCases: cumulativeDeceasedCases,
        totalTestedCasesCount: cumulativeTestedCasesCount,
        totalDistrictWiseConfirmedCasesList: cumulativeDistrictWiseConfirmedCasesList,
        totalDistrictWiseActiveCasesList: cumulativeDistrictWiseActiveCasesList,
        totalDistrictWiseRecoveredCasesList: cumulativeDistrictWiseRecoveredCasesList,
        totalDistrictWiseDeceasedCasesList: cumulativeDistrictWiseDeceasedCasesList,
        stateName: stateName[0].state_name,
        lastUpdatedDate: stateObj.meta.last_updated,
        stateId: updatedStateId,
      })
    }
  }

  onChangeCategory = value => {
    this.setState({defaultSelectedCategory: value})
  }

  renderLoaderCard = () => (
    <div className="loader-bg-container" id="stateDetailsLoader">
      <Loader type="TailSpin" color="#00BBFF" height={60} width={60} />
    </div>
  )

  renderSuccessCard = () => {
    const {
      totalConfirmedCases,
      totalActiveCases,
      totalRecoveredCases,
      totalDeceasedCases,
      totalTestedCasesCount,
      totalDistrictWiseConfirmedCasesList,
      totalDistrictWiseActiveCasesList,
      totalDistrictWiseRecoveredCasesList,
      totalDistrictWiseDeceasedCasesList,
      defaultSelectedCategory,
      lastUpdatedDate,
      stateName,
      stateId,
    } = this.state
    let districtWiseStatsList
    let districtWiseStatsListHeading
    if (defaultSelectedCategory === 'Confirmed') {
      const referenceList = totalDistrictWiseConfirmedCasesList.map(
        eachitem => eachitem.casesCount,
      )
      const sortedReferenceList = referenceList.sort()
      const updatedList = sortedReferenceList.map(eachitem => {
        const obj = totalDistrictWiseConfirmedCasesList.filter(
          eachobj => eachobj.casesCount === eachitem,
        )
        return obj[0]
      })
      districtWiseStatsList = updatedList.sort().reverse()
      districtWiseStatsListHeading = 'confirmed-districts-heading'
    } else if (defaultSelectedCategory === 'Active') {
      const referenceList = totalDistrictWiseActiveCasesList.map(
        eachitem => eachitem.casesCount,
      )
      const sortedReferenceList = referenceList.sort()
      const updatedList = sortedReferenceList.map(eachitem => {
        const obj = totalDistrictWiseActiveCasesList.filter(
          eachobj => eachobj.casesCount === eachitem,
        )
        return obj[0]
      })
      districtWiseStatsList = updatedList.sort().reverse()
      districtWiseStatsListHeading = 'active-districts-heading'
    } else if (defaultSelectedCategory === 'Recovered') {
      const referenceList = totalDistrictWiseRecoveredCasesList.map(
        eachitem => eachitem.casesCount,
      )
      const sortedReferenceList = referenceList.sort()
      const updatedList = sortedReferenceList.map(eachitem => {
        const obj = totalDistrictWiseRecoveredCasesList.filter(
          eachobj => eachobj.casesCount === eachitem,
        )
        return obj[0]
      })
      districtWiseStatsList = updatedList.sort().reverse()
      districtWiseStatsListHeading = 'recovered-districts-heading'
    } else {
      const referenceList = totalDistrictWiseDeceasedCasesList.map(
        eachitem => eachitem.casesCount,
      )
      const sortedReferenceList = referenceList.sort()
      const updatedList = sortedReferenceList.map(eachitem => {
        const obj = totalDistrictWiseDeceasedCasesList.filter(
          eachobj => eachobj.casesCount === eachitem,
        )
        return obj[0]
      })
      districtWiseStatsList = updatedList.sort().reverse()
      districtWiseStatsListHeading = 'deceased-districts-heading'
    }
    return (
      <div
        id="lineChartsContainer"
        className="state-specific-route-bg-container"
      >
        <div className="state-specific-route-header-card">
          <div className="header-card-title-card">
            <h1 className="header-card-title-card-heading">{stateName}</h1>
            <p className="header-card-title-card-description">
              Last update on {new Date(lastUpdatedDate).toLocaleDateString()}.
            </p>
          </div>
          <div className="header-card-tested-card">
            <p className="header-card-tested-card-heading">Tested</p>
            <p className="header-card-tested-card-description">
              {totalTestedCasesCount}
            </p>
          </div>
        </div>
        <ul className="state-specific-route-overall-stats-card">
          <StateSpecificOverAllStatsCard
            itemClassName="state-specific-overall-confirmed-cases-card"
            itemHeadingClassName="state-specific-overall-confirmed-cases-card-heading"
            itemHeadingValue="Confirmed"
            itemImageUrl="https://res.cloudinary.com/dqqgljlsw/image/upload/v1692074484/cowin_dashboard_home_route_overall_stats_card_confirmed_image.png"
            itemImageAltText="state specific confirmed cases pic"
            itemDescriptionClassName="state-specific-overall-confirmed-cases-card-description"
            itemDescriptionValue={totalConfirmedCases}
            isActive={
              defaultSelectedCategory === 'Confirmed'
                ? 'apply-confirmed-bg-color'
                : null
            }
            onChangeCategory={this.onChangeCategory}
            categoryValue="Confirmed"
            stateCardId="stateSpecificConfirmedCasesContainer"
          />
          <StateSpecificOverAllStatsCard
            itemClassName="state-specific-overall-active-cases-card"
            itemHeadingClassName="state-specific-overall-active-cases-card-heading"
            itemHeadingValue="Active"
            itemImageUrl="https://res.cloudinary.com/dqqgljlsw/image/upload/v1692074476/cowin_dashboard_home_route_overall_stats_card_active_image.png"
            itemImageAltText="state specific active cases pic"
            itemDescriptionClassName="state-specific-overall-active-cases-card-description"
            itemDescriptionValue={totalActiveCases}
            isActive={
              defaultSelectedCategory === 'Active'
                ? 'apply-active-bg-color'
                : null
            }
            onChangeCategory={this.onChangeCategory}
            categoryValue="Active"
            stateCardId="stateSpecificActiveCasesContainer"
          />
          <StateSpecificOverAllStatsCard
            itemClassName="state-specific-overall-recovered-cases-card"
            itemHeadingClassName="state-specific-overall-recovered-cases-card-heading"
            itemHeadingValue="Recovered"
            itemImageUrl="https://res.cloudinary.com/dqqgljlsw/image/upload/v1692074496/cowin_dashboard_home_route_overall_stats_card_recovery_image.png"
            itemImageAltText="state specific recovered cases pic"
            itemDescriptionClassName="state-specific-overall-recovered-cases-card-description"
            itemDescriptionValue={totalRecoveredCases}
            isActive={
              defaultSelectedCategory === 'Recovered'
                ? 'apply-recovered-bg-color'
                : null
            }
            onChangeCategory={this.onChangeCategory}
            categoryValue="Recovered"
            stateCardId="stateSpecificRecoveredCasesContainer"
          />
          <StateSpecificOverAllStatsCard
            itemClassName="state-specific-overall-deceased-cases-card"
            itemHeadingClassName="state-specific-overall-deceased-cases-card-heading"
            itemHeadingValue="Deceased"
            itemImageUrl="https://res.cloudinary.com/dqqgljlsw/image/upload/v1692074490/cowin_dashboard_home_route_overall_stats_card_deceased_image.png"
            itemImageAltText="state specific deceased cases pic"
            itemDescriptionClassName="state-specific-overall-deceased-cases-card-description"
            itemDescriptionValue={totalDeceasedCases}
            isActive={
              defaultSelectedCategory === 'Deceased'
                ? 'apply-deceased-bg-color'
                : null
            }
            onChangeCategory={this.onChangeCategory}
            categoryValue="Deceased"
            stateCardId="stateSpecificDeceasedCasesContainer"
          />
        </ul>
        <div className="state-specific-district-wise-stats-bg-container">
          <h1 className={districtWiseStatsListHeading}>Top Districts</h1>
          <ul
            className="state-specific-district-wise-stats-list-bg-container"
            id="topDistrictsUnorderedList"
          >
            {districtWiseStatsList.map(eachitem => (
              <li
                className="state-specific-districts-wise-stats-item"
                key={eachitem.districtName}
              >
                <p className="district-wise-stat-item-heading">
                  {eachitem.casesCount}
                </p>
                <p className="district-wise-stat-item-description">
                  {eachitem.districtName}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <StateSpecificChart
          defaultSelectedCategory={defaultSelectedCategory}
          stateId={stateId}
        />
        <Footer />
      </div>
    )
  }

  renderStateSpecificRoute = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'INITIAL':
        return null
      case 'LOADING':
        return this.renderLoaderCard()
      case 'SUCCESS':
        return this.renderSuccessCard()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderStateSpecificRoute()}
      </>
    )
  }
}

export default StateSpecificRoute
