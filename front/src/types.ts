export type TaskT = {
  id: number
  title: string
  description: string
  status: string
  author: string
  date: string
}

export type CreateTaskModalPropsT = {
  close: () => void
  fetch: () => void
}

export type TaskPropsT = {
  data: TaskT
}

export type DateT = { day: number; month: number; year: number }
export type CustomDatePropsT = { onChange: (date: string) => void }
