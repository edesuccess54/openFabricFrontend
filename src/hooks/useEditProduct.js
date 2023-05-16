import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";


export const useEditProduct = (url) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const updateProduct = async (name, price, discount, desc, image) => {
        setIsLoading(true);
        setError(null)

        try {

            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('discount', discount);
            formData.append('desc', desc);
            formData.append('image', image);

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                body: formData
                
            })

            if (!response.ok) {
                throw new Error("Product update failed")
            }

            const json = await response.json()

            if (json.error) {
                throw new Error(json.error)
            } else {
                navigate('/')
            }
      
        } catch (error) {
            setIsLoading(false)
            setError(error.message);
        }
    }

    return { updateProduct, isLoading, error }
}