import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { getData, getChartData } from '../actions/data.action'
import { drop, isNaN, uniq, zipObject, indexOf } from 'lodash' 
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'


const styles = {
    rootSelectAxis: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    }
}

class SelectAxis extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            csvData: this.props.getCsvDataReducer,
            xAxisValue: '',
            xAxisArray: [],
            yAxisArray: [],
            checkYAxis: {},
            xAxisDataIndex: [],
            yAxisDataIndex: [],
            header: []
        }
    }

    componentWillMount() {
        this._renderXAxis(this.state.csvData)
    }

    _renderXAxis = (data) => {
        const xAxisArray = []
        const header = data[0]
        const nData = drop(data)
        nData.forEach((element, i) => {
            if (i === 0) {
                const cData = []
                element.forEach((f, j) => {
                    const x = parseInt(f)
                    cData.push(x)
                })
                cData.forEach((ce, ci) => {
                    if (isNaN(ce))
                        xAxisArray.push(header[ci])
                })
            }
        })
        // console.log(xAxisArray)
        this.setState((state) => {
            return {
                ...state,
                xAxisArray: xAxisArray,
                header: data[0]
            }
        }, () => {
            this._renderYAxis(this.state.csvData)
        })
    }

    _renderYAxis = (data) => {
        const yAxisArray = []
        const header = data[0]
        const nData = drop(data)
        nData.forEach((element, i) => {
            if (i === 0) {
                const cData = []
                element.forEach((f, j) => {
                    const x = parseInt(f)
                    cData.push(x)
                })
                cData.forEach((ce, ci) => {
                    if (!isNaN(ce))
                        yAxisArray.push(header[ci])
                })
            }
        })
        this.setState((state) => {
            return {
                ...state,
                yAxisArray: uniq(yAxisArray)
            }
        }, this._checkBox(uniq(yAxisArray)))
    }

    _checkBox = (value) => {
        var bool = []
        value.forEach(element => {
            bool.push(false)
        })
        var result = zipObject(value, bool)
        this.setState(() => {
            return {
                ...this.state,
                checkYAxis: result
            }
        })
        // console.log(result)
        
    }
    _handleChange = (event, name) => {
        event.preventDefault()
        event.persist()
        // console.log(event, name)
        this.setState((state) => {
            return {
                checkYAxis: {
                    ...state.checkYAxis,
                    [name]: event.target.checked
                }
            }
        }, () => {
            // console.log(this.state.checkYAxis)
            this.yaAxisIndex()
        })
      }
      callBackProps = () => {
        this.props.getChartData({
            csvData: this.state.csvData, 
            header: this.state.header, 
            xAxisValue: this.state.xAxisValue, 
            xAxisDataIndex: this.state.xAxisDataIndex, 
            yAxisDataIndex: this.state.yAxisDataIndex
        })
      }

      _handleRadioChange = event => {
        event.preventDefault()
        event.persist()
        const YI = []
        this.state.xAxisArray.forEach(element => {
            if(element === event.target.value) {
                const idx = indexOf(this.state.header, element)
                YI.push(idx)
            }
        })
        this.setState((state) => {
            return {
                ...state,
                xAxisValue: event.target.value,
                xAxisDataIndex: YI
            }
        }, () => this.callBackProps())

      }
 
      yaAxisIndex = () => {
          const YI = []
          Object.keys(this.state.checkYAxis).forEach(element => {
            //   console.log(this.state.checkYAxis[element])
              if(this.state.checkYAxis[element] === true) {
                  const idx = indexOf(this.state.header, element)
                  YI.push(idx)
              }
          })
          this.setState((state) => {
                return {
                    ...state,
                    yAxisDataIndex: YI
                }
          }, () => this.callBackProps())
      }


    render() {
        // console.log(this.state)
        const { classes } = this.props
        const { xAxisArray, xAxisValue, checkYAxis} = this.state
        return (
            <React.Fragment>
                <div className={classes.rootSelectAxis}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">XAxis</FormLabel>
                        <RadioGroup
                            aria-label="xAxis"
                            name="xAxis"
                            className={classes.group}
                            value={xAxisValue}
                            onChange={this._handleRadioChange}
                            >
                            {
                                xAxisArray.length > 0 && xAxisArray.map((obj, i) => (
                                    <FormControlLabel 
                                    key={i}
                                    value={obj} 
                                    control={<Radio color="primary" />} 
                                    label={obj} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                    <FormLabel component="legend">Y Axis</FormLabel>
                        {
                            Object.keys(checkYAxis).map((el, i) => (
                                <FormControlLabel
                                    key={i}
                                    control={
                                        <Checkbox
                                            checked={checkYAxis[el]}
                                            onChange={(e) => this._handleChange(e, el)}
                                            value={el}
                                        />
                                    }
                                    label={el}
                                />
                            ))
                        }
                    </FormControl>
                </div>
            </React.Fragment>
        )
    }

}
const mapStateToProps = (state) => {
    return state
}
const mapDispatchToProps = (dispatch) => {
    return {
       getData: () => dispatch(getData()),
       getChartData: (dataObj) => dispatch(getChartData(dataObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectAxis))