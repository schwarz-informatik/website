# Website Thomas Schwarz Informatik GmbH

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
- [Konventionen](#konventionen)
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
├── style.css                   Gesamtes Layout, mobile first
├── script.js                   Burgermenü und Umschaltung der Leistungen
├── CNAME                       Custom Domain für GitHub Pages
├── _config.yml                 Jekyll-Konfiguration
├── font/                       Oxanium, lokal eingebunden
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

Alle Seiten teilen sich Kopfbereich, Navigation und `style.css`. Die Navigation wird auf
schmalen Viewports über `burgerclick()` in `script.js` ein- und ausgeblendet. Auf
`services.html` schaltet `servicesclick()` zwischen den drei Leistungsblöcken um.

## Security-Endpunkte

### security.txt

`/.well-known/security.txt` nach RFC 9116 mit Kontaktadresse, Ablaufdatum,
bevorzugten Sprachen, kanonischer URL und Verweis auf die Hall of Fame.

Das Feld `Expires` ist derzeit auf den 11.01.2027 gesetzt. RFC 9116 Abschnitt 2.5.5
empfiehlt einen Wert unter einem Jahr, daher ist die Datei rechtzeitig vor diesem Datum
zu erneuern.

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
   mit Unterstrich im Firmennamen und Bindestrich vor der Nummer.
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

## Konventionen

- Kein Buildschritt, keine Abhängigkeiten im Repository. Änderungen wirken direkt.
- Interne Verweise absolut ab dem Wurzelverzeichnis, damit Unterseiten und die
  CSAF-Verzeichnisse dieselben Pfade nutzen können.
- Schrift Oxanium wird lokal aus `font/` geladen und nicht von einem CDN. Eingebunden
  ist der Variable Font `Oxanium-VariableFont_wght.ttf` mit dem Gewichtsbereich 200 bis
  800. Eine Datei deckt damit alle benötigten Schnitte ab und der Browser muss keine
  fetten Schnitte synthetisieren. Die statischen Schnitte in `font/static/` werden
  nicht mehr referenziert.
- Sprache der Inhalte ist Deutsch, die CSAF-Dokumente und deren Darstellung sind
  englisch.
- `secrets/` bleibt unversioniert.

## Offene Punkte

| Punkt | Auswirkung |
| --- | --- |
| `changes.csv` verweist auf `schwarz-informatik-c1234.json` und `schwarz-informatik-c1235.json` mit Bindestrich, die Dateien heißen jedoch `schwarz_informatik-c*.json` mit Unterstrich | Verstoß gegen die CSAF-Anforderungen an `changes.csv`, Aggregatoren laufen in tote Verweise. Vor dem nächsten Push korrigieren |
| Publisher-Bezeichnung uneinheitlich: `Schwarz Informatik PSIRT` in `provider-metadata.json`, `Schwarz Informatik` in den CSAF-Dokumenten, `Thomas Schwarz Informatik GmbH` in den HTML-Seiten | Kosmetisch, erschwert aber die Zuordnung durch Dritte |
| Font Awesome wird per `cdn.jsdelivr.net` eingebunden | Externe Abhängigkeit und Datenabfluss an Dritte, im Widerspruch zur sonst lokalen Einbindung der Assets. Lokale Auslieferung oder Ersatz durch Inline-SVG erwägen |
| `Expires` in `security.txt` steht auf 11.01.2027 | Vor Ablauf erneuern, sonst gilt die Datei als ungültig |
| Kein `LICENSE` im Repository | Ohne Lizenzangabe gelten die Inhalte als vollständig urheberrechtlich geschützt. Falls das nicht gewollt ist, Lizenz ergänzen |
| `font/static/` enthält sieben nicht mehr referenzierte TTF-Dateien, rund 206 kB | Nur Ballast im Repository. Können entfernt werden, sobald der Variable Font produktiv bestätigt ist |
| Oxanium wird als TTF ausgeliefert, nicht als WOFF2 | Rund 42 kB statt rund 18 kB je Seitenaufruf. Umstellung lohnt, erfordert aber eine Konvertierung mit `fonttools` |

## Kontakt

- Allgemein: <thomas@schwarz-informatik.at>
- Sicherheitsmeldungen: <security@schwarz-informatik.at>, Details in
  `/.well-known/security.txt`
