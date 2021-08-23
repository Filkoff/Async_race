import {
  getCar,
  createCar,
  deleteCar,
  updateCar,
  startEngine,
  drive,
} from "./components/api";
import { render } from "./components/view";
import { generateRandomCars } from "./components/car-generator";
render();

const inputName = document.getElementById("create-name");
const inputColor = document.getElementById("create-color");

let color = "#ffffff";
inputColor?.addEventListener("change", (e) => {
  color = (<HTMLInputElement>inputColor).value.toString();
});

let name = "";
inputName?.addEventListener("change", (e) => {
  name = (<HTMLInputElement>inputName).value.toString();
});

const rerender = () => {
  document.body.innerHTML = "";
  render();
};

const createButton = document.getElementById("create-car");
createButton.addEventListener("click", async (e) => {
  await createCar({ name, color });
  rerender();
});

const garageDiv = document.getElementById("garage");

const updateName = document.getElementById("update-name");
const updateColor = document.getElementById("update-color");
interface Res {
  id: number;
  name: string;
  color: string;
}

garageDiv.addEventListener("click", async (e) => {
  if ((e.target as Element).classList.contains("select-button")) {
    const id = (e.target as Element).getAttribute("data-id");
    getCar(+id).then((res: Res) => {
      (<HTMLInputElement>updateName).value = res.name;
      (<HTMLInputElement>updateColor).value = res.color;
      updateButton.addEventListener("click", async (e) => {
        const updatedColor = (<HTMLInputElement>updateColor).value;
        const updatedName = (<HTMLInputElement>updateName).value;
        const newCar: object = {
          name: updatedName,
          color: updatedColor,
        };
        await updateCar(+id, newCar);
        rerender();
      });
    });
  }
  if ((e.target as Element).classList.contains("remove-button")) {
    const id = (e.target as Element).getAttribute("data-id");
    deleteCar(+id);
    rerender();
  }
  if ((e.target as Element).classList.contains("start")) {
    const id = (e.target as Element).getAttribute("data-id");
    startEngine(+id).then((res) => {
      console.log(res);
      const time = 500 / res.velocity;
      console.log(time);
      const carNode = document.getElementById(`${id}`);
      carNode.setAttribute(
        "style",
        `animation: car ${time}s linear normal running 0s forwards;`
      );
    });
    drive(+id).then((res) => {
      console.log(res);
    });
  }
});

const winnersButton = document.getElementById("winnersButton");
const winnersView = document.getElementById("winners-view");
const updateButton = document.getElementById("update-car");
const garageButton = document.getElementById("garageButton");
const garageView = document.getElementById("garage-view");

winnersButton.addEventListener("click", (e) => {
  winnersView.style.display = "block";
  garageView.style.display = "none";
});

garageButton.addEventListener("click", (e) => {
  winnersView.style.display = "none";
  garageView.style.display = "block";
});

garageDiv.addEventListener("click", (e) => {
  if ((e.target as Element).classList.contains("start")) {
    console.log("boom");
  }
});

const generateCars = document.getElementById("generateCars");
generateCars.addEventListener("click", () => {
  const carArray = generateRandomCars();
  carArray.map(async (car) => {
    return await createCar(car);
  });
  rerender();
});

const race = document.getElementById("race");
race.addEventListener("click", () => {
  console.log("trtrt");
  const pageCars = document.querySelectorAll(".car");
  pageCars.forEach((car) => {
    startEngine(+car.id).then((res) => {
      const time = 500 / res.velocity;
      car.setAttribute(
        "style",
        `animation: car ${time}s linear normal running 0s forwards;`
      );
      drive(+car.id).catch((res) => alert(res));
    });
  });
});

const reset = document.getElementById("reset");
console.log(reset);
reset.addEventListener("click", () => {
  console.log("trtrt");
  const pageCars = document.querySelectorAll(".car");
  pageCars.forEach((car) => {
    car.removeAttribute("style");
  });
});
