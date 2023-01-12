import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

// Những Item nào có trường children thì có SubMenu
// Một cách làm của menu Đa cấp: Sẽ tuy duy như sau:
/**
 * Sử dụng một biến history là một mảng chưa các object con có key data, mỗi object con sẽ chứa từng menuItem.
 * Lần đầu sẽ render phần tử  là object con đầu tiên (bao bọc ngoài cùng).
 * Khi Click vào item nào trong object con có chứa children sẽ add vào phần tử tiếp theo của biến history và render phần tử đó.
 * => luôn render phần tử cuối cùng của mảng.
 * Khi bấm trở lại menu trước sẽ remove phần tử cuối cùng của biến history.
 */

// để không bị lỗi khi không truyền onChange ở Menu
const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn, hideOnClick = false }) {
    const [history, setHistory] = useState([{ data: items }]);
    const currentMenu = history[history.length - 1];

    /**
     * Cách sử dụng useCallback
     * 1. Không dùng
     *
     * ở đầy chỉ có một useState, nên chỉ có một lần component render lại
     * Khi render lại thì history thay đổi, dẫn đến currentMenu cũng thay đổi theo mà trong các hàm bên dưới
     * dùng currentMenu, history bên trong nên nếu dùng useCallBack thì các biến này cũng là dependences
     * Nên dùng useCallBack ở đây không hiệu quả. Vẫn tạo function mới: renderItem, renderResult,
     *
     * Những component không truyền props gì cả thì không cần dùng memo.
     * 2. Dùng
     * CHỉ dùng useCallback khi có nhiều useState và những function không dùng những state đó bên trong
     * Những component truyền props và những props đó có khả năng không thay đổi khi truyền vào thì dùng React.memo
     */

    const renderItem = () => {
        return currentMenu.data.map((item, index) => {
            // item không có children sẽ không có là cha và không render subMenuItem
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                            console.log('history: ', history);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    // Ở đây không cần sử dụng useCallback cho function này vì component bao bên ngoài Tippy không sử dụng memo nên cũng
    // không có ý nghĩa
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {/* Những MenuItem từ cấp 2 trở lên mới có header */}
                {history.length > 1 && <Header title={currentMenu.title} onBack={handleBack} />}
                <div className={cx('menu_body')}>{renderItem()}</div>
            </PopperWrapper>
        </div>
    );

    const handleResetToFirstPage = () => {
        setHistory((prev) => prev.slice(0, 1));
    };
    return (
        <Tippy
            interactive // để khi nhấp vào nội dung bên trong tippy có thể tương tác được như bôi đen
            placement="bottom-end"
            delay={[0, 700]}
            offset={[14, 8]}
            render={renderResult}
            // để hover ra ngoài biến mất khi hiện lên lại sẽ chỉ có phần tử đầu tiên
            onHide={handleResetToFirstPage}
            hideOnClick={hideOnClick}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node,
    items: PropTypes.array,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.bool,
};
export default Menu;
