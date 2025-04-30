// Navigation
const toggleMenu = document.getElementById("toggle");
const toggleImage = document.getElementById("toggle-img");
const menu = document.getElementById("menu-list");

const menuItems = document.querySelectorAll("#menu li a");

toggleMenu.addEventListener("click", () => {
  if (menu.classList.contains("h-0")) {
    menu.classList.remove("h-0");
    menu.classList.add("h-[280px]");
    toggleImage.src = "assets/images/svg/close.svg";
  }
  else {
    menu.classList.remove("h-[280px]");
    menu.classList.add("h-0");
    toggleImage.src = "assets/images/svg/menu.svg";
  }
});

// Characters list active image
const links = document.querySelectorAll("#menu li a");
// Close nav when clicking on a link
links.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("h-[280px]");
    menu.classList.add("h-0");
  });
});





// Menu selection
fetch("assets/json/characters.json")
  .then((response) => response.json())
  .then((data) => {
    // Les données sont maintenant disponibles dans la variable 'data'
    // Vous pouvez maintenant les utiliser pour créer votre menu et afficher les détails
    createMenucharacters(data);
  });

function createMenucharacters(characters) {
  const menu = document.querySelector(".menu-characters");
  const name = document.querySelector(".details-characters .character-name");
  const bio = document.querySelector(".details-characters .character-bio");
  const images = document.querySelectorAll(".details-characters .character-images img");

  characters.forEach((character) => {
    const elementCharacter = document.createElement("img"); // Création d'un élément image
    elementCharacter.classList.add("character-image");
    elementCharacter.src = character.icon;
    elementCharacter.alt = character.name;

    elementCharacter.addEventListener("click", () => {
      // Retirer la classe active des autres images
      document.querySelectorAll(".menu-characters .character-image").forEach((img) => {
        img.classList.remove("active");
      });

      // Ajouter la classe active à l'image cliquée
      elementCharacter.classList.add("active");

      const firstImage = document.querySelector(".details-characters .character-images img:first-child");
      firstImage.classList.add("active");

      // Mise à jour des infos
      name.textContent = character.name;
      bio.textContent = character.bio;
      document.querySelector(".character-fighting-style").textContent = character.fightingStyle;
      document.querySelector(".character-birthdate").textContent = character.birth;
      document.querySelector(".character-bloodtype").textContent = character.bloodtype;
      document.querySelector(".character-likes").textContent = character.likes;

      // Mise à jour des images
      images.forEach((image, index) => {
        image.src = character.images[index];
      });
    });

    menu.appendChild(elementCharacter);
  });
}
