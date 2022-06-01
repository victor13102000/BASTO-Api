const ObjectId = require("mongodb").ObjectId;

const createCattle = async (req, res, databaseConnection) => {
  try {
    const {
      idSenesa,
      tipoAnimal,
      pesoAnimal,
      nombreDelPotrero,
      tipoDeDispositivo,
      numeroDeDispositivo,
    } = req.body;

    const cattleCollection = databaseConnection
      .db("basto")
      .collection("ganado");

    const repeatedVerifier = await cattleCollection.findOne({
      IDSENESA: idSenesa,
    });

    if (repeatedVerifier)
      res.status(406).json({
        message: "this cattle already registered",
        success: false,
      });

    const cattle  = {
      IDSENESA: idSenesa,
      tipoAnimal,
      pesoAnimal,
      nombreDelPotrero,
      tipoDeDispositivo,
      numeroDeDispositivo,
    };

    await cattleCollection.insertOne(cattle);

    res.status(201).json({
      success: true,
      message: "registered cattle",
      cattle,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

const deleteCattle = async (req, res, databaseConnection) => {
  try {
    const cattleCollection = databaseConnection
      .db("basto")
      .collection("ganado");

    const remove = await cattleCollection.deleteOne({
      _id:ObjectId(req.body.id),
    });

    res.status(200).json({
      message: "cattle have been eliminated",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};

const updateCattle = async (req, res, databaseConnection) => {
  try {
    const cattleCollection = databaseConnection
      .db("basto")
      .collection("ganado");

    const {
      idSenesa,
      tipoAnimal,
      pesoAnimal,
      nombreDelPotrero,
      tipoDeDispositivo,
      numeroDeDispositivo,
      id,
    } = req.body;

    const upadateCattle = await cattleCollection.updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          IDSENESA: idSenesa != "" && idSenesa,
          tipoAnimal: tipoAnimal != "" && tipoAnimal,
          pesoAnimal: pesoAnimal != "" && pesoAnimal,
          nombreDelPotrero: nombreDelPotrero != "" && nombreDelPotrero,
          tipoDeDispositivo: tipoDeDispositivo != "" && tipoDeDispositivo,
          numeroDeDispositivo: numeroDeDispositivo != "" && numeroDeDispositivo,
        },
      }
    );
    if (upadateCattle.acknowledged === true) {
      res.status(200).json({
        message: "data update",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};

const getCattle = async (req, res, databaseConnection) => {
  try {
    const cattleCollection = databaseConnection
      .db("basto")
      .collection("ganado");

    const listCattle = await cattleCollection.find().toArray();
  

    res.status(200).json({
      success: true,
      listCattle,
    });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};

module.exports = {
  createCattle: createCattle,
  deleteCattle: deleteCattle,
  updateCattle: updateCattle,
  getCattle: getCattle,
};
