const TransactionModel = require("./../models/Transactions");
const request = require("request");
const config = require("./../config");

class TransactionController {
  async store(req, res) {
    try {
      const { lat, lng } = req.body;
      console.log(lat, lng);

      var options = {
        method: "GET",
        url: "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng",
        headers: {
          "x-rapidapi-key": config.rakuten_api_key,
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          useQueryString: true,
        },
        qs: {
          limit: "30",
          currency: "USD",
          distance: "2",
          lunit: "km",
          lang: "es_ES",
          latitude: lat,
          longitude: lng,
        },
      };

      request(options, async function (error, response, body) {
        const { user } = req;
        const newTransaction = new TransactionModel({
          name: user.name,
          email: user.email,
          lat,
          lng,
        });

        await newTransaction.save();

        if (error) {
          return res.status(400).json({ errorMessage: error }).status(400);
        }

        res.status(200).json(JSON.parse(body));
      });

      /* const newTransaction = new TransactionModel(transaction);
      const trans = await newTransaction.save(); */
    } catch (error) {
      return res.status(400).json({ errorMessage: error.message }).status(400);
    }
  }

  async history(req, res) {
    try {
      const transactions = await TransactionModel.find();
      res.status(200).json(transactions);
    } catch (error) {
      return res.status(400).json({ errorMessage: error }).status(400);
    }
  }
}

module.exports = TransactionController;
