export async function getStaticPaths() {
  var surah = [];
  for (let i = 1; i <= 114; i++) {
    surah.push(i);
  }
  const paths = surah.map((item) => ({
    params: { slug: item.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  console.log(params.slug);
  const res = await fetch(
    `https://alkawn-api.jagad.xyz/api/alquran/${params.slug}`
  );
  const data = await res.json();

  return {
    props: { data: data[params.slug] }, // will be passed to the page component as props
  };
}

export default function Home({ data }) {
  var ayah = [];
  for (let i = 1; i <= data.number_of_ayah; i++) {
    ayah.push(i);
  }

  return (
    <div>
      {ayah.map((item, index) => (
        <div key={item}>
          <p>{index + 1}</p>
          <p>{data.text[item]}</p>
          <p>{data.translations.id.text[item]}</p>
        </div>
      ))}
    </div>
  );
}
