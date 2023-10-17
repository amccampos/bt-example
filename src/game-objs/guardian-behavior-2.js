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

const targetPlayer = new Action(npc => {
  npc.targetEnemy()
  return TaskStatus.SUCCESS 
})

const targetNextPoint = new Action(npc => {
  npc.targetNextPoint()
  return TaskStatus.SUCCESS 
})

const initPatrol = new Action(npc => {
  if (npc.isTargetingPoint() === false) {
    npc.targetClosestPoint()
  }
  return TaskStatus.SUCCESS
})

const turnToTarget = new Action(npc => {
  if (npc.isFacingTarget()) {
    return TaskStatus.SUCCESS
  }
  npc.turnToTarget()
  return TaskStatus.RUNNING  
})

const moveToTarget = new Action(npc => {
  if (npc.isCloseToTarget()) {
    return TaskStatus.SUCCESS
  }
  else if (npc.moveForward()) {
    return TaskStatus.RUNNING
  }
  return TaskStatus.FAILURE
})


// --- CONDITIONS ---

const enemyCloseToGem = new Condition(npc => npc.isPlayerCloseToGem())


// --- COMPOSITIONS ---

export function createBehavior() {

  // ronda ao redor da joia
  const round = new Sequence([
    turnToTarget,
    moveToTarget,
    targetNextPoint
  ])

  // patrulha verificando se há inimigo perto da joia
  const patrolling = new Sequence([
    new Inverter(enemyCloseToGem),
    initPatrol,
    round
  ])

  // caça o inimigo
  const chaseEnemy = new Parallel([
    targetPlayer,
    turnToTarget,
    moveToTarget
  ])

  // ou está patrulhando ou perseguindo o inimigo
  const behavior = new Selection([
    patrolling,
    chaseEnemy
  ])

  return behavior
}

