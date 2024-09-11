![Blum banner](https://raw.githubusercontent.com/zuydd/image/main/blum.jpeg)

# Tool Auto Blum NodeJS by ZuyDD

**Tool phát triển và chia sẻ miễn phí bởi ZuyDD**

<a href="https://www.facebook.com/zuy.dd"><img src="https://raw.githubusercontent.com/zuydd/image/main/facebook.svg" alt="Facebook"></a>
<a href="https://t.me/zuydd"><img src="https://raw.githubusercontent.com/zuydd/image/main/telegram.svg" alt="Telegram"></a>

> [!WARNING]
> Mọi hành vi buôn bán tool dưới bất cứ hình thức nào đều không được cho phép!

## 🛠️ Hướng dẫn cài đặt

> Yêu cầu đã cài đặt NodeJS

- Bước 1: Tải về phiên bản mới nhất của tool [tại đây ⬇️](https://github.com/zuydd/blum/archive/refs/heads/main.zip)
- Bước 2: Giải nén tool
- Bước 3: Tại thư mục tool vừa giải nén (thư mục có chứa file package.json), chạy lệnh `npm install` để cài đặt các thư viện bổ trợ

## 💾 Cách thêm dữ liệu tài khoản

> Tool hỗ trợ cả `user` và `query_id` (khuyến khích dùng query_id)

> Tất cả dữ liệu mà bạn cần nhập đều nằm ở các file trong thư mục 📁 `src / data`

- [users.txt](src/data/users.txt) : chứa danh sách `user` hoặc `query_id` của các tài khoản, mỗi dòng ứng với một tài khoản
- [proxy.txt](src/data/proxy.txt) : chứa danh sách proxy, proxy ở mỗi dòng sẽ ứng với tài khoản ở dòng đó trong file users.txt phía trên, để trống nếu không dùng proxy
- [token.json](src/data/token.json) : chứa danh sách token được tạo ra từ `user` hoặc `query_id`. Token sẽ được tự động sinh ra khi bạn chạy tool

> Định dạng proxy: http://user:pass@ip:port

## >\_ Các lệnh và chức năng tương ứng

| Lệnh            | Chức năng                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `npm run start` | Dùng để chạy farming/claim, làm nhiệm vụ, điểm danh, chơi game, claim điểm invite,.... tóm lại game có gì là nó làm cái đó |

## 🕹️ Các tính năng có trong tool

- tự động điểm danh hàng ngày
- tự động tham gia tribe để nhận thêm 10% điểm thưởng
- tự động làm nhiệm vụ
- tự động farming/claim khi tới giờ
- tự động chơi game
- claim điểm invite
- nhận diện proxy tự động, tự động kết nối lại proxy khi bị lỗi. ae ai chạy proxy thì thêm vào file proxy.txt ở dòng ứng với dòng chứa acc muốn chạy proxy đó, acc nào không muốn chạy proxy thì để trống hoặc gõ skip vào
- đa luồng chạy bao nhiêu acc cũng được, không bị block lẫn nhau

> [!WARNING]
>
> - Nếu gặp lỗi đăng nhập, làm nhiệm vụ hay chơi game thì là do server của blum nó lỏ chứ không phải lỗi tool, cứ kệ nó, hồi nó quay lại làm sau khi hết lỗi.
> - Vì server nó hay lỗi vào khung giờ 14h-24h nên khuyến khích ae chạy tool lần đầu vào khung giờ 4h-12h để chạy mượt mà nhé

## ♾ Cài đặt đa luồng

- Mặc định tool sẽ chạy đa luồng ứng với số tài khoản bạn nhập vào, không cần cài đặt thêm gì cả.
- Mặc định ở vòng lặp đầu tiên mỗi tài khoản (luồng) sẽ chạy cách nhau 30s để tránh spam request, có thể tìm biến `DELAY_ACC = 30` trong file [index.js](src/run/index.js) để điều chỉnh cho phù hợp

## ❌ Chế độ thử lại khi lỗi

- Đỗi với lỗi kết nối proxy, hệ thống sẽ cố thử lại sau mỗi 30s, bạn có thể cài đặt giới hạn số lần thử lại bằng cách tìm biến `MAX_RETRY_PROXY = 20` trong file [index.js](src/run/index.js) để điều chỉnh cho phù hợp (mặc định là 20). Khi quá số lần thử kết nối lại hệ thống sẽ dừng auto tài khoản đó và nghi nhận lỗi vào file [log.error.txt](src/data/log.error.txt)
- Đỗi với lỗi đăng nhập thất bại, hệ thống sẽ cố thử lại sau mỗi 60s, bạn có thể cài đặt giới hạn số lần thử lại bằng cách tìm biến `MAX_RETRY_LOGIN = 20` trong file [index.js](src/run/index.js) để điều chỉnh cho phù hợp (mặc định là 20). Khi quá số lần thử đăng nhập lại hệ thống sẽ dừng auto tài khoản đó và nghi nhận lỗi vào file [log.error.txt](src/data/log.error.txt)

## 🔄 Lịch sử cập nhật

> Khi cập nhật phiên bản mới chỉ cần copy thư mục 📁 [data](src/data) của bản cũ ghi đè lại ở bản mới là có thể chạy được mà không cần lấy lại data

> Phiên bản mới nhất: `v0.0.6`

<details>
<summary>v0.0.6 - 📅 11/09/2024</summary>
  
- Thêm tự động làm các task yêu cầu trả lời câu hỏi (do server blum không ổn định nên có thể lần đầu làm sẽ bị lỗi, mọi người cứ kệ nó để hồi nó quay lại làm là được)
- Sửa lỗi chức năng điểm danh (checkin) hiển thị đúng trạng thái và phần thưởng khi điểm danh
- Sửa lỗi không tự động claim điểm giới thiệu
- Fix lỗi lấy danh sách nhiệm vụ thất bại
</details>
<details>
<summary>v0.0.5 - 📅 08/09/2024</summary>
  
- Thêm cơ chế giới hạn số lần thử lại khi lỗi proxy/đăng nhập
- Ghi nhận lỗi vào file log khi thử lại quá số lần cài đặt để các bạn chạy nhiều acc tiện theo dõi
- Cập nhật chính xác số vé chơi game sau khi checkin
</details>
<details>
<summary>v0.0.4 - 📅 07/09/2024</summary>
  
- Cập nhật lại data task, fix lỗi không làm task
</details>
<details>
<summary>v0.0.3 - 📅 05/09/2024</summary>
  
- Thay đổi API login
</details>
<details>
<summary>v0.0.2 - 📅 02/09/2024</summary>
  
- Điều chỉnh điểm point chơi game về đúng với thực tế (từ 180 - 200)
</details>
<details>
<summary>v0.0.1 - 📅 02/09/2024</summary>
  
- Chia sẽ tool đến cộng đồng
</details>

## 🎁 Donate

Chúng tôi rất vui được chia sẻ các mã script và tài nguyên mã nguồn miễn phí đến cộng đồng làm airdrop. Nếu bạn thấy các công cụ và tài liệu của chúng tôi hữu ích và muốn ủng hộ chúng tôi tiếp tục phát triển và duy trì các dự án này, bạn có thể đóng góp hỗ trợ qua hình thức donate.

Mỗi đóng góp của bạn sẽ giúp chúng tôi duy trì chất lượng dịch vụ và tiếp tục cung cấp những tài nguyên giá trị cho cộng đồng làm airdrop. Chúng tôi chân thành cảm ơn sự hỗ trợ và ủng hộ của bạn!

Mãi iu 😘😘😘

<div style="display: flex; gap: 20px;">
  <img src="https://raw.githubusercontent.com/zuydd/image/main/qr-momo.png" alt="QR Momo" height="340" />
  <img src="https://raw.githubusercontent.com/zuydd/image/main/qr-binance.jpg" alt="QR Binance" height="340" />
</div>
