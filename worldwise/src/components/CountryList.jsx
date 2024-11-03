import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';
import styles from './CountryList.module.css';
import { useCities } from '../contexts/CitiesContext';

export default function CountryList() {
    const { cities, isLoading } = useCities();

    if (isLoading) {
        return <Spinner />;
    }

    if (!cities.length) {
        return (
            <Message
                message={'Add your first city by clicking on a city on the map'}
            />
        );
    }

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((e) => e.country).includes(city.country)) {
            return [...arr, { country: city.country, emoji: city.emoji }];
        } else return arr;
    }, []);

    console.log(countries);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={country.country} />
            ))}
        </ul>
    );
}
