export default async function handler(req, res) {

  try {

    if (req.method !== "GET") {
      return res.status(405).json({ totalHolders: 0 });
    }

    const CA = "2gNqgLE31QdbQjzw17MMfBuuQraNxFJYeXGUzrgHpump";

    const MORALIS_KEY = process.env.MORALIS_API_KEY;

    if (!MORALIS_KEY) {
      console.error("Missing MORALIS_API_KEY");
      return res.status(500).json({ totalHolders: 0 });
    }

    const response = await fetch(
      `https://solana-gateway.moralis.io/token/mainnet/holders/${CA}`,
      {
        headers: {
          accept: "application/json",
          "X-API-Key": MORALIS_KEY
        }
      }
    );

    if (!response.ok) {
      console.error("Moralis response not OK:", response.status);
      return res.status(200).json({ totalHolders: 0 });
    }

    const data = await response.json();

    return res.status(200).json({
      totalHolders: data?.totalHolders || 0
    });

  } catch (error) {
    console.error("Holders API error:", error);

    return res.status(200).json({
      totalHolders: 0
    });
  }
}