import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useDelete = (url) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const deleteProduct = async () => {
        setIsLoading(true);
        setError(null)

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {'Authorization':`Bearer ${user.token}`}
            })

            const json = await response.json()
        
            if (json.error) {
                throw new Error(json.error);
            }

            if (json.success) {
                navigate('/')
            }
      
        } catch (error) {
            setIsLoading(false)
            setError(error.message);
        }
    }

    return { deleteProduct, isLoading, error }
}