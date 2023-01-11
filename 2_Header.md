# Dự án này sẽ không response trên mobile theo query

-   Giao diện trên mobile quá khác vs PC nên sẽ sửa/ẩn rất nhiều, ảnh hưởng perfomance
-   Sử dụng kĩ thuật Agent User (phải kết hợp với BE)
-   Css không cần sử dụng grid.

# Dựng khung layout mặc định (Layout chính)

-   Sử dụng `import classNames from 'classnames/bind';` bind object styles để viết tên class thoải mái không cần theo camelCase
-   CSS cho layout chính, dùng flex.

# 1 Xây dựng ui cho header

## Phân tích chia làm hai phần

-   Phần UI tĩnh: 3 Phần Logo-> Search Input -> Actions button.
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

# 2 Xây dựng logic cho phần Header.

-   Có 3 Phần UI :
    -   Phần logo không có logic
    -   Phần search
    -   Phần actions button

## Search

-   Gõ vào hiện nút close, bấm vào close sẽ xóa phần chữ gõ và focus vào thẻ input.
    -   Two way biding: Khi input thay đổi thì state thay đổi, khi state thay đổi thì input cũng thay đổi.
    -   Check state searchValue có giá trị hay không để handle logic.
    -   Get DOM element của thẻ input để focus vào.
-   Hiện tippy result search phải có hai điều kiện:

    -   Có kết quả tìm kiếm: searchResult > 0
    -   Có focus vào ô input : dùng state showResult

-   Xử lí phần gõ vào input liên tục gọi API: sử dụng `useDebounce`
    -   Sẽ sinh ra các vấn đề như: API request liên tục lên server , mạng chập chờn làm api gọi sau xong trước api gọi trước nên hiển thị kết quả sai, ...
    -   Dùng kĩ thuật `debounce` khi người dùng ngừng gõ từ 500ms -> 800ms

# Fix lỗi

-   Không cho gõ space
-   Bấm vào button search -> focus vào ô input
    -   không chuyển `&:focus-within` ra thẻ input được
    -   Dùng onMounDown và prevenDefault
-   Header không cố định có menu đa cấp có nhiều item.
-   `Content menu đa cấp không cuộn` khi có nhiều nội dung do 2 nguyên nhân:
    -   Không có height cố định
    -   Nội dung cuộn là box con bên trong nhưng box cha không có display: flex;

# Tái cấu trúc và tối ưu code

-   apiServices -> services
-   src/components/Layout -> src/layouts
-   Tạo file index trong routes config
-   Tạo file env, đưa cấu hình baseUrl ra .env.development
