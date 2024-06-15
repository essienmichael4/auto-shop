import React from 'react'

type Period = {
    month: number,
    year: number
}

interface Props{
    timeframe: "MONTH" | "YEAR",
    period: Period
    setPeriod: (period:Period) => void,
    setTimeFrame: (timeframe: "MONTH" | "YEAR") => void
}

const HistoryPeriodSelector = ({timeframe, period, setPeriod, setTimeFrame}:Props) => {
  return (
    <div>HistoryPeriodSelector</div>
  )
}

export default HistoryPeriodSelector