import React, { useEffect, useState } from 'react'
import PlaceDetails from '../../components/PlaceDetails'
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';

export default function place() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? <Loading/> : <PlaceDetails />}
    </div>
  )
}
