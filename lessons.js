// lessons.js — Define TODAS las lecciones aquí (sin JSON, sin fetch)
window.LEERKIDS_LESSONS = [

  // ===== Base =====
  {
    id:"VOCALES",
    title:"Vocales (A E I O U)",
    kind:"choice-sound",
    prompt:"Toca la vocal que escuchas",
    pool:["A","E","I","O","U"],
    items:["A","E","I","O","U","A","I","U"],
    speakText:"x",
    category:"Vocales"
  },
  {
    id:"SILABAS_M",
    title:"Sílabas con M",
    kind:"choice-sound",
    prompt:"¿Cuál sílaba escuchas?",
    pool:["MA","ME","MI","MO","MU"],
    items:["MA","ME","MI","MO","MU","MA","MI"],
    speakText:"lower",
    category:"Sílabas",
    subcategory:"M"
  },
  {
    id:"SILABAS_P",
    title:"Sílabas con P",
    kind:"choice-sound",
    prompt:"Escucha y elige",
    pool:["PA","PE","PI","PO","PU"],
    items:["PA","PE","PI","PO","PU","PA","PI"],
    speakText:"lower",
    category:"Sílabas",
    subcategory:"P"
  },
  {
    id:"PALABRAS_1",
    title:"Palabras sencillas",
    kind:"picture-pick",
    prompt:"Elige la palabra que coincide con el dibujo",
    pool:[
      {w:"MAMÁ",emoji:"👩"},
      {w:"PAPÁ",emoji:"👨"},
      {w:"PIÑA",emoji:"🍍"},
      {w:"MAPA",emoji:"🗺️"},
      {w:"PUMA",emoji:"🐆"}
    ],
    items:["MAMÁ","PAPÁ","MAPA","PUMA","PIÑA"],
    speakText:"lower",
    category:"Palabras"
  },
  {
    id:"BORICUA_1",
    title:"Palabras boricuas 1",
    kind:"picture-pick",
    prompt:"Toca la palabra del dibujo",
    pool:[
      {w:"CHINA",emoji:"🍊"},
      {w:"GUAGUA",emoji:"🚌"},
      {w:"COQUÍ",emoji:"🐸"},
      {w:"MOFONGO",emoji:"🥘"},
      {w:"SORBETO",emoji:"🥤"},
      {w:"BIZCOCHO",emoji:"🎂"}
    ],
    items:["CHINA","GUAGUA","COQUÍ","MOFONGO","SORBETO","BIZCOCHO"],
    speakText:"lower",
    category:"Boricuas"
  },
  {
    id:"FRASES_1",
    title:"Frases cortas",
    kind:"build-phrase",
    prompt:"Ordena las palabras (puedes corregir tocando)",
    pool:[
      {phrase:"Mamá me mima", parts:["Mamá","me","mima"]},
      {phrase:"Papá me mima", parts:["Papá","me","mima"]},
      {phrase:"Mi mamá me ama", parts:["Mi","mamá","me","ama"]},
      {phrase:"Mi papá me ama", parts:["Mi","papá","me","ama"]},
      {phrase:"Ana ama a mamá", parts:["Ana","ama","a","mamá"]}
    ],
    items:[0,1,2,3,4],
    speakText:"lower",
    category:"Frases"
  },
  {
    id:"GLOBOS_1",
    title:"Globos: atrapa la letra",
    kind:"balloon-hunt",
    prompt:"Toca todos los globos con la letra",
    pool:["A","E","I","O","U","M","P","S","L","N","R"],
    items:["A","E","I","O","U","M","P"],
    goal:10,
    speakText:"x",
    category:"Globos",
    subcategory:"Letras"
  }

]; // fin base

// ===== Helper para generar sílabas rápidamente =====
function genSilabas(idBase, letra) {
  const pool = [`${letra}A`, `${letra}E`, `${letra}I`, `${letra}O`, `${letra}U`];
  const items = [...pool, `${letra}A`, `${letra}I`]; // repite dos para más práctica
  return {
    id: `SILABAS_${idBase}`,
    title: `Sílabas con ${letra}`,
    kind: "choice-sound",
    prompt: "¿Cuál sílaba escuchas?",
    pool,
    items,
    speakText: "lower",
    category:"Sílabas",
    subcategory: letra
  };
}

// ===== Cartilla fonética de PR (agrega/quita según necesites) =====
window.LEERKIDS_LESSONS.push(
  genSilabas("T","T"),
  genSilabas("L","L"),
  genSilabas("S","S"),
  genSilabas("N","N"),
  genSilabas("R","R"),
  genSilabas("D","D"),
  genSilabas("B","B"),
  // C con dos comportamientos:
  {
    id: "SILABAS_C_DURA",
    title: "Sílabas con C (ca/co/cu)",
    kind: "choice-sound",
    prompt: "¿Cuál sílaba escuchas?",
    pool: ["CA","CO","CU"],
    items: ["CA","CO","CU","CA","CU"],
    speakText: "lower",
    category:"Sílabas",
    subcategory:"C dura"
  },
  {
    id: "SILABAS_C_SUAVE",
    title: "Sílabas con C (ce/ci)",
    kind: "choice-sound",
    prompt: "¿Cuál sílaba escuchas?",
    pool: ["CE","CI"],
    items: ["CE","CI","CE","CI"],
    speakText: "lower",
    category:"Sílabas",
    subcategory:"C suave"
  }
);

// ===== Palabras boricuas adicionales =====
window.LEERKIDS_LESSONS.push({
  id: "BORICUA_2",
  title: "Palabras boricuas 2",
  kind: "picture-pick",
  prompt: "Toca la palabra del dibujo",
  pool: [
    { w: "ALCAPURRIA", emoji: "🥟" },
    { w: "PASTELILLO", emoji: "🥟" },
    { w: "PAVERA", emoji: "🦃" },
    { w: "MALANGA", emoji: "🥔" },
    { w: "PANA", emoji: "🍞" },
    { w: "CHINCHORRO", emoji: "🚌" } // simbólico
  ],
  items: ["ALCAPURRIA","PASTELILLO","PAVERA","MALANGA","PANA","CHINCHORRO"],
  speakText: "lower",
  category:"Boricuas"
});

// ===== Frases cortas (nivel inicial 2) =====
window.LEERKIDS_LESSONS.push({
  id: "FRASES_2",
  title: "Frases cortas 2",
  kind: "build-phrase",
  prompt: "Ordena las palabras (puedes corregir tocando)",
  pool: [
    { phrase: "Ana lee", parts: ["Ana","lee"] },
    { phrase: "Leo la A", parts: ["Leo","la","A"] },
    { phrase: "Papá lee", parts: ["Papá","lee"] },
    { phrase: "Mamá ama a Ana", parts: ["Mamá","ama","a","Ana"] }
  ],
  items: [0,1,2,3],
  speakText: "lower",
  category:"Frases"
});

// ===== Globos con sílabas (opcional) =====
window.LEERKIDS_LESSONS.push({
  id: "GLOBOS_2",
  title: "Globos: atrapa la sílaba",
  kind: "balloon-hunt",
  prompt: "Toca todos los globos con la sílaba",
  pool: ["TA","TE","TI","TO","TU","LA","LE","LI","LO","LU"],
  items: ["TA","TE","TI","TO","TU","LA","LE","LI","LO","LU"],
  goal: 10,
  speakText: "x",
  category:"Globos",
  subcategory:"Sílabas"
});
