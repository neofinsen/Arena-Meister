function getArenaTitle(level) {
  return titleByArenaLevel[Math.min(level - 1, titleByArenaLevel.length - 1)];
}

function getUpgradeCost(state) {
  return state.player.arenaLevel * 150;
}

function upgradeArena(state) {
  const cost = getUpgradeCost(state);
  if (state.player.gold < cost) {
    return { ok: false, message: `Nicht genug Gold. Der Ausbau kostet ${cost} Gold.` };
  }

  state.player.gold -= cost;
  state.player.arenaLevel += 1;
  state.player.title = getArenaTitle(state.player.arenaLevel);
  state.player.level = Math.max(state.player.level, state.player.arenaLevel);

  return {
    ok: true,
    message: `Arena auf Level ${state.player.arenaLevel} ausgebaut. Neuer Titel: ${state.player.title}.`
  };
}

function rewardMultiplier(state) {
  return 1 + (state.player.arenaLevel - 1) * 0.18;
}
