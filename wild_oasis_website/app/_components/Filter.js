'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const active = searchParams.get('capacity') ?? 'all';

    function handleFilter(filter) {
        const params = new URLSearchParams(searchParams);
        params.set('capacity', filter);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <div className="border border-primary-800 flex">
            <Button filter="all" handleFilter={handleFilter} active={active}>
                All cabins
            </Button>
            <Button filter="small" handleFilter={handleFilter} active={active}>
                1&mdash;2 guests
            </Button>
            <Button filter="medium" handleFilter={handleFilter} active={active}>
                3&mdash;6 guests
            </Button>
            <Button filter="large" handleFilter={handleFilter} active={active}>
                3&mdash;6 guests
            </Button>
        </div>
    );
}

function Button({ filter, handleFilter, active, children }) {
    return (
        <button
            className={`px-5 py-2 hover:bg-primary-800 ${
                filter === active ? 'bg-primary-800 text-primary-50' : ''
            }`}
            onClick={() => handleFilter(filter)}
        >
            {children}
        </button>
    );
}
