import { useState, useEffect } from "react";
import PlacesCard from "../components/PlacesCard";
import Loading from "../components/Loading";
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession()

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  

  return (
    <div>
      {loading ? <Loading/> : <PlacesCard />}
    </div>
  );
}
