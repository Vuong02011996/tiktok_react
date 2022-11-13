# Tạo file .env.local

-   React đã cấu hình sẵn để đọc thông tin file này

# Dùng công cụ customize-cra để tùy chỉnh cấu hình webpack

-   Mục đích ghi đè lại cấu hình webpack mà không nhất thiết eject project.
-   [ref]
    -   (https://github.com/arackaf/customize-cra)
    -   https://github.com/timarney/react-app-rewired/
-   cra: create-react-app
-   Mặc định react đã đóng gói webpack và dấu đi.
-   Install công cụ `npm i customize-cra react-app-rewired -D` (-D) chỉ cài ở development
-   Tạo file: `config-overrides.js`
-   Đổi lệnh `react-scripts` -> `react-app-rewired` trong scripts của file package.js

# Dùng babel plugin module resolver

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

-   Tạo file .babelrc

    -   Mặc định file .babelrc sẽ không được gọi nên ta phải config trong file `config-overrides.js`
    -   Flow hoạt động như sau: khi chạy npm start trong scripts sẽ chạy lệnh `react-app-rewired` lệnh này sẽ tìm file `config-overrides.js` để xem cấu hình webpack có được ghi đè để thay đổi.

-   Tạo file `jsconfig.json` để gợi ý path: khi gõ ~/ sẽ gợi ý những thư mục con bên trong.

# Cài đặt và cấu hình Prettier trên VS Code

-   Để format code html, css , json gọn gàng hơn.
-   Cài Prettier bằng extension VS code.
-   Tạo file .prettierrc copy config ở https://github.com/sondnpt00343/tiktok-ui/commit/b0f8e67a0a37d8d0c13216f0965485ea8794c663 dán vào.
-   Tạo file .vscode/settings.json để VS biết sẽ config từ bằng file .prettierrc của Prettier

# Cấu hình sử dụng CSS, SASS

-   Tạo component GlobalStyles
-   Bọc component này cho App của chúng ta.
