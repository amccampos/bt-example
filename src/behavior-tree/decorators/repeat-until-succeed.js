// @ts-check
import { Task, TaskStatus } from "../task.js"

export class RepeatUntilSucceed extends Task {

  constructor(task) {
    super()
    this.task = task
  }

  execute(npc) {
    const status = this.task.execute(npc)
    if (status === TaskStatus.SUCCESS) {
      return TaskStatus.SUCCESS
    }
    return TaskStatus.RUNNING
  }
}