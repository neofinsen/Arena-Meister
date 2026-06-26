function calculateOfflineReward(lastPlayedAt) {
  const now = Date.now();
  const elapsedMinutes = Math.floor((now - lastPlayedAt) / 60000);
  const rewardedMinutes = Math.max(0, Math.min(elapsedMinutes, 120));

  return {
    minutes: rewardedMinutes,
    gold: rewardedMinutes * 5,
    trainingPoints: rewardedMinutes
  };
}

function applyStartupIdleReward(state) {
  const reward = calculateOfflineReward(state.lastPlayedAt || Date.now());
  state.lastPlayedAt = Date.now();

  if (reward.minutes > 0) {
    state.pendingIdleReward.gold += reward.gold;
    state.pendingIdleReward.trainingPoints += reward.trainingPoints;
    return `Waehrend deiner Abwesenheit hast du ${reward.gold} Gold und ${reward.trainingPoints} Trainingspunkte erhalten.`;
  }

  return "Willkommen zurueck. Es gibt aktuell keine Offline-Belohnung.";
}

function collectIdleReward(state) {
  const reward = state.pendingIdleReward;
  if (!reward || (reward.gold <= 0 && reward.trainingPoints <= 0)) {
    return { ok: false, message: "Keine Idle-Belohnung verfuegbar." };
  }

  state.player.gold += reward.gold;
  state.player.trainingPoints += reward.trainingPoints;
  const message = `Idle-Belohnung eingesammelt: ${reward.gold} Gold und ${reward.trainingPoints} Trainingspunkte.`;
  state.pendingIdleReward = { gold: 0, trainingPoints: 0 };
  return { ok: true, message };
}
