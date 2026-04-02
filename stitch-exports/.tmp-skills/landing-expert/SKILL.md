---
name: landing-expert
description: Tạo landing page HTML/CSS single-page hoàn chỉnh, tối ưu SEO, với cấu trúc tách toàn bộ dữ liệu kinh doanh vào file site.config.json để dễ thay đổi số điện thoại, giá, CTA, màu sắc, logo và thông tin thương hiệu mà không cần sửa code. Trigger khi user yêu cầu "tạo landing page", "làm trang giới thiệu sản phẩm", "build trang bán hàng", "tạo trang đích", hoặc khi task liên quan tới một trang HTML marketing one-page. Không dùng cho multi-page websites, CMS lớn, hoặc web app phức tạp.
---

<!-- Purpose: Build SEO-ready, config-driven single-page landing pages with separated business data. -->

# Landing Expert

## Triết lý thiết kế

- Ưu tiên mobile-first và performance-first.
- Đưa toàn bộ dữ liệu kinh doanh như SĐT, giá, địa chỉ, CTA, màu sắc, logo, link mạng xã hội vào `site.config.json`; không hardcode chúng trong HTML.
- Giữ HTML cho cấu trúc, semantics và logic render; đọc config qua `fetch("site.config.json")` hoặc inline JSON khi môi trường không hỗ trợ fetch cục bộ.
- Tách CSS ra `style.css` hoặc quản lý theme bằng CSS custom properties như `--primary-color`, `--secondary-color`, `--surface-color`.
- Giữ landing page rõ ràng, tải nhanh, dễ chỉnh sửa, và dễ bàn giao cho user không rành code.

## Workflow bắt buộc

1. Hỏi hoặc xác nhận các dữ liệu còn thiếu: tên thương hiệu, sản phẩm hoặc dịch vụ, màu chủ đạo, số điện thoại, CTA chính, và ngôn ngữ `vi` hoặc `en`. Nếu user đã cung cấp một phần, chỉ hỏi phần còn thiếu.
2. Tạo `site.config.json` trước tiên, dùng đúng schema bắt buộc bên dưới hoặc copy từ `assets/site.config.json`.
3. Scaffold `index.html` đọc config và render nội dung bằng JS template literals hoặc `data-*` bindings; không hardcode text kinh doanh vào markup.
4. Mở `references/seo-checklist.md` và áp dụng checklist SEO trước khi chốt phần head, structured data, và media loading.
5. Mở `references/conversion-patterns.md` và kiểm tra hero, social proof, CTA, trust signals, và mobile sticky CTA.
6. Output cuối luôn gồm `index.html`, `style.css`, và `site.config.json`; asset khác chỉ là bổ sung, không thay thế 3 file chính.

## Cấu trúc site.config.json bắt buộc

Giữ nguyên các nhóm key sau:

- `brand`: `name`, `tagline`, `logo_url`, `primary_color`, `secondary_color`
- `contact`: `phone`, `phone_display`, `email`, `address`, `zalo`, `facebook`
- `hero`: `headline`, `subheadline`, `cta_text`, `cta_url`, `image_url`
- `product`: `name`, `description`, `price`, `original_price`, `currency`, `features[]`
- `social_proof`: `reviews[]`, `partner_logos[]`, `trust_badges[]`
- `seo`: `title`, `description`, `keywords[]`, `og_image`, `canonical_url`, `schema_type`

## Chuẩn SEO

Đọc `references/seo-checklist.md` khi chuẩn bị head và structured data. Tối thiểu phải đảm bảo:

- Thẻ `title` unique, dài 50-60 ký tự, chứa keyword chính.
- Meta description dài 120-160 ký tự, có CTA tự nhiên.
- Có `og:title`, `og:description`, `og:image`, `og:url`.
- Có Schema.org JSON-LD dạng `LocalBusiness` hoặc `Product` tùy loại landing page.
- Chỉ có 1 thẻ `H1`; các section dùng `H2` và `H3`.
- Gắn alt text cho toàn bộ ảnh.
- Preload ảnh LCP, đặt `loading="eager"` và `fetchpriority="high"` cho hero image.
- Lazy-load ảnh dưới fold.
- Kiểm soát Core Web Vitals: `CLS < 0.1`, `LCP < 2.5s`, đặt `width` và `height` cho ảnh.
- Gắn canonical URL và thêm robots meta khi cần `noindex`.

## Cấu trúc section landing page chuẩn

Dùng thứ tự sau, chỉ bỏ section nào thật sự không phù hợp:

1. Header: logo, nav tối giản, CTA nổi.
2. Hero: headline, subheadline, CTA chính, hero image.
3. Social proof nhanh: số liệu, logo, trust badges.
4. Tính năng hoặc lợi ích: 3-6 điểm rõ ràng.
5. Demo hoặc gallery.
6. Testimonials.
7. Pricing nếu có.
8. FAQ.
9. CTA cuối trang.
10. Footer: contact, links, copyright.

## Quy tắc responsive

- Dùng CSS Grid và Flexbox; không thêm framework ngoài chỉ để layout.
- Thiết kế theo 3 breakpoint chính: `375px`, `768px`, `1280px`.
- Giữ `font-size` body tối thiểu `16px` trên mobile.
- Giữ touch target tối thiểu `44px` cho button, link, và input.
- Ưu tiên sticky CTA hoặc call bar trên mobile khi phù hợp.

## Accessibility cơ bản

- Gắn `aria-label` cho icon button hoặc link chỉ có icon.
- Đảm bảo contrast ratio tối thiểu `4.5:1` cho text thường.
- Đặt skip link ở đầu trang để bỏ qua navigation.
- Giữ `:focus-visible` rõ ràng cho keyboard navigation.
- Không dùng màu làm tín hiệu duy nhất cho trạng thái quan trọng.

## Tài nguyên đi kèm

- Mở `references/seo-checklist.md` khi cần checklist SEO chi tiết và ví dụ cụ thể.
- Mở `references/conversion-patterns.md` khi cần kiểm tra pattern tăng chuyển đổi trước khi chốt layout.
- Copy `assets/site.config.json` làm template config ban đầu, rồi chỉnh lại theo từng business cụ thể.
