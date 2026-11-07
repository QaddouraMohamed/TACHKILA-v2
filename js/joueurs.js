const modifier = document.querySelector("#modifier");
const supprimer = document.querySelector("#supprimer");

export function players_num(team) {
  document.querySelector("#players_num").textContent = team.length;
}

export function add_players_to_main(player) {
  const clone = document
    .querySelector("#players_template")
    .content.cloneNode(true);
  clone.querySelector(".player").dataset.id = player.id;
  clone.querySelector(".player_num").textContent = Number(player.number);
  clone.querySelector(".player_name").textContent = player.name;
  clone.querySelector(".player_post").textContent = player.position;
  clone.querySelector(".player_age").textContent = `Age : ${player.age} ans`;
  clone.querySelector(".player_statut").textContent = player.statut;
  if (player.capitaine) {
    clone.querySelector(".player").classList.add("captain");
    clone
      .querySelector(".player")
      .querySelector(".captain_badge")
      .classList.remove("hidden");
  }
  if (player.statut === "En forme") {
    clone.querySelector(".player_statut").classList.add("bg-emerald-800");
  } else {
    clone.querySelector(".player_statut").classList.add("bg-red-800");
  }
  //clone.querySelector(".player_capitaine").textContent = player.capitaine;

  // const posts = clone.querySelector(".posts");
  // if (player.position === "Gardien") {
  //   posts.innerHTML += `
  //   <option value="GB" class="gb">GB-Gardien</option>
  //   `;
  // } else if (player.position === "Defenseur") {
  //   posts.innerHTML += `
  //     <option value="DG" class="dg">DG-Defenseur gauche</option>
  //     <option value="DC_1" class="dc_1">DC - Défenseur central 1</option>
  //     <option value="DC_2" class="dc_2">DC - Défenseur central 2</option>
  //     <option value="DD" class="dd">DD - Défenseur droit</option>
  //   `;
  // } else if (player.position === "Milieu") {
  //   posts.innerHTML += `
  //     <option value="MG" class="mg">MG - Milieu gauche</option>
  //     <option value="MC_1" class="mc_1">MC - Milieu central 1</option>
  //     <option value="MC_2" class="mc_2">MC - Milieu central 2</option>
  //     <option value="MD" class="md">MD - Milieu droit</option>
  //   `;
  // } else if (player.position === "Attaquant") {
  //   posts.innerHTML += `
  //     <option value="BU_1" class="bu_1">BU - Buteur 1</option>
  //     <option value="BU_2" class="bu_2">BU - Buteur 2</option>
  //   `;
  // }
  document.querySelector("#players_container").append(clone);
}

export function toggle_add() {
  document.querySelector("#form_ajouter").reset();
  document.querySelector("#ajouter").classList.toggle("hidden");
}

export function open_modify() {
  modifier.classList.remove("hidden");
}

export function close_modify() {
  modifier.classList.add("hidden");
}

export function open_supprimer() {
  supprimer.classList.remove("hidden");
}

export function close_supprimer() {
  supprimer.classList.add("hidden");
}

function filter_players(team, etat) {
  return team.filter((player) => {
    return (
      player.name.toLowerCase().includes(etat.players_search.toLowerCase()) &&
      (etat.positions === "Tous" || etat.positions === player.position)
    );
  });
}

export function afficher_avec_filter(team, etat) {
  const filtred = filter_players(team, etat);
  const per_page = 8;
  const totalPages = Math.max(1, Math.ceil(filtred.length / per_page));
  const start = (etat.page - 1) * per_page;
  const players_to_show = filtred.slice(start, start + per_page);

  document
    .querySelector("#players_container")
    .querySelectorAll(".player")
    .forEach((player) => player.remove());
  players_to_show.forEach((player) => add_players_to_main(player));

  document
    .querySelector("#empty_msg")
    .classList.toggle("hidden", players_to_show.length > 0);

  if (start + per_page >= filtred.length || filtred.length <= 8) {
    document.querySelector("#pagination_container > p").innerText =
      `Affichage de ${filtred.length} sur ${filtred.length}`;
  } else {
    document.querySelector("#pagination_container > p").innerText =
      `Affichage de ${start + per_page} sur ${filtred.length}`;
  }

  document.querySelector("#info_page").innerText =
    `Page ${etat.page}/${totalPages}`;
  document.querySelector("#prec").disabled = etat.page <= 1;
  document.querySelector("#suiv").disabled = etat.page >= totalPages;
}
