export default async function handler(req, res) {
  const data = { test: "test" };

  return res.status(200).json({
    data,
  });
}
