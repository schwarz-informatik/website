# Website Thomas Schwarz Informatik GmbH

[![Security - Check OpenPGP Key Expiry](https://github.com/schwarz-informatik/website/actions/workflows/check_openpgp_key_expiry.yml/badge.svg)](https://github.com/schwarz-informatik/website/actions/workflows/check_openpgp_key_expiry.yml)
[![Security - Check security.txt Expiry](https://github.com/schwarz-informatik/website/actions/workflows/check_security_txt_expiry.yml/badge.svg)](https://github.com/schwarz-informatik/website/actions/workflows/check_security_txt_expiry.yml)

Quellcode der Unternehmenswebsite <https://schwarz-informatik.at> inklusive der
Security-Endpunkte nach RFC 9116 (`security.txt`) und CSAF 2.0.

Die Seite ist bewusst als statisches HTML ohne Framework, ohne Buildschritt und ohne
Paketmanager umgesetzt. Ausgeliefert wird über GitHub Pages.

## Inhalt

- [Aufbau](#aufbau)
- [Seiten](#seiten)
- [Security-Endpunkte](#security-endpunkte)
- [Lokale Vorschau](#lokale-vorschau)
- [Deployment](#deployment)
- [Neues CSAF-Advisory veröffentlichen](#neues-csaf-advisory-veröffentlichen)
- [Prüfung der Advisories](#prüfung-der-advisories)
- [Workflows](#workflows)
- [Konventionen](#konventionen)
- [Lizenz](#lizenz)
- [Offene Punkte](#offene-punkte)
- [Kontakt](#kontakt)

## Aufbau

```
.
├── index.html                  Startseite, Profil und Fachgebiete
├── services.html               Leistungen, umgeschaltet über script.js
├── agb.html                    Allgemeine Geschäftsbedingungen
├── datenschutzerklaerung.html  Datenschutzerklärung
├── disclaimer.html             Haftungsausschluss
├── impressum.html              Impressum
├── hall-of-fame.html           Danksagung für Security-Researcher
├── security-policy.html        Vulnerability Disclosure Policy
├── style.css                   Gesamtes Layout, mobile first
├── script.js                   Burgermenü und Umschaltung der Leistungen
├── CNAME                       Custom Domain für GitHub Pages
├── _config.yml                 Jekyll-Konfiguration
├── .gitattributes              Zeilenenden, schützt die signierten CSAF-Dateien
├── .github/workflows/          GitHub Actions, siehe Abschnitt Workflows
├── LICENSE                     MIT für den Code, Ausnahmen siehe Abschnitt Lizenz
├── font/                       Oxanium, lokal eingebunden
│   └── OFL.txt                 SIL Open Font License 1.1, Pflichtbeilage zum Font
├── img/                        Logos als SVG, Portraitbilder
├── secrets/                    Nicht versioniert, siehe .gitignore
└── .well-known/
    ├── security.txt            Kontaktdaten nach RFC 9116
    ├── icons/                  Icons für die Verzeichnisansichten
    └── csaf/                   CSAF 2.0 Trusted Provider
        ├── provider-metadata.json
        ├── index.txt           Maschinenlesbarer Index aller Advisories
        ├── changes.csv         Änderungshistorie, Datei und Zeitstempel
        ├── csaf.css            Layout der Advisory-Seiten
        ├── openpgp/            Öffentlicher Signaturschlüssel
        ├── index.html          Übersicht aller Jahre
        └── 2025/               Advisories des Jahres
```

## Seiten

| Datei | Pfad | Inhalt |
| --- | --- | --- |
| `index.html` | `/` | Profil, Qualifikationen, Fachgebiete nach Klassifikation der österreichischen Justiz |
| `services.html` | `/services.html` | Leistungen in den Bereichen OT, Software Engineering und Security |
| `agb.html` | `/agb.html` | Allgemeine Geschäftsbedingungen |
| `datenschutzerklaerung.html` | `/datenschutzerklaerung.html` | Datenschutzerklärung nach DSGVO |
| `disclaimer.html` | `/disclaimer.html` | Haftungsausschluss |
| `impressum.html` | `/impressum.html` | Impressum nach ECG und Mediengesetz |
| `hall-of-fame.html` | `/hall-of-fame.html` | Danksagung, referenziert aus `security.txt` |
| `security-policy.html` | `/security-policy.html` | Vulnerability Disclosure Policy, Ziel des Feldes `Policy` in `security.txt` |

Alle Seiten teilen sich Kopfbereich, Navigation und `style.css`. Die Navigation wird auf
schmalen Viewports über `burgerclick()` in `script.js` ein- und ausgeblendet. Auf
`services.html` schaltet `servicesclick()` zwischen den drei Leistungsblöcken um.

## Security-Endpunkte

### security.txt

`/.well-known/security.txt` nach RFC 9116. Jedes Feld verweist auf ein Ziel, das
tatsächlich existiert. Eine tote Referenz in dieser Datei ist schlimmer als ein
fehlendes Feld, weil automatisierte Werkzeuge sie auswerten.

| Feld | Ziel | Grundlage |
| --- | --- | --- |
| `Contact` | `mailto:security@schwarz-informatik.at` | RFC 9116, Pflichtfeld |
| `Expires` | 11.01.2027 | RFC 9116, Pflichtfeld |
| `Policy` | `/security-policy.html` | RFC 9116 Abschnitt 2.5.7 |
| `Encryption` | der OpenPGP-Schlüssel unter `csaf/openpgp/` | RFC 9116 Abschnitt 2.5.4 |
| `CSAF` | `/.well-known/csaf/provider-metadata.json` | CSAF 2.0 Requirement 8, Erweiterungsfeld nach RFC 9116 Abschnitt 2.4 |
| `Acknowledgments` | `/hall-of-fame.html` | RFC 9116 Abschnitt 2.5.1 |
| `Preferred-Languages` | `de,en` | RFC 9116 Abschnitt 2.5.8 |
| `Canonical` | die Datei selbst | RFC 9116 Abschnitt 2.5.2 |

`Encryption` zeigt bewusst auf die vorhandene Datei mit dem Fingerprint im Namen und
nicht auf eine zusätzliche Kopie unter `/.well-known/pgp-key.txt`. Eine zweite Kopie
könnte auseinanderlaufen, und die Ablaufüberwachung durch
[check_openpgp_key_expiry.yml](.github/workflows/check_openpgp_key_expiry.yml) greift
nur im Verzeichnis `csaf/openpgp/`. Preis dieser Entscheidung: bei einem
Schlüsselwechsel ändert sich der Dateiname und die Zeile in `security.txt` ist
mitzuziehen.

Das Feld `Expires` ist derzeit auf den 11.01.2027 gesetzt. RFC 9116 Abschnitt 2.5.5
empfiehlt einen Wert unter einem Jahr, daher ist die Datei rechtzeitig vor diesem Datum
zu erneuern. Überwacht wird das wöchentlich durch
[check_security_txt_expiry.yml](.github/workflows/check_security_txt_expiry.yml).

### CSAF 2.0

Die Domain tritt als CSAF Trusted Provider auf. Maßgeblich ist der CSAF 2.0 Standard,
Rolle `csaf_trusted_provider`. Daraus folgen die Pflichtbestandteile:

| Bestandteil | Pfad | Zweck |
| --- | --- | --- |
| Provider Metadata | `/.well-known/csaf/provider-metadata.json` | Einstiegspunkt für Aggregatoren |
| Index | `/.well-known/csaf/index.txt` | Liste aller Advisories, ein Pfad je Zeile |
| Changes | `/.well-known/csaf/changes.csv` | Pfad und Zeitstempel der letzten Änderung |
| OpenPGP-Schlüssel | `/.well-known/csaf/openpgp/<Fingerprint>.asc` | Prüfung der Signaturen |

Je Advisory liegen fünf Dateien im Jahresverzeichnis:

| Endung | Inhalt |
| --- | --- |
| `.json` | Das CSAF-Dokument, maßgeblich im Zweifelsfall |
| `.json.sha256` | SHA-256 Prüfsumme im Format von `shasum` |
| `.json.sha512` | SHA-512 Prüfsumme im Format von `shasum` |
| `.json.asc` | Losgelöste OpenPGP-Signatur über die JSON-Datei |
| `.html` | Menschenlesbare Darstellung |

Aktueller Signaturschlüssel:
`C3C70670C1BC7D803C13BE0808B22DD8E330E6E2`

Der zugehörige private Schlüssel liegt in `secrets/` und ist über `.gitignore`
ausgeschlossen. Dieses Verzeichnis darf nicht versioniert werden.

## Lokale Vorschau

Für die reine Sichtprüfung genügt ein statischer Server im Wurzelverzeichnis. Alle
internen Verweise sind absolut, ein Aufruf über `file://` funktioniert daher nicht.

```bash
python3 -m http.server 8000
```

Danach <http://localhost:8000/> im Browser öffnen.

Wer das Verhalten von GitHub Pages inklusive Jekyll nachbilden will, braucht Ruby,
Bundler und Jekyll lokal. Für diese Website ist das nur relevant, wenn Änderungen an
`_config.yml` geprüft werden sollen.

## Deployment

Die Auslieferung erfolgt über GitHub Pages aus dem Branch `main`. Es gibt keinen
GitHub-Actions-Workflow, Pages baut die Seite selbst mit Jekyll.

Zwei Punkte sind dabei zu beachten:

1. `CNAME` bindet die Custom Domain `schwarz-informatik.at`. Die Datei darf nicht
   gelöscht oder umbenannt werden.
2. Jekyll ignoriert Verzeichnisse, deren Name mit einem Punkt beginnt. `_config.yml`
   enthält deshalb `include: ['.well-known']`. Ohne diesen Eintrag wären `security.txt`
   und sämtliche CSAF-Dateien nach dem Build nicht erreichbar.

Ein Push auf `main` löst den Build aus. Nach dem Deployment ist zu prüfen, ob
`/.well-known/security.txt` und `/.well-known/csaf/provider-metadata.json` mit
Statuscode 200 ausgeliefert werden.

## Neues CSAF-Advisory veröffentlichen

1. CSAF-Dokument als `<jahr>/schwarz_informatik-c<nummer>.json` ablegen. Namensschema
   mit Unterstrich im Firmennamen und Bindestrich vor der Nummer. In
   `document.distribution.text` die Lizenz vermerken, derzeit CC BY 4.0. Der Eintrag
   muss stehen, bevor Prüfsummen und Signatur erzeugt werden.
2. Prüfsummen erzeugen.

```bash
shasum -a 256 schwarz_informatik-c1236.json > schwarz_informatik-c1236.json.sha256
```

```bash
shasum -a 512 schwarz_informatik-c1236.json > schwarz_informatik-c1236.json.sha512
```

3. Losgelöste Signatur erzeugen.

```bash
gpg --local-user C3C70670C1BC7D803C13BE0808B22DD8E330E6E2 --armor --detach-sign schwarz_informatik-c1236.json
```

4. Menschenlesbare `.html` erzeugen und in die Tabellen in
   `.well-known/csaf/index.html` sowie `.well-known/csaf/<jahr>/index.html` aufnehmen.
5. `index.txt` um den Pfad relativ zu `/.well-known/csaf/` ergänzen.
6. `changes.csv` um Pfad und Zeitstempel im Format ISO 8601 UTC ergänzen. Die Datei ist
   absteigend nach Zeitstempel sortiert.
7. `last_updated` in `provider-metadata.json` aktualisieren.
8. Prüfen, dass alle Pfade in `index.txt` und `changes.csv` exakt den tatsächlichen
   Dateinamen entsprechen.

## Prüfung der Advisories

Prüfsummen im Jahresverzeichnis kontrollieren:

```bash
shasum -a 256 -c .well-known/csaf/2025/schwarz_informatik-c1234.json.sha256
```

Signatur prüfen, nachdem der öffentliche Schlüssel importiert wurde:

```bash
gpg --import .well-known/csaf/openpgp/C3C70670C1BC7D803C13BE0808B22DD8E330E6E2.asc
```

```bash
gpg --verify .well-known/csaf/2025/schwarz_informatik-c1234.json.asc .well-known/csaf/2025/schwarz_informatik-c1234.json
```

Beide Prüfungen laufen für die aktuell abgelegten Advisories fehlerfrei durch.

## Workflows

| Workflow | Zweck | Zeitplan |
| --- | --- | --- |
| [check_openpgp_key_expiry.yml](.github/workflows/check_openpgp_key_expiry.yml) | Prüft die Restlaufzeit der OpenPGP-Schlüssel unter `.well-known/csaf/openpgp/` und schlägt fehl, wenn ein signierfähiger Schlüssel den Schwellwert unterschreitet | Montags 06:00 UTC, zusätzlich manuell |
| [check_security_txt_expiry.yml](.github/workflows/check_security_txt_expiry.yml) | Validiert das Pflichtfeld `Expires` in `.well-known/security.txt` nach RFC 9116 und schlägt fehl, wenn es abgelaufen ist oder den Schwellwert unterschreitet | Montags 06:30 UTC, zusätzlich manuell |

Manuell starten über Actions, Auswahl des Workflows, dann Run workflow. Der optionale
Eingabewert `threshold_days` überschreibt den Schwellwert für einen einzelnen Lauf und
dient dazu, den Fehlerpfad zu testen, ohne auf den Ernstfall zu warten.

### Variables (`vars.*`)

| Variable | Beschreibung | Beispiel |
| --- | --- | --- |
| `OPENPGP_EXPIRY_THRESHOLD_DAYS` | Optional. Schwellwert in Tagen, unterhalb dessen die Schlüsselprüfung fehlschlägt. Default falls nicht gesetzt: 100 | `100` |
| `SECURITY_TXT_EXPIRY_THRESHOLD_DAYS` | Optional. Schwellwert in Tagen, unterhalb dessen die Prüfung von `security.txt` fehlschlägt. Default falls nicht gesetzt: 30 | `30` |

### Secrets (`secrets.*`)

Derzeit keine. Die Prüfung arbeitet ausschließlich auf dem öffentlichen Schlüssel.

## Konventionen

- Kein Buildschritt, keine Abhängigkeiten im Repository. Änderungen wirken direkt.
- Interne Verweise absolut ab dem Wurzelverzeichnis, damit Unterseiten und die
  CSAF-Verzeichnisse dieselben Pfade nutzen können.
- Keine externen Requests. Die Seite lädt ausschließlich von der eigenen Domain, damit
  keine Besucher-IP an Dritte abfließt. Icons liegen als Inline-SVG im Markup, nicht
  als Icon-Font.
- Schrift Oxanium wird lokal aus `font/` geladen und nicht von einem CDN. Eingebunden
  ist der Variable Font `Oxanium-VariableFont_wght.ttf` mit dem Gewichtsbereich 200 bis
  800. Eine Datei deckt damit alle benötigten Schnitte ab und der Browser muss keine
  fetten Schnitte synthetisieren. Die statischen Schnitte in `font/static/` werden
  nicht mehr referenziert.
- Sprache der Inhalte ist Deutsch, die CSAF-Dokumente und deren Darstellung sind
  englisch.
- `secrets/` bleibt unversioniert.
- Das `lang` Attribut entspricht der tatsächlichen Inhaltssprache. Die Seiten im
  Wurzelverzeichnis sind deutsch und tragen `lang="de"`, die CSAF-Seiten unter
  `.well-known/csaf/` sind englisch und behalten `lang="en"`.
- Zeilenenden regelt `.gitattributes`. Git speichert intern durchgängig LF. Die
  Website-Quellen im Wurzelverzeichnis werden als CRLF ausgecheckt, weil sie so
  entstanden sind. Für `.well-known/csaf/` und `.well-known/security.txt` ist jede
  Konvertierung per `-text` abgeschaltet, weil die CSAF-Dokumente über Prüfsummen und
  OpenPGP-Signaturen abgesichert sind und jede geänderte Bytefolge beides ungültig
  machen würde.

## Lizenz

Das Repository mischt drei Arten von Material mit gegensätzlichen Interessen. Eine
einheitliche Lizenz wäre hier schädlich, deshalb gilt eine getrennte Regelung.
Maßgeblich ist die Datei [LICENSE](LICENSE), diese Tabelle ist die Übersicht dazu.

| Material | Lizenz | Begründung |
| --- | --- | --- |
| `style.css`, `script.js`, `.well-known/csaf/csaf.css`, HTML-Struktur | MIT | Der wiederverwendbare Teil. `csaf.css` ist ausdrücklich site-neutral gebaut und für andere CSAF-Provider brauchbar |
| Texte in `agb.html`, `datenschutzerklaerung.html`, `disclaimer.html`, `impressum.html`, Profiltexte | Alle Rechte vorbehalten | Rechtsverbindliche Erklärungen eines konkreten Unternehmens. Eine Nachnutzung würde den Nachnutzer für Aussagen haften lassen, die auf ihn nicht zutreffen |
| Logos und CI in `img/` | Alle Rechte vorbehalten | Kennzeichenrecht. Eine freie Lizenz auf eine Marke untergräbt deren Schutz |
| `img/portrait.jpg`, `img/Website.jpg` | Alle Rechte vorbehalten | Recht am eigenen Bild |
| CSAF-Dokumente unter `.well-known/csaf/` | CC BY 4.0, zusätzlich TLP:WHITE | Advisories sollen zitierbar und weiterverteilbar sein. TLP regelt nur die Weitergabe, nicht das Urheberrecht, daher beides |
| Oxanium in `font/` | SIL OFL 1.1, siehe `font/OFL.txt` | Fremdes Werk, Copyright 2019 The Oxanium Project Authors |
| Die fünf Inline-SVG-Icons | MIT | Feather Icons, Copyright 2013 bis 2023 Cole Bemis. Der MIT-Text in `LICENSE` deckt die Weitergabe mit ab |

Warum MIT und nicht Apache 2.0 für den Code: Apache 2.0 bringt einen Patentgrant und
in Abschnitt 6 einen ausdrücklichen Markenvorbehalt. Der Patentgrant ist bei rund
4 kB CSS und JavaScript ohne Bedeutung, und der Markenvorbehalt wird hier bereits
durch den expliziten Ausschluss von `img/` erreicht. MIT liefert damit dasselbe
Ergebnis bei deutlich weniger Formalismus.

Wenn der Code gar nicht nachnutzbar sein soll, ist die Änderung klein. In dem Fall
`LICENSE` durch eine reine Rechtevorbehaltserklärung ersetzen und diesen Abschnitt
entsprechend kürzen.

## Offene Punkte

| Punkt | Auswirkung |
| --- | --- |
| `changes.csv` verweist auf `schwarz-informatik-c1234.json` und `schwarz-informatik-c1235.json` mit Bindestrich, die Dateien heißen jedoch `schwarz_informatik-c*.json` mit Unterstrich | Verstoß gegen die CSAF-Anforderungen an `changes.csv`, Aggregatoren laufen in tote Verweise. Vor dem nächsten Push korrigieren |
| Publisher-Bezeichnung uneinheitlich: `Schwarz Informatik PSIRT` in `provider-metadata.json`, `Schwarz Informatik` in den CSAF-Dokumenten, `Thomas Schwarz Informatik GmbH` in den HTML-Seiten | Kosmetisch, erschwert aber die Zuordnung durch Dritte |
| Die Datenschutzerklärung nennt weiterhin keine Auftragsverarbeiter und keine Drittlandübermittlung | Der CDN-Abruf ist zwar entfernt, GitHub Pages als Hoster bleibt aber unerwähnt. Fachlich zu prüfen |
| `font/static/` enthält sieben nicht mehr referenzierte TTF-Dateien, rund 206 kB | Nur Ballast im Repository. Können entfernt werden, sobald der Variable Font produktiv bestätigt ist |
| Die CC BY 4.0 Angabe für Advisories steht nur in `LICENSE` und `README.md`, nicht in den CSAF-Dokumenten selbst | CSAF sieht dafür `document.distribution.text` vor. Nachträglich einzutragen geht nicht ohne neue Prüfsummen und neue Signatur, daher erst ab dem nächsten Advisory mitführen |
| Oxanium wird als TTF ausgeliefert, nicht als WOFF2 | Rund 42 kB statt rund 18 kB je Seitenaufruf. Umstellung lohnt, erfordert aber eine Konvertierung mit `fonttools` |

## Kontakt

- Allgemein: <thomas@schwarz-informatik.at>
- Sicherheitsmeldungen: <security@schwarz-informatik.at>, Details in
  `/.well-known/security.txt`
