### **Hướng Dẫn Frontend**

#### **1. Hệ Thống Thiết Kế**

##### **1.1 Bảng Màu**

*   **Primary** :
    *   `#000000`: **Đen** - Màu primary, sử dụng cho các text lớn (font Fauna) [1].
    *   Các màu đen khác có thể được sử dụng theo theme của Shadcn UI.
*   **Secondary** :
    *   Các màu xám khác nhau (ví dụ: `#171717`, `#262626`, `#3f3f3f`) thường được Shadcn UI sử dụng cho nền và các yếu tố phụ.
*   **Accent** :
    *   Màu xanh lá cây (ví dụ: `#4ade80`) - Sử dụng cho các thông báo thành công hoặc thưởng dự án [1, 2]. Các màu accent khác có thể được định nghĩa tùy theo nhu cầu.
*   **Neutrals** :
    *   `#ffffff`: **Trắng** - Màu nền chủ đạo [1].
    *   Các sắc độ xám khác nhau từ Shadcn UI (tham khảo tài liệu Shadcn UI).
*   **Semantic** :
    *   Success: `#4ade80` (Ví dụ) - Màu xanh lá cây cho các trạng thái thành công [3].
    *   Warning: `#facc15` (Ví dụ) - Màu vàng cho các cảnh báo [3].
    *   Error: `#f43f5e` (Ví dụ) - Màu đỏ cho các lỗi [3].
    *   Info: `#3b82f6` (Ví dụ) - Màu xanh dương cho các thông tin [3].

##### **1.2 Typography**

*   **Font Families** :
    *   Heading: **Fauna**, sans-serif (fallback) - Sử dụng cho các text lớn hiển thị tổng tài sản [1]. Các font chữ heading khác có thể được chọn từ Google Fonts hoặc font hệ thống.
    *   Body: **Inter**, sans-serif (fallback) - Font chữ body thường được Shadcn UI và nhiều ứng dụng hiện đại sử dụng.
    *   Monospace: **Menlo**, monospace (fallback) - Dùng cho code hoặc hiển thị dữ liệu dạng bảng.
*   **Font Sizes** : (Tham khảo scale Tailwind CSS được Shadcn UI sử dụng)
    *   xs: `0.75rem` (`12px`)
    *   sm: `0.875rem` (`14px`)
    *   base: `1rem` (`16px`)
    *   lg: `1.125rem` (`18px`)
    *   xl: `1.25rem` (`20px`)
    *   2xl: `1.5rem` (`24px`)
    *   3xl: `1.875rem` (`30px`)
*   **Font Weights** : (Tham khảo weights Tailwind CSS)
    *   Light: `300`
    *   Regular: `400`
    *   Medium: `500`
    *   Bold: `700`
*   **Line Heights** : (Tham khảo line heights Tailwind CSS)
    *   Tight: `1.25`
    *   Normal: `1.5`
    *   Loose: `1.75`

##### **1.3 Spacing**

*   **Scale** : (Tham khảo scale Tailwind CSS được Shadcn UI sử dụng, đơn vị thường là `rem`)
    *   0: `0`
    *   1: `0.25rem` (`4px`)
    *   2: `0.5rem` (`8px`)
    *   3: `0.75rem` (`12px`)
    *   4: `1rem` (`16px`)
    *   5: `1.25rem` (`20px`)
    *   6: `1.5rem` (`24px`)
    *   8: `2rem` (`32px`)
    *   10: `2.5rem` (`40px`)
    *   12: `3rem` (`48px`)
    *   16: `4rem` (`64px`)
    *   20: `5rem` (`80px`)
    *   24: `6rem` (`96px`)

##### **1.4 Border Radius**

*   **Scale** : (Tham khảo scale Tailwind CSS được Shadcn UI sử dụng)
    *   none: `0px`
    *   sm: `0.125rem` (`2px`)
    *   md: `0.375rem` (`6px`)
    *   lg: `0.5rem` (`8px`)
    *   full: `9999px`

##### **1.5 Shadows**

*   **Scale** : (Tham khảo scale Tailwind CSS được Shadcn UI sử dụng)
    *   sm: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
    *   md: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
    *   lg: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
    *   xl: `0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`

##### **1.6 Breakpoints**

*   **Screen Sizes** : (Tham khảo breakpoints Tailwind CSS được Shadcn UI sử dụng)
    *   sm: `640px`
    *   md: `768px`
    *   lg: `1024px`
    *   xl: `1280px`
    *   2xl: `1536px`

#### **2. Thư Viện Icon**

##### **2.1 Icon Sets**

*   **Primary Icon Set** : **React Icons** [4] (hoặc một thư viện icons phù hợp khác như Heroicons, Feather Icons).
*   **Additional Icons** : Tùy thuộc vào nhu cầu dự án.

##### **2.2 Kích Thước Icon**

*   xs: `0.75rem` (`12px`)
*   sm: `0.875rem` (`14px`)
*   md: `1rem` (`16px`)
*   lg: `1.25rem` (`20px`)
*   xl: `1.5rem` (`24px`)

##### **2.3 Sử Dụng Icon**

*   Sử dụng các component icon từ thư viện đã chọn.
*   Chỉ sử dụng icon khi nó mang lại giá trị rõ ràng cho UI (ví dụ: biểu thị một hành động hoặc trạng thái).
*   Kết hợp icon với text một cách nhất quán để tăng cường khả năng hiểu. Đảm bảo căn chỉnh phù hợp.

#### **3. Components**

##### **3.1 Button**

*   **Variants** : (Tham khảo các component `Button` trong Shadcn UI)
    *   Primary: Nút hành động chính, thường có màu đen [1].
    *   Secondary: Nút hành động phụ, có thể có màu xám hoặc outline.
    *   Tertiary: Nút ít quan trọng hơn, có thể là text link hoặc ghost button.
    *   Ghost: Nút không có background, chỉ hiển thị border (nếu có) và text.
    *   Danger: Nút cho các hành động nguy hiểm (ví dụ: xóa), thường có màu đỏ.
*   **Sizes** : (Tham khảo các props size của component `Button` trong Shadcn UI)
    *   Small: Kích thước nhỏ cho các vị trí hẹp hoặc các nút ít quan trọng.
    *   Medium: Kích thước mặc định.
    *   Large: Kích thước lớn hơn cho các nút hành động chính.
*   **States** : (Các style cho các trạng thái nên được định nghĩa trong component)
    *   Default: Trạng thái bình thường.
    *   Hover: Hiển thị khi người dùng di chuột qua.
    *   Focus: Hiển thị khi nút được focus (ví dụ: bằng phím Tab).
    *   Active: Hiển thị khi nút đang được click.
    *   Disabled: Hiển thị khi nút không thể tương tác.
*   **Khi nào sử dụng** :
    *   Để thực hiện một hành động hoặc điều hướng đến một trang khác.
    *   Cho các tương tác chính trong ứng dụng.

##### **3.2 Input**

*   **Variants** : (Tham khảo các component `Input` trong Shadcn UI)
    *   Default: Kiểu input tiêu chuẩn.
    *   Filled: Input có background màu.
    *   Flushed: Input chỉ có đường gạch chân.
    *   Unstyled: Input không có style mặc định.
*   **States** : (Các style cho các trạng thái nên được định nghĩa trong component)
    *   Default: Trạng thái bình thường.
    *   Focus: Hiển thị khi input được focus.
    *   Error: Hiển thị khi có lỗi validation.
    *   Disabled: Hiển thị khi input không thể chỉnh sửa.
*   **With Addons** : (Sử dụng flexbox hoặc grid để kết hợp)
    *   Icon: Thêm icon vào bên trái hoặc bên phải input (ví dụ: icon $CBK$, $USDT$ [5]).
    *   Button: Thêm button vào bên phải input (ví dụ: button "max" [5]).
    *   Dropdown: Kết hợp input với dropdown để chọn giá trị.

##### **3.3 Card**

*   **Variants** : (Tham khảo các component `Card` trong Shadcn UI)
    *   Default: Card tiêu chuẩn với border và background.
    *   Elevated: Card có shadow để tạo cảm giác nổi.
    *   Outlined: Card chỉ có border.
    *   Compact: Card có padding nhỏ hơn.
*   **Anatomy** : (Các phần nên được style linh hoạt)
    *   Header: Tiêu đề của card.
    *   Body: Nội dung chính của card.
    *   Footer: Các hành động hoặc thông tin bổ sung ở cuối card.
    *   Media: Hình ảnh hoặc video hiển thị trong card.

#### **4. Layout & Grid System**

##### **4.1 Container**

*   **Max Widths** : (Tham khảo max widths Tailwind CSS được Shadcn UI sử dụng)
    *   sm: `640px`
    *   md: `768px`
    *   lg: `1024px`
    *   xl: `1280px`
    *   fluid: `100%`

##### **4.2 Grid**

*   **Columns** : Sử dụng hệ thống cột linh hoạt của Tailwind CSS (ví dụ: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
*   **Gutters** : Sử dụng các class padding và margin của Tailwind CSS (ví dụ: `gap-4`).
    *   Horizontal: Khoảng cách giữa các cột.
    *   Vertical: Khoảng cách giữa các hàng.
*   **Breakpoint Behavior** : Sử dụng tiền tố breakpoint của Tailwind CSS (ví dụ: `md:`, `lg:`) để thay đổi layout ở các kích thước màn hình khác nhau.

##### **4.3 Flexbox Patterns**

*   Sử dụng các class flexbox của Tailwind CSS (`flex`, `flex-row`, `flex-col`, `items-*`, `justify-*`, `space-x-*`, `space-y-*`).
*   Flexbox thường được sử dụng cho việc sắp xếp các item trong một chiều (hàng hoặc cột).
*   Khi cần sắp xếp phức tạp hơn theo cả hai chiều, hãy sử dụng Grid.

##### **4.4 Common Layouts**

*   **List View** : Sử dụng grid hoặc flexbox để hiển thị danh sách các item (ví dụ: lịch sử giao dịch [2], danh sách member [6]).
*   **Dashboard** : Sử dụng grid để tạo layout nhiều cột cho các widget thống kê (ví dụ: trang Admin [6]).
*   **Form** : Sử dụng grid hoặc flexbox để sắp xếp các label và input một cáchClear.
*   **Landing Page** : Sử dụng các section với container và grid/flexbox để tạo bố cục hấp dẫn.

#### **5. Animation & Transitions**

##### **5.1 Timing**

*   **Duration** : (Tham khảo các giá trị duration thường dùng hoặc thư viện animation như Framer Motion [7])
    *   Fast: `150ms` - `200ms`
    *   Normal: `300ms` - `400ms`
    *   Slow: `500ms` - `700ms`
*   **Easing** : (Tham khảo các giá trị easing thường dùng hoặc thư viện animation)
    *   Linear: `linear`
    *   Ease-in: `cubic-bezier(0.4, 0, 1, 1)`
    *   Ease-out: `cubic-bezier(0, 0, 0.2, 1)`
    *   Ease-in-out: `cubic-bezier(0.4, 0, 0.2, 1)`

##### **5.2 Transition Patterns**

*   **Fade** : Thay đổi độ mờ (opacity).
*   **Slide** : Di chuyển element vào hoặc ra khỏi màn hình.
*   **Scale** : Thay đổi kích thước của element.
*   **Combination** : Kết hợp nhiều hiệu ứng (ví dụ: fade và slide).

##### **5.3 Khi Nào Sử Dụng Animation**

*   Để cung cấp phản hồi trực quan cho người dùng (ví dụ: hover trên User menu button [2]).
*   Để làm cho các chuyển đổi giữa các trạng thái hoặc trang mượt mà hơn.
*   Để thu hút sự chú ý đến các yếu tố quan trọng (nhưng không nên lạm dụng).
*   Tránh sử dụng animation quá mức có thể gây xao nhãng hoặc làm chậm trải nghiệm người dùng.

#### **6. Responsive Design**

##### **6.1 Mobile-First Approach**

*   Bắt đầu thiết kế và xây dựng giao diện cho kích thước màn hình nhỏ nhất trước.
*   Sử dụng các class modifier của Tailwind CSS (ví dụ: `md:`, `lg:`) để áp dụng các style cho màn hình lớn hơn.
*   Đảm bảo tất cả các tính năng đều hoạt động tốt trên các thiết bị di động.

##### **6.2 Common Patterns**

*   **Navigation** :
    *   Mobile: Sử dụng menu hamburger hoặc bottom navigation.
    *   Tablet: Có thể hiển thị một phần hoặc toàn bộ navigation bar.
    *   Desktop: Hiển thị navigation bar đầy đủ ở header hoặc sidebar.
*   **Layout** :
    *   Mobile: Bố cục thường là một cột duy nhất.
    *   Tablet: Có thể sử dụng bố cục hai cột hoặc điều chỉnh kích thước các phần tử.
    *   Desktop: Sử dụng bố cục nhiều cột phức tạp hơn.

##### **6.3 Touch Targets**

*   Kích thước tối thiểu cho touch targets nên là **44x44 pixel** để đảm bảo dễ dàng tương tác trên thiết bị cảm ứng.
*   Đảm bảo có đủ khoảng cách giữa các touch targets để tránh việc người dùng vô tình click vào phần tử không mong muốn.

#### **7. Code Conventions**

##### **7.1 Naming Conventions**

*   **Components** : Sử dụng PascalCase (ví dụ: `UserProfile`, `TransactionHistory`).
*   **Files** : Sử dụng camelCase hoặc kebab-case (ví dụ: `userProfile.js`, `transaction-history.module.css`).
*   **CSS Classes** : Sử dụng kebab-case (ví dụ: `user-avatar`, `transaction-item`). Với Tailwind CSS, chủ yếu sử dụng các class utility.
*   **Variables** : Sử dụng camelCase (ví dụ: `totalAssets`, `isLoggedIn`).

##### **7.2 File Structure**

*   `components`: Chứa các component UI tái sử dụng.
    *   `common`: Các component UI chung (Button, Input, Card).
    *   `specific`: Các component UI cho các trang cụ thể (PortfolioCard, AdminTable).
*   `pages`: Chứa các component đại diện cho các trang (PortfolioPage, DetailedPortfolioPage).
*   `hooks`: Chứa các custom React hooks.
*   `utils`: Chứa các hàm tiện ích.
*   `assets`: Chứa các tài nguyên tĩnh (hình ảnh, icons).
*   `styles`: Chứa các file CSS/SCSS global hoặc module.

##### **7.3 Component Organization**

*   Sắp xếp các imports ở đầu file theo thứ tự: thư viện bên ngoài, thư viện cục bộ, styles.
*   Định nghĩa state variables và các hàm xử lý sự kiện.
*   Sử dụng destructuring props để code rõ ràng hơn.
*   Chia các component lớn thành các component nhỏ hơn, tái sử dụng được.
*   Hạn chế kích thước component để dễ bảo trì và đọc hiểu.

##### **7.4 Styling Approach**

*   Sử dụng **Tailwind CSS** [4] cho phần lớn styling thông qua các class utility trực tiếp trong JSX.
*   Có thể sử dụng **CSS Modules** cho các style đặc thù của component mà Tailwind CSS không cung cấp hoặc khi cần đóng gói style.
*   Tuân thủ nguyên tắc **atomic CSS** của Tailwind CSS để đảm bảo tính nhất quán và dễ bảo trì.

#### **8. Accessibility Guidelines**

##### **8.1 Semantic HTML**

*   Sử dụng các thẻ HTML semantic (ví dụ: `<article>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<main>`) để cấu trúc nội dung một cáchClear và có ý nghĩa.
*   Sử dụng thẻ heading (`<h1>` đến `<h6>`) theo đúng thứ tự để tạo cấu trúc logic cho trang.
*   Sử dụng thẻ `<p>` cho đoạn văn bản.

##### **8.2 ARIA Attributes**

*   Sử dụng các thuộc tính ARIA (Accessible Rich Internet Applications) để cung cấp thêm thông tin ngữ nghĩa cho các phần tử HTML, đặc biệt là các phần tử JavaScript-enhanced.
*   Sử dụng `aria-label` cho các icon buttons hoặc các phần tử không có text label.
*   Sử dụng `aria-expanded`, `aria-controls`, `aria-hidden` cho các phần tử có trạng thái đóng/mở.
*   Sử dụng `role` để chỉ định vai trò của một phần tử.

##### **8.3 Keyboard Navigation**

*   Đảm bảo người dùng có thể điều hướng toàn bộ ứng dụng bằng bàn phím (sử dụng phím Tab để di chuyển giữa các phần tử có thể focus).
*   Đảm bảo các phần tử tương tác (buttons, links, input fields) đều có thể nhận focus.
*   Cung cấp chỉ báo focus rõ ràng (thường là một đường viền) để người dùng biết phần tử nào đang được focus.

##### **8.4 Color Contrast**

*   Đảm bảo tỷ lệ tương phản màu sắc giữa text và background đáp ứng các tiêu chuẩn WCAG (Web Content Accessibility Guidelines) (tối thiểu **4.5:1** cho text thường và **3:1** cho text lớn).
*   Sử dụng các công cụ kiểm tra độ tương phản màu sắc để đảm bảo tuân thủ.

#### **9. Performance Guidelines**

##### **9.1 Image Optimization**

*   Sử dụng hình ảnh với kích thước phù hợp với kích thước hiển thị.
*   Tối ưu hóa hình ảnh bằng các công cụ nén để giảm dung lượng file.
*   Sử dụng định dạng hình ảnh phù hợp (ví dụ: WebP cho hình ảnh tĩnh và động nếu trình duyệt hỗ trợ, JPEG cho ảnh, PNG cho hình ảnh có độ trong suốt).
*   Áp dụng **lazy loading** cho hình ảnh không nằm trong viewport ban đầu để cải thiện thời gian tải trang [8].

##### **9.2 Code Splitting**

*   Sử dụng tính năng **code splitting** của Next.js [9] để chia ứng dụng thành các bundle nhỏ hơn, chỉ tải mã cần thiết cho trang hiện tại.
*   Sử dụng **dynamic imports** cho các component hoặc module không cần thiết ngay khi tải trang [8].

##### **9.3 Bundle Size Management**

*   Thường xuyên kiểm tra bundle size của ứng dụng bằng các công cụ như `webpack-bundle-analyzer`.
*   Loại bỏ mã không sử dụng (dead code).
*   Tối ưu hóa imports để chỉ import những gì cần thiết từ các thư viện.
*   Cân nhắc sử dụng các thư viện nhỏ gọn hơn nếu có các lựa chọn tương đương.
