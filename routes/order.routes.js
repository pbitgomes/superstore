import express from "express";
import OrderModel from "../models/orders.model.js"
import ProductModel from "../models/products.model.js";

const router = express.Router()

// getAllOrders
router.get("/", async (request, response) => {
    try {
        const getAllOrders = await OrderModel.find()
        return response.status(200).json(getAllOrders)
    } catch (error) {
        console.log(error)
        return response.status(500).json({msg: "Oops... algo de errado não está certo"})
    }
})

// getOrderById
router.get("/:id", async (request, response) => {
    try {
        // pegar o id de parâmetro
        const { id } = request.params;
        // pegar o pedido específico e popular todos os campos
        const getOrderById = await OrderModel.findById(id)
            .populate("products")
            .populate({
                path: "products",
                populate: {
                    path: "product",
                    model: "Product"
                }
            })

        // criar um total
        let total = 0
        // somar a quantidade de produtos com os preços
        getOrderById.products.forEach((order) => {
            total += order.product.price * order.amount
        })
        
        // retorna para status 200
        return response.status(200).json({ getOrderById, total: total })
    } catch (error) {
        console.log(error)
        return response.status(500).json({msg: "Oops... algo de errado não está certo"})
    }
})

// addProductToOrder
router.post("/insert", async (request, response) => {
    try {
        // criar um novo pedido
        const addProductToOrder = await OrderModel.create(
            { products: request.body.products }
        )
        // passar pelo array dos produtos
        addProductToOrder.products.forEach(async (element) => {
            // atualizar cada produto inserido no pedido
            await ProductModel.findByIdAndUpdate(
                // procurando o id do elemento (findById)
                element.product,
                // atualizar o meu elemento (andUpdate)
                {
                    $push: { orders: addProductToOrder._id }
                },
                { new: true, runValidators: true }
            )
        })
        return response.status(201).json(addProductToOrder)
    } catch (error) {
        console.log(error)
        return response.status(500).json({msg: "Oops... algo de errado não está certo"})
    }
})

export default router