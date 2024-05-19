import { Nav } from "@/components/nav";
import { getSession } from "@/lib/dal";

const Home = async () => {
  const session = await getSession();

  return (
    <>
      <Nav session={session} />
    </>
  );
};

export default Home;
