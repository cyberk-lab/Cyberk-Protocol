### Backend Structure Document

#### 1. Kiến Trúc Tổng Quan
##### 1.1 Architecture Pattern
* **Pattern**: Clean Architecture kết hợp với NestJS framework
* **Mô tả**: Backend được tổ chức theo nguyên tắc Clean Architecture với các layer rõ ràng:
  - Domain layer (entities/models)
  - Application layer (services)
  - Infrastructure layer (repositories, persistence)
  - Interface layer (controllers)
* **Database Support**: Hỗ trợ cả Relational (TypeORM) và Document (MongoDB) database

##### 1.2 Cấu Trúc Thư Mục
*(Cấu trúc thư mục chi tiết sẽ được xác định trong quá trình triển khai, nhưng dự kiến sẽ bao gồm các thư mục chính như controllers, services, models/entities, modules, middleware, và configurations)*

##### 1.3 Flow Xử Lý Request
1. Request đến API endpoint
2. Middleware xác thực và xử lý trước (ví dụ: kiểm tra JWT token) [2, 3].
3. Controller nhận và xử lý request, gọi các service tương ứng [2].
4. Service thực hiện business logic, tương tác với database thông qua models/entities [2].
5. Model tương tác với database (PostgreSQL) [2, 4].
6. Response được tạo và trả về cho client [2].

#### 2. Database Schema
*(Chi tiết schema sẽ được thiết kế cụ thể, nhưng dưới đây là các bảng dự kiến dựa trên yêu cầu ứng dụng)*

##### 2.2 Bảng: Users
*   **Mô tả**: Lưu trữ thông tin người dùng (thành viên Cyberk và admin).
*   **Columns**:
| Column Name | Data Type | Constraints | Description |
| ------ | ------ | ------ | ------ |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | ID người dùng |
| username | VARCHAR(255) | UNIQUE, NOT NULL | Tên đăng nhập |
| password | VARCHAR(255) | NOT NULL | Mật khẩu (đã hash) |
| email | VARCHAR(255) | UNIQUE | Địa chỉ email |
| role | ENUM('member', 'admin') | NOT NULL | Vai trò của người dùng |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Thời điểm tạo |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Thời điểm cập nhật |
| total_assets_vnd | DECIMAL |  | Tổng tài sản VND |
| total_assets_cbk | DECIMAL |  | Tổng tài sản CBK |
| cbk_balance | DECIMAL |  | Số dư CBK |

*   **Indexes**:
    *   `idx_username`: (username) - UNIQUE
    *   `idx_email`: (email) - UNIQUE
*   **Relationships**:
    *   Một User có thể có nhiều Transactions (one-to-many).
    *   Một Admin có thể tạo nhiều Members (one-to-many, có thể không cần bảng riêng cho admin).

##### 2.3 Bảng: Transactions
*   **Mô tả**: Lưu trữ lịch sử giao dịch của người dùng (thưởng dự án, swap, rút tiền, v.v.).
*   **Columns**:
| Column Name | Data Type | Constraints | Description |
| ------ | ------ | ------ | ------ |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | ID giao dịch |
| user_id | INT | NOT NULL, FOREIGN KEY (Users) | ID người dùng liên quan |
| type | ENUM('reward', 'swap', 'withdraw', ...) | NOT NULL | Loại giao dịch |
| amount_vnd | DECIMAL |  | Số tiền VND giao dịch |
| amount_cbk | DECIMAL |  | Số lượng CBK giao dịch |
| details | JSON |  | Chi tiết giao dịch (ví dụ: tên dự án thưởng) |
| transaction_date | DATE | NOT NULL | Ngày giao dịch (ngẫu nhiên trong tháng 2/2025 cho dữ liệu demo) [5] |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Thời điểm tạo |

*   **Indexes**:
    *   `idx_user_id`: (user_id)
    *   `idx_transaction_date`: (transaction_date)
*   **Relationships**:
    *   Thuộc về một User (many-to-one).

##### 2.4 Bảng: Badges (Huy hiệu)
*   **Mô tả**: Lưu trữ thông tin về các huy hiệu kỹ năng.
*   **Columns**:
| Column Name | Data Type | Constraints | Description |
| ------ | ------ | ------ | ------ |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | ID huy hiệu |
| name | VARCHAR(255) | UNIQUE, NOT NULL | Tên huy hiệu (ví dụ: Front-end Engineer) [6, 7] |
| rank | ENUM('bronze', 'silver', 'gold') | NOT NULL | Hạng huy hiệu [6, 7] |
| description | TEXT |  | Mô tả huy hiệu |

*   **Indexes**:
    *   `idx_name`: (name) - UNIQUE
    *   `idx_rank`: (rank)
*   **Relationships**:
    *   Có thể có mối quan hệ nhiều-nhiều với bảng UserBadges.

##### 2.5 Bảng: UserBadges
*   **Mô tả**: Liên kết người dùng với các huy hiệu họ đã đạt được và trạng thái.
*   **Columns**:
| Column Name | Data Type | Constraints | Description |
| ------ | ------ | ------ | ------ |
| user_id | INT | NOT NULL, FOREIGN KEY (Users) | ID người dùng |
| badge_id | INT | NOT NULL, FOREIGN KEY (Badges) | ID huy hiệu |
| status | ENUM('active', 'inactive') | NOT NULL | Trạng thái huy hiệu của người dùng [6, 7] |
| unlocked_at | TIMESTAMP |  | Thời điểm huy hiệu được mở khóa |
| PRIMARY KEY (user_id, badge_id) |  |  | Khóa chính kép |

*   **Indexes**:
    *   `idx_user_id`: (user_id)
    *   `idx_badge_id`: (badge_id)
*   **Relationships**:
    *   Nhiều-nhiều với bảng Users.
    *   Nhiều-nhiều với bảng Badges.

##### 2.6 Bảng: AdminConfig
*   **Mô tả**: Lưu trữ các cấu hình của hệ thống (ví dụ: tỷ giá CBK/VND, tỷ giá CBK/USDT).
*   **Columns**:
| Column Name | Data Type | Constraints | Description |
| ------ | ------ | ------ | ------ |
| key | VARCHAR(255) | UNIQUE, NOT NULL | Khóa cấu hình (ví dụ: `cbk_vnd_rate`, `cbk_usdt_rate`) |
| value | VARCHAR(255) | NOT NULL | Giá trị cấu hình |
| description | TEXT |  | Mô tả cấu hình |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Thời điểm cập nhật |

*   **Indexes**:
    *   `idx_key`: (key) - UNIQUE

#### 3. API Endpoints
##### 3.1 Authentication Endpoints
###### `POST /auth/login`
*   **Description**: Đăng nhập người dùng (sử dụng Google, Metamask, hoặc username/password). [8]
*   **Request Body**: `{ identifier: string, password?: string, authProvider?: 'google' | 'metamask', authToken?: string }`
*   **Response**: `{ access_token: string, user: { id: number, role: 'member' | 'admin', username: string } }`
*   **Status Codes**:
    *   200 OK: Success
    *   401 Unauthorized: Invalid credentials

##### 3.2 Resource Endpoints
###### `GET /portfolio`
*   **Description**: Lấy thông tin tổng quan tài sản của người dùng đã đăng nhập. [5]
*   **Response**: `{ total_assets_vnd: number, total_assets_cbk: number, cbk_balance: number, currency_display: 'VND' | '$CBK', recent_transactions: Transaction[] }`
*   **Status Codes**:
    *   200 OK: Success
    *   401 Unauthorized: Chưa xác thực

###### `GET /portfolio/detailed`
*   **Description**: Lấy thông tin chi tiết các loại tài sản của người dùng đã đăng nhập. [7, 9]
*   **Response**: `{ user: { name: string }, assets: { salary_13th: { vnd: number, cbk: number, unlock_date: string }, cbk: { vnd: number, cbk: number }, project_rewards: { vnd: number, cbk: number }, responsibility_salary: { vnd: number, cbk: number } } }`
*   **Status Codes**:
    *   200 OK: Success
    *   401 Unauthorized: Chưa xác thực

###### `POST /swap/cbk-usdt`
*   **Description**: Thực hiện swap $CBK$ sang USDT. [7, 10]
*   **Request Body**: `{ cbk_amount: number }`
*   **Response**: `{ usdt_amount: number, transaction_id: number }`
*   **Status Codes**:
    *   200 OK: Success
    *   400 Bad Request: Invalid input (ví dụ: số lượng $CBK$ không đủ)
    *   401 Unauthorized: Chưa xác thực

###### `GET /roadmap/badges`
*   **Description**: Lấy danh sách huy hiệu và trạng thái của người dùng đã đăng nhập. [7, 11]
*   **Response**: `{ badges: { rank: string, name: string, status: 'active' | 'inactive' }[] }`
*   **Status Codes**:
    *   200 OK: Success
    *   401 Unauthorized: Chưa xác thực

###### `POST /roadmap/badges/{badgeId}/unlock`
*   **Description**: Bắt đầu quá trình mở khóa huy hiệu (trắc nghiệm). [7, 11]
*   **Response**: `{ quiz_id: number, questions: Question[] }`
*   **Status Codes**:
    *   200 OK: Success
    *   401 Unauthorized: Chưa xác thực

###### `POST /roadmap/quizzes/{quizId}/submit`
*   **Description**: Nộp kết quả trắc nghiệm. [7, 11]
*   **Request Body**: `{ answers: { question_id: number, answer: string }[] }`
*   **Response**: `{ passed: boolean, score: number, practical_exam_required?: boolean }`
*   **Status Codes**:
    *   200 OK: Success
    *   400 Bad Request: Invalid answers
    *   401 Unauthorized: Chưa xác thực

###### `POST /roadmap/badges/{badgeId}/request-practical-exam`
*   **Description**: Yêu cầu Practical Exam sau khi pass trắc nghiệm. [7, 11]
*   **Response**: `{ message: string }`
*   **Status Codes**:
    *   200 OK: Success
    *   401 Unauthorized: Chưa xác thực

###### `GET /admin/members` (Admin only)
*   **Description**: Lấy danh sách thành viên (cho trang admin). [7, 12]
*   **Query Parameters**: `page`, `limit`, etc.
*   **Response**: `{ members: { id: number, username: string, total_assets: number }[], total: number }`
*   **Status Codes**:
    *   200 OK: Success
    *   401 Unauthorized: Chưa xác thực
    *   403 Forbidden: Không có quyền admin

###### `GET /admin/members/{memberId}/portfolio/detailed` (Admin only)
*   **Description**: Lấy thông tin chi tiết portfolio của một thành viên (cho trang admin). [7, 12]
*   **Response**: Tương tự `GET /portfolio/detailed`.
*   **Status Codes**:
    *   200 OK: Success
    *   401 Unauthorized: Chưa xác thực
    *   403 Forbidden: Không có quyền admin
    *   404 Not Found: Member không tồn tại

###### `POST /admin/members` (Admin only)
*   **Description**: Thêm thành viên mới. [7]
*   **Request Body**: `{ username: string, initial_salary: number }`
*   **Response**: `{ member_id: number }`
*   **Status Codes**:
    *   201 Created: Member created successfully
    *   400 Bad Request: Invalid input
    *   401 Unauthorized: Chưa xác thực
    *   403 Forbidden: Không có quyền admin

###### `POST /admin/members/{memberId}/reward` (Admin only)
*   **Description**: Thưởng $CBK$ cho thành viên. [7]
*   **Request Body**: `{ cbk_amount: number, description: string }`
*   **Response**: `{ transaction_id: number }`
*   **Status Codes**:
    *   200 OK: Success
    *   400 Bad Request: Invalid input
    *   401 Unauthorized: Chưa xác thực
    *   403 Forbidden: Không có quyền admin

*(Các API endpoints khác cho edit, disable member, và các chức năng admin khác sẽ được bổ sung sau)*

#### 4. Authentication & Authorization
##### 4.1 Authentication Strategy
*   **Method**: JWT (JSON Web Tokens) sẽ được sử dụng để xác thực người dùng sau khi đăng nhập thành công qua Google, Metamask, hoặc có thể là cơ chế username/password nội bộ [4].
*   **Token Storage**: Frontend có thể lưu trữ JWT trong `localStorage` hoặc `sessionStorage`, hoặc trong một cookie bảo mật.
*   **Token Expiration**: Thời gian hết hạn của token sẽ được cấu hình (ví dụ: 1 giờ).
*   **Refresh Strategy**: Có thể triển khai cơ chế refresh token để cấp lại token mới mà không yêu cầu người dùng đăng nhập lại thường xuyên.

##### 4.2 Authorization Model
*   **Roles**:
    *   **member**: Người dùng thông thường, có quyền xem portfolio, lịch sử giao dịch, thực hiện swap, tương tác với roadmap. [8]
    *   **admin**: Người dùng có quyền quản lý thành viên, xem thông tin hệ thống, thưởng $CBK$ [8].
*   **Permissions**: Quyền truy cập vào các API endpoint và chức năng backend sẽ dựa trên vai trò của người dùng. Middleware sẽ kiểm tra vai trò trước khi cho phép truy cập vào các tài nguyên quản trị.
*   **Access Control Logic**: Các API endpoint dành cho admin sẽ được bảo vệ bằng middleware kiểm tra vai trò admin của người dùng đã xác thực.

#### 5. Middleware Stack
##### 5.1 Core Middleware
*   **CORS**: Cho phép hoặc chặn các request từ các origin khác nhau.
*   **Body Parser**: Phân tích cú pháp của request body (JSON, URL-encoded).
*   **Logging**: Ghi log các request và response để theo dõi và debug.
*   **Rate Limiting**: Giới hạn số lượng request từ một IP trong một khoảng thời gian nhất định để chống lại tấn công DDoS.
*   **Helmet**: Bảo vệ ứng dụng bằng cách thiết lập các HTTP header liên quan đến bảo mật.

##### 5.2 Custom Middleware
*   **Authentication Middleware**: Xác thực JWT token trong header của request và thiết lập thông tin người dùng (nếu hợp lệ). [3]
*   **Authorization Middleware**: Kiểm tra vai trò của người dùng đã xác thực để cho phép hoặc từ chối truy cập vào các endpoint cụ thể. [3]
*   **Validation Middleware**: Kiểm tra tính hợp lệ của dữ liệu trong request body hoặc query parameters. [13]
*   **Error Handling Middleware**: Xử lý các lỗi phát sinh trong quá trình xử lý request và trả về response lỗi phù hợp. [13]

#### 6. Error Handling
##### 6.1 Error Structure
Response lỗi sẽ có cấu trúc JSON chuẩn, bao gồm mã lỗi, thông báo lỗi và có thể có thêm chi tiết. Ví dụ: `{ "code": "400", "message": "Invalid input", "details": { ... } }`.

##### 6.2 Error Types
*   **Validation Errors**: Lỗi do dữ liệu đầu vào không hợp lệ. [14]
*   **Authentication Errors**: Lỗi liên quan đến việc xác thực người dùng (ví dụ: token không hợp lệ). [14]
*   **Authorization Errors**: Lỗi do người dùng không có quyền truy cập vào tài nguyên. [14]
*   **Not Found Errors**: Lỗi khi không tìm thấy tài nguyên được yêu cầu. [14]
*   **Internal Server Errors**: Lỗi không xác định xảy ra ở phía server. [14]

##### 6.3 Logging Strategy
*   **Error Log Levels**: Sử dụng các mức độ log khác nhau (ví dụ: `error`, `warn`, `info`, `debug`) để ghi lại thông tin phù hợp. [14]
*   **Log Storage**: Logs có thể được lưu trữ vào file, database hoặc sử dụng các dịch vụ logging chuyên dụng (ví dụ: ELK Stack, Sentry) [14, 15].
*   **Sensitive Information Handling**: Tránh ghi log các thông tin nhạy cảm như mật khẩu, token.

#### 7. Caching Strategy
##### 7.1 Cache Layers
*   **Database Query Cache**: Có thể sử dụng cache ở tầng database (ví dụ: PostgreSQL cache) để giảm tải cho database. [16]
*   **API Response Cache**: Sử dụng Redis (tùy chọn) để cache response của các API ít thay đổi, cải thiện hiệu suất. [4, 16]
*   **In-Memory Data Cache**: Có thể sử dụng cache in-memory trong ứng dụng cho một số dữ liệu thường xuyên được truy cập. [16]

##### 7.2 Cache Invalidation
*   **Time-based**: Thiết lập thời gian hết hạn cho cache.
*   **Event-based**: Xóa cache khi có sự kiện thay đổi dữ liệu liên quan (ví dụ: sau khi cập nhật thông tin người dùng).

#### 8. Background Jobs & Scheduling
##### 8.1 Job Types
*   Có thể có các background job để xử lý các tác vụ không đồng bộ, ví dụ:
    *   Tính toán và cập nhật tổng tài sản người dùng định kỳ.
    *   Gửi email thông báo (nếu có).
    *   Xử lý các tác vụ liên quan đến huy hiệu kỹ năng (nếu cần).

##### 8.2 Scheduling Strategy
*   Sử dụng NestJS Schedule (@nestjs/schedule) hoặc BullMQ (@nestjs/bull) (tùy chọn) để lên lịch và quản lý các background job định kỳ hoặc được kích hoạt bởi sự kiện [17].

#### 9. File Storage
##### 9.1 Storage Locations
*   Các file tải lên (ví dụ: avatar người dùng - nếu có) có thể được lưu trữ trên Amazon S3, Google Cloud Storage hoặc một hệ thống lưu trữ file cục bộ (cho môi trường phát triển) [17].

##### 9.2 File Access Control
*   Quyền truy cập vào file sẽ được kiểm soát dựa trên vai trò và quyền hạn của người dùng. Có thể sử dụng URL signed để cấp quyền truy cập tạm thời.

#### 10. Deployment & Environments
##### 10.1 Environment Configuration
*   **Development**: Sử dụng cấu hình và database cục bộ, logging chi tiết.
*   **Staging**: Môi trường gần giống production để kiểm thử trước khi triển khai chính thức.
*   **Production**: Môi trường chính thức mà người dùng sẽ truy cập, cấu hình tối ưu cho hiệu suất và bảo mật.

##### 10.2 Environment Variables
Các biến môi trường (được quản lý qua file `.env` hoặc hệ thống quản lý biến môi trường của nhà cung cấp dịch vụ) sẽ được sử dụng để cấu hình các thông số khác nhau cho từng môi trường, ví dụ:
| Variable | Purpose | Example |
| ------ | ------ | ------ |
| DATABASE_URL | Chuỗi kết nối đến database PostgreSQL | `postgresql://user:password@host:port/database` |
| JWT_SECRET | Secret key để ký JWT tokens | `your-secret-key` |
| API_BASE_URL | Base URL của backend API | `https://api.cyberkdapp.com` |
| REDIS_URL | URL của Redis server (nếu sử dụng) | `redis://default:password@host:port` |
| AWS_S3_BUCKET_NAME | Tên bucket S3 (nếu sử dụng) | `cyberk-dapp-files` |
| GOOGLE_CLIENT_ID | Client ID cho Google OAuth | `your-google-client-id` |

##### 10.3 Deployment Process
*   Quy trình deployment sẽ được tự động hóa bằng CI/CD pipeline (ví dụ: GitHub Actions, GitLab CI/CD) [18].
*   Các bước cơ bản bao gồm: build code, chạy tests, tạo containers (nếu sử dụng Docker), và triển khai lên các server hoặc dịch vụ hosting đã cấu hình (ví dụ: AWS EC2/ECS, Google Cloud Run) [18].
*   Chiến lược rollback sẽ được thiết lập để có thể nhanh chóng khôi phục về phiên bản trước nếu có vấn đề xảy ra sau khi triển khai [19].
Bắt đầu nhập...
10 nguồn



Studio
Tổng quan bằng âm thanh
Cuộc trò chuyện tìm hiểu chuyên sâu
Hai người nói (chỉ bằng tiếng Anh)
Ghi chú
NotebookLM có thể đưa ra thông tin không chính xác; hãy kiểm tra kỹ câu trả lời mà bạn nhận được.