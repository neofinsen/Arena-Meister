function getActiveTeam(state) {
  const selected = state.activeTeam
    .map((id) => state.pets.find((pet) => pet.id === id))
    .filter(Boolean);

  if (selected.length > 0) {
    return selected;
  }

  return state.pets.slice(0, 3);
}

function petPower(pet, includeBond = true) {
  return pet.hp + pet.attack + pet.defense + pet.speed + (includeBond ? pet.bond : 0);
}

function trainPet(state, petId) {
  const pet = state.pets.find((entry) => entry.id === petId);
  if (!pet) {
    return { ok: false, message: "Dieses Pet wurde nicht gefunden." };
  }

  if (state.player.trainingPoints < 2) {
    return { ok: false, message: "Nicht genug Trainingspunkte. Du brauchst 2 Punkte pro Training." };
  }

  state.player.trainingPoints -= 2;
  pet.attack += 1;
  pet.defense += 1;
  pet.hp += 2;
  pet.bond += 1;
  pet.xp += 5;

  const messages = [`${pet.name} trainiert: +1 Angriff, +1 Verteidigung, +2 HP, +1 Bindung, +5 XP.`];
  let xpNeeded = pet.level * 20;
  while (pet.xp >= xpNeeded) {
    pet.xp -= xpNeeded;
    pet.level += 1;
    pet.hp += 5;
    pet.attack += 2;
    pet.defense += 1;
    pet.speed += 1;
    messages.push(`${pet.name} steigt auf Level ${pet.level}!`);
    xpNeeded = pet.level * 20;
  }

  return { ok: true, message: messages.join(" ") };
}

function addPetToTeam(state, petId) {
  const pet = state.pets.find((entry) => entry.id === petId);
  if (!pet) {
    return { ok: false, message: "Dieses Pet wurde nicht gefunden." };
  }

  if (state.activeTeam.includes(petId)) {
    state.activeTeam = state.activeTeam.filter((id) => id !== petId);
    return { ok: true, message: `${pet.name} ruht sich jetzt aus.` };
  }

  if (state.activeTeam.length >= 3) {
    return { ok: false, message: "Dein Team ist voll. Es koennen maximal 3 Pets antreten." };
  }

  state.activeTeam.push(petId);
  return { ok: true, message: `${pet.name} ist jetzt im Arena-Team.` };
}

function awardTeamXp(state, amount) {
  const messages = [];
  getActiveTeam(state).forEach((pet) => {
    pet.xp += amount;
    let xpNeeded = pet.level * 20;
    while (pet.xp >= xpNeeded) {
      pet.xp -= xpNeeded;
      pet.level += 1;
      pet.hp += 5;
      pet.attack += 2;
      pet.defense += 1;
      pet.speed += 1;
      messages.push(`${pet.name} erreicht Level ${pet.level}.`);
      xpNeeded = pet.level * 20;
    }
  });
  return messages;
}
