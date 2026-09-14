# Vien.noir – statische HTML/CSS/JS-Version

## Sprachen
Die deutsche Website bleibt die Standardversion im Hauptverzeichnis. Die vollständige englische Version liegt im Ordner `en/`.

Der Sprachumschalter **DE / EN** ist auf jeder Seite im Desktop-Header und im mobilen Menü enthalten. Er wechselt jeweils zur entsprechenden Unterseite, beispielsweise:

- `kontakt.html` ↔ `en/contact.html`
- `programm.html` ↔ `en/programme.html`
- `ueber-uns.html` ↔ `en/about.html`

Es werden weder Cookies noch ein Übersetzungsdienst benötigt. Beide Sprachversionen bestehen aus eigenständigen statischen HTML-Dateien.

## Lokaler Start
`index.html` direkt im Browser öffnen oder den Ordner über einen lokalen Webserver ausliefern:

```bash
python -m http.server 8000
```

Danach `http://localhost:8000` öffnen. Die englische Startseite ist unter `http://localhost:8000/en/` erreichbar.

## Struktur
- `index.html` – deutsche Startseite
- `en/index.html` – englische Startseite
- `programm.html` / `en/programme.html` – Saisonübersicht
- `ueber-uns.html` / `en/about.html` – Über uns / About
- `event-services.html` / `en/event-services.html` – Event-Services
- `kontakt.html` / `en/contact.html` – Kontakt / Contact
- drei eigenständige Showseiten in beiden Sprachen
- `assets/css/site.css` – vollständiges Designsystem einschließlich Sprachumschalter
- `assets/js/site.js` – Navigation, Slider, Reveal-Animationen und lokalisierte Mailto-Formulare
- `assets/img/` – gelieferte Motive und gestaltete Platzhalter

## GitHub Pages
Den **Inhalt** dieses Ordners in das Root-Verzeichnis des Repositorys hochladen. `index.html`, `assets/` und `en/` müssen dort nebeneinander liegen:

```text
index.html
en/
assets/
programm.html
...
```

Unter **Settings → Pages** weiterhin `main` und `/ (root)` verwenden. Die enthaltene Datei `.nojekyll` sorgt dafür, dass GitHub Pages die Website unverändert als statische Seite ausliefert.

## Bilder ersetzen
Die SVG-Platzhalter lassen sich durch eigene JPG-, PNG- oder WebP-Dateien ersetzen. Entweder den Dateinamen beibehalten oder den jeweiligen `src`-Pfad in den deutschen und englischen HTML-Dateien ändern.

## Formulare
Die Website benötigt kein Backend. Kontakt- und Newsletterformular erstellen je nach Seitensprache eine deutsche oder englische E-Mail im lokal eingerichteten E-Mail-Programm. Für echten serverseitigen Versand muss später ein Formularservice oder eigenes Backend angebunden werden.

## Veröffentlichung
`hreflang`-Verweise, englische Canonical-URLs und eine zweisprachige `sitemap.xml` sind enthalten. `_redirects` wird von Netlify und Cloudflare Pages unterstützt; GitHub Pages ignoriert diese Datei. Den Datenschutztext vor produktiver Veröffentlichung an den tatsächlichen Hosting- und Tracking-Stack anpassen und rechtlich prüfen.
