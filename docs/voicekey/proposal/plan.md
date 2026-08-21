# Kế hoạch nghiên cứu và proposal: VoiceKey

## Trạng thái

V2.1, ngày 21/08/2026 (ICT): Markdown, DOCX và PDF 19 trang đã được xuất lại sau vòng rà soát evidence. Đã kiểm tra trực quan toàn bộ trang, bảng, sơ đồ, liên kết trích dẫn, và ranh giới giữa bằng chứng bên ngoài với kết quả chưa đo của VoiceKey. Các đầu vào filing thực tế vẫn chờ đội dự án: tên và năng lực nhóm, ngày lịch, kết quả benchmark, và video demo VoiceKey thật.

## Mục tiêu

Soạn một technical proposal theo đúng rubric của OneVoice AI Challenge cho **VoiceKey**: phụ kiện USB-C nhỏ gọn gắn vào điện thoại Android, ghi/thu âm thanh chất lượng tốt hơn và dùng ứng dụng điện thoại để dịch hội thoại offline, hiển thị văn bản ngay trên màn hình.

## Pha công việc

1. **Phân tích template và rubric:** hoàn tất. Đã xác định tám phần bắt buộc, trọng số 35% AI + 25% hardware, và yêu cầu sơ đồ kiến trúc.
2. **Nghiên cứu bằng chứng:** hoàn tất. Đã rà sản phẩm/demo công khai, bài báo/model, Android USB-C, BOM, cấu trúc giá và economics pilot. Các nguồn YouTube, Douyin và Facebook được phân tầng rõ; TikTok Shop chỉ được giữ trong research như tín hiệu retail, không đưa vào appendix làm video demo.
3. **Tổng hợp research Markdown:** hoàn tất. Báo cáo có nguồn, giới hạn bằng chứng và đề xuất có thể kiểm chứng.
4. **Soạn proposal Markdown:** hoàn tất. Đã điền toàn bộ nội dung theo rubric, kèm vị thế cạnh tranh, pipeline, BOM, KPI, timeline, chi phí/lợi ích và các giả định cần thay thế.
5. **Xuất DOCX + kiểm tra render:** hoàn tất. Đã cập nhật model-release gate, Android USB/audio/permission gate, BOM/ROI/pilot quantity boundary, evidence pricing/demo, matrix handset tham chiếu và gate năng lượng toàn hệ thống. DOCX và PDF 19 trang được render và kiểm tra toàn bộ trang, hình học bảng, sơ đồ, liên kết trích dẫn và khả năng truy cập.

## Vòng phản biện và cải thiện v2.1

- **Paper evidence:** PhoST, PhoWhisper và PhoMT có citation học thuật đầy đủ trong proposal. Chúng hỗ trợ hướng kiến trúc và bối cảnh evaluation, không được dùng thay cho benchmark VoiceKey.
- **iOS scope:** sửa lỗi `AccessoryAccess`. Đây là quyền truy cập USB cho macOS, không phải đường USB accessory cho iPhone. iOS giữ ở phone-only validation cho tới khi có API và phần cứng Apple-supported được chứng minh.
- **Offline and integrity:** ngoài Airplane Mode, proposal yêu cầu một test khi mạng đang bật nhưng ghi nhận zero outbound connection của VoiceKey. Language pack yêu cầu manifest ký bằng key pinned trong app, kiểm tra signature/hash, và test key rotation hoặc rollback.
- **Model and hardware clarity:** bỏ range size chung thiếu căn cứ cho Whisper. Mỗi candidate phải đo model size sau quantization, RAM, heat, quality và latency. STUSB4500 chỉ là controller reference thay thế, không được tính trong passive USB-device BOM mặc định.
- **USB claim boundary:** bỏ các từ deterministic và broadly compatible trong research cũ. USB Audio Class vẫn cần test route, reconnect và task benefit trên từng điện thoại Android được hỗ trợ.
- **Comparable demos:** Appendix B dùng product pages và ba video vendor workflow rõ ràng của Timekettle W4 Pro, Pocketalk và Vasco E1. Facebook và Douyin chỉ là bằng chứng xã hội thứ cấp. TikTok Shop không phải demo kỹ thuật.
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
