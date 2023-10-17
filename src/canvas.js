//@ts-check

/** Representa a área de desenho do jogo. */
export class Canvas {
  
  /**
   * Cria um novo canvas(js) associado a um canvas (html) cujo id é passado.
   * @param {string} id Identificador do canvas no documento HTML
   */
  constructor(id) {
    /** @type { HTMLCanvasElement } */
    this.htmlCanvas = /** @type { HTMLCanvasElement } */ (document.getElementById(id))

    if (!this.htmlCanvas) throw new Error(`Element id "${id}" not found!`)
    if (!this.htmlCanvas.getContext) throw new Error(`Id "${id}" is not a canvas element!`)
    
    /** @type { CanvasRenderingContext2D | null } */
    this.context2d = this.htmlCanvas.getContext('2d')
  }

  /** largura do canvas. */
  get width() { return this.htmlCanvas?.width || 0}

  /** altura do canvas. */
  get height() { return this.htmlCanvas?.height || 0 }

  /** Apaga tudo que está no canvas. */
  clear() {
    this.context2d?.clearRect (0, 0, this.width || 0, this.height)
  }

  /**
   * Verifica se um ponto se encontra fora da área do canvas.
   * @param {number} x Coordenada X do ponto
   * @param {number} y Coordenada Y do ponto
   */
  isOutside(x, y) {
    return x < 0 || y < 0 || x > this.width || y > this.height
  }

}