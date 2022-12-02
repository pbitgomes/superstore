import { model, Schema } from "mongoose";

// criar o schema
const orderSchema = new Schema({
  // products: [
  //     {
  //      product: ObjectId("jdfvlbadkvjdflkjvb"),
  //      amount: 10
  //     }
  // ]
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      amount: {
        type: Number,
      },
    },
  ],
  salesDate: {
    type: Date,
    default: Date.now,
  },
});

// criar o modelo
const OrderModel = model("Order", orderSchema);

// exportar para as rotas
export default OrderModel;
