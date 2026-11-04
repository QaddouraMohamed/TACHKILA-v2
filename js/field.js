function clean_field(player) {
  switch (player.right_now) {
    case "GB":
      gb_num.textContent = "N";
      gb_player.textContent = "Player";
      break;
    case "DG":
      dg_num.textContent = "N";
      dg_player.textContent = "Player";
      break;
    case "DC_1":
      dc1_num.textContent = "N";
      dc1_player.textContent = "Player";
      break;
    case "DC_2":
      dc2_num.textContent = "N";
      dc2_player.textContent = "Player";
      break;
    case "DD":
      dd_num.textContent = "N";
      dd_player.textContent = "Player";
      break;
    case "MG":
      mg_num.textContent = "N";
      mg_player.textContent = "Player";
      break;
    case "MC_1":
      mc1_num.textContent = "N";
      mc1_player.textContent = "Player";
      break;
    case "MC_2":
      mc2_num.textContent = "N";
      mc2_player.textContent = "Player";
      break;
    case "MD":
      md_num.textContent = "N";
      md_player.textContent = "Player";
      break;
    case "BU_1":
      bu1_num.textContent = "N";
      bu1_player.textContent = "Player";
      break;
    case "BU_2":
      bu2_num.textContent = "N";
      bu2_player.textContent = "Player";
      break;
    default:
      break;
  }
}

function add_to_field(post, post_num, post_name, player) {
  if (post_num.textContent == "N" && post_name.textContent == "Player") {
    post_num.textContent = player.number;
    post_name.textContent = player.name;
    player.right_now = post;

    localStorage.setItem("team", JSON.stringify(team));
  } else {
    document.querySelector("#place_occupe_err").classList.remove("hidden");
    setTimeout(() => {
      document.querySelector("#place_occupe_err").classList.add("hidden");
    }, 1500);
  }
}
