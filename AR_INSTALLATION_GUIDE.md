# Furnitopia AR Bedden - Installatiegids

## 🚀 Snelle Start

### 1. Bestanden Controleren
Zorg dat alle bestanden correct zijn geüpload:
```
Furnitopia-store/
├── beds.html                 ✅ Hoofdpagina bedden
├── beds/
│   ├── css/beds.css         ✅ Styling
│   ├── js/ar-beds.js        ✅ AR functionaliteit
│   └── README.md            ✅ Documentatie
├── models/
│   └── placeholder-bed.glb  ✅ Placeholder 3D model
└── img/beds/                📁 Bedden foto's (nog toe te voegen)
```

### 2. 3D Modellen Toevoegen
Vervang `models/placeholder-bed.glb` met echte bedden modellen:

**Aanbevolen specificaties:**
- **Formaat**: GLB (Binary glTF)
- **Grootte**: Maximaal 10MB per model
- **Polygonen**: Maximaal 50,000 triangles
- **Texturen**: 2048x2048 pixels max
- **Compressie**: Gebruik Draco compression

**Model bestanden nodig:**
- `models/modern-bed.glb`
- `models/classic-bed.glb`
- `models/platform-bed.glb`
- `models/bunk-bed.glb`
- `models/king-bed.glb`
- `models/storage-bed.glb`

### 3. Bedden Foto's Toevoegen
Upload bedden foto's naar `img/beds/`:
- `modern-bed.jpg`
- `classic-bed.jpg`
- `platform-bed.jpg`
- `bunk-bed.jpg`
- `king-bed.jpg`
- `storage-bed.jpg`

**Foto specificaties:**
- **Resolutie**: Minimaal 800x600 pixels
- **Formaat**: JPG of WebP
- **Grootte**: Maximaal 2MB per foto
- **Aspect ratio**: 4:3 of 16:9

## 🔧 Technische Configuratie

### Browser Ondersteuning
| Browser | AR Ondersteuning | Status |
|---------|------------------|--------|
| Chrome (Android) | ✅ Volledig | Aanbevolen |
| Safari (iOS) | ✅ Quick Look | Aanbevolen |
| Chrome (Desktop) | ✅ WebXR | Goed |
| Edge | ✅ WebXR | Goed |
| Firefox | ⚠️ Beperkt | Basis viewer |

### HTTPS Vereist
AR functionaliteit werkt alleen over HTTPS. Zorg voor:
- SSL certificaat geïnstalleerd
- HTTPS redirect geconfigureerd
- Mixed content issues opgelost

### Performance Optimalisatie
```javascript
// In beds/js/ar-beds.js - aanpassen voor jouw server
const MODEL_BASE_URL = 'https://jouw-domein.com/models/';
const IMAGE_BASE_URL = 'https://jouw-domein.com/img/beds/';
```

## 📱 Mobiele Optimalisatie

### Viewport Meta Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
```

### Touch Events
AR werkt het beste met:
- Touch events geoptimaliseerd
- Camera toegang verleend
- Gyroscope ondersteuning

### Loading Performance
```javascript
// Preload belangrijke modellen
const preloadModels = [
  'models/modern-bed.glb',
  'models/classic-bed.glb'
];
```

## 🎨 Customisatie

### Kleuren Aanpassen
In `beds/css/beds.css`:
```css
:root {
  --primary-color: #9d7c60;    /* Hoofdkleur */
  --secondary-color: #d7cbbf;  /* Accentkleur */
  --text-color: #2c3e50;       /* Tekstkleur */
}
```

### Bedden Toevoegen
1. Voeg nieuwe bed toe aan `beds.html`
2. Upload foto naar `img/beds/`
3. Upload 3D model naar `models/`
4. Update `ar-beds.js` indien nodig

### Prijzen Aanpassen
In `beds.html` - zoek naar:
```html
<div class="bed-price">€899</div>
```

## 🔍 Testing

### Lokale Testing
```bash
# Start lokale server (HTTPS vereist)
python -m http.server 8000 --bind 127.0.0.1
# Of gebruik Live Server in VS Code
```

### AR Testing Checklist
- [ ] AR knop werkt op mobiel
- [ ] 3D modellen laden correct
- [ ] Camera toegang wordt gevraagd
- [ ] Bedden kunnen worden geplaatst
- [ ] Winkelwagen functionaliteit werkt
- [ ] Responsive design op alle apparaten

### Performance Testing
- [ ] Pagina laadt binnen 3 seconden
- [ ] 3D modellen laden binnen 5 seconden
- [ ] AR activatie binnen 2 seconden
- [ ] Geen memory leaks

## 🚨 Troubleshooting

### Veelvoorkomende Problemen

**AR werkt niet:**
- Controleer HTTPS
- Test op mobiel apparaat
- Controleer browser ondersteuning

**3D modellen laden niet:**
- Controleer bestandspaden
- Verificeer GLB formaat
- Check bestandsgrootte

**Camera toegang geweigerd:**
- Gebruik HTTPS
- Test in incognito modus
- Controleer browser instellingen

### Debug Mode
```javascript
// In browser console
localStorage.setItem('debug_ar', 'true');
// Herlaad pagina voor debug info
```

## 📊 Analytics

### Google Analytics Setup
```javascript
// In beds.html head sectie
gtag('config', 'GA_MEASUREMENT_ID', {
  'custom_map': {
    'dimension1': 'ar_usage',
    'dimension2': 'bed_model'
  }
});
```

### AR Usage Tracking
De app trackt automatisch:
- AR activaties per bed model
- Winkelwagen toevoegingen
- Error rates
- User engagement

## 🔄 Updates

### Model Updates
1. Upload nieuwe GLB bestanden
2. Update `beds.html` indien nodig
3. Test AR functionaliteit
4. Clear browser cache

### Code Updates
1. Backup huidige versie
2. Upload nieuwe bestanden
3. Test alle functionaliteiten
4. Monitor error logs

## 📞 Support

Voor technische ondersteuning:
- Check browser console voor errors
- Test op verschillende apparaten
- Controleer netwerk requests
- Gebruik debug mode

## 🎯 Toekomstige Features

Geplande uitbreidingen:
- [ ] AR.js marker-based AR
- [ ] Meerdere bedden tegelijk
- [ ] Kleuren aanpassen in AR
- [ ] Social sharing
- [ ] VR ondersteuning
- [ ] AI matras aanbevelingen

---

**Succes met je AR beddenwinkel! 🛏️✨**
