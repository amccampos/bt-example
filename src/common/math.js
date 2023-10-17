//@ts-check

import { Point } from "./point.js"

/** Constante multiplicativa para transformar graus em radianos */
export const DegToRad = (2*Math.PI) / 360

/** Constante multiplicativa para transformar radianos em graus */
export const RadToDeg = 360 / (2*Math.PI)

/**
 * Gera um número inteiro dentro de um intervalo (max, min).
 * @param { number } max Maior valor a ser gerado aleatoriamente.
 * @param { number } [min=0] Menor valor a ser gerado aleatoriamente. Por default, vale 0.
 */
export function randomIntRange(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Gera um número inteiro dentro de um intervalo (max, min).
 * @param { number } max Maior valor a ser gerado aleatoriamente.
 * @param { number } [min=0] Menor valor a ser gerado aleatoriamente. Por default, vale 0.
 */
export function randomFloatRange(max, min = 0) {
  return Math.random() * (max - min) + min
}

/**
 * Calcula a distância entre dois pontos.
 * @param {Point} p1 Primeiro ponto
 * @param {Point} p2 Segundo ponto
 */
export function distance(p1, p2) {
  const dx = p1.x - p2.x
  const dy = p1.y - p2.y
  return Math.sqrt(dx*dx + dy*dy)
}

/**
 * Projeta o ponto (x,y) na direção dir. Ou seja, se o ponto passado for na direção dir a uma
 * distância dist, retorna onde ele estará.
 * @param {Point} pnt Ponto a ser projetado.
 * @param {number} dir Ângulo indicando a direção em que o ponto será projetado
 * @param {number} [dist=1] Distância a ser projetada
 */
export function projectPoint(pnt, dir, dist = 1) {
  const px = pnt.x + dist * Math.cos(dir)
  const py = pnt.y + dist * Math.sin(dir)
  return new Point(px, py)
}

/**
 * Calcula o ângulo formado por uma reta que se inicia em um ponto (x,y) apontando para uma
 * determinada direção (dir) e outra reta saindo desse mesmo ponto (x,y) em direção a um
 * segundo ponto destino (targetX, targetY)
 * @param {Point} origin Ponto de origem, comum às duas retas
 * @param {number} dir Ângulo indicando a direção da 1ª reta
 * @param {Point} target Ponto destino
 */
export function calcAngleToTarget(origin, dir, target) {
  const dist = distance(origin, target)
  const proj = projectPoint(origin, dir, dist)
  const originToTarget = new Point(target.x - origin.x, target.y - origin.y)
  const originToProjection = new Point(proj.x - origin.x, proj.y - origin.y)
  const targetATan = Math.atan2(originToTarget.y, originToTarget.x)
  const projectionATan = Math.atan2(originToProjection.y, originToProjection.x)
  let angle = targetATan - projectionATan
  if (angle < -Math.PI) angle += 2*Math.PI
  if (angle > Math.PI) angle -= 2*Math.PI
  return angle
}