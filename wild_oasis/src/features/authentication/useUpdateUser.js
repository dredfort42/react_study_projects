import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser as updateUserApi } from '../../services/apiAuth';

export function useUpdateUser() {
    const quetyClient = useQueryClient();

    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: updateUserApi,
        onSuccess: () => {
            toast.success('User account was successfully updated');
            quetyClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isUpdating, updateUser };
}
