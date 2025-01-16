import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
    const [searchParams] = useSearchParams();

    // FILTER
    const filterValue = searchParams.get('status');
    const filter =
        !filterValue || filterValue === 'all'
            ? null
            : { field: 'status', value: filterValue, method: 'eq' };
    // : { field: 'total_price', value: 5000, method: 'gte' };

    // SORT
    const sortByRaw = searchParams.get('sort_by') || 'start_date-desc';
    const [field, direction] = sortByRaw.split('-');
    const sortBy = { field, direction };

    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ['bookings', filter, sortBy],
        queryFn: () => getBookings({ filter, sortBy }),
    });

    return { isLoading, error, bookings };
}
