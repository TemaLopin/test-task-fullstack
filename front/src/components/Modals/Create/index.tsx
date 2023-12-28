import { useEffect, useState } from 'react'
import './style.css'
import { CreateTaskModalPropsT, TaskT } from '../../../types'

import CustomDate from '../../CustomDate'
import { createTask } from '../../../api/requests'

const CreateTaskModal = ({ close, fetch }: CreateTaskModalPropsT) => {
  const [newTask, setNewTask] = useState<Omit<TaskT, 'id'>>({
    author: '',
    date: '',
    description: '',
    status: '',
    title: '',
  })

  const changeTask = <T extends keyof TaskT>(key: T, value: TaskT[T]) => {
    setNewTask((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    try {
      const res = await createTask(newTask)
      fetch()
      close()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const closeEsc = ({ code }: KeyboardEvent) => {
      if (code === 'Escape') return close()
    }
    document.addEventListener('keydown', closeEsc)
    return () => document.addEventListener('keydown', closeEsc)
  }, [])

  return (
    <div onClick={close} className='modal-body'>
      <div onClick={(e) => e.stopPropagation()} className='modal-content'>
        <div className='view-task-block'>
          <p>Title: </p>
          <input
            value={newTask.title}
            onChange={({ target: { value } }) => changeTask('title', value)}
          />
        </div>
        <div className='view-task-block'>
          <p>Description: </p>
          <input
            value={newTask.description}
            onChange={({ target: { value } }) =>
              changeTask('description', value)
            }
          />
        </div>
        <div className='view-task-block'>
          <p>Status: </p>
          <input
            value={newTask.status}
            onChange={({ target: { value } }) => changeTask('status', value)}
          />
        </div>
        <div className='view-task-block'>
          <p>Author: </p>
          <input
            value={newTask.author}
            onChange={({ target: { value } }) => changeTask('author', value)}
          />
        </div>
        <div className='view-task-block'>
          <p>Date: </p>
          <CustomDate onChange={(date) => changeTask('date', date)} />
        </div>
        <div className='save'>
          <button
            disabled={Object.values(newTask).some((item) => item.length === 0)}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTaskModal
