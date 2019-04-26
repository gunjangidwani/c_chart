import React from 'react'
import { connect } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts'
import { BarChart, Bar } from 'recharts'

class ShowChart extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            chartName: '',
            status: false,
            dataKeys: []
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps) 
        if(nextProps.sendChartDataReducer) {
            let newData = []
            if(nextProps.getCsvDataReducer.chartName === 'Pie') {
                newData = nextProps.sendChartDataReducer.data.reduce((acc, cv) => {
                    const keys = Object.keys(cv)
                    acc.push({
                        name: cv[keys[0]],
                        value: parseInt(cv[keys[1]])
                    })
                    return acc
                }, [])
                console.log(newData)
            }
            this.setState((state) => {
                return {
                    ...state,
                    data: nextProps.getCsvDataReducer.chartName === 'Pie' ? newData : nextProps.sendChartDataReducer.data,
                    chartName: nextProps.getCsvDataReducer.chartName,
                    status: nextProps.sendChartDataReducer.status
                }
            }, this.keysMapping)
        } 
    }

    keysMapping = () => {
        if(this.state.data.length > 0) {
            this.state.data.forEach(e => {
                console.log(Object.keys(e))
               const dataKeys = Object.keys(e)
               this.setState((state) => {
                   return {
                    ...state,
                    dataKeys: dataKeys
                   }
               })
            })
        }
    }
    
    render() {
        console.log(this.state)
        const { status, chartName, data, dataKeys } = this.state
        return (
            <React.Fragment>
                {
                    status && 
                    <div style={{width: '100%', height: 400}}>
                        {
                            chartName === 'Line' && dataKeys.length > 0 &&
                            <ResponsiveContainer>
                                <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={dataKeys[0]} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {
                                dataKeys.slice(1).map((obj) => (
                                    <Line type="monotone" key={obj} dataKey={obj} stroke={'#'+(Math.random()*0xFFFFFF<<0).toString(16)} activeDot={{ r: 8 }} />
                                ))
                            }
                            
                            </LineChart>
                            </ResponsiveContainer>
                            
                        }
                        {
                            chartName === 'Bar' && dataKeys.length > 0 &&
                            <ResponsiveContainer>
                            <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={dataKeys[0]} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {
                                dataKeys.slice(1).map((obj) => (
                                    <Bar dataKey={obj} key={obj} fill={'#'+(Math.random()*0xFFFFFF<<0).toString(16)} />
                                ))
                            }
                            </BarChart>
                            </ResponsiveContainer>
                        }
                        {
                            chartName === 'Pie' && dataKeys.length > 0 &&
                                <PieChart width={400} height={400} style={{margin: '0 auto'}}>
                                    <Pie dataKey="value" startAngle={360} endAngle={0} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                                    <Tooltip />
                                </PieChart>
                        }
                    </div>
                }

            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        getCsvDataReducer: state.getCsvDataReducer,
        sendChartDataReducer: state.sendChartDataReducer
    }
}

export default connect(mapStateToProps, {})(ShowChart)