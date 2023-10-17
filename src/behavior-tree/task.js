// @ts-check
import { GameObject } from "../game-objs/gameobj.js"

/**
 * Possíveis valores de retorno da execução de uma tarefa.
 * @readonly
 * @enum {number}
 */
export const TaskStatus = Object.freeze({
  RUNNING: 1,
  SUCCESS: 2,
  FAILURE: 3
})

/**
 * Classe abstrata com a representação de uma tarefa.
 */
export class Task {
  /**
   * Executa a tarefa, retornando um de seus possíveis status.
   * Por padrão, se a subclasse não re-escrever, retorna que falhou.
   * @param {GameObject} npc 
   * @returns {TaskStatus}
   * @abstract
   */
  execute(npc) {
    return TaskStatus.FAILURE
  }
}
