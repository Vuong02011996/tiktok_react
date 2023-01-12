# File svg

-   Bản chất có thể chỉ định màu cho file svg nhưng nếu link qua thẻ img sẽ không sửa được màu qua css, chỉ dùng được màu mặc định. Do đó muốn thay đổi màu icon svg khi thay đổi theme thì ta phải tạo 2 file svg rồi viết logic.
-   Nhưng ta không làm như vậy , ta sẽ dùng thẳng thẻ svg trong code. Nhưng ta không viết thẳng vào source component sử dụng, ta sẽ tạo các component cho cá icon svg riêng. Tạo file Icon/index.js viết từng component cho từng file svg.
-   Copy file svg từ trên web: chuột phải vào element svg, chuột phải copy outerHTML. pass vào file viết component. Chuyển cú pháp html -> JSX. Đưa các props muốn thay đổi từ bên ngoài làm tham số cho component.
-   ` fill="currentColor"`: để màu Icon file svg ăn theo màu của thẻ bên ngoài.

# Link trong react

-   Có hai loại link:
    -   Trong nội bộ website -> router dom
    -   link ra ngoài web khác -> href thẻ a

# Cách forwardRef từ element ra component.

-   Image component.

# Webkit: safari/ chrome/ coccoc.

# Tạo No Image trên web online và nén ảnh khi đưa lên web

-   Search create placehoder image online https://placeholder.imageonline.co/, tạo image rồi tải về.
-   Nén image để giảm kích dung lượng ảnh , để trường hợp nhiều ảnh sẽ load nặng. https://tinypng.com/(2.1kB-> 624B). Download về replace image cũ.

# Các khái niệm liên quan đến API vào gọi API trong FE và BE.

-   Các thành phần trong một API quy ước: `https://tiktok.fullstack.edu.vn/api/users/search?q=i&type=less`:
    -   `https`: phương thức. Sau phương là `://`
    -   `tiktok.fullstack.edu.vn`: host name
    -   `/api/users/search`: path
    -   `?`: phần ngăn cách
    -   `q=i&type=less`: query parameters - tham số tìm kiếm: cú pháp là cặp `key=value`. Nếu có nhiều cặp key=value thì ngăn cách các cặp bằng dấu `&`
-   Ở bài này có cặp `type=less` do người làm API thiết kế: có hai type ở đây `type=less`: lấy về tối đa 5 kết quả, `type=more`: trả về 10 kết quả tìm kiếm và có thêm thông tin phân trang để gọi lúc bấm vô icon kính search-> click accounts.
-   Cách xem lỗi, payload, của network trên devtools, ..
