import { TaskT } from '../types'
import http from './http'

export const getAllTasks = async ({
  offset,
  limit,
}: {
  limit: number
  offset: number
}): Promise<{
  count: number
  data: TaskT[]
}> => {
  const res = await http.get('/tasks', {}, { offset, limit })
  return res.data
}

export const getOneTask = async (id: number): Promise<TaskT> => {
  const res = await http.get(`/tasks`, {}, { id })
  return res.data
}

export const findTask = async ({
  offset,
  limit,
  search,
}: {
  offset: number
  limit: number
  search: string
}): Promise<TaskT[]> => {
  const res = await http.get(`/find-tasks/${search}`, {}, { offset, limit })
  return res.data
}

export const createTask = async (
  newTask: Omit<TaskT, 'id'>
): Promise<TaskT> => {
  const res = await http.post('/tasks', { ...newTask })
  return res.data
}

export const updateTask = async (): Promise<TaskT> => {
  const res = await http.put('/tasks', {}, {})
  return res.data
}
export const deleteTask = async (): Promise<TaskT> => {
  const res = await http.remove('/tasks', {}, {})
  return res.data
}
