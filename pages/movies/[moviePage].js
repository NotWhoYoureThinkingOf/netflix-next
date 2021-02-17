import { useRouter } from "next/router";

export default function MoviePage() {
  const router = useRouter();
  const { chosenMovie } = router.query;
  console.log(chosenMovie);

  return <div>I am movie {chosenMovie}</div>;
}
