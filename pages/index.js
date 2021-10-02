export async function getStaticProps() {
  const res = await fetch(`https://alkawn-api.jagad.xyz/api/alquran/1`);
  const data = await res.json();

  return {
    props: { data: data[1] }, // will be passed to the page component as props
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
