import { getSortOrder, getCar } from "./api";
import "./view.css";

const startURL = "http://127.0.0.1:3000";
const garage = `${startURL}/garage`;
const winners = `${startURL}/winners`;

export const renderCarImage = (color: string) => `
<svg width="100px" height="100px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" >
<path fill="${color}" d="M188.287 169.428c-28.644-.076-60.908 2.228-98.457 8.01-4.432.62-47.132 24.977-58.644 41.788-11.512 
16.812-15.45 48.813-15.45 48.813-3.108 13.105-1.22 34.766-.353 36.872 1.17 4.56 7.78 8.387 19.133 11.154C35.84 295.008 
53.29 278.6 74.39 278.574c22.092 0 40 17.91 40 40-.014 1.764-.145 3.525-.392 5.272.59.008 1.26.024 1.82.03l239.266 
1.99c-.453-2.405-.685-4.845-.693-7.292 0-22.09 17.91-40 40-40 22.092 0 40 17.91 40 40 0 2.668-.266 5.33-.796 
7.944l62.186.517c1.318-22.812 6.86-46.77-7.024-66.72-5.456-7.84-31.93-22.038-99.03-32.66-34.668-17.41-68.503-37.15-105.35-48.462-28.41-5.635-59.26-9.668-96.09-9.765zm-17.197
 11.984c5.998.044 11.5.29 16.014.81l7.287 48.352c-41.43-5.093-83.647-9.663-105.964-27.5.35-5.5 7.96-13.462 16.506-16.506 4.84-1.724 
 40.167-5.346 66.158-5.156zm34.625.348c25.012.264 62.032 2.69 87.502 13.94 12.202 5.65 35.174 18.874 50.537 
 30.55l-6.35 10.535c-41.706-1.88-97.288-4.203-120.1-6.78l-11.59-48.245zM74.39 294.574a24 24 0 0 0-24 24 24 24 0 0 0 24 24 
 24 24 0 0 0 24-24 24 24 0 0 0-24-24zm320 0a24 24 0 0 0-24 24 24 24 0 0 0 24 24 24 24 0 0 0 24-24 24 24 0 0 0-24-24z"/></svg>
    `;

interface Car {
  id: number;
  name: string;
  color: string;
}

export const renderCar = (car: Car) => `
<div class="change-butons">
<button class="select-button" data-id="${car.id}">Select</button>
<button id="remove" class="remove-button" data-id="${car.id}">Remove</button>
<span>${car.name}</span>
</div>
<div class="handle-buttons">
<button id="start" data-id="${car.id}" class="start">A</button>
<button id="stop" data-id="${car.id}" class="stop">B</button>
</div>
<div class="road">
<div class="car" id="${car.id}">${renderCarImage(car.color)}</div>
<div class="finish"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="80px" height="80px" viewBox="0 0 450 450" style="enable-background:new 0 0 450 450;" xml:space="preserve">
<g>
<g>
 <path d="M87.945,75.913c-1.877-7.41-9.408-11.893-16.818-10.018c-7.413,1.879-11.897,9.409-10.019,16.821l90.439,356.838
   c1.589,6.271,7.224,10.446,13.409,10.446c1.127,0,2.271-0.139,3.413-0.428c7.409-1.877,11.895-9.409,10.017-16.819L87.945,75.913z
   "/>
 <path d="M388.98,176.419c-14.739-54.423-29.492-108.842-44.234-163.265c-1.598-5.891-4.399-12.21-14.929-12.842
   C246.929-5.691,192.503,76.854,109.614,70.85c-6.541-0.806-10.745,2.6-9.148,8.491c14.743,54.422,29.372,108.877,44.233,163.266
   c2.385,8.729,8.388,12.035,14.931,12.842c82.887,6.004,137.315-76.541,220.205-70.537
   C386.375,185.716,390.577,182.311,388.98,176.419z M323.934,20.857c4.066,15.015,8.138,30.029,12.204,45.044
   c-17.436,0.574-32.825,4.092-49.132,10.203c-4.065-15.015-8.137-30.03-12.202-45.044C291.109,24.951,306.498,21.43,323.934,20.857
   z M153.13,189.197c-4.627-17.059-9.246-34.122-13.868-51.182c18.328-0.531,34.591-4.503,51.602-11.227
   c-4.07-15.015-8.138-30.03-12.204-45.045c16.629-7.433,32.314-16.332,48.022-25.523c4.066,15.014,8.138,30.029,12.205,45.044
   c-15.709,9.19-31.395,18.092-48.023,25.524c4.623,17.06,9.244,34.122,13.866,51.182
   C187.718,184.693,171.457,188.665,153.13,189.197z M217.114,223.674c-4.129-15.234-8.256-30.47-12.384-45.706
   c16.513-7.377,32.087-16.201,47.683-25.327c4.128,15.236,8.256,30.471,12.383,45.707
   C249.202,207.475,233.626,216.297,217.114,223.674z M252.75,152.445c-4.619-17.061-9.242-34.122-13.863-51.183
   c15.706-9.17,31.403-17.945,48.119-25.157c4.624,17.06,9.246,34.121,13.867,51.181C284.16,134.5,268.458,143.274,252.75,152.445z
    M313.545,172.876c-4.129-15.234-8.256-30.47-12.385-45.706c16.211-6.045,31.521-9.521,48.843-10.086
   c4.129,15.236,8.257,30.471,12.386,45.705C345.066,163.355,329.754,166.83,313.545,172.876z"/>
</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>
</div>
`;

export const renderGarage = async (page: number, limit: number) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const res = await response.json();

  const responseAllCars = await fetch(`${garage}`);
  const resAllCars = await responseAllCars.json();

  const garageView = `
    <h3>Garage(${resAllCars.length})</h3>
    <h4>Page#${page}</h4>
    <ul class="garage">
        ${res
          .map(
            (car: Car) =>
              `
          <li>${renderCar(car)}</li>
        `
          )
          .join("")}
    </ul>
          `;
  return garageView;
};

export const renderGarageResult = () => {
  renderGarage(1, 7).then((res) => {
    document.getElementById("garage").innerHTML = res;
  });
};

interface Winner {
  id: string;
  wins: number;
  time: number;
  car: Car;
}

export const renderWinners = async (
  page = 1,
  limit = 10,
  sort: string,
  order: string
) => {
  const response = await fetch(
    `${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`
  );
  const items = await response.json();
  return `
   <h3>Winners (${items.length})</h3>
    <h4>Page #${page}</h4>
    <table>
        <thead>
            <th>Number</th>
            <th>Car</th>
            <th>Name</th>
    <th>Wins</th>
    <th>Best time (seconds)</th>
    </thead>
    <tbody>
    ${items
      .map((winner: Winner, index: number) => {
        const car = getCar(+winner.id);
        return `
    <tr>
      <td>${index + 1}</td>
      <td>${car.then((res) => {
        return res.color;
      })}</td>
      <td>${winner.car}</td>
      <td>${winner.wins}</td>
      <td>${winner.time}</td>
    </tr>
    `;
      })
      .join("")}
  </tbody>
</table>`;
};

export const renderWinnersResult = () => {
  renderWinners(1, 10, "id", "ASC").then((res) => {
    document.getElementById("winners-view").innerHTML = res;
  });
};

export const render = async () => {
  const html = `
<div
<div class="menu">
  <button class="button" id="garageButton">To garage</button>
  <button class="button" id="winnersButton">To winners</button>
</div>
<div id="garage-view">
  <div>
    <form>
      <div>
        <input type="text" name="name" id="create-name" />
        <input type="color" name="color" id="create-color" value="#ffffff" />
        <button class="button" id="create-car" type="submit">Create</button>
      </div>
      <div>
        <input type="text" name="nameUpdate" id="update-name" />
        <input type="color" name="colorUpdate" id="update-color" value="#ffffff" />
        <button class="button" id="update-car" type="submit">Update</button>
      </div>
    </form>
  </div>
  <div class="race-controls">
    <button id="race">Race</button>
    <button id="reset">Reset</button>
    <button id="generateCars">Generate cars</button>
  </div>
  <div id="garage">${renderGarageResult()}</div>
  <div>
    <p id="message"></p>
  </div>
</div>
  <div id="winners-view" style="display: none">
    ${renderWinnersResult()}
  </div>
  <div class="pagination">
    <button id="prev">Prev</button>
    <button id="next">Next</button>
  </div>
`;
  const root = document.createElement("div");
  root.innerHTML = html;
  document.body.appendChild(root);
};
