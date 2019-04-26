import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { getChartName } from '../actions/data.action'
import { sendChartData } from '../actions/chartData.action'


const styles = {
    rootSelectChart: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
}

class SelectChart extends React.Component {
    constructor() {
        super()
        this.state = {
            type: ["Line", "Bar", "Pie"],
            val: ''
        }
    }

    handleChange = name => event => {
        this.setState(() =>{
            return {
                [name]: event.target.value,
            }
        },() => this.props.getChartName(this.state.val))
      }

      componentWillReceiveProps(nextProps) {
        if(nextProps.getCsvDataReducer && !nextProps.sendChartDataReducer.status) {
            const csvData = nextProps.getCsvDataReducer.csvData.slice(1, (nextProps.getCsvDataReducer.csvData.length - 1))
            const chartData = []
            csvData.forEach((e, i) => {
                nextProps.getCsvDataReducer.xAxisDataIndex.forEach((x) => {
                    chartData.push({
                        ['x' + x]: e[x]
                    })
                })
                nextProps.getCsvDataReducer.yAxisDataIndex.forEach((y) => {
                    chartData[i]['y'+y] = e[y]
                })
            })
            console.log(chartData)
            const ChartObj = {
                status: true,
                data: chartData,
                chartName: nextProps.getCsvDataReducer.chartName
            }
            this.props.sendChartData(ChartObj.status, ChartObj.data, ChartObj.chartName)
        }
      }

    render() {
        const { type, val } = this.state
        const { classes } = this.props
        return (
            <React.Fragment>
                <div className={classes.rootSelectChart}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        className={classes.textField}
                        value={val}
                        onChange={this.handleChange('val')}
                        SelectProps={{
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        helperText="Please select chart"
                        margin="normal"
                        variant="outlined"
                        >
                        {type.map(option => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
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
const mapDispatchToProps = (dispatch) => {
    return {
       getChartName: (data) => dispatch(getChartName(data)),
       sendChartData: (status, data, chartName) => dispatch(sendChartData(status, data, chartName))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectChart))