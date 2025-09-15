const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Email configuration (für Kontaktformular)
const transporter = nodemailer.createTransport({
    // Konfiguration später hinzufügen
    service: 'gmail', // Beispiel - anpassen je nach Provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'KK-Facility-Management | Professionelle Gebäudedienstleistungen in Münster',
        description: 'Ihr Partner für Facility Management in Münster und Umgebung. Reinigung, Wartung, Instandhaltung und mehr.'
    });
});

// API für Angebots-Anfragen
app.post('/api/angebot', async (req, res) => {
    try {
        const { company, name, email, phone, services, address, size, frequency, message } = req.body;

        // Validierung
        if (!name || !email || !services || services.length === 0) {
            return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus und wählen Sie mindestens eine Leistung.' });
        }

        // Berechne geschätzten Preis mit Standard-Marktpreisen
        const servicesPricing = {
            'Gebäudereinigung': 13.50,
            'Technischer Service': 65.00,
            'Außenanlagenpflege': 28.00,
            'Sicherheitsdienst': 18.50,
            'Entsorgungsservice': 150.00,
            'Facility Management': 8.50
        };

        let estimatedTotal = 0;
        const selectedServices = services.map(service => {
            const price = servicesPricing[service] || 0;
            estimatedTotal += price;
            return { service, price };
        });

        // E-Mail senden
        const servicesHtml = selectedServices.map(s =>
            `<li>${s.service} - ab ${s.price.toFixed(2)}€/h</li>`
        ).join('');

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'kontakt@kk-facility-management.de',
            subject: `Neue Angebots-Anfrage von ${name}${company ? ` (${company})` : ''}`,
            html: `
        <h2>Neue Angebots-Anfrage</h2>
        <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Kontaktdaten</h3>
          <p><strong>Name:</strong> ${name}</p>
          ${company ? `<p><strong>Unternehmen:</strong> ${company}</p>` : ''}
          <p><strong>E-Mail:</strong> ${email}</p>
          ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        </div>

        <div style="background: #e6fffa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Gewünschte Leistungen</h3>
          <ul>${servicesHtml}</ul>
          <p><strong>Geschätzte Stundenkosten gesamt:</strong> ca. ${estimatedTotal.toFixed(2)}€/h</p>
        </div>

        ${address || size || frequency ? `
        <div style="background: #fffbf0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Objektdaten</h3>
          ${address ? `<p><strong>Adresse:</strong> ${address}</p>` : ''}
          ${size ? `<p><strong>Größe:</strong> ${size} m²</p>` : ''}
          ${frequency ? `<p><strong>Häufigkeit:</strong> ${frequency}</p>` : ''}
        </div>` : ''}

        ${message ? `
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Zusätzliche Informationen</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>` : ''}

        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Diese Anfrage wurde über die Website von KK-Facility-Management gesendet.
        </p>
      `
        };

        // await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: 'Ihre Angebots-Anfrage wurde erfolgreich übermittelt!',
            estimatedTotal: estimatedTotal.toFixed(2)
        });
    } catch (error) {
        console.error('Fehler beim Senden der Angebots-Anfrage:', error);
        res.status(500).json({ error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
    }
});

// Legacy API für einfache Kontaktanfragen
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        // Validierung
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' });
        }

        // E-Mail senden
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'kontakt@kk-facility-management.de',
            subject: `Neue Kontaktanfrage von ${name}`,
            html: `
        <h3>Neue Kontaktanfrage</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Nicht angegeben'}</p>
        <p><strong>Service:</strong> ${service || 'Nicht angegeben'}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message}</p>
      `
        };

        // await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Ihre Nachricht wurde erfolgreich gesendet!' });
    } catch (error) {
        console.error('Fehler beim Senden der E-Mail:', error);
        res.status(500).json({ error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 KK-Facility-Management Website läuft auf http://localhost:${PORT}`);
});
