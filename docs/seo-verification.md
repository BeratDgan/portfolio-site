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

## Cloudflare temiz kurulum düzeltmesi — 6 Ekim 2026

İlk deploy, build komutuna ulaşmadan npm 10.9.2 ile `EUSAGE` verdi: kök kilit ağacında `@emnapi/runtime@1.11.3` ve `@emnapi/core@1.11.3` eksikti. Önceki kontroller mevcut node_modules üzerinden build çalıştırdığı için bu eksikliği yakalamamıştı.

- Hata, temiz bir geçici checkout'ta Node 22.16.0 ve npm 10.9.2 ile birebir yeniden üretildi.
- Kilit dosyası aynı npm sürümüyle, kurulu node_modules olmadan `npm install --package-lock-only --ignore-scripts --include=optional` kullanılarak tamamlandı. Eksik kök ve paket içi WASM bağımlılık kayıtları eklendi; mevcut paket sürümleri değişmedi.
- Ardından gerçek `npm ci` (kurulum betikleri etkin): başarılı, 83 paket kuruldu.
- Aynı Node/npm ile build: başarılı; EN/TR statik sayfalar, Markdown ve iki URL içeren sitemap üretildi.
- Lint temiz; 53/53 test geçti.
- Ek `npm ci --dry-run --os=linux --cpu=x64 --ignore-scripts` kilit doğrulaması geçti. Bu Linux üzerinde gerçek build çalıştırıldığı anlamına gelmez; tam build macOS'ta yapıldı.

Düzeltme yalnızca yerel commit olarak kaydedildi. Kullanıcının push'undan sonra Cloudflare'ın gerçek Production deploy sonucu kontrol edilmelidir.
