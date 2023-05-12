const highscoreContainer = document.querySelector("[data-highscore-container]")
let lastHighscoreRender;

export function createHighscoreList(rawHighscores) {
  const highscores = rawHighscores.reduce((formattedDataArray, rawData) => {
    const { name, date, points, color } = rawData;

    const paragraph = createElement({
      type: "p",
      className: "highscore",
      color,
    });

    const dateElem = createElement({
      type: "span",
      className: "date",
      title: date,
    });

    const nameElem = createElement({
      type: "span",
      className: "name",
      title: name,
    });

    const pointsElem = createElement({
      type: "span",
      className: "points",
      title: points,
    });

    paragraph.append( dateElem, nameElem, pointsElem );

    formattedDataArray.push(paragraph);

    return formattedDataArray;
  }, []);
  
  updateDOMHighscoreList(highscores);
}

function createElement( { type, className, title, color } = {}) {
  const elem = document.createElement(type);

  elem.className = className;

  if(color) {
    elem.style.color = color;
  }

  if(type === "span" && title?.toString()) {
    elem.textContent = title;
  }

  return elem;
}

function updateDOMHighscoreList(highscores) {
  highscoreContainer.replaceChildren(...highscores);
}



highscoreContainer.addEventListener("click",  function() {
  console.log(
    this.scrollHeight,
    Math.ceil(this.scrollTop),
    this.offsetHeight,
  );
})

function scrollBackToTop() {
  
  if(
      Math.ceil((highscoreContainer.scrollHeight - highscoreContainer.offsetHeight)) === Math.ceil(highscoreContainer.scrollTop)
    ) {
    highscoreContainer.scrollTo({
      left: 0,
      top: 0,
    });
  }
}

function draw(currentTime) {
  if(!lastHighscoreRender) {
    lastHighscoreRender = currentTime;
    requestAnimationFrame(draw);
  }
  const secondsSinceLastRender = ( currentTime - lastHighscoreRender ) / 1000;
  requestAnimationFrame(draw);

  if( secondsSinceLastRender < (1 / 5) ) return;

  lastHighscoreRender = currentTime;
  highscoreContainer.scrollBy(0, 5);
  scrollBackToTop();
}

requestAnimationFrame(draw);