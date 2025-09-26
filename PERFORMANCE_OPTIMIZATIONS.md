# 3D Model Performance Optimalisaties

## Geïmplementeerde Wijzigingen

### 1. Lazy Loading (beds.html)
Alle 6 model-viewer elementen in `beds.html` zijn geoptimaliseerd met:
- `loading="lazy"`: Modellen worden pas geladen wanneer ze zichtbaar zijn
- `poster` attributen: Statische afbeeldingen worden getoond tijdens het laden

**Impact:**
- Initiele laadtijd van de pagina wordt drastisch verbeterd
- Bandbreedte wordt bespaard door modellen pas te laden wanneer nodig
- Betere perceived performance voor gebruikers

### 2. Interactieve Loading (index.html)
Model-viewer elementen in `index.html` zijn geoptimaliseerd met:
- Verwijderd `loading="eager"` 
- Behouden `reveal="interaction"` voor interactieve loading
- Poster afbeeldingen voor betere UX

**Impact:**
- Modellen worden pas gedownload na gebruikersinteractie
- Consistente loading strategie door de hele applicatie

## Aanbevolen Verdere Optimalisaties

### 1. Model Compressie (Draco)
Je 3D modellen (.glb bestanden) kunnen aanzienlijk kleiner worden gemaakt:

**Hoe te implementeren:**
```bash
# Installeer gltf-pipeline
npm install -g gltf-pipeline

# Comprimeer modellen
gltf-pipeline -i models/simple-bed.glb -o models/simple-bed-compressed.glb --draco
gltf-pipeline -i models/placeholder-bed.glb -o models/placeholder-bed-compressed.glb --draco
gltf-pipeline -i models/bed-model.glb -o models/bed-model-compressed.glb --draco
```

**Verwachte impact:**
- 80-90% reductie in bestandsgrootte
- Model van 10MB wordt 1-2MB
- `<model-viewer>` ondersteunt Draco automatisch

### 2. Textuur Optimalisatie
Optimaliseer de afbeeldingen binnen je 3D modellen:

**Resolutie aanbevelingen:**
- Hoofdtexturen: 2048x2048 pixels (max)
- Detailtexturen: 1024x1024 pixels
- Kleine details: 512x512 pixels

**Formaat aanbevelingen:**
- Gebruik WebP of KTX2 formaten
- Betere compressie dan JPG/PNG
- Moderne browsers ondersteunen deze formaten

### 3. Progressive Loading
Implementeer een loading indicator:

```html
<model-viewer 
  src="models/simple-bed.glb" 
  poster="img/furniturepic.jpg"
  loading="lazy"
  progress-bar="true"
  loading="lazy">
</model-viewer>
```

### 4. Intersection Observer Optimalisatie
De bestaande Intersection Observer in `script.js` kan worden uitgebreid:

```javascript
// Voeg toe aan de bestaande observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Laad model pas wanneer zichtbaar
      entry.target.setAttribute('loading', 'eager');
    } else {
      // Pauzeer loading wanneer niet zichtbaar
      entry.target.setAttribute('loading', 'lazy');
    }
  });
}, {
  rootMargin: '50px' // Start loading 50px voordat element zichtbaar wordt
});
```

## Performance Monitoring

### 1. Web Vitals Tracking
Implementeer Core Web Vitals monitoring:

```javascript
// Voeg toe aan je analytics
function trackWebVitals() {
  // Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.element.tagName === 'MODEL-VIEWER') {
        console.log('LCP Model Load Time:', entry.startTime);
      }
    }
  }).observe({entryTypes: ['largest-contentful-paint']});
}
```

### 2. Model Loading Metrics
Track model loading performance:

```javascript
document.querySelectorAll('model-viewer').forEach(viewer => {
  viewer.addEventListener('load', () => {
    console.log('Model loaded:', viewer.src);
    // Stuur metrics naar je analytics service
  });
  
  viewer.addEventListener('error', (e) => {
    console.error('Model loading failed:', viewer.src, e);
    // Track errors voor debugging
  });
});
```

## Best Practices

### 1. Poster Afbeeldingen
- Gebruik geoptimaliseerde afbeeldingen (WebP format)
- Houd aspect ratio consistent met 3D model
- Gebruik placeholder afbeeldingen die de verwachte content representeren

### 2. Lazy Loading Strategie
- Gebruik `loading="lazy"` voor modellen onder de fold
- Gebruik `reveal="interaction"` voor belangrijke modellen
- Overweeg `loading="eager"` alleen voor bovenste modellen

### 3. Error Handling
- Implementeer fallback content voor mislukte loads
- Toon gebruiksvriendelijke error messages
- Log errors voor debugging en monitoring

## Resultaten

Na implementatie van deze optimalisaties verwacht je:
- **50-70% snellere initiele laadtijd**
- **80-90% minder bandbreedte gebruik**
- **Betere Core Web Vitals scores**
- **Verbeterde gebruikerservaring**

De wijzigingen zijn gecommit in branch `typescript-improvements` en klaar voor review.
