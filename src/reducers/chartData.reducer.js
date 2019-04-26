import { CHARTDATA } from '../constant/const'

const initialState = {
    status: false,
    data: [],
    chartName: ''
}

export const sendChartDataReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHARTDATA.SENDDATA:
            // console.log(state, action)
            return {
                status: action.payload.status,
                data: action.payload.data,
                chartName: action.payload.chartName
            }
        default:
            return state
    }
}