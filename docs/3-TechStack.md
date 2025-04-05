### Tech Stack Document

#### 1. Frontend Technologies

##### 1.1 Framework Chính

* **Framework** : Next.js
* **Lý do chọn** : Next.js là một framework React phổ biến cho phép xây dựng các ứng dụng web hiệu suất cao với các tính năng như server-side rendering (SSR) và static site generation (SSG). Nó cung cấp trải nghiệm phát triển tuyệt vời và tích hợp tốt với nhiều công cụ và thư viện khác.
* **Documentation** : [https://nextjs.org/docs](https://nextjs.org/docs)

##### 1.2 Các Thư Viện UI

* **Component Library** : Shadcn UI
  * **Mục đích** : Shadcn UI là một bộ sưu tập các component UI có thể tùy chỉnh, được xây dựng bằng Radix UI primitives và Tailwind CSS. Nó cung cấp các component đẹp mắt, dễ sử dụng và có khả năng tùy biến cao.
  * **Documentation** : [https://ui.shadcn.com/docs](https://ui.shadcn.com/docs)
* **CSS Framework** : Tailwind CSS
  * **Mục đích** : Tailwind CSS là một framework CSS utility-first, giúp bạn xây dựng giao diện tùy chỉnh nhanh chóng bằng cách áp dụng các class utility trực tiếp trong HTML.
  * **Documentation** : [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
* **Icon Library** : React Icons (hoặc một thư viện icons phù hợp khác)
  * **Mục đích** : Cung cấp một bộ sưu tập lớn các icons vector có thể dễ dàng sử dụng trong các component React.
  * **Documentation** : [https://react-icons.github.io/react-icons/](https://react-icons.github.io/react-icons/)

##### 1.3 State Management

* **Library** : Zustand (hoặc Redux Toolkit, Recoil, Context API with useReducer)
* **Pattern** : Tùy thuộc vào thư viện được chọn (ví dụ: Centralized store với reducers/actions cho Redux, atomic state với selectors cho Recoil, simple stores với setters cho Zustand, hoặc reducer pattern cho Context API).
* **Documentation** :
  * Zustand: [https://zustand-dreiber.vercel.app/](https://zustand-dreiber.vercel.app/)
  * Redux Toolkit: [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)
  * Recoil: [https://recoiljs.org/](https://recoiljs.org/)
  * React Context API: [https://react.dev/learn/passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context)

##### 1.4 Routing

* **Library** : Tích hợp sẵn trong Next.js
* **Structure** : Dựa trên cấu trúc thư mục `pages/` (hoặc `app/` cho App Router). Định tuyến động có thể được thực hiện bằng cách sử dụng cú pháp `[param]`.
* **Documentation** : [https://nextjs.org/docs/routing](https://nextjs.org/docs/routing)

##### 1.5 Validation & Forms

* **Library** : React Hook Form (hoặc Formik, Yup)
* **Approach** : Sử dụng hook để quản lý state của form, xử lý validation và submit form một cách dễ dàng và hiệu quả.
* **Documentation** :
  * React Hook Form: [https://react-hook-form.com/](https://react-hook-form.com/)
  * Formik: [https://formik.org/docs/overview](https://formik.org/docs/overview)
  * Yup: [https://yup.reach.sh/docs](https://yup.reach.sh/docs)

##### 1.6 Thư Viện Tiện Ích

* **Dates/Times** : date-fns (hoặc Moment.js, Luxon)
* **HTTP Client** : axios (hoặc fetch API tích hợp)
* **Internationalization** : next-i18next (hoặc react-intl)
* **Animation** : Framer Motion (hoặc React Transition Group)
* **Testing** : Jest và React Testing Library

#### 2. Backend Technologies

##### 2.1 Framework Chính

* **Framework** : NestJS
* **Lý do chọn** : NestJS là một framework Node.js lũy tiến để xây dựng các ứng dụng phía máy chủ hiệu quả và có khả năng mở rộng. Nó sử dụng TypeScript và kết hợp các yếu tố của lập trình hướng đối tượng (OOP), lập trình hàm (FP) và lập trình phản ứng chức năng (FRP). Kiến trúc module của NestJS giúp tổ chức code tốt hơn và dễ bảo trì.
* **Documentation** : [https://docs.nestjs.com/](https://docs.nestjs.com/)

##### 2.2 Database

* **Primary Database** : PostgreSQL
  * **Type** : SQL
  * **Documentation** : [https://www.postgresql.org/docs/current/index.html](https://www.postgresql.org/docs/current/index.html)
* **Caching Layer** : Redis (tùy chọn)
  * **Documentation** : [https://redis.io/documentation](https://redis.io/documentation)

##### 2.3 Authentication

* **Authentication Method** : JWT (JSON Web Tokens)
* **Library/Service** : @nestjs/passport và passport-jwt
* **Documentation** :
  * @nestjs/passport: [https://docs.nestjs.com/security/passport](https://docs.nestjs.com/security/passport)
  * passport-jwt: [https://github.com/mikenicholson/passport-jwt](https://github.com/mikenicholson/passport-jwt)

##### 2.4 API Architecture

* **Pattern** : RESTful API
* **Documentation Format** : OpenAPI (Swagger)
* **Versioning Strategy** : Versioning theo URI (ví dụ: `/api/v1/users`) hoặc theo header.

##### 2.5 File Storage

* **Service/Library** : Amazon S3, Google Cloud Storage, hoặc một thư viện local storage (ví dụ: multer)
* **Purpose** : Lưu trữ các file tải lên của người dùng và các tài sản khác.
* **Documentation** : (Tùy thuộc vào dịch vụ/thư viện được chọn)

##### 2.6 Task Processing

* **Queue System** : BullMQ (hoặc RabbitMQ, Kafka) (tùy chọn cho các tác vụ nền phức tạp)
* **Background Jobs** : NestJS BullModule (@nestjs/bull) hoặc NestJS Schedule (@nestjs/schedule) cho các tác vụ định kỳ.
* **Documentation** :
  * BullMQ: [https://docs.bullmq.io/](https://docs.bullmq.io/)
  * @nestjs/bull: [https://docs.nestjs.com/techniques/queues](https://docs.nestjs.com/techniques/queues)
  * @nestjs/schedule: [https://docs.nestjs.com/techniques/scheduling](https://docs.nestjs.com/techniques/scheduling)

#### 3. DevOps & Infrastructure

##### 3.1 Hosting/Deployment

* **Frontend Hosting** : Vercel, Netlify
* **Backend Hosting** : AWS (EC2, ECS, Lambda), Google Cloud (Compute Engine, Cloud Run, Cloud Functions), Heroku, DigitalOcean
* **Database Hosting** : AWS (RDS), Google Cloud (Cloud SQL), Azure Database for PostgreSQL, ElephantSQL

##### 3.2 CI/CD

* **Service/Tool** : GitHub Actions, GitLab CI/CD, Jenkins, CircleCI
* **Process Overview** : Tự động hóa quá trình build, test và triển khai ứng dụng khi có thay đổi code được push lên repository.

##### 3.3 Monitoring

* **Error Tracking** : Sentry, Bugsnag
* **Performance Monitoring** : Datadog, New Relic, Prometheus, Grafana
* **Logging** : ELK Stack (Elasticsearch, Logstash, Kibana), Graylog, Winston (trong ứng dụng)

##### 3.4 Build Tools

* **Frontend** : npm, yarn, pnpm
* **Backend** : npm, yarn, pnpm

#### 4. Third-party Services & APIs

##### 4.1 [Tên Service/API 1]

* **Purpose** : [Mô tả mục đích sử dụng]
* **Documentation** : [Link]
* **API Key Management** : [Mô tả cách quản lý API keys]
* **Endpoints Used** :
  * [Endpoint 1]: [Mô tả]
  * [Endpoint 2]: [Mô tả]

##### 4.2 [Tên Service/API 2]

* **Purpose** : [Mô tả mục đích sử dụng]
* **Documentation** : [Link]
* **API Key Management** : [Mô tả cách quản lý API keys]
* **Endpoints Used** :
  * [Endpoint 1]: [Mô tả]
  * [Endpoint 2]: [Mô tả]

#### 5. Development Environment

##### 5.1 Requirements

* Node.js: phiên bản LTS (Long Term Support) mới nhất
* npm: phiên bản mới nhất (hoặc yarn, pnpm)
* Docker: phiên bản mới nhất (tùy chọn, nhưng khuyến khích để container hóa ứng dụng và database)
* PostgreSQL: phiên bản phù hợp

##### 5.2 Setup Steps

1. Cài đặt Node.js và npm (hoặc yarn/pnpm).
2. Cài đặt PostgreSQL và cấu hình một database development.
3. Clone repository dự án.
4. Chạy `npm install` (hoặc `yarn install`, `pnpm install`) để cài đặt các dependencies.
5. Cấu hình các biến môi trường cần thiết trong file `.env`.
6. Chạy lệnh để khởi động frontend (`npm run dev` hoặc tương tự) và backend (`npm run start:dev` hoặc tương tự).

##### 5.3 Environment Variables

* `DATABASE_URL`: Chuỗi kết nối đến database PostgreSQL.
* `JWT_SECRET`: Secret key để ký và xác minh JWT tokens.
* `API_BASE_URL`: Base URL của backend API cho frontend.
* [Các biến môi trường khác tùy thuộc vào các dịch vụ và cấu hình khác]

##### 5.4 Local Development Commands

* `npm run dev` (frontend): Khởi động server phát triển frontend với hot-reloading.
* `npm run start:dev` (backend): Khởi động server phát triển backend với auto-recompilation.
* `npm run build` (frontend): Build ứng dụng frontend để production.
* `npm run build` (backend): Build ứng dụng backend để production.
* `npm run start:prod` (backend): Khởi động server backend ở chế độ production.
* `npm run test` (frontend và/hoặc backend): Chạy các unit tests.
* `npm run typeorm migration:run` (backend): Chạy các database migrations.
* `npm run typeorm migration:generate -n [TênMigration]` (backend): Tạo một database migration mới.

#### 6. Dependencies Management

##### 6.1 Package Managers

* **Frontend** : npm, yarn, pnpm
* **Backend** : npm, yarn, pnpm

##### 6.2 Key Dependencies

| Dependency         | Version | Purpose                                           |
| ------------------ | ------- | ------------------------------------------------- |
| next               | [phiên bản] | React framework cho frontend                      |
| react              | [phiên bản] | Thư viện React                                    |
| react-dom          | [phiên bản] | Entry point cho DOM của React                    |
| @radix-ui/react-*  | [phiên bản] | Các primitive UI cho Shadcn UI                   |
| tailwindcss        | [phiên bản] | Framework CSS utility-first                       |
| postcss            | [phiên bản] | PostCSS cho Tailwind CSS                         |
| autoprefixer       | [phiên bản] | Tự động thêm tiền tố CSS                         |
| class-variance-authority | [phiên bản] | Utility function cho việc tạo các component variants |
| clsx               | [phiên bản] | Utility function cho việc thao tác với class names |
| tailwind-merge     | [phiên bản] | Utility function cho việc merge các class Tailwind |
| zustand            | [phiên bản] | Thư viện quản lý state (ví dụ)                     |
| axios              | [phiên bản] | HTTP client                                     |
| nestjs/core        | [phiên bản] | Core module của NestJS                           |
| nestjs/common      | [phiên bản] | Common module của NestJS                         |
| nestjs/platform-express | [phiên bản] | Platform adapter cho Express.js của NestJS      |
| nestjs/config      | [phiên bản] | Module cấu hình của NestJS                       |
| @nestjs/typeorm    | [phiên bản] | Integration TypeORM cho NestJS                  |
| typeorm            | [phiên bản] | ORM cho TypeScript và JavaScript                |
| pg                 | [phiên bản] | Driver PostgreSQL cho Node.js                    |
| @nestjs/jwt       | [phiên bản] | Module JWT cho NestJS                           |
| @nestjs/passport    | [phiên bản] | Module Passport cho NestJS                      |
| passport-jwt       | [phiên bản] | Strategy JWT cho Passport                        |
| bcrypt             | [phiên bản] | Thư viện hashing password                        |
| class-validator    | [phiên bản] | Validation library                              |
| class-transformer  | [phiên bản] | Transformation library                          |
| jest               | [phiên bản] | Testing framework                               |
| @testing-library/react | [phiên bản] | Thư viện testing cho React components          |

##### 6.3 Update Strategy

* Theo dõi các bản cập nhật của các thư viện và framework, và thực hiện cập nhật định kỳ sau khi đã kiểm tra kỹ lưỡng để đảm bảo tính ổn định và bảo mật của ứng dụng. Sử dụng các công cụ như `npm outdated` hoặc `yarn outdated` để kiểm tra các dependencies đã lỗi thời. Áp dụng semantic versioning và kiểm tra kỹ các breaking changes trước khi cập nhật các major versions.
