// @ts-check
import { game } from "../game.js"
import { gameObjPool } from "./gameobjpool.js"
import { projectPoint, randomFloatRange, randomIntRange } from "../common/math.js"
import { Point } from "../common/point.js"

/**
 * Enumeração com os tipos de objetos presentes no jogo.
 * @readonly
 * @enum {string}
 */
export const GameObjectType = {
  Player: 'player',
  Unit: 'unit',
  Gem: 'gem',
  Bullet: 'bullet'
}

/**
 * Super-classe dos objetos que deve ser atualizados ou desenhados no jogo.
 */
export class GameObject {
  /**
   * @param {GameObjectType} type Tipo do objeto criado.
   * @param {number} x Coordenada X de sua posição. Se não for passado, pega um valor aleatório no canvas.
   * @param {number} y Coordenada Y de sua posição. Se não for passado, pega um valor aleatório no canvas.
   * @param {number} dir Ângulo com a direção em que o objeto aponta. Por default, o ângulo é aleatório.
   * @param {number} [size=10] Tamanho do objeto. Por default, vale 10.
   * @param {number} [speed=5] Velocidade de seu deslocamento. Por default, vale 5.
   */
  constructor(
      type,
      x = randomIntRange(game.canvas.width),
      y = randomIntRange(game.canvas.width),
      dir = randomFloatRange (Math.PI, -Math.PI),
      size = 10,
      speed = 5) {
    this.type = type
    this.pos = new Point(x, y)
    this.dir = dir
    this.size = size
    this.speed = speed
  }

  /**
   * Método chamado quando o jogo já possui todos os objetos em cena e eles podem consultar uns aos
   * outros para fazer possíveis configurações antes do início do jogo.
   * Por padrão, não há nada a ser inicializado nessa classe.
   * Se necessário, pode ser re-escrito na subclasse.
   */
  init() { }

  /**
   * Método chamado a cada atualização do jogo.
   * Se necessário, pode ser re-escrito na subclasse.
   */
  update() { }

  /**
   * Método chamado sempre que o objeto precisa ser redesenhado (normalmente a cada frame).
   * Se necessário, pode ser re-escrito na subclasse.
   */
  draw() { }

  /**
   * Verifica se um ponto encontra-se dentro de sua área envoltória (bounding box).
   * @param {Point} pos Ponto a ser testado
   * @returns verdadeiro se o ponto se encontra na área envoltória ou falso, caso contrário.
   */
  inBoundingBox(pos) {
    return (
      pos.x >= this.pos.x - this.size &&
      pos.x <= this.pos.x + this.size &&
      pos.y >= this.pos.y - this.size &&
      pos.y <= this.pos.y + this.size
    )
  }

  /**
   * Utilizado para "destruir o objeto", removendo-se do conjunto de ojetos do jogo.
   */
  destroy() {
    gameObjPool.remove(this)
  }

  // --- ações comuns ---

  /**
   * Anda um pouco para frente (em função de sua direção e velocidade).
   * @returns verdadeiro se a nova posição está dentro do mundo ou
   *          falso caso contrário.
   */
  moveForward() {
    const p = projectPoint(this.pos, this.dir, this.speed)
    if (!game.canvas.isOutside(p.x, p.y)) {
      this.pos = p
      return true
    }
    return false
  }

}