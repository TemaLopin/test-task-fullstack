import { useMemo } from 'react'
import { TaskPropsT, TaskT } from '../../types'
import './style.css'



const Task = ({ data }: TaskPropsT) => {
  const { id, title, description, author, date } = data

  const correctDate = useMemo(() => {
    const year = date.slice(0, 4)
    const month = date.slice(5, 7)
    const day = date.slice(8, 10)

    return `${day}.${month}.${year} `
  }, [])

  return (
    <>
      <td>{id}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{author}</td>
      <td>{correctDate}</td>
    </>
  )
}

export default Task
