import bus from "/js/bus.js";

export default class Display extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="display absolute">
      <x-tiempo></x-tiempo>
      <x-grafico><x-grafico>
    <div>
    `;

  }

}
