// @ts-check
import { GameObject, GameObjectType } from "./gameobj.js"
import { gameObjPool } from "./gameobjpool.js"
import { calcAngleToTarget, DegToRad, distance } from "../common/math.js"
import { Point } from "../common/point.js"
import { game } from "../game.js"
import { createBehavior } from "./guardian-behavior-2.js"

/** Distância considerada pelo NPC como "perto" */
const closeDist = 200


/** Guardião de uma joia. Ele fica patrulhando ao redor da uma joia (Gem) que lhe é associado. */
export class Guardian extends GameObject {
  constructor(gem) {
    super(GameObjectType.Unit)
    this.gem = gem
    this.enemy = null
    this.patrolPoints = []
    this.currentPoint = null
    this.target = undefined
    this.behavior = createBehavior()
  }

  /**
   * Define a configuração inicial do NPC de acordo com os objetos no cenário.
   * @override
   */
  init() {
    // o inimigo é o jogador
    this.enemy = gameObjPool.objs.find(obj => obj.type === GameObjectType.Player)
    
    // define os pontos de patrulha ao seu redor da joia
    const pos = this.gem.pos
    this.patrolPoints = [
      { x: pos.x - 50, y: pos.y - 50 },
      { x: pos.x + 50, y: pos.y - 50 },
      { x: pos.x + 50, y: pos.y + 50 },
      { x: pos.x - 50, y: pos.y + 50 },
    ]
    this.targetClosestPoint()
  }

  /**
   * Atualiza o mundo de acordo com seu estado interno. Se a atualização do estado retornar um novo
   * estado, então uma transição para esse novo estado deve ser feita.
   * @override
   */
  update() {
    this.behavior.execute(this)
  }

  // --- métodos auxiliares ------------------------

  get targetPos() {
    if (this.target && this.target.pos) {
      return this.target.pos
    }
    return new Point(this.target.x, this.target.y)
  }
  
  turnToTarget() {
    if (this.target) {
      const rotationSpeed = 2 * this.speed * DegToRad
      const ang = calcAngleToTarget(this.pos, this.dir, this.targetPos)
      const angle = ang < 0 ? Math.max(ang, -rotationSpeed) : Math.min(ang, rotationSpeed) 
      this.dir += angle
    }
  }

  /**
   * Atualiza o ponto de patrula para ser o próximo do array (circular).
   */
  targetNextPoint() {
    this.currentPoint = (this.currentPoint + 1) % this.patrolPoints.length
    this.target = this.patrolPoints[this.currentPoint]
  }

  targetClosestPoint() {
    let min_dist = 10000
    for (let i = 0; i < this.patrolPoints.length; i++) {
      const dist = distance(this.pos, this.patrolPoints[i])
      if (dist < min_dist) {
        min_dist = dist
        this.currentPoint = i
      }
    }
    this.target = this.patrolPoints[this.currentPoint]
  }

  targetEnemy() {
    this.target = this.enemy
    this.currentPoint = null
  }

  isTargetingPoint() {
    return this.currentPoint !== null
  }

  /**
   * Verifica se a unidade está virada de frente para o alvo.
   */
  isFacingTarget() {
    if (this.target) {
      const angle = calcAngleToTarget(this.pos, this.dir, this.targetPos)
      return Math.abs(angle) < DegToRad
    }
    return false
  }

  /**
   * Verifica se o jogador está próximo à joia.
   */
  isPlayerCloseToGem() {
    if (this.enemy) {
      return distance(this.enemy.pos, this.gem.pos) < closeDist
    }
    return false
  }

  isCloseToTarget() {
    if (this.target) {
      return distance(this.pos, this.targetPos) < this.speed
    }
    return false
  }

  /**
   * Desenha o guardião como um círculo azul com um traço apontando sua direção.
   * @override
   */
  draw() {
    const ctx = game.canvas.context2d
    if (ctx) {
      const x = this.pos.x
      const y = this.pos.y
      ctx.fillStyle = 'rgb(36, 45, 153)'
      ctx.strokeStyle = 'rgb(255, 255, 255)'
      ctx.beginPath()
      ctx.arc(x, y, this.size, 0, 2 * Math.PI)
      ctx.fill()
      ctx.moveTo(x, y)
      ctx.lineTo(x + this.size * Math.cos(this.dir), y + this.size * Math.sin(this.dir))
      ctx.stroke()
    }
  }
}
