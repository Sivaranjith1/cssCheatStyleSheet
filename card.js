//Funksjoner for å legge til cards

//legger til cards i parent
function addNewCard(parent, array, options = {}) {
  /**
        parent: Htmlelement, hvor den skal legge til de nye cardene
        array: {
            img: bilde src,
            html: card-content,
            index: number, setter data-index attribute
        } hva den skal legge til i card-elementene

        options
            click: function, kjører ved klikk

     */

  array.forEach(elem => {
    const div = document.createElement("div");
    div.className = "card";

    if (elem.img) {
      const img = document.createElement("div");
      img.className = "card-img";

      const im = document.createElement("img");
      im.src = elem.img;

      img.appendChild(im);
      div.appendChild(img);
    }

    if (elem.html) {
      const content = document.createElement("div");
      content.className = "card-content";

      content.innerHTML = elem.html;

      div.appendChild(content);
    }

    if (typeof elem.index === "number") {
      div.setAttribute("data-index", elem.index);
    }

    if (options.click) {
      div.style.cursor = "pointer";
      div.addEventListener("click", options.click);
    }

    parent.appendChild(div);
  });
}
