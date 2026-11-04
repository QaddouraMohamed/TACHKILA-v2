function add_to_aside(player) {
  const clone = players_template.content.cloneNode(true);
  clone.querySelector(".player").dataset.id = player.id;
  clone.querySelector(".player_num").textContent = Number(player.number);
  clone.querySelector(".player_name").textContent = player.name;
  clone.querySelector(".player_post").textContent = player.position;
  const posts = clone.querySelector(".posts");
  if (player.position === "Gardien") {
    posts.innerHTML += `
    <option value="GB" class="gb">GB-Gardien</option>
    `;
  } else if (player.position === "Defenseur") {
    posts.innerHTML += `
      <option value="DG" class="dg">DG-Defenseur gauche</option>
      <option value="DC_1" class="dc_1">DC - Défenseur central 1</option>
      <option value="DC_2" class="dc_2">DC - Défenseur central 2</option>
      <option value="DD" class="dd">DD - Défenseur droit</option>
    `;
  } else if (player.position === "Milieu") {
    posts.innerHTML += `
      <option value="MG" class="mg">MG - Milieu gauche</option>
      <option value="MC_1" class="mc_1">MC - Milieu central 1</option>
      <option value="MC_2" class="mc_2">MC - Milieu central 2</option>
      <option value="MD" class="md">MD - Milieu droit</option>
    `;
  } else if (player.position === "Attaquant") {
    posts.innerHTML += `
      <option value="BU_1" class="bu_1">BU - Buteur 1</option>
      <option value="BU_2" class="bu_2">BU - Buteur 2</option>
    `;
  }
  aside.append(clone);
}

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
