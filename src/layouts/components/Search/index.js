import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/component/Popper';
import * as searchServices from '~/services/searchService';
import AccountItem from '~/component/AccountItem';
import styles from './Search.module.scss';
import { SearchIcon } from '~/component/Icon';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
    // two-way binding với search input
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    // state để show search result khi focus vào thẻ input
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debouncedValue = useDebounce(searchValue, 500);

    // Gọi API xử lí ở đây mỗi khi có input nhập vào thay đổi(gõ vào ô input,)
    useEffect(() => {
        // Check searchValue bằng chuỗi rỗng lần đầu tiên và trường hợp chỉ gõ toàn space
        // API này sẽ lỗi nếu q không có giá trị hoặc rỗng.
        if (!debouncedValue.trim()) {
            // Nếu searchValue không có giá trị sẽ chạy vào đây
            setSearchResult([]);
            return;
        }
        // Cach cu
        // setLoading(true);
        // console.log('Goi API: ', debouncedValue);
        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debouncedValue)}&type=less`)
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((res) => {
        //         console.log('(res.data: ', res.data);
        //         setSearchResult(res.data);
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debouncedValue);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

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

    const handleChange = (e) => {
        const searchValue = e.target.value;
        // Xử lí trường hợp nhập 1 hoặc nhiều dấu cách vào sẽ không nhập được
        if (!searchValue.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };
    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                // appendTo={() => document.body}
                interactive // để khi nhấp vào nội dung bên trong tippy có thể tương tác được như bôi đen
                // Phải có hai điều kiện mới hiện tippy này(focus vào ô input và có kết quả tìm kiếm)
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>

                            {searchResult.map((result) => {
                                return <AccountItem key={result.id} data={result} />;
                            })}
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
                        onChange={handleChange}
                        // khi focus vào thì cho tippy result
                        onFocus={() => setShowResult(true)}
                    />

                    {/* Handle logic: nếu có chữ trên thẻ input mới hiển thị button close */}
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClearInput}>
                            {/* Clear icon */}
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {/* Loading */}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        {/* Search */}
                        {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                        {/* Thay thể bằng file svg */}
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}
export default Search;
