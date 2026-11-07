import { team } from "./data.js";
import {
  players_num,
  add_players_to_main,
  toggle_add,
  open_modify,
  close_modify,
  open_supprimer,
  close_supprimer,
  afficher_avec_filter,
} from "./joueurs.js";

//let team = JSON.parse(localStorage.getItem(data.team)) || [];

const players_container = document.querySelector("#players_container");
const players_template = document.querySelector("#players_template");
const players = document.querySelectorAll(".player");

const ajouter_btn = document.querySelector("#ajouter_btn");
const quit_add = document.querySelectorAll(".quit_add");
const form_ajouter = document.querySelector("#form_ajouter");

const quit_modify = document.querySelectorAll(".quit_modify");
const form_modifier = document.querySelector("#form_modifier");

const quit_supprimer = document.querySelectorAll(".quit_supprimer");
const form_supprimer = document.querySelector("#form_supprimer");

const etat = { players_search: "", positions: "Tous", page: 1 };
const players_search = document.querySelector("#players_search");
const all_players = document.querySelector("#all_players");
const gb_players = document.querySelector("#gb_players");
const def_players = document.querySelector("#def_players");
const mil_players = document.querySelector("#mil_players");
const att_players = document.querySelector("#att_players");

let player_to;
let player_id = 0;
let player_position;
let id = 0;

if (team.length >= 1) {
  id = team[team.length - 1].id + 1;
} else {
  id = 0;
}

players_num(team);

// team.forEach((player) => {
//   add_players_to_main(player);
// });
afficher_avec_filter(team, etat);

players_search.addEventListener("input", (event) => {
  etat.players_search = event.target.value;
  etat.page = 1;
  afficher_avec_filter(team, etat);
});

all_players.addEventListener("click", () => {
  etat.positions = all_players.innerText;
  all_players.classList.add("bg-emerald-800", "rounded-md", "p-2");
  gb_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  def_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  mil_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  att_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  etat.page = 1;
  afficher_avec_filter(team, etat);
});

gb_players.addEventListener("click", () => {
  etat.positions = gb_players.innerText;
  all_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  gb_players.classList.add("bg-emerald-800", "rounded-md", "p-2");
  def_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  mil_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  att_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  etat.page = 1;
  afficher_avec_filter(team, etat);
});

def_players.addEventListener("click", () => {
  etat.positions = def_players.innerText;
  all_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  gb_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  def_players.classList.add("bg-emerald-800", "rounded-md", "p-2");
  mil_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  att_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  etat.page = 1;
  afficher_avec_filter(team, etat);
});

mil_players.addEventListener("click", () => {
  etat.positions = mil_players.innerText;
  all_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  gb_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  def_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  mil_players.classList.add("bg-emerald-800", "rounded-md", "p-2");
  att_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  etat.page = 1;
  afficher_avec_filter(team, etat);
});

att_players.addEventListener("click", () => {
  etat.positions = att_players.innerText;
  all_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  gb_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  def_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  mil_players.classList.remove("bg-emerald-800", "rounded-md", "p-2");
  att_players.classList.add("bg-emerald-800", "rounded-md", "p-2");
  etat.page = 1;
  afficher_avec_filter(team, etat);
});

form_ajouter.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form_ajouter));
  let found = false;
  for (const player of team) {
    if (Number(data.number) === player.number) {
      found = true;
      break;
    }
  }
  if (found) {
    document.querySelector("#num_taken_add").classList.remove("hidden");
  } else {
    found = false;
    document.querySelector("#num_taken_add").classList.add("hidden");
    const new_player = {
      id: id++,
      name: data.name,
      number: Number(data.number),
      age: Number(data.age),
      statut: data.statut,
      capitaine: false,
      position: data.position,
      right_now: "",
    };
    team.push(new_player);
    //localStorage.setItem("team", JSON.stringify(team));
    players_num(team);
    afficher_avec_filter(team, etat);
    toggle_add();
  }
});

ajouter_btn.addEventListener("click", toggle_add);
quit_add.forEach((btn) => {
  btn.addEventListener("click", toggle_add);
});

players_container.addEventListener("click", (event) => {
  if (event.target.closest(".captain_btn")) {
    player_to = event.target.closest(".player");
    player_id = Number(player_to.dataset.id);
    team.forEach((player) => {
      player.capitaine = player.id === player_id;
    });

    players_container.querySelectorAll(".player").forEach((player) => {
      const is_captain = Number(player.dataset.id) === player_id;
      player.classList.toggle("captain", is_captain);
      player
        .querySelector(".captain_badge")
        .classList.toggle("hidden", !is_captain);
    });
  }

  if (event.target.closest(".modifier_btn")) {
    player_to = event.target.closest(".player");
    player_id = Number(player_to.dataset.id);
    open_modify();
    for (let i = 0; i < team.length; i++) {
      if (team[i].id === player_id) {
        form_modifier.elements.name.value = team[i].name;
        form_modifier.elements.position.value = team[i].position;
        form_modifier.elements.number.value = team[i].number;
        form_modifier.elements.age.value = team[i].age;
        form_modifier.elements.statut.value = team[i].statut;
        break;
      }
    }
  }

  if (event.target.closest(".supprimer_btn")) {
    player_to = event.target.closest(".player");
    player_id = Number(player_to.dataset.id);
    open_supprimer();
  }
});

form_modifier.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form_modifier));
  let found = false;
  for (const player of team) {
    if (Number(data.number) === player.number && player.id !== player_id) {
      found = true;
      break;
    }
  }
  if (found) {
    document.querySelector("#num_taken_modify").classList.remove("hidden");
  } else {
    document.querySelector("#num_taken_modify").classList.add("hidden");
    for (let i = 0; i < team.length; i++) {
      if (team[i].id === player_id) {
        team[i].name = data.name;
        team[i].position = data.position;
        team[i].number = Number(data.number);
        team[i].age = Number(data.age);
        team[i].statut = data.statut;
        //localStorage.setItem("team", JSON.stringify(team));
        if (team[i].right_now != "") {
          clean_field(team[i]);
        }
        break;
      }
    }
    // players_container
    //   .querySelectorAll(".player")
    //   .forEach((player) => player.remove());
    // team.forEach((player) => add_players_to_main(player));
    afficher_avec_filter(team, etat);
    player_id = 0;
    close_modify();
  }
});

quit_modify.forEach((btn) => {
  btn.addEventListener("click", close_modify);
});

form_supprimer.addEventListener("submit", (event) => {
  event.preventDefault();
  for (let i = 0; i < team.length; i++) {
    if (team[i].id === player_id) {
      team.splice(i, 1);
      //localStorage.setItem("team", JSON.stringify(team));
      break;
    }
  }
  players_num(team);
  player_to.remove();
  player_id = 0;
  close_supprimer();
});

quit_supprimer.forEach((btn) => {
  btn.addEventListener("click", close_supprimer);
});

document.querySelector("#prec").addEventListener("click", () => {
  etat.page--;
  afficher_avec_filter(team, etat);
});

document.querySelector("#suiv").addEventListener("click", () => {
  etat.page++;
  afficher_avec_filter(team, etat);
});
