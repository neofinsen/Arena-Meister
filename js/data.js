const STORAGE_KEY = "arenaMasterSaveV1";

const titleByArenaLevel = [
  "Jung-Arenaleiter",
  "Dorfmeister",
  "Arena-Profi",
  "Champion-Leiter",
  "Meister der Kreaturen",
  "Legendaerer Arenaleiter"
];

const defaultPlayer = {
  name: "Arenaleiter",
  level: 1,
  title: "Jung-Arenaleiter",
  gold: 100,
  reputation: 0,
  trainingPoints: 10,
  arenaLevel: 1,
  wins: 0,
  losses: 0
};

const defaultPets = [
  { id: 1, name: "Flaemmchen", rarity: "Gewoehnlich", type: "Feuer", level: 1, xp: 0, hp: 30, attack: 8, defense: 4, speed: 6, bond: 0, icon: "🔥" },
  { id: 2, name: "Plitsch", rarity: "Gewoehnlich", type: "Wasser", level: 1, xp: 0, hp: 34, attack: 6, defense: 6, speed: 5, bond: 0, icon: "💧" },
  { id: 3, name: "Moosling", rarity: "Selten", type: "Natur", level: 1, xp: 0, hp: 38, attack: 7, defense: 7, speed: 4, bond: 0, icon: "🌿" },
  { id: 4, name: "Kiesel", rarity: "Gewoehnlich", type: "Erde", level: 1, xp: 0, hp: 42, attack: 7, defense: 9, speed: 3, bond: 0, icon: "🪨" },
  { id: 5, name: "Wirbel", rarity: "Selten", type: "Luft", level: 1, xp: 0, hp: 28, attack: 9, defense: 4, speed: 10, bond: 0, icon: "🌪️" },
  { id: 6, name: "Nachtpfote", rarity: "Episch", type: "Schatten", level: 1, xp: 0, hp: 32, attack: 11, defense: 5, speed: 8, bond: 0, icon: "🌑" },
  { id: 7, name: "Glitzer", rarity: "Episch", type: "Licht", level: 1, xp: 0, hp: 35, attack: 10, defense: 6, speed: 7, bond: 0, icon: "✨" },
  { id: 8, name: "Azurdrache", rarity: "Legendaer", type: "Wasser", level: 1, xp: 0, hp: 45, attack: 12, defense: 8, speed: 7, bond: 0, icon: "🐉" }
];

const npcs = [
  {
    id: 1,
    name: "Reisender Tom",
    title: "Anfaenger-Trainer",
    difficulty: 1,
    pets: [
      { name: "Staubmaus", hp: 20, attack: 5, defense: 3, speed: 4, icon: "🐾" }
    ]
  },
  {
    id: 2,
    name: "Waldhueterin Mira",
    title: "Freundin des Hains",
    difficulty: 2,
    pets: [
      { name: "Blattfuchs", hp: 28, attack: 7, defense: 5, speed: 6, icon: "🌿" },
      { name: "Taukaefer", hp: 24, attack: 5, defense: 6, speed: 5, icon: "💧" }
    ]
  },
  {
    id: 3,
    name: "Steinbrecher Borg",
    title: "Felsenfaust",
    difficulty: 3,
    pets: [
      { name: "Granitknirps", hp: 36, attack: 8, defense: 10, speed: 3, icon: "🪨" },
      { name: "Funkenmolch", hp: 27, attack: 9, defense: 4, speed: 6, icon: "🔥" }
    ]
  },
  {
    id: 4,
    name: "Schattenkind Nyx",
    title: "Nachtfluestern",
    difficulty: 4,
    pets: [
      { name: "Mondkriecher", hp: 34, attack: 11, defense: 6, speed: 8, icon: "🌑" },
      { name: "Nebelschwinge", hp: 29, attack: 9, defense: 5, speed: 10, icon: "🌪️" }
    ]
  },
  {
    id: 5,
    name: "Elite-Trainer Kael",
    title: "Arena-Stratege",
    difficulty: 5,
    pets: [
      { name: "Sonnenklaue", hp: 40, attack: 12, defense: 8, speed: 8, icon: "✨" },
      { name: "Lavaherz", hp: 38, attack: 13, defense: 6, speed: 7, icon: "🔥" },
      { name: "Sturmfeder", hp: 32, attack: 11, defense: 6, speed: 12, icon: "🌪️" }
    ]
  },
  {
    id: 6,
    name: "Arena-Prueferin Elara",
    title: "Meisterpruefung",
    difficulty: 6,
    pets: [
      { name: "Lichtdrache", hp: 52, attack: 15, defense: 10, speed: 9, icon: "✨" },
      { name: "Tiefenschild", hp: 48, attack: 11, defense: 13, speed: 5, icon: "💧" },
      { name: "Nachtkrone", hp: 44, attack: 14, defense: 9, speed: 10, icon: "🌑" }
    ]
  }
];

const specialNpc = {
  id: 99,
  name: "Sir Aureon",
  title: "Besonderer Herausforderer",
  difficulty: 7,
  pets: [
    { name: "Kronenfunke", hp: 58, attack: 16, defense: 11, speed: 10, icon: "✨" },
    { name: "Rubinmähne", hp: 50, attack: 17, defense: 9, speed: 11, icon: "🔥" },
    { name: "Eidwächter", hp: 54, attack: 13, defense: 14, speed: 7, icon: "🛡️" }
  ]
};

function cloneDefaultState() {
  return {
    player: structuredClone(defaultPlayer),
    pets: structuredClone(defaultPets),
    activeTeam: [],
    npcIndex: 0,
    normalWinsSinceSpecial: 0,
    specialReady: false,
    pendingIdleReward: { gold: 0, trainingPoints: 0 },
    lastPlayedAt: Date.now(),
    log: ["Willkommen in deiner Arena! Stelle dein Team zusammen und starte den ersten Kampf."]
  };
}
