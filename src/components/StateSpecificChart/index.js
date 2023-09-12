import {Component} from 'react'

import {LineChart, XAxis, YAxis, Tooltip, Line, Bar, BarChart} from 'recharts'

import Loader from 'react-loader-spinner'

import {withRouter} from 'react-router-dom'

import './index.css'

const CustomBar = props => {
  const {fill, x, y, width, height} = props

  const borderRadius = 8

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={borderRadius}
        ry={borderRadius}
      />
    </g>
  )
}

class StateSpecificChart extends Component {
  state = {
    pageStatus: 'INITIAL',
    data: {},
    cumulativeConfirmedCasesBarList: [],
    cumulativeActiveCasesBarList: [],
    cumulativeRecoveredCasesBarList: [],
    cumulativeDeceasedCasesBarList: [],
    districtsNamesList: [],
    defaultSelectedDistrict: 'Select District',
  }

  componentDidMount() {
    this.startFetchingStateSpecificChartData()
  }

  startFetchingStateSpecificChartData = () => {
    this.setState({pageStatus: 'LOADING'}, this.fetchStateSpecificChartData)
  }

  fetchStateSpecificChartData = async () => {
    const {stateId} = this.props
    const url = `https://apis.ccbp.in/covid19-timelines-data/${stateId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const districtNames = Object.keys(data[stateId].districts)
      districtNames.push('Select District')
      const dateKeys = Object.keys(data[stateId].dates)
      const confirmedBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount: data[stateId].dates[eachitem].total.confirmed,
      }))
      const options = {day: '2-digit', month: 'short'}
      const tempConfirmedBarList = confirmedBarList.sort(
        (a, b) => a.date - b.date,
      )
      const updatedConfirmedBarList = tempConfirmedBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      const activeBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount:
          data[stateId].dates[eachitem].total.confirmed -
          (data[stateId].dates[eachitem].total.recovered +
            data[stateId].dates[eachitem].total.deceased),
      }))
      const tempActiveBarList = activeBarList.sort((a, b) => a.date - b.date)
      const updatedActiveBarList = tempActiveBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      const recoveredBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount: data[stateId].dates[eachitem].total.recovered,
      }))
      const tempRecoveredBarList = recoveredBarList.sort(
        (a, b) => a.date - b.date,
      )
      const updatedRecoveredBarList = tempRecoveredBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      const deceasedBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount: data[stateId].dates[eachitem].total.deceased,
      }))
      const tempDeceasedBarList = deceasedBarList.sort(
        (a, b) => a.date - b.date,
      )
      const updatedDeceasedBarList = tempDeceasedBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      this.setState({
        pageStatus: 'SUCCESS',
        data,
        cumulativeConfirmedCasesBarList: updatedConfirmedBarList,
        cumulativeActiveCasesBarList: updatedActiveBarList,
        cumulativeRecoveredCasesBarList: updatedRecoveredBarList,
        cumulativeDeceasedCasesBarList: updatedDeceasedBarList,
        districtsNamesList: districtNames,
      })
    } else {
      this.setState({
        pageStatus: 'FAILURE',
        data: {},
        districtsNamesList: [],
      })
    }
  }

  onChangeDefaultSelectedDistrict = event => {
    this.setState({defaultSelectedDistrict: event.target.value})
  }

  getConfirmedCasesBarList = defaultSelectedDistrict => {
    const {stateId} = this.props
    const {data} = this.state
    let returnData
    if (defaultSelectedDistrict !== 'Select District') {
      const dateKeys = Object.keys(
        data[stateId].districts[defaultSelectedDistrict].dates,
      )
      const confirmedBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount:
          data[stateId].districts[defaultSelectedDistrict].dates[eachitem].total
            .confirmed,
      }))
      const options = {day: '2-digit', month: 'short'}
      const tempConfirmedBarList = confirmedBarList.sort(
        (a, b) => a.date - b.date,
      )
      const updatedConfirmedBarList = tempConfirmedBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      returnData = updatedConfirmedBarList
    } else {
      const dateKeys = Object.keys(data[stateId].dates)
      const confirmedBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount: data[stateId].dates[eachitem].total.confirmed,
      }))
      const options = {day: '2-digit', month: 'short'}
      const tempConfirmedBarList = confirmedBarList.sort(
        (a, b) => a.date - b.date,
      )
      const updatedConfirmedBarList = tempConfirmedBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      returnData = updatedConfirmedBarList
    }
    return returnData
  }

  getActiveCasesBarList = defaultSelectedDistrict => {
    const {stateId} = this.props
    const {data} = this.state
    let returnData
    if (defaultSelectedDistrict !== 'Select District') {
      const dateKeys = Object.keys(
        data[stateId].districts[defaultSelectedDistrict].dates,
      )
      const activeBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount:
          data[stateId].districts[defaultSelectedDistrict].dates[eachitem].total
            .confirmed -
          (data[stateId].districts[defaultSelectedDistrict].dates[eachitem]
            .total.recovered +
            data[stateId].districts[defaultSelectedDistrict].dates[eachitem]
              .total.deceased),
      }))
      const options = {day: '2-digit', month: 'short'}
      const tempActiveBarList = activeBarList.sort((a, b) => a.date - b.date)
      const updatedActiveBarList = tempActiveBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      returnData = updatedActiveBarList
    } else {
      const dateKeys = Object.keys(data[stateId].dates)
      const activeBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount:
          data[stateId].dates[eachitem].total.confirmed -
          (data[stateId].dates[eachitem].total.recovered +
            data[stateId].dates[eachitem].total.deceased),
      }))
      const options = {day: '2-digit', month: 'short'}
      const tempActiveBarList = activeBarList.sort((a, b) => a.date - b.date)
      const updatedActiveBarList = tempActiveBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      returnData = updatedActiveBarList
    }
    return returnData
  }

  getRecoveredCasesBarList = defaultSelectedDistrict => {
    const {stateId} = this.props
    const {data} = this.state
    let returnData
    if (defaultSelectedDistrict !== 'Select District') {
      const dateKeys = Object.keys(
        data[stateId].districts[defaultSelectedDistrict].dates,
      )
      const recoveredBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount:
          data[stateId].districts[defaultSelectedDistrict].dates[eachitem].total
            .recovered,
      }))
      const options = {day: '2-digit', month: 'short'}
      const tempRecoveredBarList = recoveredBarList.sort(
        (a, b) => a.date - b.date,
      )
      const updatedRecoveredBarList = tempRecoveredBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      returnData = updatedRecoveredBarList
    } else {
      const dateKeys = Object.keys(data[stateId].dates)
      const recoveredBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount: data[stateId].dates[eachitem].total.recovered,
      }))
      const options = {day: '2-digit', month: 'short'}
      const tempRecoveredBarList = recoveredBarList.sort(
        (a, b) => a.date - b.date,
      )
      const updatedRecoveredBarList = tempRecoveredBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      returnData = updatedRecoveredBarList
    }
    return returnData
  }

  getDeceasedCasesBarList = defaultSelectedDistrict => {
    const {stateId} = this.props
    const {data} = this.state
    let returnData
    if (defaultSelectedDistrict !== 'Select District') {
      const dateKeys = Object.keys(
        data[stateId].districts[defaultSelectedDistrict].dates,
      )
      const deceasedBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount:
          data[stateId].districts[defaultSelectedDistrict].dates[eachitem].total
            .deceased,
      }))
      const options = {day: '2-digit', month: 'short'}
      const tempDeceasedBarList = deceasedBarList.sort(
        (a, b) => a.date - b.date,
      )
      const updatedDeceasedBarList = tempDeceasedBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      returnData = updatedDeceasedBarList
    } else {
      const dateKeys = Object.keys(data[stateId].dates)
      const deceasedBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount: data[stateId].dates[eachitem].total.deceased,
      }))
      const options = {day: '2-digit', month: 'short'}
      const tempDeceasedBarList = deceasedBarList.sort(
        (a, b) => a.date - b.date,
      )
      const updatedDeceasedBarList = tempDeceasedBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      returnData = updatedDeceasedBarList
    }
    return returnData
  }

  getTestedCasesBarList = defaultSelectedDistrict => {
    const {stateId} = this.props
    const {data} = this.state
    let returnData
    if (defaultSelectedDistrict !== 'Select District') {
      const dateKeys = Object.keys(
        data[stateId].districts[defaultSelectedDistrict].dates,
      )
      const testedBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount:
          data[stateId].districts[defaultSelectedDistrict].dates[eachitem].total
            .tested,
      }))
      const options = {day: '2-digit', month: 'short'}
      const tempTestedBarList = testedBarList.sort((a, b) => a.date - b.date)
      const updatedTestedBarList = tempTestedBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      returnData = updatedTestedBarList
    } else {
      const dateKeys = Object.keys(data[stateId].dates)
      const testedBarList = dateKeys.map(eachitem => ({
        date: new Date(eachitem),
        casesCount: data[stateId].dates[eachitem].total.tested,
      }))
      const options = {day: '2-digit', month: 'short'}
      const tempTestedBarList = testedBarList.sort((a, b) => a.date - b.date)
      const updatedTestedBarList = tempTestedBarList.map(eachitem => ({
        date: new Intl.DateTimeFormat('en-US', options).format(eachitem.date),
        casesCount: eachitem.casesCount,
      }))
      returnData = updatedTestedBarList
    }
    return returnData
  }

  renderChartLoaderCard = () => (
    <div className="chart-loader-bg-container" id="timelinesDataLoader">
      <Loader type="TailSpin" color="#007BBF" height={60} width={60} />
    </div>
  )

  renderChartSuccessCard = () => {
    const {
      districtsNamesList,
      defaultSelectedDistrict,
      cumulativeConfirmedCasesBarList,
      cumulativeActiveCasesBarList,
      cumulativeRecoveredCasesBarList,
      cumulativeDeceasedCasesBarList,
    } = this.state
    const {defaultSelectedCategory} = this.props

    const confirmedCasesBarList = this.getConfirmedCasesBarList(
      defaultSelectedDistrict,
    )
    const activeCasesBarList = this.getActiveCasesBarList(
      defaultSelectedDistrict,
    )
    const recoveredCasesBarList = this.getRecoveredCasesBarList(
      defaultSelectedDistrict,
    )
    const deceasedCasesBarList = this.getDeceasedCasesBarList(
      defaultSelectedDistrict,
    )
    const testedCasesBarList = this.getTestedCasesBarList(
      defaultSelectedDistrict,
    )

    let dataValue
    let fillValue
    if (defaultSelectedCategory === 'Confirmed') {
      dataValue = cumulativeConfirmedCasesBarList.slice(0, 10)
      fillValue = '#9A0E31'
    } else if (defaultSelectedCategory === 'Active') {
      dataValue = cumulativeActiveCasesBarList.slice(0, 10)
      fillValue = '#0A4FA0'
    } else if (defaultSelectedCategory === 'Recovered') {
      dataValue = cumulativeRecoveredCasesBarList.slice(0, 10)
      fillValue = '#216837'
    } else {
      dataValue = cumulativeDeceasedCasesBarList.slice(0, 10)
      fillValue = '#474C57'
    }

    return (
      <>
        <div className="bar-chart-bg-container">
          <BarChart
            width={900}
            height={480}
            data={dataValue.slice(0, 11)}
            className="bar-chart"
          >
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{fill: fillValue}}
            />
            <YAxis hide />
            <Tooltip />
            <Bar
              dataKey="casesCount"
              fill={fillValue}
              label={{position: 'top', fill: fillValue}}
              barSize={50}
              shape={<CustomBar />}
            />
          </BarChart>
        </div>
        <div className="spread-trends-bg-container">
          <h1 className="spread-trends-heading">Spread Trends</h1>
          <select
            value={defaultSelectedDistrict}
            onChange={this.onChangeDefaultSelectedDistrict}
            className="district-select-input"
          >
            {districtsNamesList.map(eachitem => (
              <option key={eachitem} value={eachitem}>
                {eachitem}
              </option>
            ))}
          </select>
          <div className="confirmed-line-chart-bg-container">
            <p className="confirmed-line-chart-heading line-chart-heading">
              Confirmed
            </p>
            <LineChart
              className="line-chart"
              width={800}
              height={450}
              data={confirmedCasesBarList}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis
                dataKey="date"
                axisLine={{stroke: '#ff073a'}}
                tick={{fill: '#ff073a'}}
              />
              <YAxis axisLine={{stroke: '#ff073a'}} tick={{fill: '#ff073a'}} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="casesCount"
                stroke="#ff073a"
                dot={{fill: '#ff073a'}}
              />
            </LineChart>
          </div>
          <div className="active-line-chart-bg-container">
            <p className="active-line-chart-heading line-chart-heading">
              Active
            </p>
            <LineChart
              className="line-chart"
              width={800}
              height={450}
              data={activeCasesBarList}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis
                dataKey="date"
                axisLine={{stroke: '#007BFF'}}
                tick={{fill: '#007BFF'}}
              />
              <YAxis axisLine={{stroke: '#007BFF'}} tick={{fill: '#007BFF'}} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="casesCount"
                stroke="#007BFF"
                dot={{fill: '#007BFF'}}
              />
            </LineChart>
          </div>
          <div className="recovered-line-chart-bg-container">
            <p className="recovered-line-chart-heading line-chart-heading">
              Recovered
            </p>
            <LineChart
              className="line-chart"
              width={800}
              height={450}
              data={recoveredCasesBarList}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis
                dataKey="date"
                axisLine={{stroke: '#27A243'}}
                tick={{fill: '#27A243'}}
              />
              <YAxis axisLine={{stroke: '#27A243'}} tick={{fill: '#27A243'}} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="casesCount"
                stroke="#27A243"
                dot={{fill: '#27A243'}}
              />
            </LineChart>
          </div>
          <div className="deceased-line-chart-bg-container">
            <p className="deceased-line-chart-heading line-chart-heading">
              Deceased
            </p>
            <LineChart
              className="line-chart"
              width={800}
              height={450}
              data={deceasedCasesBarList}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis
                dataKey="date"
                axisLine={{stroke: '#6C757D'}}
                tick={{fill: '#6C757D'}}
              />
              <YAxis axisLine={{stroke: '#6C757D'}} tick={{fill: '#6C757D'}} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="casesCount"
                stroke="#6C757D"
                dot={{fill: '#6C757D'}}
              />
            </LineChart>
          </div>
          <div className="tested-line-chart-bg-container">
            <p className="tested-line-chart-heading line-chart-heading">
              Tested
            </p>
            <LineChart
              className="line-chart"
              width={800}
              height={450}
              data={testedCasesBarList}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis
                dataKey="date"
                axisLine={{stroke: '#9673B9'}}
                tick={{fill: '#9673B9'}}
              />
              <YAxis axisLine={{stroke: '#9673B9'}} tick={{fill: '#9673B9'}} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="casesCount"
                stroke="#9673B9"
                dot={{fill: '#9673B9'}}
              />
            </LineChart>
          </div>
        </div>
      </>
    )
  }

  renderChartFailureCard = () => (
    <div className="chart-failure-bg-container">
      <button
        type="button"
        className="chart-failure-button"
        onClick={this.startFetchingStateSpecificChartData}
      >
        Refresh
      </button>
    </div>
  )

  renderStateSpecificChart = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'LOADING':
        return this.renderChartLoaderCard()
      case 'SUCCESS':
        return this.renderChartSuccessCard()
      case 'FAILURE':
        return this.renderChartFailureCard()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderStateSpecificChart()}</>
  }
}

export default withRouter(StateSpecificChart)
