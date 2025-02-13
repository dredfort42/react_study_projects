import DashboardFilter from '../features/dashboard/DashboardFilter';
import DashboardLayout from '../features/dashboard/DashboardLayout';
import { useRecentBookings } from '../features/dashboard/useRecentBookings';
import { useRecentStays } from '../features/dashboard/useRecentStays';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Spinner from '../ui/Spinner';

function Dashboard() {
    const { bookings, isPending: isBookingsLoading } = useRecentBookings();
    const {
        stays,
        confirmedStays,
        isPending: isStaysLoading,
    } = useRecentStays();

    if (isBookingsLoading || isStaysLoading) return <Spinner />;

    console.log(bookings);
    console.log(stays, confirmedStays);

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Dashboard</Heading>
                <DashboardFilter />
            </Row>

            <DashboardLayout />
        </>
    );
}

export default Dashboard;
