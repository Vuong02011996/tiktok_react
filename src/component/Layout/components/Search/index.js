import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/component/Popper';

import AccountItem from '~/component/AccountItem';
import styles from './Search.module.scss';
import { SearchIcon } from '~/component/Icon';

const cx = classNames.bind(styles);

function Search() {
    // two-way binding với search input
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    // state để show search result khi focus vào thẻ input
    const [showResult, setShowResult] = useState(true);

    const inputRef = useRef();

    // Gọi API xử lí ở đây searchResult
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1]);
        }, 0);
    }, []);

    // Sẽ tối ưu sử dụng useCallBack với những function này
    const handleClearInput = () => {
        setSearchValue('');
        inputRef.current.focus();
        // Xoá luôn search result
        setSearchResult([]);
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <HeadlessTippy
            interactive // để khi nhấp vào nội dung bên trong tippy có thể tương tác được như bôi đen
            // Phải có hai điều kiện mới hiện tippy này(focus vào ô input và có kết quả tìm kiếm)
            visible={showResult && searchResult.length > 0}
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
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    // khi focus vào thì cho tippy result
                    onFocus={() => setShowResult(true)}
                />
                {/* Handle logic: nếu có chữ trên thẻ input mới hiển thị button close */}
                {!!searchValue && (
                    <button className={cx('clear')} onClick={handleClearInput}>
                        {/* Clear icon */}
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {/* Loading */}
                {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}

                <button className={cx('search-btn')}>
                    {/* Search */}
                    {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                    {/* Thay thể bằng file svg */}
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}
export default Search;
