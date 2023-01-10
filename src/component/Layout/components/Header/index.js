import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import Menu from '~/component/Popper/Menu';
import Button from '~/component/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { InboxIcon, MessageIcon, UploadIcon } from '~/component/Icon';
import Image from '~/component/Image';
import Search from '../Search';

// nếu không dùng bind cho styles thì className phải viết camelCase , thì styles mới chấm được.
// Dùng bind ở đây để viết tên class thoải mái cx('post-item')
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                    // children: {
                    //     title: 'Language 1',
                    //     data: [
                    //         {
                    //             type: 'language',
                    //             code: 'en',
                    //             title: 'English 1',
                    //         },
                    //         {
                    //             type: 'language',
                    //             code: 'vi',
                    //             title: 'Tiếng Việt 1',
                    //         },
                    //     ],
                    // },
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/@hoaa',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/logout',
        // Dùng để css cho vạch nằm ngang trước logout
        separate: true,
    },
];

function Header() {
    const handleOnChangeMenu = (menuItem) => {
        // Xử lí khi click vào Item nào.
        // Dựa vào type để biết là MenuItem của trang nào.
        console.log('Menu Item click', menuItem);
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };
    const current_user = true;

    // Vì Css module nên tên class đặt giống nhau vẫn oke, cứ thẻ to nhất đặt wrap
    return (
        <header className={cx('wrap')}>
            {/* Giao diện Header gồm 3 phần : */}
            <div className={cx('inner')}>
                {/* Phần 1: Logo */}
                <img src={images.logo} alt="tiktok" />

                {/* Phần 2: search input */}
                <Search />

                {/* Phần 3:  Hiển thị các button chỗ login hoặc không login */}
                <div className={cx('actions')}>
                    {current_user ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    {/* Button 3 chấm hiện menu setting */}
                    <Menu items={current_user ? userMenu : MENU_ITEMS} onChange={handleOnChangeMenu}>
                        {current_user ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://lh3.googleusercontent.com/ogw/AOh-ky3BxL-ZrdkYKD69QPzml0Ur0Z9NC-T4B8o6ZdhK=s32-c-mo"
                                alt="Nguyen Van A"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
