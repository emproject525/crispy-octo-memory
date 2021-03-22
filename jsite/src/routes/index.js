import Dashboard from '@views/dashboard';

const menus = [
    {
        path: '/',
        name: 'Dashboard',
        title: '대시보드',
        component: Dashboard,
        exact: true,
        strict: false,
    },
];

export default {
    menus,
};
