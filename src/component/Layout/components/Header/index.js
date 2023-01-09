import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/component/Popper';
import Menu from '~/component/Popper/Menu';
import Button from '~/component/Button';
import AccountItem from '~/component/AccountItem';
import styles from './Header.module.scss';
import images from '~/assets/images';

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

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    // Gọi API xử lí ở đây searchResult
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

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

    // Vì Css module nên tên class đặt giống nhau vẫn oke, cứ thẻ to nhất đặt wrap
    return (
        <header className={cx('wrap')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <img src={images.logo} alt="tiktok" />
                {/* search */}
                <Tippy
                    interactive // để khi nhấp vào nội dung bên trong tippy có thể tương tác được như bôi đen
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search accounts and videos" spellCheck={false} />
                        <button className={cx('clear')}>
                            {/* Clear icon */}
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        {/* Loading */}
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            {/* Search */}
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>
                {/* actions */}
                <div className="actions">
                    <Button text>Upload</Button>
                    <Button
                        primary
                        // rightIcon={<FontAwesomeIcon icon={faSignIn} />}
                    >
                        Log in
                    </Button>
                    {/* Button 3 chấm hiện menu setting */}
                    <Menu items={MENU_ITEMS} onChange={handleOnChangeMenu}>
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
