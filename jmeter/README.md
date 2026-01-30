# JMeter Performance Test Report

## Mục tiêu

* Làm quen với Apache JMeter và cách kiểm thử hiệu năng web.
* Thiết kế nhiều Thread Group với mức tải khác nhau.
* Thu thập, phân tích kết quả từ **Summary Report** và **View Results Tree**.

## Website được kiểm thử

* **URL**: [https://vi.wikipedia.org/wiki/Trang_Ch%C3%ADnh]

## Môi trường kiểm thử

* **Apache JMeter**: 5.6.3
* **Hệ điều hành**: Windows

## Cấu hình chung

* **HTTP Request Defaults**

  * Protocol: `https`
  * Server Name: `en.wikipedia.org`
* **HTTP Header Manager**

  * User-Agent: trình duyệt giả lập (tránh lỗi 403)
* **Listeners**

  * Summary Report
  * View Results Tree

## Kịch bản kiểm thử

### Thread Group 1 – Basic

* Threads (Users): 10
* Loop Count: 10
* Sampler:

  * GET /

### Thread Group 2 – Heavy

* Threads (Users): 50
* Ramp-up Period: 30 giây
* Samplers:

  * GET /
  * GET /wiki/Main_Page

### Thread Group 3 – Custom

* Threads (Users): 20
* Scheduler: bật
* Duration: 60 giây
* Samplers:

  * GET /wiki/Tran_Quang_Khai
  * GET /wiki/Nguyen_Manh_Hung

## Kết quả kiểm thử (Summary Report)

> Dữ liệu được lấy trực tiếp từ **Summary Report** trong JMeter theo đúng file và ảnh minh chứng.

| Label                | #Samples | Avg (ms) | Min (ms) | Max (ms) |  Error % | Throughput (req/sec) |
| -------------------- | -------: | -------: | -------: | -------: | -------: | -------------------: |
| GET HOME             |      100 |      803 |      280 |     2523 |     0.00 |                  3.3 |
| GET SUBPAGE          |       50 |      269 |      146 |      712 |     0.00 |                  1.7 |
| GET TRAN QUANG KHAI  |       20 |     4755 |     3559 |     6287 |     0.00 |                  3.1 |
| GET NGUYEN MANH HUNG |       20 |     3678 |      902 |     5175 |     0.00 |                  2.7 |
| **TOTAL**            |  **190** | **1381** |  **146** | **6287** | **0.00** |              **6.3** |

### Nhận xét

* Không ghi nhận lỗi (**Error % = 0%** cho tất cả request).
* Các trang wiki cá nhân có thời gian phản hồi cao hơn trang HOME và SUBPAGE.
* Throughput tổng đạt khoảng **6.3 requests/second**.

## View Results Tree

* Tất cả request đều trả về trạng thái **Success (màu xanh)**.
* Response được kiểm tra ở chế độ **Text**.
* Dữ liệu phản hồi đầy đủ, không có lỗi HTTP.

## File & Minh chứng

* **File test plan**: `Thread Group 1 basic.jmx`
* **File kết quả**: `summary.csv`

### Screenshots

* Summary Report
* View Results Tree (nhiều request GET HOME, GET SUBPAGE, GET TRAN QUANG KHAI, GET NGUYEN MANH HUNG)
Summary Report: jmeter/evidence/Screenshot 2026-01-30 105613.png

View Results Tree (1): jmeter/evidence/Screenshot 2026-01-30 105709.png

View Results Tree (2): jmeter/evidence/Screenshot 2026-01-30 105716.png


## Kết luận

Kịch bản kiểm thử được cấu hình đúng, hệ thống mục tiêu (Wikipedia) xử lý ổn định dưới các mức tải khác nhau. JMeter 5.6.3 đáp ứng tốt cho việc đo thời gian phản hồi, throughput và tỷ lệ lỗi trong bài kiểm thử này.
