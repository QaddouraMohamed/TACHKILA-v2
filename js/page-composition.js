const aside = document.querySelector("aside");

//field consts -_-
const gb_num = document.querySelector("#gb_num");
const gb_player = document.querySelector("#gb_player");
const dg_num = document.querySelector("#dg_num");
const dg_player = document.querySelector("#dg_player");
const dc1_num = document.querySelector("#dc1_num");
const dc1_player = document.querySelector("#dc1_player");
const dc2_num = document.querySelector("#dc2_num");
const dc2_player = document.querySelector("#dc2_player");
const dd_num = document.querySelector("#dd_num");
const dd_player = document.querySelector("#dd_player");
const mg_num = document.querySelector("#mg_num");
const mg_player = document.querySelector("#mg_player");
const mc1_num = document.querySelector("#mc1_num");
const mc1_player = document.querySelector("#mc1_player");
const mc2_num = document.querySelector("#mc2_num");
const mc2_player = document.querySelector("#mc2_player");
const md_num = document.querySelector("#md_num");
const md_player = document.querySelector("#md_player");
const bu1_num = document.querySelector("#bu1_num");
const bu1_player = document.querySelector("#bu1_player");
const bu2_num = document.querySelector("#bu2_num");
const bu2_player = document.querySelector("#bu2_player");

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
