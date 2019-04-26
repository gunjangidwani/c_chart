import { combineReducers } from 'redux'
import { getCsvDataReducer} from './data.reducer'
import { sendChartDataReducer } from './chartData.reducer'

export default combineReducers({
    getCsvDataReducer,
    sendChartDataReducer
})