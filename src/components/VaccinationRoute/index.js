import {Component} from 'react'

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

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
    vaccinationByGenderList: [],
    vaccinationByCompanyList: [],
    vaccinationByAgeList: [],
  }

  componentDidMount() {
    this.startFetchingVaccinationRouteData()
  }

  startFetchingVaccinationRouteData = () => {
    this.setState({pageStatus: 'LOADING'}, this.fetchVaccinationRouteData)
  }

  fetchVaccinationRouteData = async () => {
    const url = 'https://apis.ccbp.in/covid19-vaccination-data'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
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
      const vaccinationByAgeList = [
        {
          key: '12-14',
          value: data.vaccinationByAge.vac_12_14,
        },
        {
          key: '15-17',
          value: data.vaccinationByAge.vac_15_17,
        },
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
        vaccinationByAgeList,
        vaccinationByCompanyList,
        vaccinationByGenderList,
      })
    } else {
      this.setState({
        pageStatus: 'FAILURE',
      })
    }
  }

  renderVaccinationRouteLoadingComponent = () => (
    <div className="vaccination-route-loader-bg-container">
      <Loader type="TailSpin" color="#007BBF" height={60} width={60} />
    </div>
  )

  renderVaccinationRouteSuccessComponent = () => {
    const {
      headerData,
      vaccinationByAgeList,
      vaccinationByCompanyList,
      vaccinationByGenderList,
    } = this.state
    return (
      <div className="vaccination-route-success-bg-container">
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
        <div className="vaccination-route-bar-charts-bg-container">
          <div className="vaccination-by-category-bg-container">
            <h1 className="vaccination-by-category-container-heading">
              Vaccination By Category
            </h1>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  cx="50%"
                  cy="40%"
                  data={vaccinationByGenderList}
                  startAngle={180}
                  endAngle={0}
                  innerRadius="60%"
                  outerRadius="90%"
                  dataKey="value"
                >
                  <Cell name="Male" fill="#F54394" />
                  <Cell name="Female" fill="#5A8DEE" />
                  <Cell name="Others" fill="#FF9800" />
                </Pie>
                <Legend
                  iconType="circle"
                  iconSize="8px"
                  layout="horizontal"
                  verticalAlign="middle"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  cx="50%"
                  cy="40%"
                  data={vaccinationByCompanyList}
                  startAngle={180}
                  endAngle={0}
                  innerRadius="60%"
                  outerRadius="90%"
                  dataKey="value"
                >
                  <Cell name="Covishield" fill="#5A8DEE" />
                  <Cell name="Covaxin" fill="#7AC142" />
                  <Cell name="Sputnik V" fill="#FF9800" />
                </Pie>
                <Legend
                  iconType="circle"
                  iconSize="8px"
                  layout="horizontal"
                  verticalAlign="middle"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
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
