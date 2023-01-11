import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import SideBar from './SideBar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

// Phần content có thể thay đổi ta đưa từ bên ngoài vào qua children
// Header và sideBar là thành phần tĩnh
function DefaultLayout({ children }) {
    // Layout chính(default layout) gồm các thành phần: header, container-sidebar/content
    return (
        <div className={cx('wrap')}>
            <Header />
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')}> {children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
