# Dự án này sẽ không response trên mobile theo query

-   Giao diện trên mobile quá khác vs PC nên sẽ sửa/ẩn rất nhiều, ảnh hưởng perfomance
-   Sử dụng kĩ thuật Agent User (phải kết hợp với BE)
-   Css không cần sử dụng grid.

# Dựng khung layout mặc định (Layout chính)

-   Sử dụng `import classNames from 'classnames/bind';` bind object styles để viết tên class thoải mái không cần theo camelCase
-   CSS cho layout chính, dùng flex.

# Xây dựng ui cho header

## Phân tích chia làm hai phần

-   Phần UI tĩnh
-   Phần UI động : khi hover chuột vào.

## UI tĩnh

-   `Cách hack file logo svg vào trong code`
    -   Copy outerHTML/elements của thẻ svg về máy.
    -   Tạo file ảnh logo.svg trong assets, dán đoạn mới copy vào. tạo file index export ra, dùng require.default
    -   Trong header layout component tạo thẻ img , src bằng đường dẫn đến file svg.
-   `Làm ô search`
    -   Xác định các element html cần có, những element chỉ cần css, bỏ đúng vị trí trong jsx.
    -   Phân tích: kích thước 361x46, thẻ input bên trong, icon closes có loading icon khi gõ, button nằm ngoài cùng. Cái gạch dưới chỉ cần CSS.
    -   Cài thư viện fontwareisome vào để dùng icon.(copy tên thư viện vào package.json -> npm i lại )
    -   Cách dùng icon từ thư viện trong react. `<FontAwesomeIcon icon={faCircleXmark} />`. Search icon trên: https://fortawesome.com/
    -   CSS.
