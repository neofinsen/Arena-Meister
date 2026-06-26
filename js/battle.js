function getCurrentNpc(state) {
  if (state.specialReady) {
    return specialNpc;
  }
  return npcs[state.npcIndex % npcs.length];
}

function teamPower(team, includeBond = true) {
  return team.reduce((sum, pet) => sum + petPower(pet, includeBond), 0);
}

function randomizePower(power) {
  const factor = 0.85 + Math.random() * 0.3;
  return Math.round(power * factor);
}

function runBattle(state, options = {}) {
  const npc = getCurrentNpc(state);
  const playerTeam = getActiveTeam(state);
  const npcTeam = npc.pets;
  const activeBonus = options.activeIntervention ? 1.2 : 1;
  const rawPlayerPower = Math.round(teamPower(playerTeam, true) * activeBonus);
  const rawNpcPower = teamPower(npcTeam, false) + npc.difficulty * 8;
  const finalPlayerPower = randomizePower(rawPlayerPower);
  const finalNpcPower = randomizePower(rawNpcPower);
  const won = finalPlayerPower >= finalNpcPower;
  const isSpecial = state.specialReady;
  const multiplier = rewardMultiplier(state);

  const lines = [
    `${npc.name} (${npc.title}) fordert dich heraus.`,
    `Teamstaerke: ${finalPlayerPower} gegen NPC-Staerke: ${finalNpcPower}.`
  ];

  if (options.activeIntervention) {
    lines.splice(1, 0, "Du hast im richtigen Moment eingegriffen und dein Team motiviert.");
  }

  if (won) {
    const gold = Math.round((45 + npc.difficulty * 18 + (isSpecial ? 90 : 0)) * multiplier);
    const reputation = 8 + npc.difficulty * 3 + (isSpecial ? 18 : 0);
    const xp = 8 + npc.difficulty * 2 + (isSpecial ? 8 : 0);
    state.player.gold += gold;
    state.player.reputation += reputation;
    state.player.wins += 1;
    const levelUps = awardTeamXp(state, xp);

    if (isSpecial) {
      state.specialReady = false;
      state.normalWinsSinceSpecial = 0;
      lines.push(`Sieg im besonderen Kampf! Belohnung: ${gold} Gold, ${reputation} Ruf, ${xp} XP fuer Team-Pets.`);
    } else {
      state.normalWinsSinceSpecial += 1;
      state.npcIndex = (state.npcIndex + 1) % npcs.length;
      lines.push(`Sieg! Belohnung: ${gold} Gold, ${reputation} Ruf, ${xp} XP fuer Team-Pets.`);
      if (state.normalWinsSinceSpecial >= 5) {
        state.specialReady = true;
        lines.push("Ein besonderer Herausforderer wartet nun vor den Toren.");
      }
    }

    lines.push(...levelUps);
  } else {
    const gold = Math.round((18 + npc.difficulty * 5) * multiplier);
    state.player.gold += gold;
    state.player.losses += 1;
    lines.push(`Niederlage. Trostbelohnung: ${gold} Gold. Trainiere dein Team und versuche es erneut.`);

    if (isSpecial) {
      state.specialReady = false;
      state.normalWinsSinceSpecial = 0;
      lines.push("Der besondere Herausforderer zieht weiter. Nach 5 neuen Siegen kommt die naechste Chance.");
    }
  }

  return {
    won,
    npc,
    finalPlayerPower,
    finalNpcPower,
    message: lines.join(" ")
  };
}
