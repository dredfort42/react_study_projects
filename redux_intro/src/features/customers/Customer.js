import { useSelector } from 'react-redux';

function Customer() {
    const customer = useSelector((store) => store.customer.fullName);
    return <h2>👋 Welcome, {customer === '' ? 'new customer' : customer}</h2>;
}

export default Customer;
