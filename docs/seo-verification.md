# SEO / Pages yerel doğrulama

Tarih: 6 Ekim 2026. Sunucu: `wrangler pages dev dist --ip 127.0.0.1 --port 8788` (Wrangler 4.147.0).

Bu çalışma sırasında push veya deploy yapılmadı. Aşağıdaki çıktılar yerel Pages sunucusundan alındı; canlı Cloudflare hesap ayarları doğrulanmış değildir.

## Curl sonucu

`npm run test:pages` içindeki her istek sistemdeki curl ile gönderilir. Testler başarısızsa süreç sıfırdan farklı kodla çıkar.

```text
> berat-portfolio@0.0.0 test:pages
> node scripts/check-pages.mjs

GET / | Accept: text/html → 200 text/html; charset=utf-8 | lang=en | Vary=Accept
GET / | Accept: text/markdown → 200 text/markdown; charset=utf-8 | lang=en | Vary=Accept
GET / | Accept: text/markdown;q=0 → 200 text/html; charset=utf-8 | lang=en | Vary=Accept
GET / | Accept: text/html;q=1, text/markdown;q=0.5 → 200 text/html; charset=utf-8 | lang=en | Vary=Accept
HEAD / + GET /en.md → 200; matching Markdown and language
GET /tr/ | Accept: text/html → 200 text/html; charset=utf-8 | lang=tr | Vary=Accept
GET /tr/ | Accept: text/markdown → 200 text/markdown; charset=utf-8 | lang=tr | Vary=Accept
GET /tr/ | Accept: text/markdown;q=0 → 200 text/html; charset=utf-8 | lang=tr | Vary=Accept
GET /tr/ | Accept: text/html;q=1, text/markdown;q=0.5 → 200 text/html; charset=utf-8 | lang=tr | Vary=Accept
HEAD /tr/ + GET /tr.md → 200; matching Markdown and language
GET /tr?ref=test → 308 /tr/?ref=test
GET /llms.txt → 200; matches generated asset
GET /robots.txt → 200; matches generated asset
GET /sitemap.xml → 200; matches generated asset
GET /this-page-does-not-exist → 404 (no SPA fallback)
All curl checks passed.
```

Örnek istek:

```sh
curl -i -H 'Accept: text/markdown' http://127.0.0.1:8788/tr/
```

Yanıtın ilgili başlıkları:

```http
HTTP/1.1 200 OK
Content-Type: text/markdown; charset=utf-8
Cache-Control: no-store
Content-Language: tr
Content-Location: /tr.md
Vary: Accept
```

Gövdenin başlangıcı:

```markdown
# Berat Doğan

Cloud / DevOps / Platform Mühendisliği

Soliner'de DevOps stajyeriyim. Kubernetes, CI/CD ve Azure / AWS altyapılarıyla çalışıyorum; Fırat Üniversitesi'nde yazılım mühendisliği okuyorum.
```

## Diğer kontroller

- Üretim build'i: başarılı; tam EN/TR HTML ve iki Markdown dosyası üretildi.
- Lint: uyarı/hata yok.
- Node testleri: 53/53 geçti; Accept önceliği, HEAD, Vary, hata yolları, statik içerik, JSON-LD, dil/canonical/hreflang ve keşif dosyaları.
- Chrome: JavaScript açık ve kapalı halde iki dilde içerik görünür, tek h1, doğru canonical, çalışan dil bağlantıları ve Türkçe CV indirmesi.
- Mobil 390px: yatay sayfa taşması yok; masaüstü 1440px: mevcut tasarım korundu.
- React hydration ve tarayıcı konsolu: hata yok. Eski localStorage dil tercihi URL'nin dilini değiştirmedi.
- Kurulumda bildirilen üç dolaylı bağımlılık güvenlik uyarısı uyumlu yamalarla giderildi; son npm audit fix çıktısı 0 açık bildirdi.

Push sonrasında `README.md` içindeki Cloudflare ve Search Console adımlarını tamamlayıp aynı HTTP kontrollerini canlı alan adında tekrarlayın.
