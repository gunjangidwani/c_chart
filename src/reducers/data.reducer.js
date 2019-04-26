import { CSVDATA } from '../constant/const'

const initialState = []

export const getCsvDataReducer = (state = initialState, action) => {
    // console.log(state)
    switch(action.type) {
        case CSVDATA.GET:
            return action.payload
        case CSVDATA.PASS:
            return state
        case CSVDATA.CHARTDATA:
            return action.payload
        case CSVDATA.CHART_SELECTED:
            return {
                ...state,
                chartName: action.payload
            }
        default: 
            return state
    }
} 