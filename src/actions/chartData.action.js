import { CHARTDATA } from '../constant/const'

export const sendChartData = (status, data, chartName) => {
    return {
        type: CHARTDATA.SENDDATA,
        payload: {
            status: status,
            data: data,
            chartName: chartName
        }
    }
}