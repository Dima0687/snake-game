const highscoreContainer = document.querySelector("[data-highscore-container]")

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