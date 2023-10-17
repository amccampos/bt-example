// @ts-check
import { Task, TaskStatus } from "../task.js"

export class Selection extends Task {
  /**
   * @param {Task[]} tasks Sequência de tarefas a serem executadas
   */
  constructor(tasks) {
    super()
    this.tasks = tasks
  }

  /**
   * @returns {TaskStatus}
   */
  execute(gameObj) {
    for (const task of this.tasks) {
      const status = task.execute(gameObj)
      if (status !== TaskStatus.FAILURE) {
        return status
      }
    }
    return TaskStatus.FAILURE
  }
}