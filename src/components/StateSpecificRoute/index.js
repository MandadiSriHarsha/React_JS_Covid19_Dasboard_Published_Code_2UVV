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
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694422926/Andaman_And_Nicobar_Islands_State_Map_ogykfz.svg',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694424884/Andhra_Pradesh_State_Map_swih3k.svg',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694421634/Arunachal_Pradesh_State_Map_e15a71.svg',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694421705/Assam_State_Map_mzvjuc.svg',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694421132/Bihar_State_Map_k0bmv0.svg',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694422842/Chandigharh_State_Map_h6kdjk.svg',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694422199/Chattisgarh_State_Map_b4d781.svg',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694423012/Dadra_and_Nagar_Haveli_and_Daman_and_Diu_State_Map_hgprjp.svg',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694423220/Delhi_State_Map_b7kdow.svg',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694421767/Goa_State_Map_qpxgfk.svg',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694421281/Gujarat_State_Map_iyfgau.svg',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694420896/Harayana_State_Map_ormp2r.svg',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694418911/Himachal_Pradesh_State_Map_ar0tvn.svg',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694418839/Jammu_and_Kashmir_State_Map_xy0wkb.svg',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694421385/Jharkhand_State_Map_iqjp36.svg',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694422533/Karnataka_State_Map_cuh9ey.svg',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694422604/Kerala_State_Map_rllz78.svg',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694423281/Ladakh_State_Map_mkfzez.svg',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694423077/Lakshadweep_Islands_State_Map_sn0hz8.svg',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694422358/Maharastra_State_Map_p18hel.svg',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694421206/Madhya_Pradesh_State_Map_fcukpp.svg',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694421970/Manipur_State_Map_ehkwuu.svg',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694421829/Meghalaya_State_Map_g2oeeq.svg',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694422032/Mizoram_State_Map_vrbwdg.svg',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694421889/Nagaland_State_Map_zwjgoe.svg',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694422287/Orissa_State_Map_kl7scf.svg',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694423159/Puducherry_State_Map_eihsoq.svg',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694420734/Punjab_State_Map_qclioe.svg',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694420969/Rajasthan_State_Map_mplogk.svg',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694421555/Sikkim_State_Map_ampnod.svg',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694422680/Tamil_Nadu_State_Map_x0fkbv.svg',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694422453/Telangana_State_Map_erfr52.svg',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694422124/Tripura_State_Map_ujdkom.svg',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694421051/Uttar_Pradesh_State_Map_xoy2qn.svg',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694420812/Uttarakhand_State_Map_w18x64.svg',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
    image_url:
      'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694421473/West_Bengal_State_Map_wqyx4f.svg',
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
    <li className="state-specific-overall-stats-card" id={stateCardId}>
      <button
        onClick={changeCategory}
        className={`state-specific-overall-stats-card-button ${itemClassName} ${isActive}`}
        type="button"
      >
        <p
          className={`state-specific-overall-stats-card-button-heading ${itemHeadingClassName}`}
        >
          {itemHeadingValue}
        </p>
        <img
          src={itemImageUrl}
          className="state-specific-overall-stats-card-button-image"
          alt={itemImageAltText}
        />
        <p
          className={`state-specific-overall-stats-card-button-description ${itemDescriptionClassName}`}
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
    statePopulation: '',
    stateImage: '',
    lastUpdatedDate: '',
    stateId: '',
  }

  componentDidMount() {
    this.startFetchingStateSpecificRouteData()
  }

  startFetchingStateSpecificRouteData = () => {
    this.setState({pageStatus: 'LOADING'}, this.fetchStateSpecificRouteData)
  }

  fetchStateSpecificRouteData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateId} = params
    const isStateIdValid = statesList.filter(
      eachitem => eachitem.state_code === stateId,
    )
    let retrievedStateId
    if (isStateIdValid.length > 0) {
      retrievedStateId = isStateIdValid[0].state_code
      const url = 'https://apis.ccbp.in/covid19-state-wise-data/'
      const response = await fetch(url)
      if (response.ok === true) {
        const data = await response.json()

        const stateObj = data[retrievedStateId]

        const stateName = statesList.filter(
          eachitem => eachitem.state_code === retrievedStateId,
        )

        const totalPopulation = stateObj.meta.population

        const stateDisplayImage = statesList.filter(
          eachitem => eachitem.state_code === stateId,
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
          statePopulation: totalPopulation,
          stateImage: stateDisplayImage[0].image_url,
          lastUpdatedDate: stateObj.meta.last_updated,
          stateId: retrievedStateId,
        })
      } else {
        this.setState({pageStatus: 'NETWORK FAILURE'})
      }
    } else {
      this.setState({pageStatus: 'ROUTE FAILURE'})
    }
  }

  onChangeCategory = value => {
    this.setState({defaultSelectedCategory: value})
  }

  renderStateSpecificRouteLoadingComponent = () => (
    <div
      className="state-specific-route-loading-bg-container"
      id="stateDetailsLoader"
    >
      <Loader type="TailSpin" color="#00BBFF" height={60} width={60} />
    </div>
  )

  renderStateSpecificRouteSuccessComponent = () => {
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
      statePopulation,
      stateImage,
      stateId,
    } = this.state
    let districtWiseStatsList
    let districtWiseStatsListHeading
    if (defaultSelectedCategory === 'Confirmed') {
      districtWiseStatsList = totalDistrictWiseConfirmedCasesList.sort()
      districtWiseStatsListHeading = 'confirmed-districts-heading'
    } else if (defaultSelectedCategory === 'Active') {
      districtWiseStatsList = totalDistrictWiseActiveCasesList.sort()
      districtWiseStatsListHeading = 'active-districts-heading'
    } else if (defaultSelectedCategory === 'Recovered') {
      districtWiseStatsList = totalDistrictWiseRecoveredCasesList.sort()
      districtWiseStatsListHeading = 'recovered-districts-heading'
    } else {
      districtWiseStatsList = totalDistrictWiseDeceasedCasesList.sort()
      districtWiseStatsListHeading = 'deceased-districts-heading'
    }
    return (
      <div
        id="lineChartsContainer"
        className="state-specific-route-success-bg-container"
      >
        <div className="state-specific-route-success-component-header-card">
          <div className="header-card-title-card">
            <h1 className="header-card-title-card-heading">{stateName}</h1>
            <p className="header-card-title-card-description">
              Last update on {new Date(lastUpdatedDate).toLocaleDateString()}.
            </p>
          </div>
          <div className="header-card-status-card">
            <p className="header-card-status-card-heading">Tested</p>
            <p className="header-card-status-card-description">
              {totalTestedCasesCount}
            </p>
          </div>
        </div>
        <ul className="state-specific-route-success-component-overall-stats-card">
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
        <div className="ncp-report-bg-container">
          <img src={stateImage} alt="state" className="state-image" />
          <div className="report-stats-bg-container">
            <h1 className="report-stats-heading">NCP Report</h1>
            <div className="population-report-card">
              <p className="population-report-card-heading">Population</p>
              <h1 className="population-report-card-description">
                {statePopulation}
              </h1>
            </div>
            <div className="tested-report-card">
              <p className="tested-report-card-heading">Tested</p>
              <h1 className="tested-report-card-description">
                {totalTestedCasesCount}
              </h1>
            </div>
          </div>
        </div>
        <div className="state-specific-route-success-component-district-wise-stats-bg-container">
          <h1
            className={`top-districts-heading ${districtWiseStatsListHeading}`}
          >
            Top Districts
          </h1>
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

  renderStateSpecificRouteNetworkFailureComponent = () => (
    <div className="state-specific-route-network-failure-bg-container">
      <button
        className="state-specific-route-network-failure-button"
        onClick={this.startFetchingStateSpecificData}
        type="button"
      >
        Refresh
      </button>
    </div>
  )

  renderStateSpecificRouteRouteFailureComponent = () => (
    <div className="state-specific-route-route-failure-bg-container">
      <p className="route-failure-heading">
        Looks like you have provided an invalid STATE CODE, make sure the state
        code is correct
      </p>
      <p className="route-failure-description">
        Below are the different state codes for respective states make sure to
        use the below state codes only in the url and press enter key or go back
        to home page and reselect the required state option.
      </p>
      <ul className="state-codes-list-bg-container">
        {statesList.map(eachitem => (
          <li className="states-code-list-item">
            <p className="states-code-list-item-heading">
              {eachitem.state_name}
            </p>
            <p className="states-code-list-item-description">
              [ {eachitem.state_code} ]
            </p>
          </li>
        ))}
      </ul>
    </div>
  )

  renderStateSpecificRoute = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'INITIAL':
        return null
      case 'LOADING':
        return this.renderStateSpecificRouteLoadingComponent()
      case 'SUCCESS':
        return this.renderStateSpecificRouteSuccessComponent()
      case 'NETWORK FAILURE':
        return this.renderStateSpecificRouteNetworkFailureComponent()
      case 'ROUTE FAILURE':
        return this.renderStateSpecificRouteRouteFailureComponent()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="state-specific-route-temp-container">
          {this.renderStateSpecificRoute()}
        </div>
      </>
    )
  }
}

export default StateSpecificRoute
