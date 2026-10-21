// LÓGICA JS PARA AREANET.COM

document.addEventListener('DOMContentLoaded', () => {

  const inputBase = document.getElementById('inputBase');
  const sliderBase = document.getElementById('sliderBase');
  const baseValueDisplay = document.getElementById('baseValueDisplay');

  const inputAltura = document.getElementById('inputAltura');
  const sliderAltura = document.getElementById('sliderAltura');
  const alturaValueDisplay = document.getElementById('alturaValueDisplay');

  const paso1Calc = document.getElementById('paso1Calc');
  const paso2Calc = document.getElementById('paso2Calc');
  const resultadoArea = document.getElementById('resultadoArea');

  const triangleSvg = document.getElementById('triangleSvg');

  const btnComodin1 = document.getElementById('btnComodin1');
  const btnComodin2 = document.getElementById('btnComodin2');
  const btnComodin3 = document.getElementById('btnComodin3');

  const modalComodin2 = document.getElementById('modalComodin2');
  const closeModal2 = document.getElementById('closeModal2');
  const btnEntendido2 = document.getElementById('btnEntendido2');

  const modalComodin3 = document.getElementById('modalComodin3');
  const closeModal3 = document.getElementById('closeModal3');
  const btnFestejar = document.getElementById('btnFestejar');
  const comparacionReal = document.getElementById('comparacionReal');

  function calcularArea() {
    let base = parseFloat(inputBase.value) || 0;
    let altura = parseFloat(inputAltura.value) || 0;

    if (base < 1) base = 1;
    if (altura < 1) altura = 1;

    sliderBase.value = Math.min(base, 50);
    sliderAltura.value = Math.min(altura, 50);
    baseValueDisplay.textContent = `${base} cm`;
    alturaValueDisplay.textContent = `${altura} cm`;

    const multiplicacion = base * altura;
    const area = multiplicacion / 2;

    paso1Calc.textContent = `${base} × ${altura} = ${multiplicacion}`;
    paso2Calc.textContent = `${multiplicacion} ÷ 2 = ${area}`;

    resultadoArea.textContent = Number.isInteger(area) ? area : area.toFixed(1);

    dibujarTriangulo(base, altura);
  }

  function dibujarTriangulo(b, h) {
    const svgWidth = 200;
    const svgHeight = 120;
    const padding = 15;

    const maxDimension = Math.max(b, h, 1);
    const scale = Math.min((svgWidth - padding * 2) / maxDimension, (svgHeight - padding * 2) / maxDimension) * 0.75;

    const baseScaled = Math.max(b * scale, 30);
    const alturaScaled = Math.max(h * scale, 25);

    const x1 = (svgWidth - baseScaled) / 2;
    const y1 = svgHeight - padding;

    const x2 = x1 + baseScaled;
    const y2 = y1;

    const x3 = svgWidth / 2;
    const y3 = y1 - alturaScaled;

    triangleSvg.innerHTML = `
      <polygon points="${x1},${y1} ${x2},${y2} ${x3},${y3}" fill="#facc15" stroke="#ca8a04" stroke-width="3" stroke-linejoin="round"/>
      <line x1="${x3}" y1="${y1}" x2="${x3}" y2="${y3}" stroke="#ea580c" stroke-width="2" stroke-dasharray="3,3"/>
      <rect x="${x3}" y="${y1 - 8}" width="8" height="8" fill="none" stroke="#ea580c" stroke-width="1.5"/>
      <text x="${svgWidth / 2}" y="${y1 + 12}" font-size="10" font-weight="bold" fill="#854d0e" text-anchor="middle">b = ${b} cm</text>
      <text x="${x3 + 12}" y="${(y1 + y3) / 2}" font-size="10" font-weight="bold" fill="#c2410c">h = ${h} cm</text>
    `;
  }

  inputBase.addEventListener('input', () => { sliderBase.value = inputBase.value; calcularArea(); });
  sliderBase.addEventListener('input', () => { inputBase.value = sliderBase.value; calcularArea(); });

  inputAltura.addEventListener('input', () => { sliderAltura.value = inputAltura.value; calcularArea(); });
  sliderAltura.addEventListener('input', () => { inputAltura.value = sliderAltura.value; calcularArea(); });

  // COMODÍN 1
  if (btnComodin1) {
    btnComodin1.addEventListener('click', () => {
      inputBase.value = Math.floor(Math.random() * 24) + 4;
      inputAltura.value = Math.floor(Math.random() * 20) + 3;
      calcularArea();
    });
  }

  // COMODÍN 2
  if (btnComodin2) {
    btnComodin2.addEventListener('click', () => modalComodin2.classList.remove('hidden'));
  }
  if (closeModal2) {
    closeModal2.addEventListener('click', () => modalComodin2.classList.add('hidden'));
  }
  if (btnEntendido2) {
    btnEntendido2.addEventListener('click', () => modalComodin2.classList.add('hidden'));
  }
  modalComodin2.addEventListener('click', (e) => {
    if (e.target === modalComodin2) modalComodin2.classList.add('hidden');
  });

  // COMODÍN 3
  if (btnComodin3) {
    btnComodin3.addEventListener('click', () => {
      const areaVal = parseFloat(resultadoArea.textContent) || 0;

      if (areaVal <= 25) {
        comparacionReal.innerHTML = `Tu triángulo equivale aproximadamente a <span class="font-bold text-amber-300">1 rebanada de pizza</span> 🍕.`;
      } else if (areaVal <= 80) {
        comparacionReal.innerHTML = `Tu triángulo equivale al área de una <span class="font-bold text-amber-300">escuadra escolar o servilleta</span> 📐.`;
      } else if (areaVal <= 200) {
        comparacionReal.innerHTML = `Tu triángulo equivale a la <span class="font-bold text-amber-300">vela de un barco de juguete</span> ⛵.`;
      } else {
        comparacionReal.innerHTML = `¡Guau! Tu triángulo equivale a la entrada de una <span class="font-bold text-amber-300">carpa de acampar</span> ⛺.`;
      }

      modalComodin3.classList.remove('hidden');
      lanzarConfeti();
    });
  }

  if (closeModal3) {
    closeModal3.addEventListener('click', (e) => {
      e.stopPropagation();
      modalComodin3.classList.add('hidden');
    });
  }

  modalComodin3.addEventListener('click', (e) => {
    if (e.target === modalComodin3) modalComodin3.classList.add('hidden');
  });

  if (btnFestejar) {
    btnFestejar.addEventListener('click', lanzarConfeti);
  }

  function lanzarConfeti() {
    if (typeof confetti === 'function') {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  }

  calcularArea();
});
