export default async function handler(req, res) {
  const getAlquran = async () => {
    return fetch(`https://alkawn-api.jagad.xyz/alquran/all.json`);
  };

  const response = await getAlquran();
  const all = await response.json();

  return res.status(200).json(all);
}
