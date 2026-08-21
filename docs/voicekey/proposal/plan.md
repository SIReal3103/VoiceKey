# Kế hoạch nghiên cứu và proposal: VoiceKey

## Trạng thái

Hoàn tất v1.4 ngày 21/08/2026 (ICT): Markdown, DOCX và PDF companion đã được render thành 28 trang để kiểm tra trực quan; hình học bảng, sơ đồ, liên kết trích dẫn, claim boundary và audit khả năng truy cập đã được kiểm tra. Các đầu vào filing thực tế vẫn chờ đội dự án.

## Mục tiêu

Soạn một technical proposal theo đúng rubric của OneVoice AI Challenge cho **VoiceKey**: phụ kiện USB-C nhỏ gọn gắn vào điện thoại Android, ghi/thu âm thanh chất lượng tốt hơn và dùng ứng dụng điện thoại để dịch hội thoại offline, hiển thị văn bản ngay trên màn hình.

## Pha công việc

1. **Phân tích template và rubric** — hoàn tất: xác định tám phần bắt buộc, trọng số 35% AI + 25% hardware, và yêu cầu sơ đồ kiến trúc.
2. **Nghiên cứu bằng chứng** — hoàn tất: sản phẩm/demo công khai, bài báo/model, Android USB-C, BOM, cấu trúc giá và economics pilot; làm mới thêm catalogue YouTube, Douyin, Facebook và TikTok Shop có phân tầng bằng chứng.
3. **Tổng hợp research Markdown** — hoàn tất: báo cáo có nguồn, giới hạn bằng chứng và đề xuất có thể kiểm chứng.
4. **Soạn proposal Markdown** — hoàn tất: điền toàn bộ nội dung theo rubric, kèm vị thế cạnh tranh, pipeline, BOM, KPI, timeline, chi phí/lợi ích và các giả định cần thay thế.
5. **Xuất DOCX + kiểm tra render** — hoàn tất sau vòng phản biện độc lập: cập nhật model-release gate, Android USB/audio/permission gate, BOM/ROI/pilot quantity boundary, evidence pricing/demo, matrix handset tham chiếu và gate năng lượng toàn hệ thống; render/kiểm tra toàn bộ trang, hình học bảng, sơ đồ, liên kết trích dẫn và khả năng truy cập. Bản PDF companion được xuất cùng revision.

## Vòng phản biện và cải thiện v1.3–v1.4

- **Bằng chứng/model:** NLLB-200 distilled 600M được hạ xuống non-commercial research comparator theo model card; OPUS-MT EN-VI/VI-EN là shipping candidate có release ledger bắt buộc.
- **Android/hardware:** thêm USB-host/permission/foreground-service/actual-audio-route acceptance gates, matrix ba lớp handset, power brownout/route-loss gate và pack-integrity fail-closed rules.
- **Kinh tế:** BOM có inclusion boundary loại trừ double count; pilot dùng một quantity/yield policy xuyên suốt; ROI 12 tháng dùng cùng kỳ cho cost/benefit, có nhân 100%, và tách OPEX, NRE, capital. Proxy BLS được mô tả đúng là median wage tham khảo, không phải bill rate hay giá trị lợi ích đã chứng minh.
- **Đo lường host/power:** Pixel 8, Galaxy S24 Ultra và OnePlus 12 được phân định là thiết bị test/benchmark có SKU thực tế cần ghi nhận, không phải tuyên bố TOPS. Gate năng lượng đo ba điều kiện, ba lần lặp trong 30 phút để báo cáo battery delta, nhiệt độ và độ ổn định USB/audio.
- **Trình bày:** bỏ page-break làm tách tiêu đề 5.3 khỏi bảng BOM; bản final render 28 trang, đưa phần BOM và Appendix D vào trang có nội dung liền mạch.
- **Claim boundary v1.4:** hạ các cụm “stable/deterministic/local” thành yêu cầu thiết kế và release gate; không trình bày route USB, lợi thế microphone, offline egress hay latency như kết quả VoiceKey đã đo. Sửa mô tả `whisper.cpp` và citation TTS không chính xác trong research.
- **Social/video refresh v1.4:** bổ sung catalogue có thể truy vết cho demo YouTube, Douyin và Facebook; TikTok Shop chỉ là tín hiệu retail. Không video hoặc listing nào được dùng làm bằng chứng accuracy, latency hay offline robustness.
- **Filing boundary:** không bịa team/roster, ngày bắt đầu, demo riêng hoặc bằng chứng thực tế chưa tồn tại. Các trường này vẫn là đầu vào bắt buộc trước khi formal submission.

## Tiêu chí nghiệm thu

- Có ít nhất một nghiên cứu Markdown, một proposal Markdown và một DOCX có thể nộp.
- Nguồn nghiên cứu phân biệt rõ evidence, claim marketing và giả định đề xuất.
- Không hứa hẹn truy cập NPU của điện thoại từ USB dongle; compute được mô tả qua Android app/runtime hợp lệ.
- Tất cả bảng/rubric từ template đều có nội dung thực chất; các dữ kiện nhóm/tên người không thể suy ra được gắn nhãn rõ để chủ dự án thay thế trước khi nộp.
- DOCX được render và kiểm tra trực quan trước khi bàn giao.
- Proposal không được trình bày là "ready to file" khi chưa có team/roster thật, target dates từ start date thật, demo status/link và final PDF proofread.

## Phụ thuộc

- Mẫu: `/Users/macbook/Downloads/1V_P2_TechProposal_Template.pdf`
- Nguồn web và paper được liệt kê trong báo cáo research.
