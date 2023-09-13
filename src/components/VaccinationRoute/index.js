import {Component} from 'react'

import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts'

import Loader from 'react-loader-spinner'

import {AiFillHome} from 'react-icons/ai'

import Header from '../Header'
import Footer from '../Footer'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const injectionIconUrl =
  'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694496734/Injection_Icon_ppgd5e.svg'
const hospitalIconUrl =
  'https://res.cloudinary.com/dqqgljlsw/image/upload/v1694496785/Hospital_Icon_drwlnh.svg'

class VaccinationRoute extends Component {
  state = {
    pageStatus: 'INITIAL',
    headerData: {},
    vaccinationByDosesList: [],
    defaultTrendsOption: 'By Doses',
    vaccinationByGenderList: [],
    vaccinationByCompanyList: [],
    vaccinationByAgeListOne: [],
    vaccinationByAgeListTwo: [],
  }

  componentDidMount() {
    this.startFetchingVaccinationRouteData()
  }

  startFetchingVaccinationRouteData = () => {
    this.setState({pageStatus: 'LOADING'}, this.fetchVaccinationRouteData)
  }

  changeDefaultOptionToDoses = () => {
    this.setState({defaultTrendsOption: 'By Doses'})
  }

  changeDefaultOptionToAge = () => {
    this.setState({defaultTrendsOption: 'By Age'})
  }

  fetchVaccinationRouteData = async () => {
    const url = 'https://apis.ccbp.in/covid19-vaccination-data'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const headerData = {
        total_no_of_sites_conducting_vaccination: data.topBlock.sites.total,
        total_no_of_government_sites_conducting_vaccination:
          data.topBlock.sites.govt,
        total_no_of_private_sites_conducting_vaccination:
          data.topBlock.sites.pvt,
        total_no_of_vaccinations_done: data.topBlock.vaccination.total_doses,
        total_no_of_dose_one_vaccinations_done:
          data.topBlock.vaccination.tot_dose_1,
        total_no_of_dose_two_vaccinations_done:
          data.topBlock.vaccination.tot_dose_2,
      }
      const vaccinationByDosesList = data.vaccinationDoneByTime.map(
        eachitem => ({
          doseOne: eachitem.dose_one,
          doseTwo: eachitem.dose_two,
          totalDoses: eachitem.count,
          timeStamp: eachitem.label,
        }),
      )
      const vaccinationByAgeListOne = data.vaccinationDoneByTimeAgeWise.map(
        eachitem => ({
          timeStamp: eachitem.label,
          'Age 12-14': eachitem.vac_12_14,
          'Age 15-17': eachitem.vac_15_17,
          'Age 18-45': eachitem.vac_18_45,
          'Age 45-60': eachitem.vac_18_45,
          'Above Age 60': eachitem.vac_60_above,
        }),
      )
      const vaccinationByAgeListTwo = [
        {
          key: '18-45',
          value: data.vaccinationByAge.vac_18_45,
        },
        {
          key: '45-60',
          value: data.vaccinationByAge.vac_45_60,
        },
        {
          key: 'Above 60',
          value: data.vaccinationByAge.above_60,
        },
      ]
      const vaccinationByGenderList = [
        {
          key: 'Male',
          value: data.topBlock.vaccination.male,
        },
        {
          key: 'Female',
          value: data.topBlock.vaccination.female,
        },
        {
          key: 'Others',
          value: data.topBlock.vaccination.others,
        },
      ]
      const vaccinationByCompanyList = [
        {
          key: 'Covishield',
          value: data.topBlock.vaccination.covishield,
        },
        {
          key: 'Covaxin',
          value: data.topBlock.vaccination.covaxin,
        },
        {
          key: 'Sputnik V',
          value: data.topBlock.vaccination.sputnik,
        },
      ]
      this.setState({
        pageStatus: 'SUCCESS',
        headerData,
        vaccinationByDosesList,
        vaccinationByAgeListOne,
        vaccinationByAgeListTwo,
        vaccinationByCompanyList,
        vaccinationByGenderList,
      })
    } else {
      this.setState({
        pageStatus: 'FAILURE',
      })
    }
  }

  renderByDosesChart = () => {
    const {vaccinationByDosesList} = this.state
    return (
      <div className="by-doses-and-age-chart-bg-container">
        <AreaChart
          width={1000}
          height={300}
          data={vaccinationByDosesList}
          margin={{top: 10, right: 30, left: 0, bottom: 0}}
        >
          <XAxis dataKey="timeStamp" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="doseOne"
            stroke="#37C62B"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="doseTwo"
            stroke="#FCEA4E"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          <Area
            type="monotone"
            dataKey="totalDoses"
            stroke="#A226DC"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </div>
    )
  }

  renderByAgeChart = () => {
    const {vaccinationByAgeListOne} = this.state
    return (
      <div className="by-doses-and-age-chart-bg-container">
        <AreaChart
          width={1000}
          height={300}
          data={vaccinationByAgeListOne}
          margin={{top: 10, right: 30, left: 0, bottom: 0}}
        >
          <XAxis dataKey="timeStamp" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Age 12-14"
            stroke="#F54394"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="Age 15-17"
            stroke="#7AC142"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          <Area
            type="monotone"
            dataKey="Age18-45"
            stroke="#FF9800"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          <Area
            type="monotone"
            dataKey="Age 45-60"
            stroke="#64C2A6"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          <Area
            type="monotone"
            dataKey="Above Age 60"
            stroke="#fa564d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </div>
    )
  }

  renderVaccinationRouteLoadingComponent = () => (
    <div className="vaccination-route-loader-bg-container">
      <Loader type="TailSpin" color="#007BBF" height={60} width={60} />
    </div>
  )

  renderVaccinationRouteSuccessComponent = () => {
    const {
      headerData,
      defaultTrendsOption,
      vaccinationByAgeListTwo,
      vaccinationByCompanyList,
      vaccinationByGenderList,
    } = this.state
    const applyByDosesButtonStyle =
      defaultTrendsOption === 'By Doses' ? 'apply-by-doses-style' : null
    const applyByAgeButtonStyle =
      defaultTrendsOption === 'By Age' ? 'apply-by-age-style' : null
    return (
      <div className="vaccination-route-success-bg-container">
        <h1 className="vaccination-route-main-heading">
          <AiFillHome className="home-icon" /> India
        </h1>
        <div className="vaccination-route-header-card">
          <div className="header-card-details-card">
            <img
              src={hospitalIconUrl}
              alt="hospital"
              className="details-card-image"
            />
            <div className="details-card-stats-card">
              <div className="stats-card-heading-card">
                <p className="stats-card-heading-card-heading">
                  Site Conducting Vaccination
                </p>
                <p className="stats-card-heading-card-description">
                  {headerData.total_no_of_sites_conducting_vaccination}
                </p>
              </div>
              <div className="stats-card-description-card">
                <div className="stats-card-description-card-sub-card-one">
                  <p className="stats-card-description-card-sub-card-one-heading">
                    Government
                  </p>
                  <p className="stats-card-description-card-sub-card-one-description">
                    {
                      headerData.total_no_of_government_sites_conducting_vaccination
                    }
                  </p>
                </div>
                <div className="stats-card-description-card-sub-card-two">
                  <p className="stats-card-description-card-sub-card-two-heading">
                    Private
                  </p>
                  <p className="stats-card-description-card-sub-card-two-description">
                    {
                      headerData.total_no_of_private_sites_conducting_vaccination
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="header-card-details-card">
            <img
              src={injectionIconUrl}
              alt="injection"
              className="details-card-image"
            />
            <div className="details-card-stats-card">
              <div className="stats-card-heading-card">
                <p className="stats-card-heading-card-heading">
                  Total Vaccination Doses
                </p>
                <p className="stats-card-heading-card-description">
                  {headerData.total_no_of_vaccinations_done}
                </p>
              </div>
              <div className="stats-card-description-card">
                <div className="stats-card-description-card-sub-card-one">
                  <p className="stats-card-description-card-sub-card-one-heading">
                    Dose 1
                  </p>
                  <p className="stats-card-description-card-sub-card-one-description">
                    {headerData.total_no_of_dose_one_vaccinations_done}
                  </p>
                </div>
                <div className="stats-card-description-card-sub-card-two">
                  <p className="stats-card-description-card-sub-card-two-heading">
                    Dose 2
                  </p>
                  <p className="stats-card-description-card-sub-card-two-description">
                    {headerData.total_no_of_dose_two_vaccinations_done}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vaccination-by-doses-and-age-bg-container">
          <h1 className="vaccination-by-doses-and-age-main-heading">
            Vaccination Trends
          </h1>
          <div className="by-doses-and-age-options-button-container">
            <button
              type="button"
              className={`by-doses-button ${applyByDosesButtonStyle}`}
              onClick={this.changeDefaultOptionToDoses}
            >
              By Doses
            </button>
            <button
              type="button"
              className={`by-age-button ${applyByAgeButtonStyle}`}
              onClick={this.changeDefaultOptionToAge}
            >
              By Age
            </button>
          </div>
          {defaultTrendsOption === 'By Doses'
            ? this.renderByDosesChart()
            : this.renderByAgeChart()}
        </div>
        <div className="vaccination-route-bar-charts-bg-container">
          <div className="vaccination-by-category-bg-container">
            <h1 className="vaccination-by-category-container-heading">
              Vaccination By Category
            </h1>
            <div className="temp-bar-container-one">
              <ResponsiveContainer height="100%" width="100%">
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="40%"
                    data={vaccinationByGenderList}
                    startAngle={180}
                    endAngle={0}
                    innerRadius="60%"
                    outerRadius="80%"
                    dataKey="value"
                  >
                    <Cell name="Male" fill="#F54394" />
                    <Cell name="Female" fill="#5A8DEE" />
                    <Cell name="Others" fill="#FF9800" />
                  </Pie>
                  <Legend
                    iconType="circle"
                    iconSize="12px"
                    layout="horizontal"
                    verticalAlign="middle"
                    align="center"
                    fontSize="12px"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="temp-bar-container-one">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="40%"
                    data={vaccinationByCompanyList}
                    startAngle={180}
                    endAngle={0}
                    innerRadius="60%"
                    outerRadius="80%"
                    dataKey="value"
                  >
                    <Cell name="Covishield" fill="#5A8DEE" />
                    <Cell name="Covaxin" fill="#7AC142" />
                    <Cell name="Sputnik V" fill="#FF9800" />
                  </Pie>
                  <Legend
                    iconType="circle"
                    iconSize="12px"
                    layout="horizontal"
                    verticalAlign="middle"
                    align="center"
                    fontSize="12px"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="vaccination-by-age-bg-container">
            <h1 className="vaccination-by-age-container-heading">
              Vaccination By Age
            </h1>
            <div className="temp-bar-container-two">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={vaccinationByAgeListTwo}
                    startAngle={360}
                    endAngle={0}
                    outerRadius="95%"
                    dataKey="value"
                  >
                    <Cell name="18-45" fill="#A3DF9F" />
                    <Cell name="45-60" fill="#64C2A6" />
                    <Cell name="Above 60" fill="#2D87BB" />
                  </Pie>
                  <Legend
                    iconType="circle"
                    iconSize="12px"
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    fontSize="12px"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderVaccinationRouteFailureComponent = () => (
    <div className="vaccination-route-failure-bg-container">
      <button
        type="button"
        className="vaccination-route-failure-button"
        onClick={this.startFetchingVaccinationRouteData}
      >
        Refresh
      </button>
    </div>
  )

  renderVaccinationRoute = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'LOADING':
        return this.renderVaccinationRouteLoadingComponent()
      case 'SUCCESS':
        return this.renderVaccinationRouteSuccessComponent()
      case 'FAILURE':
        return this.renderVaccinationRouteFailureComponent()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderVaccinationRoute()}
      </>
    )
  }
}

export default VaccinationRoute
