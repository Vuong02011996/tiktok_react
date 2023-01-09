import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    primary = false,
    outline = false,
    text = false,
    disable = false,
    rounded = false,
    small,
    large,
    to,
    href,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button'; // mặc định là button, tùy vào prop to, href sẽ thay đổi thẻ a/button
    const classes = cx('wrapper', {
        primary,
        outline,
        text,
        disable,
        small,
        large,
        rounded,
        [className]: className,
    });
    const props = {
        onClick: onClick,
        ...passProps,
    };
    // Remove event listener when btn is disabled
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    return (
        <Comp className={classes} {...props}>
            {/* Thêm thẻ span để thêm icon cho button dễ css */}
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
