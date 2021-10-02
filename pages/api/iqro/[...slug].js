export default async function handler(req, res) {
  const pid = req.query;

  const getIqro = async () => {
    return fetch(`https://alkawn-api.jagad.xyz/iqro/${pid.slug[0]}.json`);
  };
  const response = await getIqro();
  const iqro = await response.json();

  if (pid.slug.length === 1) {
    return res.status(200).json({ [pid.slug]: iqro[pid.slug] });
  }

  if (pid.slug.length === 2) {
    const number = iqro[pid.slug[0]][pid.slug[1]].page;
    const text = iqro[pid.slug[0]][pid.slug[1]].text;
    return res.status(200).json({
      [number]: {
        page: number,
        text,
      },
    });
  } else {
    return res.status(200).json({ error: "error" });
  }
}
