export default function Page({ params }: { params: { seq: number } }) {
  return <h1>{params.seq}</h1>;
}
