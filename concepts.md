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

# Tạo No Image trên web online và nén ảnh khi đưa lên web

-   Search create placehoder image online https://placeholder.imageonline.co/, tạo image rồi tải về.
-   Nén image để giảm kích dung lượng ảnh , để trường hợp nhiều ảnh sẽ load nặng. https://tinypng.com/(2.1kB-> 624B). Download về replace image cũ.
