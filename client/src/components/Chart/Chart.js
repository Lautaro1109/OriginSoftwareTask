import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { useEffect, useState } from 'react'

import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default function Chart({ data, Symbol }) {
    const [labels, setLabels] = useState([])
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const labels = data.map(item => {
            return item.datetime.substring(11, 16)
        })
        setLabels(labels)

        const chartData = data.map(item => {
            return item.high
        })
        setChartData(chartData)
    }, [data])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: Symbol,
                fontSize: 25,
                fontColor: '#000',
                fontStyle: 'bold'
            }
        }
    }
    const dataChart = {
        labels,
        datasets: [
            {
                label: 'Cotizacion',
                data: chartData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
        ]
    }
    return (
        <>
            <Line data={dataChart} options={options} />
        </>
    )
}
