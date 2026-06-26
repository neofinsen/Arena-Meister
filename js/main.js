let state = loadGame();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  playerName: $("#playerName"),
  playerLevel: $("#playerLevel"),
  gold: $("#gold"),
  reputation: $("#reputation"),
  trainingPoints: $("#trainingPoints"),
  arenaTitle: $("#arenaTitle"),
  arenaLevel: $("#arenaLevel"),
  arenaStage: $("#arenaStage"),
  arenaCrest: $("#arenaCrest"),
  wins: $("#wins"),
  losses: $("#losses"),
  bossProgress: $("#bossProgress"),
  teamList: $("#teamList"),
  currentNpc: $("#currentNpc"),
  battleNpc: $("#battleNpc"),
  petGrid: $("#petGrid"),
  trainingGrid: $("#trainingGrid"),
  eventLog: $("#eventLog"),
  battleLog: $("#battleLog"),
  specialNotice: $("#specialNotice"),
  upgradeTitle: $("#upgradeTitle"),
  upgradeArenaLevel: $("#upgradeArenaLevel"),
  upgradeCost: $("#upgradeCost"),
  upgradePreview: $("#upgradePreview"),
  toast: $("#toast")
};

function loadGame() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return cloneDefaultState();
    }

    const parsed = JSON.parse(saved);
    return {
      ...cloneDefaultState(),
      ...parsed,
      player: { ...defaultPlayer, ...parsed.player },
      pets: parsed.pets?.length ? parsed.pets : structuredClone(defaultPets),
      pendingIdleReward: parsed.pendingIdleReward || { gold: 0, trainingPoints: 0 },
      log: parsed.log?.length ? parsed.log : []
    };
  } catch (error) {
    console.warn("Spielstand konnte nicht geladen werden.", error);
    return cloneDefaultState();
  }
}

function saveGame() {
  state.lastPlayedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function addLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 40);
  showToast(message);
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.add("hidden"), 3200);
}

function render() {
  const player = state.player;
  const npc = getCurrentNpc(state);
  const team = getActiveTeam(state);
  const upgradeCost = getUpgradeCost(state);
  const nextSpecial = Math.max(0, 5 - state.normalWinsSinceSpecial);

  els.playerName.textContent = player.name;
  els.playerLevel.textContent = player.level;
  els.gold.textContent = player.gold;
  els.reputation.textContent = player.reputation;
  els.trainingPoints.textContent = player.trainingPoints;
  els.arenaTitle.textContent = player.title;
  els.arenaLevel.textContent = player.arenaLevel;
  els.wins.textContent = player.wins;
  els.losses.textContent = player.losses;
  els.bossProgress.textContent = state.specialReady ? "bereit" : `${nextSpecial} Siege`;
  els.specialNotice.classList.toggle("hidden", !state.specialReady);

  els.arenaStage.dataset.level = Math.min(player.arenaLevel, 6);
  els.arenaCrest.textContent = player.arenaLevel >= 5 ? "🏆" : player.arenaLevel >= 3 ? "🏛️" : "🏟️";

  els.teamList.innerHTML = team.map(renderTeamPet).join("");
  els.currentNpc.innerHTML = renderNpc(npc);
  els.battleNpc.innerHTML = renderNpc(npc);

  const petCards = state.pets.map(renderPetCard).join("");
  els.petGrid.innerHTML = petCards;
  els.trainingGrid.innerHTML = state.pets.map((pet) => renderPetCard(pet, true)).join("");

  els.upgradeTitle.textContent = player.title;
  els.upgradeArenaLevel.textContent = player.arenaLevel;
  els.upgradeCost.textContent = upgradeCost;
  els.upgradePreview.textContent = player.arenaLevel >= 5 ? "🏆" : player.arenaLevel >= 3 ? "🏛️" : "🏟️";

  const logMarkup = state.log.map((item) => `<p>${escapeHtml(item)}</p>`).join("");
  els.eventLog.innerHTML = logMarkup || "<p>Noch keine Ereignisse.</p>";
  els.battleLog.innerHTML = state.log
    .filter((item) => item.includes("fordert") || item.includes("Sieg") || item.includes("Niederlage"))
    .slice(0, 12)
    .map((item) => `<p>${escapeHtml(item)}</p>`)
    .join("") || "<p>Noch kein Kampf gestartet.</p>";

  $$(".team-toggle").forEach((button) => {
    const id = Number(button.dataset.petId);
    button.textContent = state.activeTeam.includes(id) ? "Aus Team" : "Ins Team";
  });
}

function renderTeamPet(pet) {
  return `
    <div class="team-pet">
      <span class="pet-icon">${pet.icon}</span>
      <div>
        <strong>${escapeHtml(pet.name)}</strong>
        <small>${escapeHtml(pet.type)} · Lv. ${pet.level} · Kraft ${petPower(pet)}</small>
      </div>
    </div>
  `;
}

function renderNpc(npc) {
  return `
    <div class="npc-card">
      <div>
        <strong>${escapeHtml(npc.name)}</strong>
        <small>${escapeHtml(npc.title)} · Schwierigkeit ${npc.difficulty}</small>
      </div>
      <div class="npc-pets">
        ${npc.pets.map((pet) => `<span title="${escapeHtml(pet.name)}">${pet.icon}</span>`).join("")}
      </div>
    </div>
  `;
}

function renderPetCard(pet, trainingOnly = false) {
  const xpNeeded = pet.level * 20;
  const selected = state.activeTeam.includes(pet.id);
  return `
    <article class="pet-card ${selected ? "selected" : ""}">
      <div class="pet-card-head">
        <span class="pet-avatar">${pet.icon}</span>
        <div>
          <h3>${escapeHtml(pet.name)}</h3>
          <p>${escapeHtml(pet.type)} · ${escapeHtml(pet.rarity)}</p>
        </div>
      </div>
      <div class="stats">
        <span>Lv ${pet.level}</span>
        <span>HP ${pet.hp}</span>
        <span>ATK ${pet.attack}</span>
        <span>DEF ${pet.defense}</span>
        <span>SPD ${pet.speed}</span>
        <span>Bindung ${pet.bond}</span>
      </div>
      <div class="xp-bar" aria-label="Erfahrung">
        <span style="width: ${Math.min(100, (pet.xp / xpNeeded) * 100)}%"></span>
      </div>
      <small>${pet.xp}/${xpNeeded} XP</small>
      <div class="button-row">
        <button data-pet-id="${pet.id}" class="train-btn">Trainieren</button>
        ${trainingOnly ? "" : `<button data-pet-id="${pet.id}" class="team-toggle">${selected ? "Aus Team" : "Ins Team"}</button>`}
      </div>
    </article>
  `;
}

function startBattle(options = {}) {
  if (state.specialReady && !options.confirmedSpecial) {
    showToast("Waehle Auto-Kampf oder Aktiv eingreifen fuer den besonderen Kampf.");
    return;
  }

  const result = runBattle(state, options);
  addLog(result.message);
  saveGame();
  render();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindEvents() {
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((entry) => entry.classList.remove("is-active"));
      $$(".view").forEach((view) => view.classList.remove("is-active"));
      tab.classList.add("is-active");
      $(`#${tab.dataset.tab}View`).classList.add("is-active");
    });
  });

  document.body.addEventListener("click", (event) => {
    const trainButton = event.target.closest(".train-btn");
    const teamButton = event.target.closest(".team-toggle");

    if (trainButton) {
      const result = trainPet(state, Number(trainButton.dataset.petId));
      addLog(result.message);
      saveGame();
      render();
    }

    if (teamButton) {
      const result = addPetToTeam(state, Number(teamButton.dataset.petId));
      addLog(result.message);
      saveGame();
      render();
    }
  });

  $("#startBattleBtn").addEventListener("click", () => startBattle());
  $("#battleViewStartBtn").addEventListener("click", () => startBattle());
  $("#specialAutoBtn").addEventListener("click", () => startBattle({ confirmedSpecial: true }));
  $("#specialActiveBtn").addEventListener("click", () => startBattle({ confirmedSpecial: true, activeIntervention: true }));

  $("#collectIdleBtn").addEventListener("click", () => {
    const result = collectIdleReward(state);
    addLog(result.message);
    saveGame();
    render();
  });

  $("#upgradeArenaBtn").addEventListener("click", () => {
    const result = upgradeArena(state);
    addLog(result.message);
    saveGame();
    render();
  });

  $("#resetGameBtn").addEventListener("click", () => {
    if (confirm("Spielstand wirklich zuruecksetzen?")) {
      localStorage.removeItem(STORAGE_KEY);
      state = cloneDefaultState();
      addLog("Spielstand wurde zurueckgesetzt.");
      saveGame();
      render();
    }
  });

  window.addEventListener("beforeunload", saveGame);
}

bindEvents();
const idleMessage = applyStartupIdleReward(state);
addLog(idleMessage);
saveGame();
render();
