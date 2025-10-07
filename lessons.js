// lessons.js — Todas las lecciones de LeerKids (sin JSON, sin fetch)
/*  Estructura:
    1) Base (vocales, sílabas iniciales, palabras, boricuas, frases, globos letras)
    2) Helpers (unique, pushUnique, genSilabas, chunk)
    3) Cartilla PR + especiales (C dura/suave) SIN duplicar
    4) Sílabas para TODO el alfabeto (B–Z y Ñ) evitando duplicados
    5) Boricuas extra, frases extra
    6) Globos sílabas (pool único) con goal=5  [conserva GLOBOS_2]
    7) Globos de letras en grupos de 5 (A–Z, incluye Ñ)
    8) Globos de sílabas en grupos de 5 (desde pool recopilado)
    9) NUEVO: Pareo mayúsculas ↔ minúsculas (2 juegos separados)
*/

// =====================================================
// 1) BASE
// =====================================================
window.LEERKIDS_LESSONS = [
  // Vocales
  {
    id: "VOCALES",
    title: "Vocales (A E I O U)",
    kind: "choice-sound",
    prompt: "Toca la vocal que escuchas",
    pool: ["A", "E", "I", "O", "U"],
    items: ["A", "E", "I", "O", "U", "A", "I", "U"],
    speakText: "x",
    category: "Vocales",
  },

  // Sílabas (base que ya tenías)
  {
    id: "SILABAS_M",
    title: "Sílabas con M",
    kind: "choice-sound",
    prompt: "¿Cuál sílaba escuchas?",
    pool: ["MA", "ME", "MI", "MO", "MU"],
    items: ["MA", "ME", "MI", "MO", "MU", "MA", "MI"],
    speakText: "lower",
    category: "Sílabas",
    subcategory: "M",
  },
  {
    id: "SILABAS_P",
    title: "Sílabas con P",
    kind: "choice-sound",
    prompt: "Escucha y elige",
    pool: ["PA", "PE", "PI", "PO", "PU"],
    items: ["PA", "PE", "PI", "PO", "PU", "PA", "PI"],
    speakText: "lower",
    category: "Sílabas",
    subcategory: "P",
  },
  {
    id: "SILABAS_S",
    title: "Sílabas con S",
    kind: "choice-sound",
    prompt: "Escucha y elige",
    pool: ["SA", "SE", "SI", "SO", "SU"],
    items: ["SA", "SE", "SI", "SO", "SU", "SA", "SI"],
    speakText: "lower",
    category: "Sílabas",
    subcategory: "S",
  },
  {
    id: "SILABAS_T",
    title: "Sílabas con T",
    kind: "choice-sound",
    prompt: "Escucha y elige",
    pool: ["TA", "TE", "TI", "TO", "TU"],
    items: ["TA", "TE", "TI", "TO", "TU", "TA", "TI"],
    speakText: "lower",
    category: "Sílabas",
    subcategory: "T",
  },

  // Palabras
  {
    id: "PALABRAS_1",
    title: "Palabras sencillas",
    kind: "picture-pick",
    prompt: "Elige la palabra que coincide con el dibujo",
    pool: [
      { w: "MAMÁ", emoji: "👩" },
      { w: "PAPÁ", emoji: "👨" },
      { w: "PIÑA", emoji: "🍍" },
      { w: "MAPA", emoji: "🗺️" },
      { w: "PUMA", emoji: "🐆" },
    ],
    items: ["MAMÁ", "PAPÁ", "MAPA", "PUMA", "PIÑA"],
    speakText: "lower",
    category: "Palabras",
  },

  // Boricuas
  {
    id: "BORICUA_1",
    title: "Palabras boricuas 1",
    kind: "picture-pick",
    prompt: "Toca la palabra del dibujo",
    pool: [
      { w: "CHINA", emoji: "🍊" },
      { w: "GUAGUA", emoji: "🚌" },
      { w: "COQUÍ", emoji: "🐸" },
      { w: "MOFONGO", emoji: "🥘" },
      { w: "SORBETO", emoji: "🥤" },
      { w: "BIZCOCHO", emoji: "🎂" },
    ],
    items: ["CHINA", "GUAGUA", "COQUÍ", "MOFONGO", "SORBETO", "BIZCOCHO"],
    speakText: "lower",
    category: "Boricuas",
  },

  // Frases
  {
    id: "FRASES_1",
    title: "Frases cortas",
    kind: "build-phrase",
    prompt: "Ordena las palabras (puedes corregir tocando)",
    pool: [
      { phrase: "Mamá me mima", parts: ["Mamá", "me", "mima"] },
      { phrase: "Papá me mima", parts: ["Papá", "me", "mima"] },
      { phrase: "Mi mamá me ama", parts: ["Mi", "mamá", "me", "ama"] },
      { phrase: "Mi papá me ama", parts: ["Mi", "papá", "me", "ama"] },
      { phrase: "Ana ama a mamá", parts: ["Ana", "ama", "a", "mamá"] },
    ],
    items: [0, 1, 2, 3, 4],
    speakText: "lower",
    category: "Frases",
  },

  // Globos: letras (goal=5 ahora)
  {
    id: "GLOBOS_1",
    title: "Globos: atrapa la letra",
    kind: "balloon-hunt",
    prompt: "Toca todos los globos con la letra",
    pool: ["A", "E", "I", "O", "U", "M", "P", "S", "L", "N", "R"],
    items: ["A", "E", "I", "O", "U", "M", "P"],
    goal: 5, // <--- bajado a 5
    speakText: "x",
    category: "Globos",
    subcategory: "Letras",
  },
];

// =====================================================
// 2) HELPERS
// =====================================================
function uniq(arr) {
  return Array.from(new Set(arr));
}

const _idSet = new Set(window.LEERKIDS_LESSONS.map((l) => l.id));
function pushUnique(lesson) {
  if (!_idSet.has(lesson.id)) {
    window.LEERKIDS_LESSONS.push(lesson);
    _idSet.add(lesson.id);
  }
}

function genSilabas(idBase, letra) {
  const L = String(letra).toUpperCase();
  const pool = [`${L}A`, `${L}E`, `${L}I`, `${L}O`, `${L}U`];
  const items = [...pool, `${L}A`, `${L}I`]; // repeticiones para práctica
  return {
    id: `SILABAS_${idBase}`,
    title: `Sílabas con ${L}`,
    kind: "choice-sound",
    prompt: "¿Cuál sílaba escuchas?",
    pool,
    items,
    speakText: "lower",
    category: "Sílabas",
    subcategory: L,
  };
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// =====================================================
// 3) CARTILLA PR + ESPECIALES (C DURA/SUAVE) — SIN duplicar
// =====================================================
// Añadimos L, N, R, D, B si no existen ya
["L", "N", "R", "D", "B"].forEach((L) => pushUnique(genSilabas(L, L)));

// C con dos comportamientos
pushUnique({
  id: "SILABAS_C_DURA",
  title: "Sílabas con C (ca/co/cu)",
  kind: "choice-sound",
  prompt: "¿Cuál sílaba escuchas?",
  pool: ["CA", "CO", "CU"],
  items: ["CA", "CO", "CU", "CA", "CU"],
  speakText: "lower",
  category: "Sílabas",
  subcategory: "C dura",
});
pushUnique({
  id: "SILABAS_C_SUAVE",
  title: "Sílabas con C (ce/ci)",
  kind: "choice-sound",
  prompt: "¿Cuál sílaba escuchas?",
  pool: ["CE", "CI"],
  items: ["CE", "CI", "CE", "CI"],
  speakText: "lower",
  category: "Sílabas",
  subcategory: "C suave",
});

// =====================================================
// 4) SÍLABAS PARA TODO EL ALFABETO (B–Z y Ñ) evitando duplicados
// =====================================================
(function addAllAlphabetSyllables() {
  const TARGET = [
    "B", "C", "D", "F", "G", "H", "J", "K", "L", "M",
    "N", "Ñ", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z",
  ];

  // Subcategorías ya cubiertas (letras ya creadas)
  const covered = new Set(
    window.LEERKIDS_LESSONS
      .filter((l) => l.category === "Sílabas" && l.kind === "choice-sound")
      .map((l) => (l.subcategory || "").toUpperCase())
  );

  // Ñ (especial)
  if (!covered.has("Ñ")) {
    pushUnique({
      id: "SILABAS_ENYE",
      title: "Sílabas con Ñ",
      kind: "choice-sound",
      prompt: "¿Cuál sílaba escuchas?",
      pool: ["ÑA", "ÑE", "ÑI", "ÑO", "ÑU"],
      items: ["ÑA", "ÑE", "ÑI", "ÑO", "ÑU", "ÑA", "ÑI"],
      speakText: "lower",
      category: "Sílabas",
      subcategory: "Ñ",
    });
    covered.add("Ñ");
  }

  // Q (especial)
  if (!covered.has("Q")) {
    pushUnique({
      id: "SILABAS_Q",
      title: "Sílabas con Q (que/qui)",
      kind: "choice-sound",
      prompt: "¿Cuál sílaba escuchas?",
      pool: ["QUE", "QUI", "QUA", "QUO", "QÜE"], // variantes para opciones
      items: ["QUE", "QUI", "QUE", "QUI", "QUO"],
      speakText: "lower",
      category: "Sílabas",
      subcategory: "Q",
    });
    covered.add("Q");
  }

  // Resto por patrón CV si no están cubiertas (evita duplicados)
  TARGET.forEach((L) => {
    if (!covered.has(L) && L !== "C" && L !== "Q" && L !== "Ñ") {
      pushUnique(genSilabas(L, L));
      covered.add(L);
    }
  });
})();

// =====================================================
// 5) BORICUAS EXTRA, FRASES EXTRA
// =====================================================
pushUnique({
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
    { w: "CHINCHORRO", emoji: "🚌" }, // simbólico
  ],
  items: ["ALCAPURRIA", "PASTELILLO", "PAVERA", "MALANGA", "PANA", "CHINCHORRO"],
  speakText: "lower",
  category: "Boricuas",
});

pushUnique({
  id: "FRASES_2",
  title: "Frases cortas 2",
  kind: "build-phrase",
  prompt: "Ordena las palabras (puedes corregir tocando)",
  pool: [
    { phrase: "Ana lee", parts: ["Ana", "lee"] },
    { phrase: "Leo la A", parts: ["Leo", "la", "A"] },
    { phrase: "Papá lee", parts: ["Papá", "lee"] },
    { phrase: "Mamá ama a Ana", parts: ["Mamá", "ama", "a", "Ana"] },
  ],
  items: [0, 1, 2, 3],
  speakText: "lower",
  category: "Frases",
});

// =====================================================
// 6) GLOBOS: SÍLABAS (goal=5) — pool único generado y SIN repetidos
//     (Conserva GLOBOS_2 como un juego "mixto" grande)
// =====================================================
(function addBalloonSyllablesGame() {
  // Recolecta todas las sílabas de lecciones de categoría "Sílabas"
  const allSyl = [];
  for (const ls of window.LEERKIDS_LESSONS) {
    if (ls.category === "Sílabas" && ls.kind === "choice-sound" && Array.isArray(ls.pool)) {
      for (const s of ls.pool) {
        if (typeof s === "string" && s.length >= 1 && s.length <= 4) {
          allSyl.push(s.toUpperCase());
        }
      }
    }
  }
  const SYL_POOL = uniq(allSyl).sort((a, b) => a.localeCompare(b, "es"));
  if (SYL_POOL.length === 0) return;

  const ITEMS = SYL_POOL.slice(0, 20); // Objetivos seleccionados (ajustable)
  const newGlobos2 = {
    id: "GLOBOS_2",
    title: "Globos: atrapa la sílaba",
    kind: "balloon-hunt",
    prompt: "Toca todos los globos con la sílaba",
    pool: SYL_POOL,
    items: ITEMS,
    goal: 5, // <--- bajado a 5
    speakText: "x",
    category: "Globos",
    subcategory: "Sílabas",
  };

  // Reemplaza si ya existía GLOBOS_2 para "limpiar repetidos"
  const i = window.LEERKIDS_LESSONS.findIndex((l) => l.id === "GLOBOS_2");
  if (i >= 0) {
    window.LEERKIDS_LESSONS[i] = newGlobos2;
  } else {
    window.LEERKIDS_LESSONS.push(newGlobos2);
  }
})();

// =====================================================
// 7) Globos de LETRAS en grupos de 5 (A–Z con Ñ)
// =====================================================
(function addBalloonLetterGroups() {
  const LETTERS = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"
  ];
  const groups = chunk(LETTERS, 5);
  groups.forEach((group, idx) => {
    const from = group[0], to = group[group.length - 1];
    pushUnique({
      id: `GLOBOS_LET_G${idx + 1}`,
      title: `Globos: letras (${idx + 1}/${groups.length}) ${from}–${to}`,
      kind: "balloon-hunt",
      prompt: "Toca todos los globos con la letra",
      pool: LETTERS.slice(),   // distracciones de todas las letras
      items: group.slice(),    // objetivos de este juego (5)
      goal: 5,
      speakText: "x",
      category: "Globos",
      subcategory: "Letras",
    });
  });
})();

// =====================================================
// 8) Globos de SÍLABAS en grupos de 5 (desde pool recopilado)
// =====================================================
(function addBalloonSyllableGroups() {
  // Reutilizamos el pool a partir de las lecciones de Sílabas
  const allSyl = [];
  for (const ls of window.LEERKIDS_LESSONS) {
    if (ls.category === "Sílabas" && ls.kind === "choice-sound" && Array.isArray(ls.pool)) {
      for (const s of ls.pool) {
        if (typeof s === "string" && s.length >= 1 && s.length <= 4) {
          allSyl.push(s.toUpperCase());
        }
      }
    }
  }
  const SYL_POOL = uniq(allSyl).sort((a, b) => a.localeCompare(b, "es"));
  if (SYL_POOL.length === 0) return;

  const groups = chunk(SYL_POOL, 5);
  groups.forEach((group, idx) => {
    const label = `${group[0]}–${group[group.length - 1]}`;
    pushUnique({
      id: `GLOBOS_SIL_G${idx + 1}`,
      title: `Globos: sílabas (${idx + 1}/${groups.length}) ${label}`,
      kind: "balloon-hunt",
      prompt: "Toca todos los globos con la sílaba",
      pool: SYL_POOL.slice(),  // distracciones de todas las sílabas
      items: group.slice(),    // objetivos de este juego (5)
      goal: 5,
      speakText: "x",
      category: "Globos",
      subcategory: "Sílabas",
    });
  });
})();

// =====================================================
// 9) NUEVO — Pareo mayúsculas ↔ minúsculas (2 juegos)
//     (usa picture-pick para no tocar el index/app)
// =====================================================

// Helpers de letras (orden español con Ñ)
function _lettersES() {
  return ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
}

// a) Minúscula → MAYÚSCULA (muestra la minúscula; eligen la mayúscula)
function genCasePool() {
  // emoji = minúscula grande que se muestra arriba; w = opción correcta (MAYÚSCULA)
  return _lettersES().map(L => ({ w: L, emoji: L.toLowerCase() }));
}
function genCaseItems() {
  return _lettersES().slice();
}
pushUnique({
  id: "PAREO_MAYUS_MINUS",
  title: "Pareo: minúscula → MAYÚSCULA",
  kind: "picture-pick",
  prompt: "Elige la MAYÚSCULA que corresponde",
  pool: genCasePool(),
  items: genCaseItems(),
  speakText: "lower",
  category: "Letras",
  subcategory: "Pareo"
});

// b) MAYÚSCULA → minúscula (muestra la MAYÚSCULA; eligen la minúscula)
function genCasePoolInverse() {
  return _lettersES().map(L => ({ w: L.toLowerCase(), emoji: L }));
}
function genCaseItemsLower() {
  return _lettersES().map(L => L.toLowerCase());
}
pushUnique({
  id: "PAREO_MAYUS_A_MINUS",
  title: "Pareo: MAYÚSCULA → minúscula",
  kind: "picture-pick",
  prompt: "Elige la minúscula que corresponde",
  pool: genCasePoolInverse(),
  items: genCaseItemsLower(),
  speakText: "lower",
  category: "Letras",
  subcategory: "Pareo"
});
