import { useState, useEffect } from 'react';
import { useAuthContext } from "./useAuthContext"

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(null);
    const { user } = useAuthContext()

    useEffect(() => {
        const controler = new AbortController()
        const fetchData = async () => {
            setIsPending(true)

            try {
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bear ${user.token}`
                    }
                }, {signal: controler.signal});
                console.log(response);

                if(!response.ok) {
                throw new Error("Failed to fetch ");
                }

                const json = await response.json();

                setIsPending(false);
                setData(json);
                console.log(json)
                setIsError(null);
            }

            catch(err) {
                if(err.name == "AbortError") {
                    console.log("the fetch was aborted");
                } else {
                    setIsPending(false)
                    setIsError(err.message);
                    console.log(err.message);
                }
            }
        }
       
        if (user) {
             fetchData();
        }

        return () => {
            controler.abort();
        }

    }, [url, user]);
    return {data, isPending, isError}
}

export default useFetch;