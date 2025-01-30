const express = require("express");
const app = express();
const port = 3000;
var cors = require("cors");

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});

app.get("/products", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Produit non trouvé" });
  }

  res.json(product);
});

products = [
  {
    id: 0,
    prix: 8.99,
    name: "Harry Potter",
    isFavorite: false,
    createdDate: new Date(1980, 6, 31),
    imgUrl: "HARRY_POTTER.png",
  },
  {
    id: 1,
    prix: 5.99,
    name: "Ronnald Weasley",
    isFavorite: false,
    createdDate: new Date(1980, 3, 1),
    imgUrl: "RONNALD_WEASLEY.png",
  },
  {
    id: 2,
    prix: 2.89,
    name: "Hermione Granger",
    isFavorite: false,
    createdDate: new Date(1979, 8, 19),
    imgUrl: "HERMIONE_GRANGER.png",
  },
  {
    id: 3,
    prix: 7.99,
    name: "Neville Londubas",
    isFavorite: false,
    createdDate: new Date(1980, 7, 30),
    imgUrl: "NEVILLE_LONDUBAS.png",
  },
  {
    id: 4,
    prix: 7.45,
    name: "Albus Dumbledore",
    isFavorite: false,
    createdDate: new Date(1881, 7, 30),
    imgUrl: "ALBUS_DUMBLEDORE.png",
  },
  {
    id: 5,
    prix: 23.33,
    name: "Severus Snape",
    isFavorite: false,
    createdDate: new Date(1960, 1, 9),
    imgUrl: "SEVERUS_SNAPE.png",
  },
  {
    id: 6,
    prix: 18.55,
    name: "Draco Malfoy",
    isFavorite: false,
    createdDate: new Date(1980, 5, 5),
    imgUrl: "DRACO_MALFOY.png",
  },
  {
    id: 7,
    prix: 6.99,
    name: "Luna Lovegood",
    isFavorite: false,
    createdDate: new Date(1981, 2, 13),
    imgUrl: "LUNA_LOVEGOOD.png",
  },
  {
    id: 8,
    prix: 6.99,
    name: "Ginny Weasley",
    isFavorite: false,
    createdDate: new Date(1981, 7, 11),
    imgUrl: "GINNY_WEASLEY.png",
  },
  {
    id: 9,
    prix: 6.99,
    name: "Fred Weasley",
    isFavorite: false,
    createdDate: new Date(1978, 3, 1),
    imgUrl: "FRED_WEASLEY.png",
  },
  {
    id: 10,
    prix: 6.99,
    name: "George Weasley",
    isFavorite: false,
    createdDate: new Date(1978, 3, 1),
    imgUrl: "GEORGE_WEASLEY.png",
  },
  {
    id: 11,
    prix: 6.99,
    name: "Minerva McGonagall",
    isFavorite: false,
    createdDate: new Date(1935, 9, 4),
    imgUrl: "MINERVA_MCGONAGALL.png",
  },
  {
    id: 12,
    prix: 6.99,
    name: "Hagrid",
    isFavorite: false,
    createdDate: new Date(1928, 11, 6),
    imgUrl: "HAGRID.png",
  },
  {
    id: 13,
    prix: 6.99,
    name: "Sirius Black",
    isFavorite: false,
    createdDate: new Date(1960, 10, 11),
    imgUrl: "SIRIUS_BLACK.png",
  },
  {
    id: 14,
    prix: 6.99,
    name: "Remus Lupin",
    isFavorite: false,
    createdDate: new Date(1960, 2, 10),
    imgUrl: "REMUS_LUPIN.png",
  },
];
