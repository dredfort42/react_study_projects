import Sidebar from '../components/Sidebar';
import Map from '../components/Map';
import User from '../components/User';

import styles from './AppLayout.module.css';
import { useAuth } from '../contexts/AuthContext';

export default function AppLayout() {
    const { isAuthenticated } = useAuth();

    return (
        <div className={styles.app}>
            {isAuthenticated && <User />}
            <Sidebar />
            <Map />
        </div>
    );
}
