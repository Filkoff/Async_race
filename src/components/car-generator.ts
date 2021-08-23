const models = [
  "Honda",
  "Toyota",
  "Nissan",
  "BMW",
  "Ferrari",
  "Mercedes",
  "Infinity",
  "Lexus",
  "Peugeot",
  "Audi",
  "Dodge",
  "Pagani",
  "Subaru",
];
const names = [
  "NSX",
  "Supra",
  "Silvia",
  "M3",
  "Testarossa",
  "W140",
  "G3",
  "LS460",
  "406",
  "RS6",
  "Viper",
  "Zonda",
  "Legacy",
];

export const getRandomNAme = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * models.length)];
  return `${model} ${name}`;
};

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomCars = (count = 100) =>
  new Array(count)
    .fill(1)
    .map(() => ({ name: getRandomNAme(), color: getRandomColor() }));
