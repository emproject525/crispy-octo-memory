import Dashboard from '@views/dashboard';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

const menus = [
    {
        path: '/',
        name: 'Dashboard',
        title: '대시보드',
        component: Dashboard,
        exact: true,
        strict: false,
        icon: faTachometerAlt,
    },
];

export default {
    menus,
};
