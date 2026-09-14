# Vien.noir – statische HTML/CSS/JS-Version

## Start
`index.html` direkt im Browser öffnen oder den Ordner über einen lokalen Webserver ausliefern.

Beispiel:
```bash
python -m http.server 8000
```
Danach `http://localhost:8000` öffnen.

## Struktur
- `index.html` – Startseite
- `programm.html` – Saisonübersicht
- `ueber-uns.html` – Über uns
- `event-services.html` – Event-Services
- `kontakt.html` – Kontakt
- drei eigenständige Showseiten
- `assets/css/site.css` – vollständiges Designsystem
- `assets/js/site.js` – Navigation, Slider, Reveal-Animationen und Mailto-Formulare
- `assets/img/` – gelieferte Motive und gestaltete Platzhalter

## Bilder ersetzen
Die SVG-Platzhalter lassen sich durch eigene JPG-, PNG- oder WebP-Dateien ersetzen. Entweder den Dateinamen beibehalten oder den jeweiligen `src`-Pfad in der HTML-Datei ändern.

## Formulare
Die Website benötigt kein Backend. Kontakt- und Newsletterformular erstellen eine E-Mail im lokal eingerichteten E-Mail-Programm. Für echten serverseitigen Versand muss später ein Formularservice oder eigenes Backend angebunden werden.

## Veröffentlichung
Die Seiten funktionieren auf einfachem Static Hosting. `_redirects`, `robots.txt` und `sitemap.xml` sind bereits enthalten. Den Datenschutztext vor Veröffentlichung an den tatsächlichen Hosting- und Tracking-Stack anpassen und rechtlich prüfen.
