import Header from '~/layouts/components/Header';

// Phần content có thể thay đổi ta đưa từ bên ngoài vào qua children
// Header và sideBar là thành phần tĩnh
function HeaderOnly({ children }) {
    // Layout chính(default layout) gồm các thành phần: header, container-sidebar/content
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content"> {children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
