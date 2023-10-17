// @ts-check
import { Task, TaskStatus } from "../task.js"

export class Repeat extends Task {

  constructor(task) {
    super()
    this.task = task
  }

  execute(gameObj) {
    this.task.execute(gameObj)
    return TaskStatus.RUNNING
  }
}