function players_num() {
  document.querySelector("#players_num").value = `${team.length} joueur(s)`;
}

function toggle_add() {
  form_ajouter.reset();
  ajouter.classList.toggle("hidden");
}

function open_modify() {
  modifier.classList.remove("hidden");
}

function close_modify() {
  modifier.classList.add("hidden");
}

function open_supprimer() {
  supprimer.classList.remove("hidden");
}

function close_supprimer() {
  supprimer.classList.add("hidden");
}