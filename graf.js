class Graph {
  /* 
    options
        transition: 1s //time
        animation: true //true or false, if there should be a animation
        delay: 0 //time in millisecs, after the delay the animation will autoplay
    */
  constructor(parent, options = {}) {
    this.parent = parent;

    this.duration = options.transition ? options.transition : "1s";
    this.animation = options.animation ? options.animation : true;
    this.delay = options.delay ? options.delay : null;

    this.oldMax = this.max; //the old max

    //functions
    this.play = this.play.bind(this);

    this.setTransition();

    if (this.delay !== null) {
      setTimeout(this.play, this.delay);
    }
  }

  //henter alle elementer inni med class graf
  get children() {
    return this.parent.querySelectorAll(".graf");
  }

  //finner ut om den står eller ikke
  get direction() {
    return this.parent.classList.contains("standing");
  }

  //finner den største verdien
  get max() {
    let max = -Infinity;

    this.children.forEach(elem => {
      const value = Number(elem.getAttribute("data-value"));
      if (value > max) {
        max = value;
      }
    });

    return max;
  }

  //return percentage
  percentageOfMax(value) {
    return (value * 100) / this.oldMax;
  }

  //kjører en funksjon på alle elementer med class graf
  mapChildren(func) {
    this.children.forEach(func);
  }

  //sets the transition of the children
  setTransition() {
    if (this.animation) {
      this.mapChildren(elem => {
        this.setOneTransition(elem);
      });
    }
  }

  //set animation of one
  setOneTransition(elem) {
    elem.style.transition = this.duration;
    this.setSize(elem, 0);
  }

  //adds a new child
  add(value, classes = [], text = "") {
    const newChild = document.createElement("div");

    classes.forEach(elem => {
      newChild.classList.add(elem);
    });

    newChild.innerHTML = text;
    newChild.setAttribute("data-value", value);
    this.parent.appendChild(newChild);
    this.setOneTransition(newChild);

    if (value > this.oldMax) {
      this.oldMax = this.max;
    }
    setTimeout(this.play, 1);
  }

  //plays the animations
  play() {
    this.mapChildren(elem => {
      const value = Number(elem.getAttribute("data-value"));

      this.setSize(elem, value);
    });
  }

  //sets width/heigt of element
  setSize(elem, value) {
    if (!this.direction) {
      elem.style.width = this.percentageOfMax(value) + "%";
    } else {
      elem.style.height = this.percentageOfMax(value) + "%";
    }
  }
} //end of class
