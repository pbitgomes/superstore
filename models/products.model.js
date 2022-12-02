import { model, Schema } from "mongoose";

// criar o schema, criar o modelo (model) e exportar para as rotas

// schemas
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
    enum: ["Móveis", "Plantas", "Ferramentas"],
  },
  // orders: [
  //   objectId("123vdsfbsdfvsdf"),
  //   objectId("dnviluebvln12")
  // ]
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

// cria o modelo (model)
const ProductModel = model("Product", productSchema);

// exportar para as rotas
export default ProductModel;
