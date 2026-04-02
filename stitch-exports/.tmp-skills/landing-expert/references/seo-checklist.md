<!-- Reference: Detailed SEO checklist for landing-expert outputs. -->

# SEO Checklist

## Technical SEO

- [ ] Đặt canonical URL tuyệt đối và khớp với URL public cuối cùng. Ví dụ: `https://example.com/sua-may-lanh-ha-noi/`.
- [ ] Chọn robots meta đúng môi trường. Ví dụ production dùng `index,follow`; staging dùng `noindex,nofollow`.
- [ ] Gợi ý đưa URL canonical vào `sitemap.xml` của domain, ví dụ trang `/spa-ha-noi/` phải xuất hiện trong sitemap chính.
- [ ] Thêm Schema.org JSON-LD đúng loại. Dùng `LocalBusiness` cho spa, nail, sửa chữa tại địa phương; dùng `Product` cho landing page bán sản phẩm.
- [ ] Đảm bảo `og:url` khớp canonical và không chứa query test như `?utm_source=preview`.
- [ ] Dùng HTTPS cho `canonical_url`, `og_image`, logo và asset chia sẻ mạng xã hội.
- [ ] Chỉ thêm `noindex` khi user yêu cầu staging, private preview hoặc chiến dịch chưa public.

## On-page SEO

- [ ] Dùng title formula `Keyword chính | Benefit chính | Brand`. Ví dụ: `Sửa máy lạnh Hà Nội | Có mặt nhanh trong ngày | AirFix`.
- [ ] Giữ title trong khoảng 50-60 ký tự; tránh lặp brand hoặc nhồi nhiều địa điểm.
- [ ] Dùng meta description formula `Pain point + offer + trust cue + CTA`. Ví dụ: `Đặt thợ sửa máy lạnh tại Hà Nội, báo giá rõ ràng, hỗ trợ nhanh trong ngày và gọi ngay để được tư vấn.`
- [ ] Chỉ có 1 thẻ `H1` khớp intent chính; các section còn lại dùng `H2` và `H3`.
- [ ] Đặt keyword chính trong `H1`, đoạn mở đầu, alt của hero image và 1-2 subheading; tránh nhồi quá mức, giữ mật độ tự nhiên khoảng 1-2%.
- [ ] Nhắc địa điểm phục vụ trong copy nếu đây là local business. Ví dụ thêm `Hà Nội`, `Cầu Giấy`, `Hai Bà Trưng` vào FAQ hoặc contact block.
- [ ] Viết alt text mô tả ảnh thực tế. Ví dụ: `Kỹ thuật viên vệ sinh máy lạnh treo tường tại căn hộ ở Hà Nội`.
- [ ] Dùng CTA text chứa động từ hành động và intent tìm kiếm. Ví dụ: `Gọi kỹ thuật viên ngay`, `Đặt lịch chăm da hôm nay`.

## Performance SEO

- [ ] Giữ mục tiêu Core Web Vitals: `LCP < 2.5s`, `CLS < 0.1`, `INP < 200ms`.
- [ ] Tối ưu ảnh hero thành WebP hoặc AVIF nếu có thể và cố gắng giữ dưới khoảng `250 KB`.
- [ ] Đặt `width` và `height` cho ảnh để tránh layout shift, nhất là hero, logo, gallery và testimonial avatar.
- [ ] Preload ảnh LCP. Ví dụ: `<link rel="preload" as="image" href="/assets/hero.webp">`.
- [ ] Đặt `loading="eager"` và `fetchpriority="high"` cho hero image; dùng `loading="lazy"` cho ảnh dưới fold.
- [ ] Nếu dùng webfont, preload tối đa 1-2 font file quan trọng và thêm `font-display: swap`.
- [ ] Giữ CSS critical cho above-the-fold ngắn gọn; tránh chain `@import` hoặc nhiều stylesheet nhỏ.
- [ ] Tránh slider, video autoplay hoặc script nặng trong hero nếu không thực sự cần cho conversion.
- [ ] Ưu tiên SVG cho icon và logo đơn giản để giảm request và giữ độ nét.
