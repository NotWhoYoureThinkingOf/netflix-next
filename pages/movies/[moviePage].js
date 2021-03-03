import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MoviePage() {
  const router = useRouter();
  const { chosenMovie } = router.query;
  console.log(chosenMovie);

  useEffect(() => {
    setTimeout(router.push("/"), 3000);
  });

  return <div>Oh....this is awkward....</div>;
}
