// @ts-check
import { Task, TaskStatus } from "../task.js"

export class Parallel extends Task {
  /**
   * @param {Task[]} tasks Tarefas a serem executadas em "paralelo"
   */
  constructor(tasks, numToSucceed = tasks.length, numToFail = 1) {
    super()
    this.tasks = tasks
    this.numToSucceed = numToSucceed
    this.numToFail = numToFail
  }

  /**
   * @returns {TaskStatus}
   */
  execute(gameObj) {
    let countSuccess = 0
    let countFailure = 0
    for (const task of this.tasks) {
      const status = task.execute(gameObj)
      switch (status) {
        case TaskStatus.SUCCESS: countSuccess++; break;
        case TaskStatus.FAILURE: countFailure++; break;
      }
    }
    return countSuccess >= this.numToSucceed
      ? TaskStatus.SUCCESS
      : countFailure >= this.numToFail
        ? TaskStatus.FAILURE
        : TaskStatus.RUNNING
  }
}