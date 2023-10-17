import { Task } from "../task.js"

export class Action extends Task {

  constructor(fn) {
    super()
    this.fn = fn
  }

  execute(npc) {
    return this.fn(npc)
  }
}