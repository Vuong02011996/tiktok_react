import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import { HeaderOnly } from '~/component/Layout';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    // { path: '/profile', component: Profile },
    // patern: chuỗi nickname có thể thay đổi, Chỗ Thẻ Link(Route dom) nào có thuộc tính to chưa cụm /@ sẽ nhảy tới trang profiles
    { path: '/@:nickname', component: Profile },
    { path: '/upload', component: Upload, layout: null },
    { path: '/search', component: Search, layout: HeaderOnly },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
