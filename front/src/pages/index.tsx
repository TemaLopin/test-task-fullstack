import { useState, useEffect } from 'react'
import { findTask, getAllTasks } from '../api/requests'
import useDebounce from '../components/Hooks/useDebounce'
import './style.css'
import { TaskT } from '../types'
import Task from '../components/Task'
import ViewTaskModal from '../components/Modals/View'
import CreateTaskModal from '../components/Modals/Create'
import Pagination from '../components/Paginations'

const OFFSET = 10

const Main = () => {
  const [searchValue, setSearchValue] = useState('')
  const [tasks, setTasks] = useState<TaskT[]>([])
  const [tempTasks, setTempTasks] = useState<TaskT[]>([])
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [viewTask, setViewTask] = useState<TaskT | undefined>()
  const [pages, setPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const searchDebounce = useDebounce(searchValue, 1000)

  useEffect(() => {
    if (searchDebounce) findTaskByTitle()
    if (searchDebounce === '') getTasks()
    setCurrentPage(0)
  }, [searchDebounce])

  const findTaskByTitle = async () => {
    try {
      const res = await findTask({
        offset: currentPage * OFFSET,
        limit: OFFSET,
        search: searchDebounce,
      })
      setTempTasks(tasks)
      setTasks(res)
    } catch (error) {
      console.log(error)
    }
  }

  const getTasks = async () => {
    try {
      if (tempTasks.length > 0) {
        setTasks(tempTasks)
        setTempTasks([])
      } else {
        const res = await getAllTasks({
          offset: currentPage * OFFSET,
          limit: OFFSET,
        })
        setTasks(res.data)

        const allPage = Math.ceil(+res.count / OFFSET)
        setPages(allPage)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const closeModal = () => {
    setCreateModalOpen(false)
    setViewTask(undefined)
  }

  useEffect(() => {
    setTasks([])
    getTasks()
  }, [currentPage])

  return (
    <>
      <div className='container'>
        <div className='search'>
          <input
            placeholder='Search by title...'
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
          />
          <button onClick={() => setCreateModalOpen(true)}>Create</button>
        </div>
        <div className='content'>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Author</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody data-animch>
              {tasks.map((task) => (
                <tr onClick={() => setViewTask(task)} className='body'>
                  <Task data={task} />
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {viewTask !== undefined && (
          <ViewTaskModal close={closeModal} data={viewTask} />
        )}
        {createModalOpen && (
          <CreateTaskModal fetch={getTasks} close={closeModal} />
        )}
      </div>
    </>
  )
}

export default Main
