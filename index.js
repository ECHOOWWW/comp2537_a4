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
  cardFronts[randomIndex1].src = randomPokemonImageUrl1;
  cardFronts[randomIndex2].src = randomPokemonImageUrl2;
  cardFronts[randomIndex3].src = randomPokemonImageUrl3;

  // Set the src attribute of the front face img elements to the random Pokemon images
  let firstCard = undefined;
  let secondCard = undefined;
  $(".card").on("click", function () {
    $(this).toggleClass("flip");
    if (!firstCard) firstCard = $(this).find(".front_face")[0];
    else {
      secondCard = $(this).find(".front_face")[0];
      console.log(firstCard, secondCard);
      if (firstCard.src == secondCard.src) {
        console.log("match");
        $(`#${firstCard.id}`).parent().off("click");
        $(`#${secondCard.id}`).parent().off("click");
      } else {
        console.log("no match");
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip");
          $(`#${secondCard.id}`).parent().toggleClass("flip");
        }, 1000);
      }
    }
  });
};

$(document).ready(setup);
