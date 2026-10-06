# Berat Doğan — Portfolio

React, TypeScript ve Vite ile iki dilli portfolyo. Mevcut React tasarımı build sırasında statik HTML olarak üretilir; tarayıcıda aynı ağaç hydrate edilir. Ücretli prerender veya Markdown servisi kullanılmaz.

## Adresler

| İçerik | Adres |
| --- | --- |
| İngilizce HTML (varsayılan) | `/` |
| Türkçe HTML | `/tr/` |
| İngilizce Markdown | `/en.md` |
| Türkçe Markdown | `/tr.md` |
| Botlar için kısa tanıtım | `/llms.txt` |
| Dil alternatifli site haritası | `/sitemap.xml` |

Dil URL'den belirlenir. Tarayıcı dili veya eski localStorage tercihi aynı URL'nin içeriğini değiştirmez. EN/TR bağlantıları JavaScript kapalıyken de çalışır. `/tr`, sorgu parametrelerini koruyarak `/tr/` adresine 308 yönlendirilir. Bilinmeyen adresler gerçek 404 döndürür.

## Geliştirme ve doğrulama

Node.js 22.12+ ve npm kullanın.

```sh
npm ci
npm run dev
```

Üretim HTML'i, Markdown negotiation ve Pages yönlendirmelerini doğrulamak için:

```sh
npm run build
npm run lint
npm test
npm run pages:dev
```

Ayrı terminalde:

```sh
npm run test:pages
curl -i -H 'Accept: text/html' http://127.0.0.1:8788/
curl -i -H 'Accept: text/markdown' http://127.0.0.1:8788/
curl -i -H 'Accept: text/markdown' http://127.0.0.1:8788/tr/
curl -I -H 'Accept: text/markdown' http://127.0.0.1:8788/tr/
```

`npm test`, önce oluşturulmuş `dist/` ve `dist-ssr/` çıktılarını kontrol eder; temiz checkout'ta önce `npm run build` çalıştırın. `npm run test:pages` gerçek curl istekleriyle HTML/Markdown, q=0, HTML önceliği, HEAD, doğrudan .md, dil, Vary, 308, robots/sitemap/llms ve 404 kontrollerini yapar. Başka bir yerel sunucu için `PAGES_TEST_URL` belirtilebilir. `vite preview` Functions çalıştırmaz; negotiation için `pages:dev` gereklidir.

## İçerik kaynakları

- `src/i18n.tsx`: mevcut EN/TR metinleri.
- `src/content.ts`: sitenin, Markdown'ın ve JSON-LD'nin paylaştığı proje, teknoloji, kurs ve profil bilgileri.
- `src/seo.ts`: dil bazlı title/description, canonical, hreflang, OG/Twitter, Person/WebSite, Markdown, sitemap ve llms üretimi.
- `scripts/prerender.mjs`: aynı React bileşenlerinden `dist/index.html`, `dist/tr/index.html`, Markdown, sitemap ve llms çıktıları üretir. İçeriği elle `dist/` içinde değiştirmeyin.
- `public/Berat_Dogan_CV.pdf` ve `public/Berat_Dogan_CV_TR.pdf`: kullanıcı tarafından sağlanan güncel, birer sayfalık CV'ler. Dil seçimine göre indirilir.
- `cv/cv.html`: eski CV taslağı. İsteğe bağlı önizleme betiği yalnızca `cv/legacy-preview.pdf` yazar; güncel CV'lerin üzerine yazmaz.

JSON-LD yalnızca sitede doğrulanmış bilgileri kullanır. Fırat Üniversitesi öğrenciliği mezuniyet gibi işaretlenmez. Kullanıcı adı doğrulanmamış bir Twitter hesabı veya benzeri yeni kimlik bilgileri eklenmemiştir.

## Markdown ve önbellek

`functions/_middleware.js` yalnızca `/`, `/tr` ve `/tr/` yollarında çalışır (`public/_routes.json`). CSS, JS, görseller, CV'ler ve doğrudan `.md` dosyaları statik sunulur; bu istekler Function çağırmaz.

GET/HEAD isteğinde açık `Accept: text/markdown` tercihi HTML kadar veya daha yüksek ağırlıktaysa ilgili Markdown döner. `text/markdown;q=0` ve yalnız wildcard normal HTML döndürür. İki temsil de `Vary: Accept` ve `Content-Language` taşır. Negotiation yanıtlarında `Cache-Control: no-store`, aynı URL'de HTML/Markdown önbellek karışmasını önler; statik dosyaların önbelleği korunur. `.md` yanıtları `text/markdown; charset=utf-8` olarak sunulur. Eksik Markdown dosyası HTML fallback ile gizlenmez.

## Senin yapacakların

1. Yerelde incele. Push otomatik deploy başlattığı için bu adımı sen yap.
2. Pages build komutunun `npm run build`, çıktı klasörünün `dist`, Node sürümünün 22.12+ olduğunu kontrol et. Depodaki `functions/` klasörü Git üzerinden Pages deploy'unda derlenmelidir; yalnız dist klasörünü sürükleyip yükleme.
3. **TODO — hesap erişimi gerekir:** Cloudflare Security Settings içindeki AI bot politikalarını kontrol et. İstediğin Search/Agent/Training grupları engellenmemeli; varsa eski “Block AI bots”, WAF kuralları ve yönetilen robots ayarlarını da incele. `robots.txt` içindeki Allow, Cloudflare güvenlik engellerini kaldırmaz. Accept başlığını dikkate almayan özel “Cache Everything” kuralını HTML sayfalarına uygulama.
4. **TODO — Search Console erişimi gerekir:** Alan adını doğrula (zaten doğrulanmışsa tekrar gerekmez), `https://beratdogan.me/sitemap.xml` gönder. `/` ve `/tr/` için URL Denetimi üzerinden canlı testi çalıştırıp dizine ekleme iste.
5. Deploy sonrasında yukarıdaki curl komutlarını canlı alan adına karşı yeniden çalıştır. Yerel testler hesap seviyesindeki bot/WAF ayarlarını doğrulamaz.

Bu değişiklikler içeriğin okunmasını ve bulunmasını kolaylaştırır; Google sıralaması veya bir AI hizmetinin siteyi kullanması garanti edilemez. Doğrulanmış yeni deneyimler eklendiğinde kaynak metinleri güncelleyip yeniden build edin.

## Referanslar

- [Google: çok dilli sayfalar ve hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google: yeniden tarama isteme](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Cloudflare: Pages Functions yönlendirmeleri](https://developers.cloudflare.com/pages/functions/routing/)
- [Cloudflare: yerel Pages geliştirme](https://developers.cloudflare.com/pages/functions/local-development/)
- [Cloudflare: AI bot politikaları](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/)
