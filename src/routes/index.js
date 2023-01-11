import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import { HeaderOnly } from '~/component/Layout';
import configRoutes from '~/config/routes';

const publicRoutes = [
    { path: configRoutes.home, component: Home },
    { path: configRoutes.following, component: Following },
    // { path: '/profile', component: Profile },
    // patern: chuỗi nickname có thể thay đổi, Chỗ Thẻ Link(Route dom) nào có thuộc tính to chưa cụm /@ sẽ nhảy tới trang profiles
    { path: configRoutes.profile, component: Profile },
    { path: configRoutes.upload, component: Upload, layout: null },
    { path: configRoutes.search, component: Search, layout: HeaderOnly },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
