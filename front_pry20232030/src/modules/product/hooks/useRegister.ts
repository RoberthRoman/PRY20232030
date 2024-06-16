import { apiService, getLoginUser } from "../../../shared";
import { useQuery, useQueryClient } from "@tanstack/react-query"

const getProducts = async () => {
    const { id } = getLoginUser()
    const products = await apiService.get(`/users/${id}/products`);
    return products;
}

export const useProduct = () => {
    const queryClient = useQueryClient();

    const { isLoading, data } = useQuery(
        ['products'],
        () => getProducts(),
    )


    return {
        //Properties
        isLoading,
        data
        //Methods

        //Getters

        //Mutations
    }
}