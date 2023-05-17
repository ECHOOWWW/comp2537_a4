const setup = async () => {
  const cardFronts = document.querySelectorAll(".front_face");

  // Fetch 3 random Pokemon images
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=810");
  const data = await response.json();
  const randomPokemon1 =
    data.results[Math.floor(Math.random() * data.results.length)];
  const randomPokemon2 =
    data.results[Math.floor(Math.random() * data.results.length)];
  const randomPokemon3 =
    data.results[Math.floor(Math.random() * data.results.length)];
  const randomPokemonResponse1 = await fetch(randomPokemon1.url);
  const randomPokemonResponse2 = await fetch(randomPokemon2.url);
  const randomPokemonResponse3 = await fetch(randomPokemon3.url);
  const randomPokemonData1 = await randomPokemonResponse1.json();
  const randomPokemonData2 = await randomPokemonResponse2.json();
  const randomPokemonData3 = await randomPokemonResponse3.json();
  const randomPokemonImageUrl1 = randomPokemonData1.sprites.front_default;
  const randomPokemonImageUrl2 = randomPokemonData2.sprites.front_default;
  const randomPokemonImageUrl3 = randomPokemonData3.sprites.front_default;

  // Set the src attribute of the front face img elements to the random Pokemon images
  cardFronts[0].src = randomPokemonImageUrl1;
  cardFronts[1].src = randomPokemonImageUrl2;
  cardFronts[2].src = randomPokemonImageUrl3;

  // Select 2 random front face img elements and set their src attributes to the same random Pokemon image
  const randomIndex1 = Math.floor(Math.random() * 3 + 3);
  let randomIndex2 = Math.floor(Math.random() * 3 + 3);
  let randomIndex3 = Math.floor(Math.random() * 3 + 3);
  while (randomIndex2 === randomIndex1) {
    randomIndex2 = Math.floor(Math.random() * 3 + 3);
    while (randomIndex3 === randomIndex1 || randomIndex3 === randomIndex2) {
      randomIndex3 = Math.floor(Math.random() * 3 + 3);
    }
  }
  while (randomIndex3 === randomIndex1 || randomIndex3 === randomIndex2) {
    randomIndex3 = Math.floor(Math.random() * 3 + 3);
  }
  cardFronts[randomIndex1].src = randomPokemonImageUrl1;
  cardFronts[randomIndex2].src = randomPokemonImageUrl2;
  cardFronts[randomIndex3].src = randomPokemonImageUrl3;

  // update the information on the page
  let numclicks = 0;
  let numpairs = 3;
  let nummatched = 0;
  let numunmatched = 3;
  const stepcontainer = document.querySelector("#step");
  const matchcontainer = document.querySelector("#match");
  const unmatchcontainer = document.querySelector("#unmatch");
  const timerContainer = document.querySelector("#timer");
  const startButton = document.querySelector("#start");
  const resetButton = document.querySelector("#reset");
  let seconds = 0;
  let timerInterval = null;

  function startTimer() {
    timerInterval = setInterval(() => {
      seconds++;
      timerContainer.innerHTML = `Time: ${seconds} seconds`;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    setTimeout(() => {
      alert(`You won in ${seconds} seconds!`);
    }, 1000);
  }
  startButton.addEventListener("click", startTimer);
  resetButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    seconds = 0;
    timerContainer.innerHTML = `Time: ${seconds} seconds`;

    // Reset the number of clicks
    numclicks = 0;
    stepcontainer.innerHTML = `Number of clicks: ${numclicks}`;

    // Reset the number of matched pairs
    nummatched = 0;
    matchcontainer.innerHTML = `Matched pairs of card:: ${nummatched}`;

    // Reset the number of unmatched pairs
    numunmatched = 3;
    unmatchcontainer.innerHTML = `Unmatched pairs of cards: ${numunmatched}`;

    // Reset the number of pairs
    numpairs = 3;

    // Reset the cards
    $(".card").removeClass("flip");
    $(".card").on("click");

    // Reset the images
    cardFronts[0].src = randomPokemonImageUrl1;
    cardFronts[1].src = randomPokemonImageUrl2;
    cardFronts[2].src = randomPokemonImageUrl3;
    cardFronts[randomIndex1].src = randomPokemonImageUrl1;
    cardFronts[randomIndex2].src = randomPokemonImageUrl2;
    cardFronts[randomIndex3].src = randomPokemonImageUrl3;
  });

  // Flip the card when clicked
  let firstCard = undefined;
  let secondCard = undefined;
  let isCardClickable = true;

  $(".card").on("click", function () {
    if (!isCardClickable) return;
    numclicks += 1;
    stepcontainer.innerHTML = `Number of clicks: ${numclicks}`; // Update the number of clicks
    $(this).toggleClass("flip");
    if (!firstCard) firstCard = $(this).find(".front_face")[0];
    else {
      secondCard = $(this).find(".front_face")[0];
      if (firstCard === secondCard) {
        firstCard = undefined;
        secondCard = undefined;
        return; // Exit the function without making the card unclickable
      }
      if (firstCard.src == secondCard.src) {
        matchcontainer.innerHTML = `Matched pairs of card:: ${nummatched}`;
        unmatchcontainer.innerHTML = `Unmatched pairs of cards: ${numunmatched}`;
        $(`#${firstCard.id}`).parent().off("click");
        $(`#${secondCard.id}`).parent().off("click");
        nummatched += 1;
        numunmatched -= 1;
        firstCard = undefined;
        secondCard = undefined;
      } else {
        isCardClickable = false;
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip");
          $(`#${secondCard.id}`).parent().toggleClass("flip");
          firstCard = undefined;
          secondCard = undefined;
          isCardClickable = true;
        }, 1000);
      }
      if (nummatched === numpairs) {
        stopTimer();
      }
    }
  });
};

$(document).ready(setup);
