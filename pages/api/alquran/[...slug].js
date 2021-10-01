export default async function handler(req, res) {
  const pid = req.query;

  const getAlquran = async () => {
    return fetch(
      `https://sahabat-alquran.jagad.xyz/alquran/${pid.slug[0]}.json`
    );
  };
  const response = await getAlquran();
  const surah = await response.json();

  if (pid.slug.length === 1) {
    return res.status(200).json({ [pid.slug]: surah[pid.slug] });
  }

  if (pid.slug.length === 2) {
    const number = surah[pid.slug[0]].number;
    const ayah_number = [pid.slug[1]];
    const name = surah[pid.slug[0]].name;
    const name_latin = surah[pid.slug[0]].name_latin;
    const number_of_ayah = surah[pid.slug[0]].number_of_ayah;
    const text = surah[pid.slug[0]].text[pid.slug[1]];
    const translations = surah[pid.slug[0]].translations.id.text[pid.slug[1]];
    const translations_name = surah[pid.slug[0]].translations.id.name;
    const tafsir = surah[pid.slug[0]].tafsir.id.kemenag.text[pid.slug[1]];
    const tafsir_name = surah[pid.slug[0]].tafsir.id.kemenag.name;
    const tafsir_source = surah[pid.slug[0]].tafsir.id.kemenag.source;

    if (pid.slug[1] > number_of_ayah) {
      return res.status(200).json({ error: "number of ayah not found" });
    }
    return res.status(200).json({
      [number]: {
        number,
        name,
        name_latin,
        number_of_ayah,
        text: {
          [ayah_number]: text,
        },
        translations: {
          id: {
            name: translations_name,
            text: {
              [ayah_number]: translations,
            },
          },
        },
        tafsir: {
          id: {
            kemenag: {
              name: tafsir_name,
              source: tafsir_source,
              tafsir: {
                [ayah_number]: tafsir,
              },
            },
          },
        },
      },
    });
  } else {
    return res.status(200).json({ error: "error" });
  }
}
