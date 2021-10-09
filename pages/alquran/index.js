export async function getStaticProps() {
  const res = await fetch(`https://alkawn-api.jagad.xyz/api/alquran/`);
  const data = await res.json();

  return {
    props: { data: data },
  };
}

const Index = ({ data }) => {
  var surah = [];
  for (let i = 1; i <= 114; i++) {
    surah.push(i);
  }
  console.log(data);
  return (
    <div>
      {surah.map((item) => (
        <div key={item}>
          <h1>{data[item].name_latin}</h1>
          <p>{data[item].name}</p>
        </div>
      ))}
    </div>
  );
};

export default Index;
