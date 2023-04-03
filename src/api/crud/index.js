import express from "express";
import CrudModel from "./model.js";

const crudRouter = express.Router();

crudRouter.get("/getAll", async (req, res, next) => {
  try {
    const crud = await CrudModel.find();
    res.send(crud);
  } catch (error) {
    next(error);
    res.status(500).send("Could not get elements");
  }
});

crudRouter.get("/getSingle/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const element = await CrudModel.findById(id);
    if (!element) {
      return res.status(404).send("Element not found");
    }
    res.send(element);
  } catch (error) {
    next(error);
    res.status(500).send("Could not get element");
  }
});

crudRouter.post("/post", async (req, res, next) => {
  try {
    const crud = new CrudModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });
    await crud.save();
    res.send(crud);
  } catch (error) {
    next(error);
  }
});

crudRouter.put("/update/:id", async (req, res, next) => {
  try {
    const crud = await CrudModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      },
      { new: true }
    );
    res.send(crud);
  } catch (error) {
    next(error);
  }
});

crudRouter.delete("/delete/:id", async (req, res, next) => {
  try {
    await CrudModel.findByIdAndRemove(req.params.id);
    res.send({ message: "Crud is deleted" });
  } catch (error) {
    next(error);
  }
});

export default crudRouter;
