// @ts-check
import { Canvas } from "./canvas.js"
import { gameObjPool } from "./game-objs/gameobjpool.js"
import { Gem } from "./game-objs/gem.js"
import { Player } from "./game-objs/player.js"
import { Guardian } from "./game-objs/guardian.js"
import { messageManager } from "./msg-manager/msg-manager.js"

/** Quantidade de atualizações por segundo (atualizações e desenho) */
const framesPerSecond = 30

/** Taxa de atualização do jogo */
const frameRate = 1000/framesPerSecond

// Essas variáveis são externas à classe Game para poder serem alteradas, uma vez que
// o singleton 'game' não permite alterações (por causa do uso do Object.freeze())
// Como elas não são exportadas do módulo (.js), apenas as funções neste arquivo
// podem acessá-las.

/** @type {Canvas} */
let canvas

let interval // referência para o intervalo criado por setInterval

/**
 * Classe representando o jogo.
 */
class Game {

  /**
   * Associa o elemento html com id `canvasId` ao canvas do jogo.
   * @param {string} canvasId Identificador do canvas no documento HTML
   */
  createCanvas(canvasId) {
    canvas = new Canvas(canvasId)
    this.reset()
  }

  /**
   * Acessa (readonly) o canvas do jogo.
   */
  get canvas() { return canvas }
  
  /**
   * Método chamado a cada iteração do jogo.
   */
  tick() {
    this.update() // atualiza os objetos do jogo
    this.draw()   // e desenha-os
  }

  /**
   * Atualiza o estado do jogo. Para isso, processa inicialmente as mensagens (eventos)
   * e depois atualiza os objetos.
   */
  update() {
    messageManager.process()
    gameObjPool.objs.forEach(obj => obj.update()) 
  }

  /**
   * Apaga a área de desenho e desenha novamente todos os objetos.
   */
  draw() {
    if (this.canvas) {
      this.canvas.clear()
      gameObjPool.objs.forEach(obj => obj.draw()) 
    }
  }

  /**
   * Cria o cenário do jogo.
   */
  init() {
    gameObjPool.reset()

    const yGem = this.canvas.height / 2
    const xGem = this.canvas.width / 4

    for(let numGems = 1; numGems <= 3; numGems++) {
      const gem = new Gem(numGems * xGem, yGem)
      const guardian = new Guardian(gem)
      gameObjPool.add(gem)
      gameObjPool.add(guardian)
    }
    gameObjPool.add(new Player())

    gameObjPool.objs.forEach(obj => obj.init())
  }

  /**
   * Reinicia o jogo.
   */
  reset() {
    this.init()
    this.draw()
  }

  /**
   * Inicia o laço do jogo chamando o método tick() num intervalo regular.
   */
  start() {
    this.stop()
    interval = setInterval(() => this.tick(), frameRate)
  }

  /**
   * Para a atualização do jogo.
   */
  stop() {
    if (interval) clearInterval(interval)
    interval = undefined
  }
}

/**
 * game é um objeto único que representa o jogo (singleton).
 * Apenas essa variável é exportada deste módulo.
 */
export const game = Object.freeze(new Game())