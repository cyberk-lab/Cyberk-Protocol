### App Flow Document
#### 1. Tổng Quan Luồng Ứng Dụng
Ứng dụng Cyberk DApp cung cấp cho người dùng khả năng xem thông tin tài sản cá nhân (portfolio), bao gồm tổng tài sản, chi tiết các loại tài sản như lương tháng 13, token $CBK$, thưởng dự án, lương trách nhiệm. Ứng dụng cũng cho phép người dùng theo dõi lịch sử giao dịch, chuyển đổi hiển thị tiền tệ giữa VND và $CBK$, và thực hiện swap token $CBK$ sang USDT. Ngoài ra, ứng dụng còn có tính năng quản lý người dùng dành cho admin và hệ thống huy hiệu kỹ năng (roadmap) theo cơ chế gamification.

#### 2. Mô Tả Chi Tiết Các Trang
##### 2.1 Trang Portfolio (Trang chủ sau đăng nhập)
**Mục đích**: Hiển thị tổng quan tài sản của người dùng và lịch sử giao dịch gần nhất [1]. Thay thế trang welcome [1].
**Thành phần chính**:
*   Text lớn hiển thị **Tổng tài sản theo VND**, tự động tăng theo thời gian thực (25 VND mỗi giây) [2].
*   **Nút để đổi hiển thị từ VND sang $CBK$** (tỉ giá 1 $CBK = 25 VND) và ngược lại [2].
*   Component **lịch sử giao dịch** ở phía dưới [1]:
    *   Hiển thị giao dịch thưởng dự án (ví dụ: +3000000đ thưởng dự án LYNK - màu xanh lá cây, 12000 $CBK) [1].
    *   Hiển thị giao dịch thưởng dự án khác (ví dụ: +500000đ thưởng dự án Oracler - màu xanh lá cây, 2000 $CBK) [1].
    *   **Thông tin ngày giao dịch** (ngày ngẫu nhiên trong tháng 2/2025) [3].
*   **Header bar**:
    *   **Logo của Cyberk** bên tay trái [1].
    *   **User menu button** bên tay phải (avatar nhân vật và tên "HOÀNG MINH ĐỨC") [1].
**Hành động người dùng**:
*   Người dùng có thể click vào **nút chuyển đổi tiền tệ** để thay đổi hiển thị tổng tài sản giữa VND và $CBK$ [2].
*   Người dùng có thể **hover vào User menu button** để xem menu [1].
*   Người dùng có thể **click vào các mục trong User menu** (Portfolio, Detailed Portfolio, Loggin) [1, 4].
**Luồng điều hướng**:
*   Từ trang này, người dùng có thể điều hướng đến **Detailed Portfolio** bằng cách click vào "Detailed Portfolio" trong User menu [1, 4].
*   Từ trang này, người dùng có thể điều hướng đến **trang sign-in** bằng cách click vào "Loggin" trong User menu [4].

**API Calls/Data Requirements**:
*   API để lấy dữ liệu tổng tài sản người dùng (bao gồm VND và $CBK$).
*   API để lấy lịch sử giao dịch người dùng.
*   (Có thể có API real-time để cập nhật tổng tài sản).

**Trạng thái và Edge Cases**:
*   Trạng thái loading: Hiển thị khi đang tải dữ liệu portfolio và lịch sử giao dịch.
*   Trạng thái lỗi: Hiển thị khi có lỗi xảy ra trong quá trình tải dữ liệu.
*   Trạng thái rỗng: Hiển thị khi người dùng chưa có giao dịch nào.

--------------------------------------------------------------------------------

##### 2.2 Trang Detailed Portfolio
**Mục đích**: Hiển thị chi tiết các loại tài sản của người dùng [2]. Hiển thị thêm tên của User [3].
**Thành phần chính**:
*   **Tên của User** [3].
*   Hiển thị chi tiết từng loại tài sản:
    *   **Lương tháng 13**: Số tiền VND (ví dụ: 3000000đ) và số $CBK$ tương ứng (ví dụ: 12000 $CBK$) [2].
    *   **$CBK$**: Số tiền VND (ví dụ: 12000000đ) và số $CBK$ tương ứng (ví dụ: 480000 $CBK$) [2].
    *   **Thưởng dự án**: Số tiền VND (ví dụ: 20000000đ) và số $CBK$ tương ứng (ví dụ: 800000 $CBK$) [2].
    *   **Lương trách nhiệm**: Số tiền VND (ví dụ: 10000000đ) và số $CBK$ tương ứng (ví dụ: $400000 CBK$) [2].
    *   **Ngày unlock**: 31 tháng 12 năm 2025 [1].
*   **Nút "Withdraw"** bên cạnh mỗi dòng tài sản [3].
*   **Header bar**:
    *   **Logo của Cyberk** bên tay trái [1].
    *   **User menu button** bên tay phải [1].
**Hành động người dùng**:
*   Người dùng có thể **hover vào User menu button** để xem menu [1].
*   Người dùng có thể **click vào các mục trong User menu** [1, 4].
*   Người dùng có thể **click vào nút "Withdraw"** bên cạnh một loại tài sản [3].
**Luồng điều hướng**:
*   Từ trang này, người dùng có thể điều hướng đến **Portfolio** bằng cách click vào "Portfolio" trong User menu [1, 4].
*   Từ trang này, người dùng có thể điều hướng đến **trang sign-in** bằng cách click vào "Loggin" trong User menu [4].
*   Khi click vào nút "Withdraw", hiển thị **dialog yêu cầu nhập địa chỉ ví Ethereum và số lượng $CBK$ muốn rút**, kèm checkbox xác nhận và nút "Xác nhận" [3].

**API Calls/Data Requirements**:
*   API để lấy dữ liệu chi tiết tài sản của người dùng (lương tháng 13, $CBK$, thưởng dự án, lương trách nhiệm, ngày unlock).

**Trạng thái và Edge Cases**:
*   Trạng thái loading: Hiển thị khi đang tải dữ liệu chi tiết tài sản.
*   Trạng thái lỗi: Hiển thị khi có lỗi xảy ra trong quá trình tải dữ liệu.
*   Trạng thái rỗng: (Có thể không áp dụng ở đây vì trang này hiển thị chi tiết các loại tài sản).

--------------------------------------------------------------------------------

##### 2.3 Trang Admin (dành cho Admin)
**Mục đích**: Quản lý danh sách người dùng [4].
**Thành phần chính**:
*   **Component thống kê**:
    *   Card hiển thị **Member**: 30 member [4].
    *   Card hiển thị **Tổng tài sản hệ thống**: 1000000000đ, 40000000 $CBK$ (text nhỏ) [4].
*   **Components bảng hiển thị danh sách member**:
    *   Mỗi hàng bao gồm: **tên member** (tạo ngẫu nhiên), **Total Assets** (thay vì Salary) (ngẫu nhiên từ 12000000 đến 100000000), **Button: edit, disable, view**, **Thưởng** (button) [3, 4].
*   **Button: thêm member**: Khi click sẽ hiện ra dialog để nhập liệu tên, lương của member vào bảng [4].
**Hành động người dùng**:
*   Admin có thể xem thông tin thống kê [4].
*   Admin có thể xem danh sách member [4].
*   Admin có thể click vào **button "edit"** (chưa rõ chức năng chi tiết từ nguồn).
*   Admin có thể click vào **button "disable"** (chưa rõ chức năng chi tiết từ nguồn).
*   Admin có thể click vào **button "view"** để chuyển hướng đến màn hình hiển thị portfolio detail của member đó [3].
*   Admin có thể click vào **button "Thưởng"** để hiện ra dialog nhập số $CBK$ thưởng cho member [4]. Mỗi giao dịch thưởng này sẽ hiển thị thêm vào danh sách giao dịch ở màn hình portfolio của người dùng [4].
*   Admin có thể click vào **button "thêm member"** để mở dialog nhập tên và lương member mới [4].
**Luồng điều hướng**:
*   Từ trang này, khi click vào **button "view"** của một member, điều hướng đến **Portfolio Detail** của member đó [3].
*   (Có thể có các luồng điều hướng khác sau khi thực hiện các hành động edit, disable, thêm member, thưởng - tuy nhiên không được mô tả chi tiết trong nguồn).

**API Calls/Data Requirements**:
*   API để lấy thống kê số lượng member và tổng tài sản hệ thống.
*   API để lấy danh sách member (bao gồm tên và tổng tài sản).
*   API để thêm member mới.
*   API để chỉnh sửa thông tin member (nếu có chức năng edit).
*   API để vô hiệu hóa/kích hoạt member (nếu có chức năng disable).
*   API để thưởng $CBK$ cho member.

**Trạng thái và Edge Cases**:
*   Trạng thái loading: Hiển thị khi đang tải dữ liệu thống kê và danh sách member.
*   Trạng thái lỗi: Hiển thị khi có lỗi xảy ra trong quá trình tải hoặc thao tác dữ liệu.
*   Trạng thái rỗng: Hiển thị khi không có member nào trong hệ thống.
*   Trạng thái thành công/thất bại khi thêm, sửa, thưởng member.

--------------------------------------------------------------------------------

##### 2.4 Trang Roadmap (Huy hiệu kỹ năng)
**Mục đích**: Hiển thị lộ trình kỹ năng dưới dạng huy hiệu và cho phép người dùng mở khóa huy hiệu thông qua kiểm tra [5, 6]. Tạo cảm giác về Gamification [6].
**Thành phần chính**:
*   Hiển thị các **huy hiệu kỹ năng** theo hạng:
    *   **Hạng Đồng**: Front-end Engineer, Basic UX/UI Designer, Basic Back-end Engineer, Web3 Engineer [5].
    *   **Hạng Bạc**: Smart Contract Engineer (EVM), Basic Red-hat Hacker, AWS Solution Associate, Project Management [5].
    *   **Hạng Vàng**: Solana Engineer, Aptos Engineer, Layer-Zero Engineer [5].
*   Mỗi huy hiệu có **trạng thái Active** (đã có) hoặc **Unactive** (chưa có) [5].
*   **Nút mở khóa** (có thể hiển thị trên các huy hiệu Unactive) [5].
**Hành động người dùng**:
*   Người dùng có thể xem các huy hiệu và trạng thái của chúng [5].
*   Người dùng có thể **click vào nút mở khóa** của một huy hiệu Unactive [5].
*   Sau khi click mở khóa, hiển thị **hệ thống kiểm tra trắc nghiệm (50 câu)** [5].
*   Người dùng trả lời trắc nghiệm.
*   Nếu pass trắc nghiệm (trên 85%), hiển thị màn hình yêu cầu **Practical Exam** với **button "Request"** [5].
*   Người dùng click vào **button "Request"** [5].
**Luồng điều hướng**:
*   Từ trang này, khi click vào nút mở khóa, chuyển sang giao diện **trắc nghiệm** [5].
*   Sau khi pass trắc nghiệm, hiển thị giao diện **Practical Exam** [5].
*   Khi click vào "Request" ở Practical Exam, hiển thị **thông báo thành công** [5]. (Không rõ luồng tiếp theo để hoàn thành Practical Exam và nhận huy hiệu).

**API Calls/Data Requirements**:
*   API để lấy danh sách huy hiệu và trạng thái của người dùng.
*   API để lấy nội dung trắc nghiệm cho từng huy hiệu.
*   API để nộp và kiểm tra kết quả trắc nghiệm.
*   API để đánh dấu yêu cầu Practical Exam.
*   API để cập nhật trạng thái huy hiệu sau khi hoàn thành (có thể cần thông tin từ quá trình Practical Exam bên ngoài DApp).

**Trạng thái và Edge Cases**:
*   Trạng thái loading: Hiển thị khi đang tải danh sách huy hiệu.
*   Trạng thái lỗi: Hiển thị khi có lỗi xảy ra trong quá trình tải dữ liệu hoặc gửi kết quả trắc nghiệm.
*   Trạng thái trắc nghiệm (đang làm, đã nộp, kết quả).
*   Trạng thái Practical Exam (đã yêu cầu).

--------------------------------------------------------------------------------

##### 2.5 Trang Swap ra USDT
**Mục đích**: Cho phép người dùng chuyển đổi token $CBK$ sang USDT theo tỉ giá quy định [7].
**Thành phần chính**:
*   **Form** chứa 2 input number và 1 button "Swap" [7].
*   **Input Number thứ nhất ($CBK input)**:
    *   Append icon: $CBK [7].
    *   Cho phép nhập tối đa số $CBK$ người dùng có trong portfolio [7].
    *   **Text button "max"** bên dưới [7].
*   **Input Number thứ hai ($USDT input)**:
    *   Append icon: $USDT [7].
    *   Hiển thị giá trị quy đổi từ $CBK$ sang $USDT$ (1 $CBK = 0.001 $USDT) hoặc ngược lại [7].
**Hành động người dùng**:
*   Người dùng có thể **nhập số lượng $CBK$** muốn swap vào input thứ nhất [7].
*   Người dùng có thể **click vào button "max"** để tự động điền tối đa số $CBK$ đang có [7].
*   Khi giá trị input $CBK$ thay đổi, **input $USDT$ sẽ tự động cập nhật** [7].
*   Người dùng cũng có thể **nhập số lượng $USDT$** muốn nhận vào input thứ hai [7].
*   Khi giá trị input $USDT$ thay đổi, **input $CBK$ sẽ tự động cập nhật** [7].
*   Người dùng có thể **click vào button "Swap"** để thực hiện giao dịch [7].
**Luồng điều hướng**:
*   (Không có luồng điều hướng rõ ràng đến trang khác được mô tả, sau khi swap có thể có thông báo thành công/thất bại).

**API Calls/Data Requirements**:
*   API để lấy số lượng $CBK$ hiện có của người dùng.
*   API để thực hiện giao dịch swap $CBK$ sang USDT (cần gửi số lượng $CBK$).
*   API có thể trả về tỉ giá hiện tại (mặc dù tỉ giá cố định là 1 $CBK = 0.001 $USDT).

**Trạng thái và Edge Cases**:
*   Trạng thái loading: Hiển thị khi đang gọi API swap.
*   Trạng thái lỗi: Hiển thị khi có lỗi trong quá trình swap (ví dụ: không đủ $CBK$, lỗi kết nối).
*   Thông báo thành công sau khi swap.
*   Xử lý trường hợp người dùng nhập số lượng $CBK$ lớn hơn số dư.

#### 3. User Journey Maps
##### 3.1 Journey: Xem tổng quan tài sản cá nhân
**Người dùng**: Thành viên Cyberk đã đăng nhập.
**Mục tiêu**: Nhanh chóng nắm bắt tổng giá trị tài sản của mình.
**Các bước**:
1.  Người dùng bắt đầu tại **trang Portfolio** sau khi đăng nhập [1].
2.  Hệ thống **hiển thị tổng tài sản theo VND** (tự động cập nhật) [2].
3.  Người dùng có thể **click nút để xem tổng tài sản theo $CBK$** [2].
4.  Hệ thống **chuyển đổi hiển thị tổng tài sản sang $CBK$** [2].
5.  Người dùng có thể xem **lịch sử giao dịch gần nhất** [1].
**Kết quả mong đợi**: Người dùng nắm được tổng giá trị tài sản hiện tại bằng đơn vị tiền tệ mong muốn và các giao dịch gần nhất.
**Các trường hợp thất bại**:
*   Nếu không thể tải dữ liệu tài sản, hiển thị thông báo lỗi.
*   Nếu kết nối real-time bị gián đoạn, giá trị tổng tài sản có thể không được cập nhật.

--------------------------------------------------------------------------------

##### 3.2 Journey: Xem chi tiết các loại tài sản
**Người dùng**: Thành viên Cyberk đã đăng nhập và muốn xem thông tin chi tiết hơn về tài sản.
**Mục tiêu**: Xem cụ thể số lượng và giá trị của từng loại tài sản (lương tháng 13, $CBK$, thưởng, lương trách nhiệm).
**Các bước**:
1.  Người dùng đang ở **trang Portfolio** [1].
2.  Người dùng **hover vào User menu** và **click vào "Detailed Portfolio"** [1, 4].
3.  Hệ thống điều hướng đến **trang Detailed Portfolio** [4].
4.  Hệ thống hiển thị **tên của User** [3].
5.  Hệ thống hiển thị chi tiết **số lượng VND và $CBK$ của từng loại tài sản**, cùng với **ngày unlock (lương tháng 13)** [1, 2].
6.  Người dùng có thể thấy **nút "Withdraw"** bên cạnh mỗi loại tài sản [3].
**Kết quả mong đợi**: Người dùng xem được thông tin chi tiết về cơ cấu tài sản của mình.
**Các trường hợp thất bại**:
*   Nếu không thể tải dữ liệu chi tiết tài sản, hiển thị thông báo lỗi.

--------------------------------------------------------------------------------

##### 3.3 Journey: Thực hiện swap $CBK$ sang USDT
**Người dùng**: Thành viên Cyberk đã đăng nhập và muốn chuyển đổi $CBK$ sang USDT.
**Mục tiêu**: Thực hiện giao dịch swap $CBK$ lấy USDT.
**Các bước**:
1.  Người dùng điều hướng đến **trang "Swap ra USDT"** (cách điều hướng không rõ từ nguồn).
2.  Hệ thống hiển thị form swap với input $CBK$ và $USDT$ [7].
3.  Người dùng **nhập số lượng $CBK$** muốn swap hoặc **click vào "max"** [7].
4.  Hệ thống **tự động hiển thị giá trị USDT tương ứng** [7].
5.  Người dùng **click vào button "Swap"** [7].
6.  Hệ thống **xử lý giao dịch swap** (chi tiết xử lý không rõ từ nguồn).
7.  Hệ thống hiển thị **thông báo kết quả giao dịch** (thành công hoặc thất bại) (không rõ chi tiết từ nguồn).
**Kết quả mong đợi**: Người dùng thực hiện thành công giao dịch swap và nhận được USDT tương ứng.
**Các trường hợp thất bại**:
*   Nếu người dùng nhập số lượng $CBK$ lớn hơn số dư.
*   Nếu có lỗi xảy ra trong quá trình gọi API swap.
*   Nếu kết nối mạng bị gián đoạn.

#### 4. State Management
##### 4.1 Global State
*   **Tổng tài sản người dùng (VND)**: Giá trị tổng tài sản hiện tại của người dùng (cần được cập nhật real-time).
*   **Tổng tài sản người dùng ($CBK$)**: Giá trị tổng tài sản hiện tại của người dùng tính theo $CBK$.
*   **Số dư $CBK$ của người dùng**: Số lượng token $CBK$ mà người dùng đang sở hữu.
*   **Trạng thái hiển thị tiền tệ**: Lưu trạng thái người dùng đang muốn xem tổng tài sản theo VND hay $CBK$.
*   **Thông tin người dùng đã đăng nhập**: Dữ liệu phiên người dùng (ví dụ: token).

##### 4.2 Page-level State
**Portfolio**:
*   **Trạng thái loading**: Đánh dấu trạng thái đang tải dữ liệu portfolio.
*   **Dữ liệu lịch sử giao dịch**: Danh sách các giao dịch gần đây để hiển thị.

**Detailed Portfolio**:
*   **Trạng thái loading**: Đánh dấu trạng thái đang tải dữ liệu chi tiết tài sản.
*   **Dữ liệu chi tiết tài sản**: Thông tin về lương tháng 13, $CBK$, thưởng, lương trách nhiệm.

**Admin**:
*   **Trạng thái loading**: Đánh dấu trạng thái đang tải dữ liệu admin (thống kê, danh sách member).
*   **Dữ liệu thống kê**: Số lượng member, tổng tài sản hệ thống.
*   **Danh sách member**: Mảng chứa thông tin của từng member.
*   **Trạng thái dialog thêm/thưởng member**: Kiểm soát hiển thị của các dialog.
*   **Thông tin member đang được chỉnh sửa/thưởng**: Lưu tạm thông tin khi thực hiện các thao tác.

**Roadmap**:
*   **Trạng thái loading**: Đánh dấu trạng thái đang tải dữ liệu huy hiệu.
*   **Trạng thái huy hiệu**: Mảng chứa trạng thái (active/unactive) của từng huy hiệu cho người dùng hiện tại.
*   **Trạng thái trắc nghiệm**: Lưu tiến trình và kết quả trắc nghiệm.

**Swap ra USDT**:
*   **Giá trị input $CBK$**: Giá trị người dùng nhập vào ô $CBK$.
*   **Giá trị input $USDT$**: Giá trị tự động cập nhật hoặc người dùng nhập vào ô $USDT$.

#### 5. Chuyển Đổi và Hiệu Ứng
*   **Trang Portfolio**: **Hiệu ứng tăng số (count-up)** cho text hiển thị tổng tài sản theo thời gian thực (tăng 25 đơn vị VND mỗi giây) [2].
*   **Header bar**: **Hiệu ứng hover** khi di chuột vào **User menu button** để hiển thị menu dropdown [1].
*   **Trang Detailed Portfolio**: Khi **click vào nút "Withdraw"**, hiển thị **dialog** yêu cầu nhập thông tin rút tiền [3].
*   **Trang Admin**: Khi **click vào button "thêm member"** hoặc **button "Thưởng"**, hiển thị **dialog nhập liệu** [4].
*   **Trang Swap ra USDT**: **Cập nhật giá trị tự động** giữa input $CBK$ và input $USDT$ khi một trong hai input thay đổi hoặc khi click vào button "max" [7].