import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import classNames from 'classnames';
import styles from './Image.module.scss';

const Image = forwardRef(({ alt, src, className, fallback: customFallBack = images.noImage, ...props }, ref) => {
    // customFallBack: ảnh custom truyền từ bên ngoài vào khi bị lỗi.

    // fallback sai sẽ gọi lại
    // Mặc định sẽ lấy src (chuỗi rỗng || src)
    // Nếu lỗi fallBack sẽ có giá trị nên lấy fallBack
    const [fallback, setFallback] = useState('');
    const handleError = () => {
        setFallback(customFallBack);
    };
    return (
        <img
            alt={alt}
            src={fallback || src}
            className={classNames(styles.wrapper, className)} // mặc định sẽ ăn css từ wrapper , custom sẽ ăn thêm css className truyền vào
            ref={ref}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;
