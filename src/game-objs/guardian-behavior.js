// @ts-check
import { Action, Condition, Sequence, Selection, Parallel, Inverter, Repeat, TaskStatus } from "../behavior-tree/index.js"

// --- ACTIONS ---

const logMessage = msg => new Action(() => {
  console.log(msg)
  return TaskStatus.SUCCESS
})

const logNpc = new Action(npc => {
  console.log(npc)
  return TaskStatus.SUCCESS
})

const turnToTarget = new Action(npc => {
  npc.turnToTarget()
  if (npc.isFacingTarget()) {
    return TaskStatus.SUCCESS
  }
  return TaskStatus.RUNNING  
})

const targetPlayer = new Action(npc => {
  npc.targetEnemy()
  return TaskStatus.SUCCESS 
})

const targetNextPoint = new Action(npc => {
  npc.targetNextPoint()
  return TaskStatus.SUCCESS 
})

const targetClosestPoint = new Action(npc => {
  npc.targetClosestPoint()
  return TaskStatus.SUCCESS 
})

const moveToTarget = new Action(npc => {
  if (npc.moveForward()) {
    if (npc.isCloseToTarget()) {
      return TaskStatus.SUCCESS
    }
    return TaskStatus.RUNNING
  }
  return TaskStatus.FAILURE
})


// --- CONDITIONS ---

const enemyCloseToGem = new Condition(npc => npc.isPlayerCloseToGem())


// --- COMPOSITIONS ---

export function createBehavior() {

  // ronda ao redor da joia
  const round = new Repeat(
    new Sequence([
      turnToTarget,
      moveToTarget,
      targetNextPoint
    ])
  )

  // patrulha verificando se há inimigo perto da joia
  const patrolling = new Sequence([
    targetClosestPoint,
    new Parallel([
      new Inverter(enemyCloseToGem),
      round
    ]),
  ])

  // caça o inimigo
  const chaseEnemy = new Sequence([
    targetPlayer,
    new Parallel([
      turnToTarget,
      moveToTarget
    ])
  ])

  // persegue o inimigo que se encontra perto da joia
  const pursuiting = new Parallel([
    enemyCloseToGem,
    chaseEnemy
  ])

  // ou está patrulhando ou perseguindo o inimigo
  const behavior = new Repeat(
    new Selection([
      patrolling,
      pursuiting
    ])
  )

  return behavior
}

