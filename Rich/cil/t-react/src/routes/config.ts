import ayc from './async';
import Group from '../views/Group/model';
export default [
    {
        path: '/',
        name: 'home',
        exact: true,
        render: ayc(() => import('../views/Count/model')),
    },
    {
        path: '/group',
        name: 'group',
        render: Group,
    },
];
