import { useSearchParams } from 'react-router-dom';
import Select from './Select';

export default function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sort_by') || '';

    function handleChange(e) {
        searchParams.set('sort_by', e.target.value);
        setSearchParams(searchParams);
    }

    return (
        <Select
            options={options}
            value={sortBy}
            type="white"
            onChange={handleChange}
        />
    );
}
