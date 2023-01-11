# Phân tích

-   FE React sẽ chia làm 2 phần sẽ làm từng phần riêng:
    -   Phần UI(component/html/CSS)
    -   Phần Logic(data flow, redux, hooks, ...)
-   Tối ưu useCallback, useMemo sẽ làm khi viết logic(State). Còn khi làm UI chưa cần quan tâm.

-   Code trong header, sidebar, content đều nằm trong Layout.
-   `Các bước thêm một chức năng giao diện mới(VD dấu 3 chấm setting)`:

    -   B1: Tìm vị trí code cần thêm element mới vào, thêm element cần thêm vào chỗ đó.(Button có icon ba chấm bên trong).
    -   B2: Suy nghĩ các component nào cần cho giao diện đó, component nào dùng lại được , component cần viết mới. Lần đầu có thể viết chung tại vị trí cần thêm vào và tách ra các file component riêng sau.
    -   B3: CSS cho từng thành phần thêm vào.
    -   B4: Check kiểm tra.

-   `Cách đặt vị trí code element và liên  kết element giữa các component`:
    -   Phân tích khi chỉ vô hiện memu thì dùng tippy. Component menu dùng tippy nên có thể viết trong component Popper.
    -   Những element(button 3 chấm) dùng trong component riêng (Menu Tippy)nhưng vị trí là một component khác (button 3 chấm của header) thì thêm props children cho component Menu Tippy để thêm element từ bên ngoài vào.(component Menu cần children button từ header đưa vào)
-   `Cách chia component`:

    -   MenuItem trong component Menu có thể có nhiều loại menuItem khác nhau , nội dụng khác nhau nên tạo thêm component MenuItem riêng và truyền vào component Menu chớ không nên viết chung vô component Menu. Và những component MenuItem sẽ đều dùng trong component Menu nên viết chung trong folder Menu và import bằng `./` và viết chung CSS với trong component Menu.

-   Cách thay đổi giao diện header khi có login hoặc không, khi có login thì sẽ có `biến current_user` dựa vào biến này để hiển thị giao diện header là đã login hay chưa login.

-   Từ button close muốn focus vào thẻ input khi click vào thì phải get được DOM element của thẻ input. Get DOM của một element trong React thì ta dùng hook useRef là nhanh nhất.

# Component

## Button

-   Viết một chung một component và thêm các props để thay đổi mỗi loại button(size, màu sắc, border, ...).

## Image

-   `forwardRef`: Thư viện tippy cần vị biết vị trí của element mà nó bao lại để hiển thị vị trí box.Mặc định các thẻ html (img) đã có thuộc tính ref, dựa vào đó tippy sẽ biết tọa độ element trong DOM. Còn component Image của chúng ta không có nên tippy sẽ báo warning nên ta cần forwardRef cho component Image. Có hai cách:
    -   Dùng HOC : `forwardRef(tên_component)`: vẫn còn warning thiếu ref
    -   Dùng cách 2: Trong Image component.

## Search - kĩ thuật tách component để tối ưu hiệu suất khi render. Tránh render lại component bự.

-   Ban đầu Phần search nằm trong component Header , do đó khi state của phần search thay đổi sẽ render lại cả component Header cả logo với actions button. Do đó nên tách compopent Search ra để chỉ render lại một component Search khi state phần search thay đổi.
-   Cách tách (copy code) nhanh:
    -   Tạo component mới (ffc) -> Tách JSX sang , copy những biến và state qua trước.
    -   Copy nguyên phần import qua, xóa những import không dùng.
    -   Copy CSS qua(chú ý CSS ở component bự phải luôn viết theo từng phần để dễ copy)

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
    -   `(key.startsWith('on') && typeof props[key] === 'function')`: cách check 1 props của component có phải là event(onClick, onMount, ...)

-   ` Custom button css selector`: nếu css không ăn do độ ưu tiên thì viết bên trong thẻ bao bọc để thêm điểm độ ưu tiên cao hơn khi với css trong component button.
-   `Hiển thị list có icon`: kích thước mỗi icon khác nhau dấn đến vị trí title phía sau sẽ bị thay đổi. Do đó phải set kích thước cố định cho tất cả các icon. Để set được width phải có display.
-   Title của header menu cố định một chỗ khi cuộn nên dùng `position: absolute;`

-   Khi display flex, item có nội dung nhiều sẽ cố gắng chiếm diện tích làm những phần khác co lại(header trong menu đa cấp) do đó để không cho co lại ta dùng `flex-shinks: 0` cho header.
-   `overflow-y: auto;`: enable khi cuộn thẻ div. Dùng `overflow-y: overlay` khi muốn phần thanh cuộn nổi lên trên và không có khoảng cách với content bên trái.
-   Cách copy CSS của thanh scrollbar trên tiktok -> nằm trên thẻ body.

# Code JS

-   Mẹo convert một biến khác undefine sang true: `!!item.children`, nếu undefine sẽ là false.
-   Code ES6 đổi tên tham số khi truyền vào hàm(fallback->customFallBack): `fallback: customFallBack = images.noImage`

## Array:

-   Lặp tất cả key của một object: `Object.keys(props).forEach()`
-   Xoá phần tử cuối cùng và trả về những phần tử chưa xóa: `history.slice(0, history.length - 1)` - cắt mảng

## API

-   Gọi API: Dùng template string để gọi api với tham số thay đổi.
    -   `https://tiktok.fullstack.edu.vn/api/users/search?q=${searchValue}&type=less`
    -   Chú ý check các trường hợp người dùng nhập vào: space, ?, & , ... sử dụng `encodeURIComponent` để chuyển các kí tự đặc biệt sang %number.
-   Kĩ thuật `debounce`: khi có một chuối hành động diễn ra chỉ lấy hành động sau cùng.gọi API với hành động cuối cùng.

-   `Axios`:

    -   Các cách gọi API: XMLHttpRequest, fetch, ...
    -   Các thư viện tương tự `superagent`(https://github.com/ladjs/superagent), ...
    -   Axios tự động parse json nên ít hơn 1 `.then` so với fetch.
    -   Cách dùng:

        -   `const axios = require('axios')` CommomJS chuyển sang ES6 `import axios from 'axios';`

    -   Các tính năng:

        -   Tạo `instance`: dùng để custom config khi gọi nhiều domain API trong một trang web, mỗi instance để config cho một domain.
        -   `Config default`: Login xử lí token, config header, ..
        -   `Interceptors`: biết người dùng hết quyền đăng nhập hay chưa, ..

    -   Format source code:
        -   `request axios` của `utils` sẽ được dùng ở `apiServices` chớ không dùng ở component, component sẽ dùng các service ở apiServices để gọi API.
        -   `import * as request from '~/utils/request';` export lẻ thì dùng `*` để đưa vào object `request` rồi chấm.

## Router DOM

-   Đổi element (thẻ div) sang thẻ router-dom Link với to
-   `{ path: '/@:nickname', component: Profile },` cách config router với patern(nickname) thay đổi

# Thư viện

## tippyjs react

-   Sử dụng cho các popover, dropdown, ...khi hover
-   Khi chỉ vô hiện Menu.
-   import Tippy -> Dùng component này bọc lại element muốn rê vào hiện menu lên.
-   Các props hay sử dụng:

    -   Thay đổi vị trí dùng props `placement:bottom-end`
    -   Animation ẩn hiện: `delay = [show, hide] = [0, 700]`; 700ms
    -   Khi ẩn tippy đi thì làm gì: `onHide={callback}`
    -   Dịch chuyển khung tippy: ` offset={[14, 8]}` dịch sang phải 14px, xuống dưới 8px.
    -   Click vào không ẩn khung tippy: `hideOnClick	: false`

-   `Error:`:
    -   1.  Warning: Interactive tippy element may not be accessible. Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        -   Thêm props: `appendTo={() => document.body}`. Cách 1 khi scrollbar bị dựt dựt tippy.
        -   Cách 2: dùng thẻ div hoặc span bọc lại thẻ tippy.
    -   2.
-   https://github.com/atomiks/tippyjs-react

# Tree

-   `src/routes`: xác định những tuyến đường đi đâu
-   `config/routes.js`: define những tuyến đường, tránh hardcode tuyến đường trong các components.
-   Đổi `favicon.ico`, title page trong thư mục public/index.html, `public/favicon.icon`
