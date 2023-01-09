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

function Menu({ children, items = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const currentMenu = history[history.length - 1];
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
    return (
        <Tippy
            interactive // để khi nhấp vào nội dung bên trong tippy có thể tương tác được như bôi đen
            placement="bottom-end"
            delay={[0, 700]}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {/* Những MenuItem từ cấp 2 trở lên mới có header */}
                        {history.length > 1 && (
                            <Header
                                title={currentMenu.title}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        {renderItem()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
