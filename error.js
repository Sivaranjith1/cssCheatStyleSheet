class ErrorBar {
  /*
        A errorbar

        options
            parent: HTMLelement, parent of the errorbar (default: document.body)
            showTime: millliseconds, how long should the errorbar stay open (default: 4000)
            transition: ex. 1s, how long should the trasition take (default: 1s)
    */
  constructor(options = {}) {
    this.parent = options.parent ? options.parent : document.body;
    this.showTime = options.showTime ? options.showTime : 4000;
    this.transition = options.transition ? options.transition : "100ms";
    this.textStr = "";

    this.colors = {
      error: "#f44336",
      success: "#43d666"
    };

    this.create();

    //function
    this.close = this.close.bind(this);
  }

  //lager diven elementet og setter det inn i parenten
  create() {
    const div = document.createElement("div");
    const textSpan = document.createElement("span");

    div.className = "errorBar";
    textSpan.className = "white-text f-2rem";

    div.style.height = "0";
    div.style["transition-duration"] = this.transition;

    div.appendChild(textSpan);
    this.parent.append(div);

    this.div = div;
    this.textSpan = textSpan;
  }

  //viser error meldingen
  show(text = "", color = "error") {
    this.div.style.background = this.colors[color];
    this.text = text;

    this.div.style.height = "5rem";

    setTimeout(this.close, this.showTime);
  }

  //lukker error meldingen
  close() {
    this.div.style.height = "0";
  }

  //henter teksten i error meldingen
  get text() {
    return this.textStr;
  }

  //endrer teksten i error meldingen
  set text(txt) {
    this.textSpan.innerHTML = txt;
    this.textStr = txt;
  }
}
