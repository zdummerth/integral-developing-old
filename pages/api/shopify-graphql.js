import { storefrontClient } from "../../lib/callShopify";

export default async function handler(req, res) {
  // console.log('in shopify function', req.query)

  try {
    const data = await storefrontClient.query(req.body);

    // console.log('shopify response data', data.body)

    res.status(200).json(data.body);
  } catch (error) {
    console.log("ERROR MOTHERFUCKER: ", error);
    res.status(400).send();
  }
}
