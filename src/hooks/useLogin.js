import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useLogin = (url) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null)

        console.log(email, password)

        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password })
            })

            const json = await response.json()
        
            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }

            if (response.ok) {
                // save user to localStorage
                localStorage.setItem('user', JSON.stringify(json));

                // update the auth context
                dispatch({ type: 'LOGIN', payload: json})

                setIsLoading(false)
            }
      
        } catch (error) {
            setIsLoading(false)
            setError(error.message);
        }
    }

    return { login, isLoading, error }
}