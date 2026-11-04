export function players_num() {
  document.querySelector("#players_num").value = `${team.length} joueur(s)`;
}

export function add_players_to_main(player) {
  const clone = document
    .querySelector("#players_template")
    .content.cloneNode(true);
  clone.querySelector(".player").dataset.id = player.id;
  clone.querySelector(".player_num").textContent = Number(player.numero);
  clone.querySelector(".player_name").textContent = player.name;
  clone.querySelector(".player_post").textContent = player.position;
  clone.querySelector(".player_age").textContent = `Age : ${player.age} ans`;
  clone.querySelector(".player_statut").textContent = player.statut;
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
  form_ajouter.reset();
  ajouter.classList.toggle("hidden");
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
