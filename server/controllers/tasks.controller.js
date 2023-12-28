const db = require('../db')

class TasksController {
  async getTasks(req, res) {
    const { offset, limit } = req.query
    console.log('🚀 !@#$ req.query:', req.query)

    const count = await db.query('SELECT COUNT(*) FROM tasks_table')
    console.log('🚀 !@#$ count:', count)

    const allTask = await db.query(
      `SELECT * FROM tasks_table ORDER BY date DESC LIMIT $1 OFFSET $2 `,
      [+limit | 0, +offset | 0]
    )
    res.json({ count: count.rows[0]?.count || 0, data: allTask.rows })
  }

  async findTasks(req, res) {
    const title = req.params.title
    const { offset, limit } = req.query
    const tasks = await db.query(
      `SELECT * FROM tasks_table WHERE title LIKE '%${title}%' ORDER BY date DESC LIMIT $1 OFFSET $2`,
      [+limit | 0, +offset | 0]
    )
    res.json(tasks.rows)
  }

  async getOneTask(req, res) {
    console.log('!@#$ req.params', req.params)
    const id = req.params.id
    const task = await db.query(`SELECT * FROM tasks_table WHERE id = $1`, [id])
    res.json(task.rows[0])
  }

  async createTask(req, res) {
    const { title, author, description } = req.body

    const newTask = await db.query(
      `INSERT INTO tasks_table (title, author, description) values ($1, $2, $3) RETURNING *`,
      [title, author, description]
    )

    res.json(newTask.rows[0])
  }

  async updateTask(req, res) {
    const { id, title, description, status, author } = req.body

    const task = await db.query(
      `UPDATE tasks_table set title = $1, description = $2, status = $3, author = $4 WHERE id = $5 RETURNING *`,
      [title, description, status, author, id]
    )
    res.json(task.rows[0])
  }

  async deleteTask(req, res) {
    const id = req.params.id
    const task = await db.query(`DELETE FROM tasks_table WHERE id = $!`, [id])
    res.json(task.rows[0])
  }
}

module.exports = new TasksController()
