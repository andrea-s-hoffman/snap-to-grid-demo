"use strict";

const box = document.getElementById("box");

let move = false;

function generateGridCoordinates(centerX, centerY, spacing = 80) {
  const gridSize = 5; // 5x5 grid
  const coordinates = [];
  const halfGrid = Math.floor(gridSize / 2);

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = centerX + (col - halfGrid) * spacing;
      const y = centerY + (row - halfGrid) * spacing;
      coordinates.push({ x, y });
    }
  }

  return coordinates;
}

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
const gridCoordinates = generateGridCoordinates(centerX, centerY);

console.log(gridCoordinates);

gridCoordinates.forEach((coordinate) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("dot");
  newDiv.style.top = `${coordinate.y}px`;
  newDiv.style.left = `${coordinate.x}px`;
  document.body.append(newDiv);
});

document.addEventListener("mousedown", (e) => {
  if (e.target.id === "box") {
    move = true;
  }
});

document.addEventListener("mousemove", (e) => {
  const xPos = e.pageX;
  const yPos = e.pageY;
  // console.log(xPos, yPos);
  if (move) {
    box.style.top = `${yPos}px`;
    box.style.left = `${xPos}px`;
  }
});

document.addEventListener("mouseup", (e) => {
  move = false;
  snapToGrid(e);
});

function snapToGrid(e) {
  const closestCoordinate = gridCoordinates.find((xy) => {
    return (
      xy.x - 10 < e.pageX &&
      xy.x + 10 > e.pageX &&
      xy.y - 10 < e.pageY &&
      xy.y + 10 > e.pageY
    );
  });
  if (closestCoordinate) {
    box.classList.add("snap");
    setTimeout(() => {
      box.style.top = `${closestCoordinate.y}px`;
      box.style.left = `${closestCoordinate.x}px`;
    }, 1);
    setTimeout(() => {
      box.classList.remove("snap");
    }, 201);
  }
}
