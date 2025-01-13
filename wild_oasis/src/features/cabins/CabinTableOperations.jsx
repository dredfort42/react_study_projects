import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

export default function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterField="discount"
                options={[
                    { value: 'all', label: 'All' },
                    { value: 'no_discount', label: 'No discount' },
                    { value: 'with_discount', label: 'With discount' },
                ]}
            />

            <SortBy
                options={[
                    { value: 'name_asc', label: 'Sort by name (A-Z)' },
                    { value: 'name_desc', label: 'Sort by name (Z-A)' },
                    { value: 'price_asc', label: 'Sort by price (low first)' },
                    {
                        value: 'price_desc',
                        label: 'Sort by price (high first)',
                    },
                    {
                        value: 'capacity_asc',
                        label: 'Sort by capacity (low first)',
                    },
                    {
                        value: 'capacity_desc',
                        label: 'Sort by capacity (high first)',
                    },
                ]}
            />
        </TableOperations>
    );
}
