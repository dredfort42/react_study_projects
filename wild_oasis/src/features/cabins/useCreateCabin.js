import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createAndEditCabin } from '../../services/apiCabins';

export function useCreateCabin() {
    const quetyClient = useQueryClient();

    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: createAndEditCabin,
        onSuccess: () => {
            toast.success('New cabin was successfully created');
            quetyClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isCreating, createCabin };
}
