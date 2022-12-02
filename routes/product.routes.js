import express from "express";
import ProductModel from "../models/products.model.js";

const router = express.Router();

// método GET: retorna todos os produtos (getAllProducts)
router.get("/", async (request, response) => {
  try {
    const getAllProducts = await ProductModel.find();
    return response.status(200).json(getAllProducts);
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ msg: "Oops... algo de errado não está certo" });
  }
});

// método GET: retorna um produto pelo id (getProductById)
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const getProductById = await ProductModel.findById(id).populate("orders");
    return response.status(200).json(getProductById);
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ msg: "Oops... algo de errado não está certo" });
  }
});

// método POST (createNewProduct)
router.post("/create", async (request, response) => {
  try {
    const createNewProduct = await ProductModel.create(request.body);
    return response.status(201).json(createNewProduct);
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ msg: "Oops... algo de errado não está certo" });
  }
});

// método PUT (updateProductById)

// método DELETE(deleteProductById)

export default router;
