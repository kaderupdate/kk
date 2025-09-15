# KK-Facility-Management Website

Eine moderne, responsive Website für Facility Management Dienstleistungen in Münster.

## Features

✨ **Modernes Design**
- Responsives Design für alle Geräte
- Moderne Farbpalette und Typography
- Smooth Scrolling und Animationen
- Glasmorphism-Effekte

🚀 **Performance**
- Node.js Backend mit Express
- Optimierte Ladezeiten
- Progressive Enhancement
- SEO-optimiert

📱 **Benutzerfreundlichkeit**
- Intuitive Navigation
- Klare Service-Übersicht
- Kontaktformular mit Validierung
- Mobile-First Ansatz

🔧 **Funktionen**
- Kontaktformular mit E-Mail-Versand
- Responsive Navigation mit Hamburger Menu
- Service-Kategorien mit detaillierten Informationen
- 24/7 Notfallservice hervorgehoben

## Installation

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd KK-Facility-Management
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Umgebungsvariablen konfigurieren**
   Erstellen Sie eine `.env` Datei:
   ```env
   PORT=3000
   EMAIL_USER=ihre-email@gmail.com
   EMAIL_PASS=ihr-app-passwort
   ```

4. **Server starten**
   ```bash
   # Entwicklungsmodus
   npm run dev

   # Produktionsmodus
   npm start
   ```

## Struktur

```
KK-Facility-Management/
├── public/              # Statische Dateien
│   ├── css/
│   │   └── styles.css   # Haupt-Stylesheet
│   ├── js/
│   │   └── main.js      # JavaScript Funktionalität
│   └── images/          # Bilder und Icons
├── views/
│   └── index.ejs        # Haupt-Template
├── server.js            # Express Server
├── package.json         # Node.js Konfiguration
└── README.md           # Diese Datei
```

## Services

🏢 **Gebäudereinigung**
- Unterhaltsreinigung
- Grundreinigung
- Fensterreinigung
- Teppichreinigung

🔧 **Technischer Service**
- Heizungs- & Klimawartung
- Sanitäranlagen
- Elektrische Anlagen
- Aufzugswartung

🌿 **Grünpflege**
- Rasenpflege
- Heckenschnitt
- Winterdienst
- Kehrarbeiten

🛡️ **Sicherheitsdienst**
- Objektschutz
- Revierdienst
- Schließdienst
- Alarmaufschaltung

📋 **Facility Management**
- Objektmanagement
- Dienstleister-Koordination
- Kostenkontrolle
- Berichtswesen

🚨 **24/7 Notfallservice**
- Rohrbrüche
- Heizungsausfall
- Einbruchschäden
- Unwetterschäden

## Kontakt

📍 **Adresse:** Musterstraße 123, 48149 Münster
📞 **Telefon:** [0251 / 123 456](tel:+49251123456)
✉️ **E-Mail:** [kontakt@kk-facility-management.de](mailto:kontakt@kk-facility-management.de)

**Öffnungszeiten:**
- Mo-Fr: 08:00 - 18:00 Uhr
- Sa: 09:00 - 14:00 Uhr
- Notfallservice: 24/7

## Entwicklung

### Lokale Entwicklung

```bash
# Entwicklungsserver mit Auto-Reload starten
npm run dev
```

### Produktionsdeployment

```bash
# Für Produktionsumgebung
npm start
```

### E-Mail Konfiguration

Für das Kontaktformular müssen Sie die E-Mail-Einstellungen in `server.js` konfigurieren:

```javascript
const transporter = nodemailer.createTransporter({
  service: 'gmail', // oder anderer Provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // App-spezifisches Passwort
  }
});
```

## Browser-Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Browsers

## Technologien

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Template Engine:** EJS
- **E-Mail:** Nodemailer
- **Icons:** Font Awesome
- **Schriften:** Google Fonts (Inter)

## Lizenz

MIT License - siehe LICENSE Datei für Details.

---

**KK-Facility-Management** - Ihr zuverlässiger Partner für professionelle Gebäudedienstleistungen in Münster und Umgebung.
