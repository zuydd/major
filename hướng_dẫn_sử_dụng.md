** Link cập nhật tool và hướng dẫn chi tiết tại **
https://github.com/zuydd/blum

**_ Hướng dẫn cài đặt _**

- B1: Tải và giải nén tool
- B2: Chạy lệnh: npm install tại thư mục chứa tool (thư mục có chứa file package.json) để cài đặt thư viện bổ trợ
- B3: vào thư mục src -> data, nhập user hoặc query_id vào file users.txt và proxy vào file proxy.txt, không có proxy thì bỏ qua khỏi nhập

**_ Các lệnh chức năng chạy tool _**

- npm run start: Dùng để làm nhiệm vụ, điểm danh, chơi game,.... tóm lại game có gì là nó làm cái đó

🕹️ Các tính năng có trong tool:

- tự động điểm danh hàng ngày
- tự động làm nhiệm vụ
- tự động chơi game khi tới giờ (các game có thể chơi: Hold Coin, Roulette, Swipe Coin, Durov)
- nhận diện proxy tự động, tự động kết nối lại proxy khi bị lỗi. ae ai chạy proxy thì thêm vào file proxy.txt ở dòng ứng với dòng chứa acc muốn chạy proxy đó, acc nào không muốn chạy proxy thì để trống hoặc gõ skip vào
- đa luồng chạy bao nhiêu acc cũng được, không bị block lẫn nhau, lặp lại khi tới thời gian chơi game
- hiển thị đếm ngược tới lần chạy tiếp theo, có thể tìm biến IS_SHOW_COUNTDOWN = true đổi thành false để tắt cho đỡ lag

⚠️ Lưu ý:

- Game Durov có combo trả lời đổi mỗi ngày nên tool sẽ bắt đầu chạy task này từ 9h sáng thay vì 7h sáng để có đủ thời gian cập nhật combo mới
- Có nhiều nhiệm vụ yêu cầu phải làm thủ công, không claim láo được nên đừng thắc mắc sao còn nhiều nhiệm vụ chưa làm thế.
- Nếu gặp lỗi 5xx khi chơi game thì kệ nó, điểm vẫn được tính, do server lỏ thôi
- Vì server nó hay lỗi vặt nên đừng bất ngờ khi thấy các lỗi 5xx nhé
