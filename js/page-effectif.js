import { team } from "./data.js";
import {
  players_num,
  add_players_to_main,
  toggle_add,
  open_modify,
  close_modify,
  open_supprimer,
  close_supprimer,
} from "./joueurs.js";

//let team = JSON.parse(localStorage.getItem(data.team)) || [];

const players_container = document.querySelector("#players_container");
const players_template = document.querySelector("#players_template");

const ajouter_btn = document.querySelector("#ajouter_btn");
const quit_add = document.querySelectorAll(".quit_add");
const form_ajouter = document.querySelector("#form_ajouter");

const modifier = document.querySelector("#modifier");
const quit_modify = document.querySelectorAll(".quit_modify");
const form_modifier = document.querySelector("#form_modifier");

const supprimer = document.querySelector("#supprimer");
const quit_supprimer = document.querySelectorAll(".quit_supprimer");
const form_supprimer = document.querySelector("#form_supprimer");

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

team.forEach((player) => {
  add_players_to_main(player);
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
    console.log(new_player);
    team.push(new_player);
    console.log(team);
    //localStorage.setItem("team", JSON.stringify(team));
    players_num(team);
    add_players_to_main(new_player);
    toggle_add();
  }
});

ajouter_btn.addEventListener("click", toggle_add);
quit_add.forEach((btn) => {
  btn.addEventListener("click", toggle_add);
});


players_container.addEventListener("click", (event) => {
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
    players_container
      .querySelectorAll(".player")
      .forEach((player) => player.remove());
    team.forEach((player) => add_players_to_main(player));
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
