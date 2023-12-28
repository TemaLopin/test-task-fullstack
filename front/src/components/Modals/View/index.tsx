import { useMemo, useRef } from 'react'
import { TaskT } from '../../../types'
import './style.css'
import useOutsideClick from '../../Hooks/useOutsideClick'

type ViewTaskModal = {
  data: TaskT
  close: () => void
}

const ViewTaskModal = ({ data, close }: ViewTaskModal) => {
  const { id, title, description, author, date, status } = data

  const correctDate = useMemo(() => {
    const dateNow = Date.parse(new Date().toString())
    const dateDifference = dateNow - Date.parse(date)
    const changeDateInHours = Math.round(dateDifference / 3600000)

    const year = date.slice(0, 4)
    const month = date.slice(5, 7)
    const day = date.slice(8, 10)

    const sign = changeDateInHours > 0 ? '+' : '-'

    return `${day}.${month}.${year} ${sign} ${changeDateInHours} час(а)`
  }, [])

  return (
    <div onClick={close} className='modal-body'>
      <div onClick={(e) => e.stopPropagation()} className='modal-content'>
        <div className='view-task-block'>
          <p>ID: </p>
          <span>{id}</span>
        </div>
        <div className='view-task-block'>
          <p>Title: </p>
          <span>{title}</span>
        </div>
        <div className='view-task-block'>
          <p>Description: </p>
          <span>{description}</span>
        </div>
        <div className='view-task-block'>
          <p>Status: </p>
          <span>{status}</span>
        </div>
        <div className='view-task-block'>
          <p>Author: </p>
          <span>{author}</span>
        </div>
        <div className='view-task-block'>
          <p>Date: </p>
          <span>{correctDate}</span>
        </div>
      </div>
    </div>
  )
}

export default ViewTaskModal
