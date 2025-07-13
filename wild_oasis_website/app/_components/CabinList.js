import CabinCard from '@/app/_components/CabinCard';
import { getCabins } from '../_lib/data-service';
// import { unstable_noStore as noStore } from 'next/cache';

export default async function CabinList({ filter }) {
    // noStore();

    const cabins = await getCabins();

    if (!cabins.length) return null;

    console.log(filter);

    let displayCabins;
    if (filter === 'all') displayCabins = cabins;
    if (filter === 'small')
        displayCabins = cabins.filter((cabin) => cabin.max_capacity <= 2);
    if (filter === 'medium')
        displayCabins = cabins.filter(
            (cabin) => cabin.max_capacity > 2 && cabin.max_capacity <= 6
        );
    if (filter === 'large')
        displayCabins = cabins.filter((cabin) => cabin.max_capacity > 6);

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {displayCabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    );
}
