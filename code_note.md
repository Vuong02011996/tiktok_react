# Phân tích

## Button

-   Viết một chung một component và thêm các props để thay đổi mỗi loại button(size, màu sắc, border, ...).

# CSS

-   Căn chỉnh item ra hai đầu theo chiều ngang: `justify-content: space-between`
-   Mã màu không nên ghi thẳng vào file css vì làm light theme, dark theme sẽ khó. Nên đặt biến.
-   Những css chung cho nhiều thẻ như `border: none; outline: none;` nên reset ở globalStyles.
-   Căn chỉnh icon giữa theo chiều dọc: `top: 50%; transform: translateY(-50%);`
-   Css cho search-btn khi gõ chữ vào input: `input:not(:placeholder-shown) ~ .search-btn`
-   `spellCheck`: Bỏ check chính tả thẻ input
-   `tabindex`: bất cứ thẻ nào có border mặc định sẽ có thuộc tính này.
-   `:focus-within` : CSS pseudo-class để click vào hiện border thẻ div search
-   `caret-color`: màu dấu gạch nháy nháy trong thẻ input
-   `&:active`: css khi click vào button.
-   `object-fit: cover;` : để ảnh giữ tỉ lệ và tràn luôn hình tròn 40x40
-   `user-select: none`: bỏ select chữ trên button
-   ` pointer-events: none`: bỏ hiệu ứng chuột trên button

-   `Button component`
    -   Css font size trước rồi thay đổi padding để đạt đươc kích thước mong muốn. Vì font-size sẽ thay đổi kích thước nút.
    -   Component Link trên DOM thật vẫn thể hiện là thẻ a nhưng bỏ PreventDefault.
    -   Bấm vô link mở tab mới giữ nguyên tab hiện tại dùng thuộc tính : `target="_blank"`
    -   Add thêm nhiều class để css cho một component bằng cách: `const classes = cx('wrapper', { primary,...});`
    -   `Props children `: là một props đặc biệt của component nên phải ghi đúng chính tả mới nhận được nếu không sẽ undefine. và children sẽ nằm ở passProps.
    -   Một component có nhiều class , class nào viết CSS sau trong file css sẽ ưu tiên hơn.
    -   Tip css cho button border : `border-radius: 999px;` để 50% sẽ méo.
    -   `Custom CSS component: <Button rounded className={cx('custom-button')}>`: Dùng thêm add thêm className cho button ở component sử dụng và CSS ở component đó. Chú ý lấy field và value của className bên file Button/index.js `[className]: className,`
    -   `inline-flex vs flex`: flex nếu có hai element đứng gần nhau đều có flex sẽ rụng một cái xuống hàng mới, dùng inline-flex thì cả hai sẽ nằm trên 1 hàng.

# Thư viện

## tippyjs react

-   Sử dụng cho các popover, dropdown, ...khi hover
-   https://github.com/atomiks/tippyjs-react
