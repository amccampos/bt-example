// @ts-check
import { Task, TaskStatus } from "../task.js"

export class Inverter extends Task {

  constructor(task) {
    super()
    this.task = task
  }

  execute(npc) {
    const status = this.task.execute(npc)
    switch (status) {
      case TaskStatus.SUCCESS: return TaskStatus.FAILURE
      case TaskStatus.FAILURE: return TaskStatus.SUCCESS
    }
    return TaskStatus.RUNNING
  }

}