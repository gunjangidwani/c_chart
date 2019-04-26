import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button'
import CsvReader from './csvReader'
import SelectAxis from './selectAxis'
import SelectChart from './selectChart'

const styles = {
    root: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    field: {
        width: '100%'
    },
    footerBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30,
    }
}

class UploadFile extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            activeStep: 0,
            completed: new Set(),
            skipped: new Set(),
        }
    }


      _handleChange = (e,value) => {
          e.preventDefault()
        console.log(e, value)
        this.setState(() => {
            return {
                value: e.target.value
            }
        }, console.log(e.target.value))
      }

       getSteps() {
        return ['Upload CSV File', 'Select the X-axis and Y-axis', 'Select Chart'];
      }
      totalSteps = () => this.getSteps().length;


  isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
  }

  handleNext = () => {
    let activeStep;

    if (this.isLastStep()) {
      const steps = this.getSteps();
      activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

      
       getStepContent(step) {
        switch (step) {
          case 0:
            return <CsvReader />;
          case 1:
            return <SelectAxis />;
          case 2:
            return <SelectChart />;
          default:
            return 'Unknown step';
        }
      }

    render() {
        const { classes } = this.props
        const { activeStep} = this.state
        const steps = this.getSteps();
        // console.log(header);
        return (
            <React.Fragment >
                <div className={classes.root}>
                    <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const props = {};
                        const buttonProps = {};
                        return (
                        <Step key={label} {...props}>
                            <StepButton
                            {...buttonProps}
                            >
                            {label}
                            </StepButton>
                        </Step>
                        );
                    })}
                    </Stepper>
                        {
                            <React.Fragment>
                                <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
                                <div
                                    className={classes.footerBtn}
                                >
                                    <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={classes.button}
                                    >
                                        Next
                                    </Button>
                                </div>        
                            </React.Fragment>
                        }
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(UploadFile)