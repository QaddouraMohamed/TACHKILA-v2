//import { team } from "./data.js";

let team = JSON.parse(localStorage.getItem("team")) || [];

const ajouter_btn = document.querySelector("#ajouter_btn");
const ajouter = document.querySelector("#ajouter");
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

players_num();

team.forEach((player) => {
  add_to_aside(player);
});

for (let player of team) {
  if (player.right_now != "") {
    switch (player.right_now) {
      case "GB":
        gb_num.textContent = player.number;
        gb_player.textContent = player.name;
        break;
      case "DG":
        dg_num.textContent = player.number;
        dg_player.textContent = player.name;

        break;
      case "DC_1":
        dc1_num.textContent = player.number;
        dc1_player.textContent = player.name;

        break;
      case "DC_2":
        dc2_num.textContent = player.number;
        dc2_player.textContent = player.name;

        break;
      case "DD":
        dd_num.textContent = player.number;
        dd_player.textContent = player.name;

        break;
      case "MG":
        mg_num.textContent = player.number;
        mg_player.textContent = player.name;

        break;
      case "MC_1":
        mc1_num.textContent = player.number;
        mc1_player.textContent = player.name;

        break;
      case "MC_2":
        mc2_num.textContent = player.number;
        mc2_player.textContent = player.name;

        break;
      case "MD":
        md_num.textContent = player.number;
        md_player.textContent = player.name;

        break;
      case "BU_1":
        bu1_num.textContent = player.number;
        bu1_player.textContent = player.name;

        break;
      case "BU_2":
        bu2_num.textContent = player.number;
        bu2_player.textContent = player.name;

        break;
      default:
        break;
    }
  }
}

ajouter_btn.addEventListener("click", toggle_add);
quit_add.forEach((btn) => {
  btn.addEventListener("click", toggle_add);
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
    document.querySelector("#num_taken_add").classList.add("hidden");
    const new_player = {
      id: id++,
      name: data.name,
      number: Number(data.number),
      position: data.position,
      right_now: "",
    };
    console.log(new_player);
    team.push(new_player);
    console.log(team);
    localStorage.setItem("team", JSON.stringify(team));
    players_num();
    add_to_aside(new_player);
    toggle_add();
  }
});

aside.addEventListener("click", (event) => {
  if (event.target.closest(".modifier_btn")) {
    player_to = event.target.closest(".player");
    player_id = Number(player_to.dataset.id);
    open_modify();
    for (let i = 0; i < team.length; i++) {
      if (team[i].id === player_id) {
        form_modifier.elements.name.value = team[i].name;
        form_modifier.elements.position.value = team[i].position;
        form_modifier.elements.number.value = team[i].number;
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

aside.addEventListener("change", (event) => {
  if (event.target.closest(".posts")) {
    player_to = event.target.closest(".player");
    player_id = Number(player_to.dataset.id);
    player_position = event.target.closest(".posts").value;
    for (let i = 0; i < team.length; i++) {
      if (player_id === team[i].id) {
        clean_field(team[i]);
        switch (player_position) {
          case "GB":
            add_to_field(player_position, gb_num, gb_player, team[i]);
            break;
          case "DG":
            add_to_field(player_position, dg_num, dg_player, team[i]);
            break;
          case "DC_1":
            add_to_field(player_position, dc1_num, dc1_player, team[i]);
            break;
          case "DC_2":
            add_to_field(player_position, dc2_num, dc2_player, team[i]);
            break;
          case "DD":
            add_to_field(player_position, dd_num, dd_player, team[i]);
            break;
          case "MG":
            add_to_field(player_position, mg_num, mg_player, team[i]);
            break;
          case "MC_1":
            add_to_field(player_position, mc1_num, mc1_player, team[i]);
            break;
          case "MC_2":
            add_to_field(player_position, mc2_num, mc2_player, team[i]);
            break;
          case "MD":
            add_to_field(player_position, md_num, md_player, team[i]);
            break;
          case "BU_1":
            add_to_field(player_position, bu1_num, bu1_player, team[i]);
            break;
          case "BU_2":
            add_to_field(player_position, bu2_num, bu2_player, team[i]);
            break;
          default:
            break;
        }
      }
    }
  }
});

form_modifier.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form_modifier));
  let found = false;
  for (const player of team) {
    if (Number(data.number) === player.number && player.id !== player_id) {
      found = true;
      console.log(1);
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
        localStorage.setItem("team", JSON.stringify(team));
        if (team[i].right_now != "") {
          clean_field(team[i]);
        }
        break;
      }
    }
    aside.querySelectorAll(".player").forEach((player) => player.remove());
    team.forEach((player) => {
      add_to_aside(player);
    });
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
      localStorage.setItem("team", JSON.stringify(team));
      break;
    }
  }
  players_num();
  player_to.remove();
  player_id = 0;
  close_supprimer();
});

quit_supprimer.forEach((btn) => {
  btn.addEventListener("click", close_supprimer);
});
