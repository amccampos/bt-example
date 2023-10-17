// @ts-check
import { game } from "../game.js"
import { GameObject, GameObjectType } from "./gameobj.js"

/**
 * Joia (gema).
 */
export class Gem extends GameObject {
  /**
   * @param {number} x Coordenada X da posição da joia
   * @param {number} y Coordenada Y da posição da joia
   */
  constructor(x, y) {
    super(GameObjectType.Gem, x, y, 0)
    this.fill = 'rgb(255, 0, 0)'
    this.stroke = 'rgb(255, 255, 255)'
  }

  /**
   * Desenha uma joia vermelha.
   * @override
   */
  draw() {
    const ctx = game.canvas.context2d
    if (ctx) {
      const x = this.pos.x
      const y = this.pos.y
      ctx.fillStyle = this.fill
      ctx.strokeStyle = this.stroke
      ctx.beginPath()
      ctx.moveTo(x, y + 5)
      ctx.lineTo(x - 10, y - 5)
      ctx.lineTo(x - 7, y - 10)
      ctx.lineTo(x + 7, y - 10)
      ctx.lineTo(x + 10, y - 5)
      ctx.lineTo(x, y + 5)
      ctx.fill()
      ctx.stroke()
    }
  }
}