export async function getStaticProps() {
  const res = await fetch(`https://alkawn-api.jagad.xyz/api/alquran/`);
  const data = await res.json();

  return {
    props: { data: data },
  };
}

const Index = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h1>test</h1>
    </div>
  );
};

export default Index;
