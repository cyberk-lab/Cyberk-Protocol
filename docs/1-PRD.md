# Project Requirements Document (PRD)

<!-- Template cho tài liệu PRD (Project Requirements Document) -->

Tài liệu này mô tả các yêu cầu cho ứng dụng Cyberk DApp, một ứng dụng dành cho các thành viên của công ty Cyberk. Ứng dụng này nhằm mục đích hiển thị phần thưởng dưới dạng token $CBK dưới dạng portfolio, từ đó khuyến khích các thành viên Cyberk tích cực sử dụng ứng dụng. Ứng dụng cũng cung cấp các tính năng khác như xem chi tiết tài sản, lịch sử giao dịch, hoán đổi $CBK sang USDT (và ngược lại) dựa trên tỷ giá từ smart contract, quản lý thành viên (chỉ dành cho admin) và hệ thống huy hiệu kỹ năng theo lộ trình.

## 1. Tổng Quan Ứng Dụng

Cyberk DApp là một ứng dụng phi tập trung (DApp) dành cho các thành viên của công ty Cyberk [1]. DApp này có nhiệm vụ hiển thị phần thưởng dưới dạng token $CBK dưới dạng portfolio, khuyến khích các thành viên Cyberk tích cực sử dụng ứng dụng [1].

### 1.1 Mục Đích

1. Giữ chân nhân viên bằng đồng token $CBK và cơ chế gamification tạo cảm giác member cyberk luôn được hưởng lợi từ hoạt động sử dụng dapp
2. Ghi nhận đóng góp của member bằng cơ chế Badged bằng NFT, Các NFT là các danh hiệu mà member có thể đạt được trong quá trình đóng góp cho công ty
3. Cung cấp một giao diện trực quan để thành viên Cyberk theo dõi tài sản $CBK và các phần thưởng khác.
4. Tạo động lực cho các thành viên bằng cách hiển thị phần thưởng và lộ trình phát triển kỹ năng.
5. Cung cấp các công cụ cho phép thành viên quản lý tài sản $CBK, bao gồm cả việc hoán đổi sang USDT dựa trên tỷ giá thực tế từ smart contract
6. Hỗ trợ quản trị viên trong việc quản lý thành viên và phân phối thưởng.

### 1.2 Mô Tả

<!-- Mô tả chi tiết hơn về ứng dụng, giải quyết vấn đề gì, đối tượng người dùng là ai -->
1. Ứng dụng là một web hõ trợ mobile. tập trung vào người dùng là member cyberk, (nhân viên công ty cyberk). Họ là các nhân viên có tay nghê cao (Lập trình viên, Designer) có trình độ cao, top thế giới,
2. Dapp là một kênh để chia sẻ lợi nhuận của công ty dứoi hình thức đồng token $CBK nhằm mục đích giữ chân nhân viên.  
3. Dapp là nơi ghi nhân các đòng góp của member bằng Huy hiệu (Badge) dưới dạng NFT.
4. Dapp là nơi lưu giữ các kỷ niệm của cộng ty.
5. Dapp cho phép khách hàng thưởng nóng cho các member thông qua link: project Member.
6. Thành viên Cyberk: Những người sử dụng ứng dụng để xem phần thưởng, quản lý tài sản $CBK và theo dõi lộ trình phát triển kỹ năng.
7. Quản trị viên Cyberk: Những người sử dụng các chức năng quản trị để thêm/bớt thành viên, cấu hình thưởng và theo dõi thông tin hệ thống.

### 1.3 Định Vị Thị Trường

<!-- Ứng dụng này khác biệt gì so với các giải pháp hiện có -->
1. Là sản phẩm dành riêng cho một cộng đồng là Nhân viên, Thành viên công ty Cyberk,

### 1.4 Đối tượng người dùng

- **Thành viên Cyberk:** Những người nắm giữ tài sản và nhận thưởng bằng token $CBK [3].
- **Quản trị viên Cyberk:** Người có quyền thêm/bớt thành viên, quản lý tài sản hệ thống và cấu hình các thông số [1, 4-6].

## 2. User Flows Chính

1. Authentication: Là tính năng login vào daap sử dụng google, hoặc metamask trên mạng ETH.
2. My Portfolio: Là tính năng hiển thị chi tiết các loại tài sản mà người dùng sở hữu.

## 2.1 User Flow: Xem Portfolio Tổng Quan

1. **Người dùng đã đăng nhập thành công.**
2. **Hệ thống hiển thị trang Portfolio mặc định.** [1]
3. **Hiển thị:**
    - **Tổng tài sản theo VND** (text lớn, tăng liên tục theo thời gian thực). [2, 3]
    - **Nút để chuyển đổi hiển thị giữa VND và $CBK$.** [2]
    - **Biểu đồ giá token $CBK$ theo thời gian.** [3]
    - **Lịch sử giao dịch gần đây** (ví dụ: thưởng dự án). [1]
        - **Text lớn +số tiền thưởng** (màu xanh lá cây). [1]
        - **Text nhỏ: số lượng $CBK$ tương ứng.** [1]
        - **Ngày giao dịch** (ngẫu nhiên trong tháng 2/2025). [4]

### 2.2 User Flow: Xem Portfolio Chi Tiết

1. **Người dùng đang ở trang Portfolio Tổng Quan.**
2. **Người dùng click vào một tùy chọn (ví dụ: trong user menu hoặc một khu vực hiển thị thông tin chi tiết).** (Giả định dựa trên nhu cầu xem chi tiết)
3. **Hệ thống hiển thị trang Detailed Portfolio.** [1]
4. **Hiển thị tên của User.** [4]
5. **Hiển thị chi tiết các loại tài sản:** [2]
    - **Lương tháng 13:**
        - **Số tiền VND** (ví dụ: 3000000đ). [2]
        - **Text nhỏ: số lượng $CBK$ tương ứng** (ví dụ: 12000 $CBK$). [2]
    - **$CBK$:**
        - **Số tiền VND** (ví dụ: 12000000đ). [2]
        - **Text nhỏ: số lượng $CBK$ tương ứng** (ví dụ: 480000 $CBK$). [2]
    - **Thưởng dự án:**
        - **Số tiền VND** (ví dụ: 20000000đ). [2]
        - **Text nhỏ: số lượng $CBK$ tương ứng** (ví dụ: 800000 $CBK$). [2]
    - **Lương trách nhiệm:**
        - **Số tiền VND** (ví dụ: 10000000đ). [2]
        - **Text nhỏ: số lượng $CBK$ tương ứng** (ví dụ: $400000 CBK$). [2]
    - **Nút "Withdraw"** bên cạnh mỗi loại tài sản. [4]
6. **Nếu người dùng click vào nút "Withdraw":** [4]
    - **Hiển thị dialog yêu cầu nhập:**
        - **Địa chỉ ví Ethereum.** [4]
        - **Số lượng token $CBK$ muốn rút.** [4]
    - **Hiển thị checkbox "Tôi đã điền đúng địa chỉ ví."** [4]
    - **Button "Xác nhận".** (Không rõ hành động sau xác nhận từ nguồn)

### 2.3 User Flow: Chuyển Đổi Hiển Thị Tiền Tệ (VND/CBK)

1. **Người dùng đang ở trang Portfolio Tổng Quan.** [2]
2. **Người dùng click vào nút chuyển đổi VND/$CBK.** [2]
3. **Hệ thống thay đổi hiển thị:**
    - Nếu đang hiển thị VND, chuyển sang hiển thị **tổng tài sản theo $CBK$** (tính toán theo tỉ giá 1 $CBK = 25 VND). [2]
    - Nếu đang hiển thị $CBK$, chuyển sang hiển thị **tổng tài sản theo VND**. [2]
    - Các thông tin chi tiết khác (nếu có trên trang) cũng có thể được chuyển đổi (tùy thuộc vào thiết kế).

### 2.4 User Flow: Sử Dụng Swap $CBK$ ra USDT

1. **Người dùng điều hướng đến trang "Swap ra USDT".** [5]
2. **Hiển thị form với hai input number và button "Swap".** [5]
3. **Input $CBK$:**
    - **Append icon: $CBK$.** [5]
    - Cho phép nhập tối đa số $CBK$ người dùng có (ví dụ: 480000). [5]
    - **Text button "max"** bên dưới. [5]
4. **Nếu người dùng nhập số lượng $CBK$ vào input hoặc click button "max":** [5]
    - **Input $USDT$ tự động cập nhật giá trị tương ứng** (theo tỉ giá 1 $CBK = 0.001 $USDT). [5]
5. **Input $USDT$:**
    - **Append icon: $USDT$.** [5]
    - **Khi người dùng nhập giá trị $USDT$, input $CBK$ sẽ tự động cập nhật tương ứng.** [5]
6. **Người dùng click vào button "Swap".** (Không rõ hành động sau khi swap thành công từ nguồn)

### 2.5 User Flow: Tương Tác với User Menu

1. **Người dùng đã đăng nhập thành công và đang ở một trang bất kỳ sau login.** [1]
2. **Người dùng di chuột (Hover) vào User menu button ở góc phải header bar.** [1]
3. **Hiển thị menu dropdown bao gồm:** [1]
    - **Portfolio.** [1]
    - **Detailed Portfolio.** [1]
    - **Loggin.** [6]
4. **Nếu người dùng click vào "Portfolio":** Chuyển đến trang Portfolio Tổng Quan. [1]
5. **Nếu người dùng click vào "Detailed Portfolio":** Chuyển đến trang Portfolio Chi Tiết. [1]
6. **Nếu người dùng click vào "Loggin":** Quay trở về trang sign-in. [6]

### 2.6 Admin User Flow: Xem Chi Tiết Portfolio của Member

1. **Admin đã đăng nhập thành công và đang ở trang quản lý admin (danh sách người dùng).** [6]
2. **Trong bảng danh sách member, admin tìm đến row của member muốn xem.** [6]
3. **Admin click vào button "View" ở row của member đó.** [4]
4. **Hệ thống chuyển hướng đến trang Portfolio Detail của member đó.** [4]
5. **Hiển thị thông tin portfolio chi tiết của member (tương tự User Flow: Xem Portfolio Chi Tiết).** [2, 4]
6. **Hiển thị tên của User (member đang xem).** [4]

### 2.7 User Flow: Tương Tác với Lộ Trình Kỹ Năng (Gamification)

1. **Người dùng điều hướng đến trang "Roadmap".** [7]
2. **Hiển thị các huy hiệu kỹ năng theo hạng (Đồng, Bạc, Vàng).** [7]
    - Mỗi huy hiệu có trạng thái **Active** (đã có) hoặc **Unactive** (chưa có). [7]
    - Thiết kế huy hiệu từ đơn giản đến phức tạp. [8]
3. **Người dùng click vào một huy hiệu ở trạng thái Unactive để mở khóa.** [7]
4. **Hiển thị hệ thống kiểm tra trắc nghiệm (50 câu).** [7]
5. **Người dùng trả lời các câu hỏi.** [7]
6. **Sau khi hoàn thành trắc nghiệm, hệ thống đánh giá kết quả.** [7]
    - **Nếu đúng trên 85%:** Hiển thị màn hình yêu cầu **Practical Exam** với button **"Request"**. [7]
    - **Nếu không đạt:** (Không rõ hành động từ nguồn, có thể thông báo thất bại và cho phép thử lại sau).
7. **Nếu người dùng click vào button "Request" ở màn hình Practical Exam:** [7]
    - **Hiển thị thông báo thành công.** [7]
8. **Sau khi người dùng hoàn thành Practical Exam (hành động này có thể diễn ra bên ngoài DApp):** [7]
9. **Người dùng có thể nhận được Huy hiệu, và trạng thái của huy hiệu chuyển sang Active.** [7]
<!-- Thêm các flow khác nếu cần -->

## 3. Tech Stack & APIs

### 3.1 Frontend

<!-- Liệt kê công nghệ frontend dự kiến sử dụng -->

- Framework: next.js
- State Management: zustand
- UI Library: shadnc
- Other: tailwind

### 3.2 Backend

<!-- Liệt kê công nghệ backend dự kiến sử dụng -->

- Framework: nest.js
- Database: sqlite
- Authentication: google / metamask

### 3.3 External APIs

<!-- Liệt kê các API bên ngoài sẽ tích hợp -->

## 4. Tính Năng Cốt Lõi

├── **Chức Năng Cốt Lõi & Tokenomics**
│   ├── **Phân Chia Lợi Nhuận/Doanh Thu**
│   │   └── Tự động phân chia cho member qua smart contract [1]
│   ├── **Token $CBK**
│   │   ├── Là đơn vị tiền tệ [$CYB] [1]
│   │   ├── Giá luôn tăng do nguồn cung giới hạn [1]
│   │   ├── Chỉ Admin mới có thể mint bằng USDT theo giá quy định [1]
│   │   ├── Giá tính bằng tổng CBK / tổng USDT [2]
│   │   ├── Giá khởi điểm 0.001 USD (khoảng 25 VND) [2]
│   │   └── Admin không thể mint thêm nếu không có USDT [2]
│   └── **Quản Lý Tài Sản Token**
│       ├── Admin thêm tài sản (USDT) vào contract để mint $CBK (không làm mất giá) [2]
│       └── Admin không thể rút tài sản ra [2]
├── **Staking & Quản Lý Tài Sản Người Dùng**
│   ├── **Staking**
│   │   ├── Cho phép member nắm giữ tài sản [2]
│   │   ├── Member tham gia ẩn danh [1]
│   │   └── Kiếm lợi nhuận bằng cách stake $CBK [1]
│   ├── **Hiển Thị Tài Sản**
│   │   ├── Portfolio hiển thị tổng tài sản (VND, tăng theo thời gian thực) [3, 4]
│   │   ├── Nút chuyển đổi hiển thị giữa VND và $CBK [4]
│   │   ├── Detailed Portfolio hiển thị chi tiết từng loại tài sản (Lương tháng 13, $CBK, Thưởng dự án, Lương trách nhiệm) [4]
│   │   ├── Hiển thị tổng tài sản theo thời gian thực (giây) [3]
│   │   ├── Hiển thị tăng trưởng tài sản (ngày, tháng, năm) [3]
│   │   └── Hiển thị tên User ở Portfolio detail [5]
│   ├── **Giao Dịch Tài Sản**
│   │   ├── Burn $CBK để nhận USDT hoặc tài sản tương ứng [2]
│   │   ├── Thêm USDT vào contract làm tăng giá token (chia cho cổ đông) [6]
│   │   ├── Admin thưởng thêm USDT (tự động mint $CBK) [6]
│   │   ├── Admin cấu hình thời điểm unlock tài sản thưởng [6]
│   │   ├── Lương tháng thứ 13 chi trả bằng $CBK (hoặc tiền mặt) vào staking [3]
│   │   └── Hiển thị lịch sử giao dịch (ví dụ: thưởng dự án) [7]
│   └── **Rút Tiền**
│       └── Nút "Withdraw" ở Portfolio Details cho phép rút $CBK (yêu cầu địa chỉ ví Ethereum và xác nhận) [5]
├── **Giao Diện Người Dùng (UI) & Trải Nghiệm Người Dùng (UX)**
│   ├── **Bố Cục Chung**
│   │   ├── Header bar trên các trang sau login (Logo Cyberk bên trái, User menu button bên phải) [7]
│   │   ├── Bỏ trang welcome, trang portfolio là mặc định sau login [7]
│   │   ├── Bỏ hiển thị dạng thẻ ở trang portfolio, thay bằng Material Design (trắng - đen, primary đen, font Fauna cho text lớn)
│   └── **User Menu**
│       ├── Avatar và tên người dùng ("HOÀNG MINH ÐỨC") [7]
│       ├── Khi hover hiển thị menu: Portfolio, Detailed Portfolio, Loggin [7]
│       └── Button "Loggin" để quay về trang sign-in [8]
├── **Quản Lý Admin**
│   ├── **Quản Lý Member**
│   │   ├── Trang admin quản lý danh sách member [8]
│   │   ├── Thêm member (tính thời điểm tham gia cho lương tháng 13, không được chọn ngày trong quá khứ) [8, 9]
│   │   ├── Bảng danh sách member (tên ngẫu nhiên, **Total Assets**, Edit, Disable, Thưởng, View) [5, 8]
│   │   ├── Thay tên cột "Salary" bằng "Total Assets" [5]
│   │   ├── Button "View" để chuyển đến Portfolio Detail của member [5]
│   └── **Thống Kê & Thưởng**
│       ├── Thống kê (số lượng member, tổng tài sản hệ thống VND và $CBK) [8]
│       ├── Dialog thêm member (tên, lương) [8]
│       └── Dialog thưởng $CBK cho member (hiển thị ở lịch sử giao dịch portfolio) [8]
├── **Tính Năng Swap**
│   └── Màn hình Swap ra USDT với form 2 input ($CBK, $USDT) và button "Swap" [10]
│       ├── Input $CBK (append icon, tối đa số dư, button "max") [10]
│       └── Input $USDT (append icon, tự động cập nhật theo tỉ giá 1 $CBK = 0.001 $USDT) [10]
└── **Lộ Trình Kỹ Năng (Gamification)**
    ├── **Huy Hiệu Kỹ Năng**
    │   ├── Roadmap hiển thị huy hiệu kỹ năng (Active/Unactive) [11]
    │   ├── Các hạng huy hiệu (Đồng, Bạc, Vàng) và danh sách kỹ năng tương ứng [11]
    │   └── Thiết kế huy hiệu từ đơn giản đến phức tạp, tạo cảm giác Gamification [12]
    └── **Mở Khóa Huy Hiệu**
        ├── Click nút mở khóa [11]
        ├── Trắc nghiệm (50 câu, >85% pass) [11]
        ├── Practical Exam (button "Request", thông báo thành công khi request) [11]
        └── Nhận huy hiệu sau khi hoàn thành cả hai [11]

### 6.3 Trải Nghiệm Người Dùng

<!-- Mô tả các yêu cầu về UX -->

- **Sử dụng Design** với màu sắc chủ đạo là **trắng - đen** [6].
- **Primary color là đen** với các text lớn sử dụng font **Fauna** [6].
- Đảm bảo giao diện **trực quan**, **dễ sử dụng** và phù hợp với người dùng là thành viên công ty Cyberk [previous conversation].
- Tạo trải nghiệm **Gamification hấp dẫn** cho tính năng Huy hiệu kỹ năng [previous conversation, 12].
- **Header Bar:** Hiển thị trên các trang sau khi đăng nhập, bao gồm [7]:
  - Logo của Cyberk ở bên tay trái.
  - Nút User menu ở bên tay phải:
    - Hiển thị avatar nhân vật và tên "HOÀNG MINH ÐỨC".
    - Khi hover sẽ hiện ra menu: Portfolio, Detailed Portfolio.
    - Thêm button "Loggin" để quay về trang sign-in khi click [6].
- **Trang Portfolio (trang mặc định sau đăng nhập)** [7]:
  - **Tổng tài sản (VND):** Một text lớn hiển thị tổng tài sản theo VND (ví dụ: 10200000đ). Text này tăng liên tục theo thời gian thực, mỗi giây tăng 25 đơn vị. Có một nút để đổi hiển thị từ VND sang $CBK với tỉ giá 1 $CBK = 25 VND [8].
  - **Danh sách lịch sử giao dịch (ở phía dưới)** [7, 9]: Hiển thị các giao dịch gần đây, ví dụ:
    - **+3000000đ thưởng dự án LYNK** (màu xanh lá cây), text nhỏ: 12000 $CBK. Ngày giao dịch (tạo ngẫu nhiên trong tháng 2/2025) [9].
    - **+500000đ thưởng dự án Oracler** (màu xanh lá cây), text nhỏ: 2000 $CBK. Ngày giao dịch (tạo ngẫu nhiên trong tháng 2/2025) [9].
- **Trang Detailed Portfolio:**
  - Hiển thị tên của User [9].
  - **Chi tiết các loại tài sản:** [8]
    - **Lương tháng 13:** 3000000đ và text nhỏ hơn: 12000 $CBK.
    - **$CBK:** 12000000đ và text nhỏ hơn 480000 $CBK.
    - **Thưởng dự án:** 20000000đ và text nhỏ hơn 800000 $CBK.
    - **Lương trách nhiệm:** 10000000đ và text nhỏ hơn 400000 $CBK.
  - **Ngày unlock:** 31 tháng 12 năm 2025 [7].
  - Thêm nút "Withdraw" ở mỗi dòng tài sản. Khi click hiển thị dialog:
    - Yêu cầu nhập địa chỉ ví Ethereum.
    - Hiển thị số lượng token $CBK muốn rút.
    - Checkbox "Xác nhận tôi đã điền đúng địa chỉ ví." [9].
- **Trang Admin:** (chỉ dành cho quản trị viên) [6]
  - **Component thống kê:**
    - Card hiển thị: **Member: 30 member**.
    - Card hiển thị: **Tổng tài sản hệ thống: 1000000000đ**, text nhỏ: 40000000 $CBK.
  - **Component bảng hiển thị danh sách member:**
    - Danh sách ngẫu nhiên 30 member.
    - Mỗi hàng bao gồm: Tên member (tạo ngẫu nhiên), **Total Assets** (ngẫu nhiên từ 12000000 đến 100000000), Button: Edit, Disable, Thưởng, View [6, 9].
    - Button "Thêm member": Hiển thị dialog nhập tên, lương của member vào bảng [6].
    - Khi click button "Thưởng": Hiển thị dialog nhập số $CBK. Mỗi giao dịch thưởng được hiển thị thêm vào danh sách giao dịch ở màn hình portfolio [6].
    - Khi click button "View": Chuyển hướng đến màn hình hiển thị Portfolio Detail của member đó [9].
- **Trang Swap ra USDT:** [10]
  - Form chứa 2 input number và 1 button "Swap".
  - **Input Number thứ nhất ($CBK input):**
    - Append icon: $CBK.
    - Cho phép nhập tối đa số $CBK người dùng có (ví dụ: 480000).
    - Text button "max" để gán giá trị tối đa $CBK vào input.
  - **Input Number thứ hai ($USDT input):**
    - Append icon: $USDT.
    - Reflex giá trị theo tỉ giá 1 $CBK = 0.001 $USDT khi $CBK input thay đổi hoặc bấm "max".
    - Khi gán giá trị vào $USDT input, $CBK input sẽ tự động cập nhật tương ứng.
- **Trang Roadmap Kỹ năng:** [11]
  - Hiển thị các huy hiệu thể hiện kỹ năng.
  - Mỗi huy hiệu có 2 trạng thái: **Active** (người dùng đã có), **Unactive** (người dùng chưa có).
  - Các hạng huy hiệu:
    - **Hạng Đồng:** Front-end Engineer, Basic UX/UI Designer, Basic Back-end Engineer, Web3 Engineer.
    - **Hạng Bạc:** Smart Contract Engineer (EVM), Basic Red-hat Hacker, AWS Solution Associate, Project Management.
    - **Hạng Vàng:** Solana Engineer, Aptos Engineer, Layer-Zero Engineer.
  - Khi click vào nút "Mở khoá" (cho huy hiệu Unactive):
    - Hiển thị hệ thống kiểm tra trắc nghiệm (50 câu).
    - Nếu trả lời đúng trên 85%, chuyển sang màn hình Yêu cầu Practical Exam.
    - Button "Request" trên màn hình Practical Exam, khi click hiển thị thông báo thành công.
    - Người dùng nhận được huy hiệu sau khi hoàn thành cả trắc nghiệm và Practice.
  - Thiết kế huy hiệu từ đơn giản (Đồng) đến phức tạp (Vàng) tạo cảm giác Gamification [2].

## 7. Định Nghĩa Thành Công

<!-- Mô tả các tiêu chí để đánh giá sự thành công của dự án -->

1. Thu hút và duy trì sự tham gia của member: Mặc dù membership là private, việc mở rộng cộng đồng member chất lượng và khuyến khích họ stake $CBK$ để kiếm lợi nhuận là cần thiết. Sự tích cực sử dụng DApp của các member cũng là một chỉ số quan trọng.

2. Cung cấp trải nghiệm người dùng (UX) tốt: Giao diện DApp trực quan, dễ sử dụng [previous turns], với thiết kế Material Design và các tính năng như hiển thị tổng tài sản theo thời gian thực, lịch sử giao dịch, và khả năng chuyển đổi giữa VND và $CBK$ sẽ cải thiện sự hài lòng của người dùng.

3. Bảo mật thông tin người dùng: Đặc biệt là thông tin về lương tháng thứ 13 cần được bảo mật tuyệt đối.

## 8. Lịch Trình Dự Kiến

<!-- Cung cấp lịch trình dự kiến cho việc phát triển -->

- Milestone 1: [Ngày] - [Mô tả]
- Milestone 2: [Ngày] - [Mô tả]
- Milestone 3: [Ngày] - [Mô tả]

**Phiên bản:** 0.1
**Ngày:** Ngày 20 Tháng 4 Năm 2024
**Người soạn thảo:** [Anderson/NotebookLM]

## 9. Các yêu cầu khác

- Lương tháng thứ 13 được Cyberk chi trả một lần duy nhất vào cuối năm bằng đồng $CBK (hoặc tiền mặt) [12]. Số $CBK này sẽ được chuyển trực tiếp vào staking của người dùng [12].
- Lương tháng thứ 13 được tính dựa trên thời gian tham gia vào Cyberk [5]. Thông tin này cần được bảo mật và hệ số lương của mỗi member là khác nhau, được admin cấu hình thủ công [5]. Thời điểm thêm member vào contract sẽ là thời điểm tính lương tháng 13 và admin không được phép cấu hình ngày tham gia trong quá khứ [5].
- Giá của $CBK luôn tăng do nguồn cung giới hạn [3]. Cách duy nhất để tạo ra $CBK là admin mint từ Contract bằng cách đưa USDT vào theo giá được hợp đồng quy định [3]. Bất kỳ ai thêm USDT vào contract đều làm tăng giá token [1]. Quản trị viên có thể bổ sung tài sản vào hợp đồng và lấy ra $CBK (không làm mất giá $CBK), nhưng không thể lấy tài sản ra hoặc mint thêm token mà không thêm USDT [4]. Admin có thể thưởng thêm USDT vào tài sản của một người, và token $CBK sẽ được mint tự động [1]. Admin có thể cấu hình thời điểm unlock tài sản thưởng này [1].

## 7. Các vấn đề chưa giải quyết

- Cơ chế kiểm tra Practical Exam cho huy hiệu kỹ năng cần được làm rõ.
- Chi tiết về API kết nối với các hợp đồng thông minh cần được xác định.
- Quy trình thêm/bớt và quản lý thành viên chi tiết (ngoài các yêu cầu UI) cần được mô tả rõ hơn.
