import styled from 'styled-components';
import { useRecentBookings } from '../../features/dashboard/useRecentBookings';
import { useRecentStays } from '../../features/dashboard/useRecentStays';
import { useCabins } from '../../features/cabins/useCabins';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

export default function DashboardLayout() {
    const { bookings, isPending: isBookingsLoading } = useRecentBookings();
    const {
        stays,
        confirmedStays,
        numDays,
        isPending: isStaysLoading,
    } = useRecentStays();
    const { cabins, isPending: isCabinsLoading } = useCabins();

    if (isBookingsLoading || isStaysLoading || isCabinsLoading)
        return <Spinner />;

    console.log(bookings);
    console.log(stays, confirmedStays);

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinCount={cabins.length}
            />
            <div>Today's activity</div>
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart bookings={bookings} numDays={numDays} />
        </StyledDashboardLayout>
    );
}
