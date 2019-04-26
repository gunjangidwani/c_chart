import React from 'react'
import CSVReader from 'react-csv-reader'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getCsvData } from '../actions/data.action'

const styles = {
    reactCsvInput: {
        width: '100%'
    },
    parent: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    csvInput: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

class CsvReader extends React.Component {
    constructor() {
        super()
        this.state = {
            XAxis: '',
            YAxis: '',
            header: [],
            csvFile: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    handleForce = data => {
        // console.log(data);
        this.setState(() => {
            return {
                csvFile: data
            }
        }, () => console.log(this.state.csvFile))
        this.props.getCsvData(this.state.csvFile)
      }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <div className={classes.parent}>
                    <CSVReader
                        cssClass={classes.csvInput}
                        label="Select your CSV file to upload..."
                        onFileLoaded={this.handleForce}
                        />
                </div> 
            </React.Fragment>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        getCsvDataReducer: state.getCsvDataReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       getCsvData: (data) => dispatch(getCsvData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CsvReader))