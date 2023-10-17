import { Task, TaskStatus } from "../task.js"

export class Condition extends Task {
  
  constructor(fn) {
    super()
    this.fn = fn
  }

  execute(npc) {
    return this.fn(npc) ? TaskStatus.SUCCESS : TaskStatus.FAILURE
  }
}