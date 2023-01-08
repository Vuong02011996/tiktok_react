import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://lh3.googleusercontent.com/ogw/AOh-ky3BxL-ZrdkYKD69QPzml0Ur0Z9NC-T4B8o6ZdhK=s32-c-mo"
                alt="Hoaa"
            />
            <div className={cx('infor')}>
                <h4 className={cx('name')}>
                    <span> Nguyen Van A</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}> nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;
