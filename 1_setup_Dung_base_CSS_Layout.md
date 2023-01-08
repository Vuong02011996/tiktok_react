# Setup

## Tạo file .env.local

-   React đã cấu hình sẵn để đọc thông tin file này
-   Cấu hình các biến môi trường như PORT chạy trên localhost...

## Dùng công cụ customize-cra để tùy chỉnh cấu hình webpack khi cần thiết

-   Mục đích ghi đè lại cấu hình webpack khi cần thiết mà không nhất thiết eject project.
-   [ref]
    -   (https://github.com/arackaf/customize-cra)
    -   https://github.com/timarney/react-app-rewired/
-   cra: create-react-app
-   Mặc định react đã đóng gói webpack và dấu đi.
-   Install công cụ `npm i customize-cra react-app-rewired -D` (-D) chỉ cài ở development
-   Tạo file: `config-overrides.js`
-   Đổi lệnh `react-scripts` -> `react-app-rewired` trong scripts của file package.js

## Dùng babel plugin module resolver để chuyển đổi cú pháp import nhiều dấu ../ thành alias.

-   https://github.com/tleunen/babel-plugin-module-resolver
-   Mục đích để thay thể import `../../../../utils/my-utils` babel sẽ chuyển thành cú pháp `utils/my-utils`
-   Install: `npm install --save-dev babel-plugin-module-resolver`
-   Lưu ý sau khi cài thư viện xong check trong file package.json

    ```
        "devDependencies": {
        "babel-plugin-module-resolver": "^4.1.0",
        "customize-cra": "^1.0.0",
        "react-app-rewired": "^2.2.1"
    }
    ```

-   Tạo file .babelrc: thay đổi alias muốn dùng.

-   Tạo file `jsconfig.json` (`"~/*": ["src/*"]`) để gợi ý path: khi gõ ~/ sẽ gợi ý những thư mục con bên trong.

-   File .babelrc sẽ không tự động load vào webpack ta phải cấu hình thêm cấu hình webpack ở file `config-overrides.js`:

    -   Mặc định file .babelrc sẽ không được gọi nên ta phải config trong file `config-overrides.js`
    -   Flow hoạt động như sau: khi chạy npm start trong scripts sẽ chạy lệnh `react-app-rewired` lệnh này sẽ tìm file `config-overrides.js` để xem cấu hình webpack có được ghi đè để thay đổi. Biến override sẽ nhận lại hoàn toàn cấu hình webpack đã ẩn đi để chạy. chũng ta có thể cấu hình thêm thay đổi của chúng ta qua biến này. ở đây ta muốn thêm file .babelrc vào.
    -   Có rất nhiều thay đổi thông qua customize-cra ở đây: https://github.com/arackaf/customize-cra/blob/master/api.md (ta muốn cấu hình file .bablerc thì đọc `useBabelRc()`)

## Cài đặt và cấu hình Prettier trên VS Code

-   Để format code html, css , json gọn gàng hơn.
-   Cài Prettier bằng extension VS code.
-   Tạo file .prettierrc copy config ở https://github.com/sondnpt00343/tiktok-ui/commit/b0f8e67a0a37d8d0c13216f0965485ea8794c663 dán vào.
-   Tạo file .vscode/settings.json để VS biết sẽ config từ bằng file .prettierrc của Prettier

# Dựng base

## Cấu hình sử dụng CSS, SASS, dự án này dùng css module(mỗi component mỗi file module css)

-   Tạo component GlobalStyles để viết chung các CSS cho tất cả component ở đây
    -   Tạo GlobalStyles component
    -   Cài đặt thư viện SASS: npm i -D sass
    -   Reset CSS
        -   search: `reset css normalize npm`, sử dụng `npm install --save normalize.css`
    -   Default CSS: font-family, font-size, line-height
-   Bọc component này cho App của chúng ta.

## Cấu hình router layout(bố cục) cho dự án

-   Phân tích tổng quan layout
    -   Click bao quát tất cả các button xem có bao nhiêu layout(setting, profile, tai khoản,...).
    -   Layout nào chính(dùng đi dùng lại nhiều lần)
    -   Ở đây layout chính gồm: phần header ở trên, phần content bên dưới, content chia hai phần, sidebar bên trái, nội dung chính bên phải.
-   Cài đặt react router dom: `npm i react-router-dom`
    -   Install
    -   Trong file App, import `BrowserRouter, Routes, Route`, cấu hình path,...
-   Đưa cấu hình router ra ngoài - vào file app
    -   Trường hợp trang web có nhiều layout(hàng trăm), thì ta không config hết trong file App
    -   Tạo file routes/index.js
    -   File này chứa hai array
        -   Một cái chứa các router không cần đăng nhập(publicRoutes)
        -   Một cái chứa các router phải đăng nhập nếu không sẽ lái sang trang login(privateRoutes)
    -   `Khi thêm một trang mới ta chỉ cần làm hai bước`:
        -   B1: Tạo pages mới (copy Home)
        -   B2: thêm path trong file routes/index.js
-   Xây dựng cơ chế tải layout.
    -   Xây dựng DefaultLayout cho layout chính
