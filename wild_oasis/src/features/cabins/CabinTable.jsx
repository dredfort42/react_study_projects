import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

export default function CabinTable() {
    const { isPending, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    if (isPending) {
        return <Spinner />;
    }

    const filterValue = searchParams.get('discount') || 'all';

    let filteredCabins;
    if (filterValue === 'no_discount') {
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    } else if (filterValue === 'with_discount') {
        filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);
    } else {
        filteredCabins = cabins;
    }

    const sortBy = searchParams.get('sortBy') || 'asc ';
    const [field, direction] = sortBy.split('_');
    const multiplicator = direction === 'asc' ? 1 : -1;

    let fieldSelector = field;

    if (field === 'price') fieldSelector = 'regular_price';
    if (field === 'capacity') fieldSelector = 'max_capacity';

    let sortedCabins = filteredCabins.sort(
        (a, b) => (a[fieldSelector] - b[fieldSelector]) * multiplicator
    );
    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header role="row">
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
}
