
import { useEffect } from "react";
import posthog from 'posthog-js'


const Posthog = () => {

  useEffect(() => {
    posthog.init('phc_Ezd9U1dPZrW0hiXMySBfLTVjwLqtyzJc2w0DMDyPafS', { api_host: 'https://posthog.gazzd.com' })
  }, [])

  return null;
};
export default Posthog;
