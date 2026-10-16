let palette = ["#3C2A21", "#5C3D2E", "#B07D62", "#D9B4A1", "#F3EAD9"];
let mioSeme;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mioSeme = random(10000); // Sceglie un numero a caso all'avvio della pagina
}

function draw() {
  background("#d0b399");
  randomSeed(mioSeme);
  
  let numeroglifi = 110;
  let numerocolonne = ceil(sqrt(numeroglifi));
  let numerorighe = ceil(numeroglifi / numerocolonne);
  
  let dimcolonna = windowWidth / numerocolonne;
  let dimriga = windowHeight / numerorighe;

  // Griglia
  for (let g = 0; g < numeroglifi; g++) {
    let colonnaCorrente = g % numerocolonne;
    let rigaCorrente = floor(g / numerocolonne);

    let x = colonnaCorrente * dimcolonna + dimcolonna / 2;
    let y = rigaCorrente * dimriga + dimriga / 2;

    // Rimuovo tazze dietro la legenda
    if (x < 340 && y < 220) {
      continue; // interrompe questo ciclo e passa direttamente alla tazza successiva
    }

    let dimensioneGlifo = min(dimcolonna, dimriga) * 0.65;
    myglyphs(x, y, dimensioneGlifo);
  }

  // Legenda
  disegnaLegenda();
}

function disegnaLegenda() {
  push();
  
  fill(255, 255, 255, 170); 
  noStroke();
  rect(20, 20, 300, 185, 12); 

  fill("#3d2b1f"); 
  textAlign(LEFT, TOP);
  textSize(20);
  textStyle(BOLD);
  text("Coffee Data ☕", 40, 38); 

  textSize(14);
  text("Parametri del glifo:", 40, 70);

  textSize(12);
  textStyle(NORMAL);
  fill("#444444"); 
  
  text("• Forma: Altezza e larghezza variabili", 40, 95);
  text("• Colore: 5 varianti cromatiche", 40, 115);
  text("• Base: Con o senza piattino", 40, 135);
  text("• Dettaglio: Tinta unita, striscia o cerchio", 40, 155);
  text("• Vapore: Animato e di intensità variabile", 40, 175);
  
  pop();
}

function myglyphs(_x, _y, _size) {
  push();
  translate(_x, _y);
  
  let coloreTazza = random(palette);
  
  let tazzaWidth = random(_size * 0.4, _size * 0.85);
  let tazzaHeight = random(_size * 0.4, _size * 0.7);
  let manicoWidth = random(_size * 0.15, _size * 0.35);
  let manicoHeight = random(tazzaHeight * 0.4, tazzaHeight * 0.7);
  
  strokeWeight(1.5);
  stroke("#694e3d");

  // Piattino
  let haPiattino = random() > 0.5;
  if (haPiattino) {
    fill(coloreTazza);
    ellipse(0, tazzaHeight / 2, tazzaWidth * 1.6, tazzaHeight * 0.15);
  }

  // Manico
  push();
  translate(tazzaWidth / 2, -tazzaHeight * 0.1); 
  noFill();
  arc(0, 0, manicoWidth, manicoHeight, -PI/2, PI/2);
  pop();

  // Corpo tazza
  fill(coloreTazza);
  rectMode(CENTER);
  rect(0, 0, tazzaWidth, tazzaHeight, 2, 2, tazzaWidth/2, tazzaWidth/2);

  // Decorazione
  let tipoDecorazione = floor(random(0, 3)); 
  push();
  noStroke();
  fill(255, 255, 255, 150);
  if (tipoDecorazione === 1) {
    rect(0, 0, tazzaWidth - 4, tazzaHeight * 0.25);
  } else if (tipoDecorazione === 2) {
    circle(0, 0, min(tazzaWidth, tazzaHeight) * 0.4);
  }
  pop();

  // Vapore
  let numeroLineeVapore = floor(random(1, 4));
  noFill();
  stroke("#f5f2eee6");
  strokeWeight(1.5);
  
  translate(0, -tazzaHeight / 2 - _size * 0.05);
  let spazioTraLinee = tazzaWidth / (numeroLineeVapore + 1);

  for(let i = 0; i < numeroLineeVapore; i++) {
    let xVapore = (-tazzaWidth / 2) + spazioTraLinee * (i + 1);
    let altezzaVapore = random(_size * 0.15, _size * 0.4);
    let ampiezzaOnda = _size * 0.12;
    
    let onda1 = sin(frameCount * 0.04 + _x + i) * ampiezzaOnda;
    let onda2 = cos(frameCount * 0.03 + _y + i) * ampiezzaOnda;
    
    bezier(
      xVapore, 0,                                      
      xVapore - ampiezzaOnda + onda1, -altezzaVapore * 0.33,   
      xVapore + ampiezzaOnda + onda2, -altezzaVapore * 0.66,   
      xVapore + onda1 * 0.5, -altezzaVapore                          
    );
  }
  pop();
}