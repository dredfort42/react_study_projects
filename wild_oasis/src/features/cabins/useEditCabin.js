import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createAndEditCabin } from '../../services/apiCabins';

export function useEditCabin() {
    const quetyClient = useQueryClient();

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) =>
            createAndEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success('Cabin was successfully edited');
            quetyClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editCabin };
}
