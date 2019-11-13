class slideshow {
  constructor(elem, options = {}) {
    this.element = elem;
    this.left = 0;

    this.speed = options.speed ? options.speed : 2000; //hvor lang tid det tar før neste slid
    this.transTime = options.transition ? options.transition : "1s"; //hvor lang tid bevegelsen tar
    this.arrow = options.arrow ? options.arrow : true; //om the skal være piler eller ikke

    this.rightArrow = null;
    this.leftArrow = null;

    this.interval = null;

    //functions
    this.next = this.next.bind(this);
    this.nextArrow = this.nextArrow.bind(this);
    this.previousArrow = this.previousArrow.bind(this);

    this.setBackground();
    this.decryptOptions();
  }

  //går gjennom options
  decryptOptions() {
    this.roller.style.transition = this.transTime;
    this.interval = window.setInterval(this.next, this.speed);

    if (this.arrow) {
      this.addArrow();
    }
  }

  //setter background-img på slidene
  setBackground() {
    const slides = this.element.querySelectorAll(".slide");
    let left = 0;

    slides.forEach(elem => {
      const img = elem.getAttribute("data-img");
      elem.style.background = `url('${img}')`;
      elem.style.left = `${left}%`;
      left += 100;
    });
  }

  //henter elementet som beveger på seg
  get roller() {
    return this.element.querySelector(".roller");
  }

  //legger til piler
  addArrow() {
    // this.element.innerHTML += `<i class="arrow right-arrow"></i>
    //     <i class="arrow left-arrow"></i>`

    const rightArrow = document.createElement("i");
    rightArrow.className = "arrow right-arrow";

    const leftArrow = document.createElement("i");
    leftArrow.className = "arrow left-arrow";

    this.rightArrow = rightArrow;
    this.leftArrow = leftArrow;

    this.element.appendChild(rightArrow);
    this.element.appendChild(leftArrow);

    rightArrow.addEventListener("click", this.nextArrow);
    leftArrow.addEventListener("click", this.previousArrow);
  }

  //endre på left, slik at den beveger seg
  changePos() {
    this.roller.style.left = `${this.left}%`;
  }

  //viser neste slide
  next() {
    this.left = this.left - 100;

    const n = this.numSlides; //antall slides
    if (this.left < -100 * (n - 1)) {
      this.left = 0;
    }

    this.changePos();
  }

  //viser forgje slide
  previous() {
    this.left = this.left + 100;

    const n = this.numSlides; //antall slides
    if (this.left > 0) {
      this.left = -100 * (n - 1);
    }

    this.changePos();
  }

  //kjører når den pilen til høyre trykkes på
  nextArrow() {
    clearInterval(this.interval);
    this.next();
    this.interval = window.setInterval(this.next, this.speed);
  }

  //kjører når den pilen til venstre trykkes på
  previousArrow() {
    clearInterval(this.interval);
    this.previous();
    this.interval = window.setInterval(this.next, this.speed);
  }

  //henter antall slides
  get numSlides() {
    return this.element.querySelectorAll(".slide").length;
  }
}
