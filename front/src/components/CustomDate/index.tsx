import { useEffect, useState } from 'react'
import { CustomDatePropsT, DateT } from '../../types'
import './style.css'

const CustomDate = ({ onChange }: CustomDatePropsT) => {
  const [date, setDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  })

  const changeDate = <T extends keyof DateT>(key: T, value: number) => {
    if (key !== 'year' && value.toString().length > 2) return
    if (key === 'year' && value.toString().length > 4) return
    setDate((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    if (date.day > 32 && date.day <= 0) return
    if (date.month > 12 && date.day <= 0) return
    if (date.day < 0) return

    const { day, month, year } = date

    const formatDate = new Date(year - 1, month, day + 1).toISOString()
    console.log('🚀 !@#$ formatDate:', formatDate)

    onChange(formatDate)
  }, [date])

  return (
    <div className='custom-date-container'>
      <input
        value={date.day > 0 ? date.day : ''}
        max={2}
        placeholder='day'
        type={'number'}
        onChange={({ target: { value } }) => changeDate('day', +value)}
      />
      <input
        value={date.month > 0 ? date.month : ''}
        max={2}
        placeholder='month'
        type={'number'}
        onChange={({ target: { value } }) => changeDate('month', +value)}
      />
      <input
        max={4}
        value={date.year > 0 ? date.year : ''}
        placeholder='year'
        type={'number'}
        onChange={({ target: { value } }) => changeDate('year', +value)}
      />
    </div>
  )
}

export default CustomDate
