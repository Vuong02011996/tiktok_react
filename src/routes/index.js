import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import { HeaderOnly } from '~/layouts';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    // { path: '/profile', component: Profile },
    // patern: chuỗi nickname có thể thay đổi, Chỗ Thẻ Link(Route dom) nào có thuộc tính to chưa cụm /@ sẽ nhảy tới trang profiles
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: null },
    { path: config.routes.search, component: Search, layout: HeaderOnly },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
