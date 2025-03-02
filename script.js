// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2410-FTB-ET-WEB-AM";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    // TODO
    const res = await fetch(`${API_URL}/players`)
    const json = await res.json();
    console.log(json)
    // you're successfully getting the data, but you need to return it in order to map over it in renderAllPlayers
    // remember to parse the response - you need to access the player array - here it is json.data.players
    return json.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    // TODO
     const res = await fetch (`${API_URL}/players/${playerId}`);
     const json = await res.json();
     return json.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    // TODO
    // remove the trailing slash from the URL
    const res = await fetch(`${API_URL}/players/`, {
      method: "POST",
      // here you need to use JSON.stringify to convert the playerObj to a string - JSON needs to be capitalized
      body: json.stringify(playerObj),
      // you have a typo here - it should be application/json
      headers: {"Content-type": "applcaiton.json"}
    })
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    // TODO
    const res = await fetch(`${API_URL}/players/${playerId}`, {
      method: "Delete",
    });
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  // TODO
  try {
    const playerCards = playerList.map((player) => {
      const playerCard = document.createElement("div");
      const playerImg = document.createElement("img");
      const playerName = document.createElement("p");
      const detailsButton = document.createElement("button");
      playerCard.classList.add("player-card-container");
      playerImg.src = player.imageUrl;
      playerImg.alt = player.name;
      playerName.innerText = player.name;
      detailsButton.innerText = "See Details";
      detailsButton.addEventListener("click", async function () {
        const playerData = await fetchSinglePlayer(player.id);
        console.log(playerData);
        renderSinglePlayer(playerData);
      });
      playerCard.appendChild(playerImg);
      playerCard.appendChild(playerName);
      playerCard.appendChild(detailsButton);

      return playerCard;
    });
    // before you can add to this element, you need to select it from the DOM - use querySelector to get the main element
    const playersContainer = document.querySelector("main");
    playersContainer.replaceChildren(...playerCards);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
// to get this to work - you need to add an element to your HTML (with class .modal)
const renderSinglePlayer = (player) => {
  try {
    // select the element that we added 
    const modal = document.querySelector(".modal");
    // make sure to create an element to hold all of your new player data 
    const modalContent = document.createElement("div");
    const playerName = document.createElement("h3");
    const playerBreed = document.createElement("p");
    const playerStatus = document.createElement("p");
    const playerImg = document.createElement("img");
    const deleteButton = document.createElement("button");
    playerName.innerText = player.name;
    playerBreed.innerText = player.breed;
    playerStatus.innerText = player.status;
    playerImg.height = 300;
    playerImg.src = player.imageUrl;
    deleteButton.innerText = "Remove from Roster";
    deleteButton.addEventListener("click", async (e) => {
      modal.classList.remove("modal-open");
      modalContent.classList.remove("modal-content-open");
      await removePlayer(player.id);
      const players = await fetchAllPlayers();
      renderAllPlayers(players);
    });
    modalContent.replaceChildren(
      playerName,
      playerImg,
      playerBreed,
      playerStatus,
      deleteButton
    );
    modal.appendChild(modalContent);
    modal.classList.add("modal-open");
    modalContent.classList.add("modal-content-open");
  } catch (err) {
    console.log(err);
  }
};


/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TOdo
      const nameInput = document.createElement("input");
      const nameLabel = document.createElement("label");
      const breedInput = document.createElement("input");
      const breedLabel = document.createElement("label");
      const imgInput = document.createElement("input");
      const imgLabel = document.createElement("label");
      const status = document.createElement("select");
      const benchOption = document.createElement("option");
      const fieldOption = document.createElement("option");
      nameInput.setAttribute("id", "playername");
      nameLabel.innerText = "Name";
      nameLabel.setAttribute("for", "playername");
      breedInput.setAttribute("id", "breed");
      breedLabel.setAttribute("for", "breed");
      breedLabel.innerText = "Breed";
      imgInput.setAttribute("id", "img");
      imgLabel.setAttribute("for", "img");
      imgLabel.innerText = "Image";
      benchOption.value = "bench";
      benchOption.innerText = "Bench";
      benchOption.setAttribute("selected", "");
      fieldOption.value = "field";
      fieldOption.innerText = "Field";
      status.setAttribute("id", "playerstatus");
      status.appendChild(benchOption);
      status.appendChild(fieldOption);
      const submitBtn = document.createElement("button");
      submitBtn.innerText = "Submit";
      // i think you are trying to get the new player form element from the DOM here - use querySelector to select it
      // once selected, you can add the new elements to it
      const addNewPlayerForm = document.querySelector("#new-player-form");
      addNewPlayerForm.replaceChildren(
        nameLabel,
        nameInput,
        breedLabel,
        breedInput,
        status,
        imgLabel,
        imgInput,
        submitBtn
      );

      addNewPlayerForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const newPlayer = {
          name: playername.value,
          breed: breed.value,
          imageUrl: imgInput.value,
          //  playerStatus is not defined here
          // use the variable you assigned to this input - status 
          status: playerStatus.value,
        };
  
        const result = await addNewPlayer(newPlayer);
        if (result.success) {
          alert("player added successfully!");
          playername.value = "";
          breed.value = "";
          img.value = "";
          const players = await fetchAllPlayers();
          renderAllPlayers(players);
        } else if (result.error) {
          console.log("Error creating player");
        }
      });
    } catch (err) {
      console.error("Uh oh, trouble rendering the new player form!", err);
    }
  };
/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);
  renderNewPlayerForm();
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
