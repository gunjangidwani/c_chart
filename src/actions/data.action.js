import { CSVDATA } from '../constant/const'

export const getCsvData = (data) => {
    return {
        type: CSVDATA.GET,
        payload: data
    }
}

export const getData = () => {
    return {
        type: CSVDATA.PASS,
        payload: null
    }
}

export const getChartData = (data) => {
    return {
        type: CSVDATA.CHARTDATA,
        payload: data
    }
}

export const getChartName = (data) => {
    console.log(data)
    return {
        type: CSVDATA.CHART_SELECTED,
        payload: data
    }
}