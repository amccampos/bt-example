// @ts-check
import { GameObject } from "./gameobj.js"

// 'objs' é externa à classe ObjPool para poder ser alterada, uma vez que
// o singleton 'gameObjPool' não permite alterações (por causa do uso do Object.freeze())
// Como ela não é exportada do módulo (.js), apenas este arquivo pode alterá-la.
/** @type {GameObject[]} */
let objs = []

/**
 * Conjunto com todos os objetos presentes no jogo.
 */
class ObjPool {
  /** propriedade para acessar os objetos do jogo. */
  get objs()  { return objs }

  /**
   * Insere um objeto no jogo.
   * @param {GameObject} obj Objeto a ser inserido no jogo.
   */
  add(obj) {
    objs.push(obj)
  }

  /**
   * Remove um objeto do jogo.
   * @param {GameObject} obj Objeto a ser removido do jogo.
   */
  remove(obj) {
    objs = objs.filter(o => o !== obj)
  }

  /**
   * Remove todos os objetos do jogo.
   */
  reset() {
    objs = []
  }
}

/**
 * gameObjPool é um singleton com o conjunto dos objetos do jogo.
 * @constant
 */
export const gameObjPool = Object.freeze(new ObjPool())