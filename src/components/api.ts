const startURL = "http://127.0.0.1:3000";

const garage = `${startURL}/garage`;
const engine = `${startURL}/engine`;
const winners = `${startURL}/winners`;

export const getCars = async (page = 1, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const res = await response.json();
  return res;
};

export const getCar = async (id: number) => {
  return (await fetch(`${garage}/${id}`)).json();
};

export const createCar = async (body: object) =>
  (
    await fetch(garage, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

export const deleteCar = async (id: number) =>
  (await fetch(`${garage}/${id}`, { method: "DELETE" })).json();

export const updateCar = async (id: number, body: object) =>
  (
    await fetch(`${garage}/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

export const startEngine = async (id: number) =>
  (await fetch(`${engine}?id=${id}&status=started`)).json();

export const stopEngine = async (id: number) =>
  (await fetch(`${engine}?id=${id}&status=stopped`)).json();

export const drive = async (id: number) => {
  const res = await fetch(`${engine}?id=${id}&status=drive`).catch();
};

export const getSortOrder = (sort: string, order: string) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return "";
};

interface Winner {
  id: number;
  wins: number;
  time: number;
}

export const getWinners = async (
  page: number,
  limit = 10,
  sort: string,
  order: string
) => {
  const response = await fetch(
    `${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`
  );
  const items = await response.json();

  return {
    items: await Promise.all(
      items.map(async (winner: Winner) => ({
        ...winner,
        car: await getCar(winner.id),
      }))
    ),
  };
};

export const getWinner = async (id: number) =>
  (await fetch(`${winners}/&{id}`)).json();

export const getWinnerStatus = async (id: number) =>
  (await fetch(`${winners}/&{id}`)).status;

export const deleteWinner = async (id: number) =>
  (await fetch(`${winners}/&{id}`, { method: "DELETE" })).json();

export const createWinner = async (body: object) =>
  (
    await fetch(winners, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

export const updateWinner = async (id: number, body: object) =>
  (
    await fetch(`${winners}/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
