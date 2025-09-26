// Furnitopia AR Bedden JavaScript

class ARBedManager {
  constructor() {
    this.cart = this.loadCart();
    this.currentBed = null;
    this.arSupported = this.checkARSupport();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateCartCount();
    this.initializeModelViewers();
    this.setupARInstructions();
  }

  // Check AR Support
  checkARSupport() {
    return 'xr' in navigator && 'model-viewer' in customElements;
  }

  // Setup Event Listeners
  setupEventListeners() {
    // AR Button clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('.ar-button.primary')) {
        e.preventDefault();
        const bedModel = e.target.getAttribute('onclick')?.match(/openAR\('([^']+)'\)/)?.[1];
        if (bedModel) {
          this.openAR(bedModel);
        }
      }
    });

    // Add to cart clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('.ar-button:not(.primary)')) {
        e.preventDefault();
        const onclick = e.target.getAttribute('onclick');
        const match = onclick?.match(/addToCart\('([^']+)',\s*(\d+)\)/);
        if (match) {
          this.addToCart(match[1], parseFloat(match[2]));
        }
      }
    });

    // Model viewer events
    document.addEventListener('DOMContentLoaded', () => {
      this.setupModelViewerEvents();
    });
  }

  // Setup Model Viewer Events
  setupModelViewerEvents() {
    const modelViewers = document.querySelectorAll('model-viewer');
    
    modelViewers.forEach(viewer => {
      // Loading events
      viewer.addEventListener('load', () => {
        console.log('Model loaded:', viewer.src);
        this.showARButton(viewer);
      });

      // Error handling
      viewer.addEventListener('error', (e) => {
        console.error('Model loading error:', e.detail);
        this.showModelError(viewer);
      });

      // AR activation
      viewer.addEventListener('ar-status', (e) => {
        console.log('AR status:', e.detail.status);
        if (e.detail.status === 'failed') {
          this.showARError();
        }
      });
    });
  }

  // Open AR Experience
  openAR(bedModel) {
    if (!this.arSupported) {
      this.showARNotSupported();
      return;
    }

    const modelViewer = document.querySelector(`model-viewer[src*="${bedModel}"]`);
    if (!modelViewer) {
      console.error('Model viewer not found for:', bedModel);
      return;
    }

    // Check if model is loaded
    if (!modelViewer.loaded) {
      this.showModelLoading();
      return;
    }

    // Activate AR
    try {
      modelViewer.activateAR();
      this.trackARUsage(bedModel);
    } catch (error) {
      console.error('AR activation failed:', error);
      this.showARError();
    }
  }

  // Show AR Button when model is loaded
  showARButton(modelViewer) {
    const card = modelViewer.closest('.bed-card');
    const arButton = card?.querySelector('.ar-button.primary');
    if (arButton) {
      arButton.style.opacity = '1';
      arButton.style.pointerEvents = 'auto';
    }
  }

  // Show Model Error
  showModelError(modelViewer) {
    const container = modelViewer.closest('.model-viewer-container');
    if (container) {
      container.innerHTML = `
        <div class="model-loading">
          <div style="text-align: center; color: #666;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 10px; color: #e74c3c;"></i>
            <p>3D Model kon niet worden geladen</p>
            <small>Probeer de pagina te verversen</small>
          </div>
        </div>
      `;
    }
  }

  // Show AR Not Supported Message
  showARNotSupported() {
    this.showNotification(
      'AR wordt niet ondersteund op dit apparaat. Probeer het op een moderne smartphone met Chrome of Safari.',
      'warning'
    );
  }

  // Show Model Loading Message
  showModelLoading() {
    this.showNotification(
      '3D Model wordt nog geladen. Wacht even en probeer opnieuw.',
      'info'
    );
  }

  // Show AR Error
  showARError() {
    this.showNotification(
      'AR kon niet worden gestart. Controleer of je camera toegang hebt en probeer opnieuw.',
      'error'
    );
  }

  // Show Notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
      ">
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        ${message}
      </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // Add to Cart
  addToCart(bedName, price) {
    const newItem = {
      id: Date.now(),
      name: bedName,
      price: price,
      category: 'bed',
      quantity: 1,
      timestamp: new Date().toISOString()
    };

    this.cart.push(newItem);
    this.saveCart();
    this.updateCartCount();
    this.showNotification(`${bedName} is toegevoegd aan je winkelwagen!`, 'success');
    this.trackCartAddition(bedName, price);
  }

  // Load Cart from localStorage
  loadCart() {
    try {
      return JSON.parse(localStorage.getItem('furnitopia_cart')) || [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  // Save Cart to localStorage
  saveCart() {
    try {
      localStorage.setItem('furnitopia_cart', JSON.stringify(this.cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  // Update Cart Count
  updateCartCount() {
    const cartCountElements = document.querySelectorAll('.total-count');
    cartCountElements.forEach(element => {
      element.textContent = this.cart.length;
    });
  }

  // Initialize Model Viewers
  initializeModelViewers() {
    const modelViewers = document.querySelectorAll('model-viewer');
    modelViewers.forEach(viewer => {
      // Set initial opacity for AR button
      const card = viewer.closest('.bed-card');
      const arButton = card?.querySelector('.ar-button.primary');
      if (arButton) {
        arButton.style.opacity = '0.5';
        arButton.style.pointerEvents = 'none';
      }
    });
  }

  // Setup AR Instructions
  setupARInstructions() {
    const instructions = document.querySelector('.ar-instructions');
    if (instructions) {
      // Add interactive elements
      const steps = instructions.querySelectorAll('li');
      steps.forEach((step, index) => {
        step.style.cursor = 'pointer';
        step.addEventListener('click', () => {
          this.highlightStep(step, index);
        });
      });
    }
  }

  // Highlight Step
  highlightStep(step, index) {
    // Remove previous highlights
    document.querySelectorAll('.ar-instructions li').forEach(li => {
      li.style.background = 'transparent';
    });

    // Highlight current step
    step.style.background = 'rgba(157, 124, 96, 0.1)';
    step.style.borderRadius = '5px';
    step.style.padding = '5px';

    // Show step-specific help
    this.showStepHelp(index);
  }

  // Show Step Help
  showStepHelp(stepIndex) {
    const helpMessages = [
      'Klik op de "Bekijk in AR" knop bij het bed van je keuze',
      'Zorg dat je op een vlakke ondergrond staat (zoals de vloer van je slaapkamer)',
      'Richt je camera op de vloer waar je het bed wilt plaatsen',
      'Beweeg je telefoon langzaam om het bed van alle kanten te bekijken',
      'Loop eromheen om de perfecte positie te vinden en maak een foto!'
    ];

    this.showNotification(helpMessages[stepIndex], 'info');
  }

  // Track AR Usage
  trackARUsage(bedModel) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'ar_activated', {
        'bed_model': bedModel,
        'timestamp': new Date().toISOString()
      });
    }

    // Local storage tracking
    const arUsage = JSON.parse(localStorage.getItem('ar_usage') || '[]');
    arUsage.push({
      bedModel,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    localStorage.setItem('ar_usage', JSON.stringify(arUsage));
  }

  // Track Cart Addition
  trackCartAddition(bedName, price) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'add_to_cart', {
        'item_name': bedName,
        'value': price,
        'currency': 'EUR',
        'item_category': 'bed'
      });
    }
  }

  // Get Cart Summary
  getCartSummary() {
    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return {
      items: this.cart.length,
      total: total,
      beds: this.cart.filter(item => item.category === 'bed').length
    };
  }

  // Clear Cart
  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartCount();
    this.showNotification('Winkelwagen is leeggemaakt', 'info');
  }
}

// Initialize AR Bed Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.arBedManager = new ARBedManager();
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .notification {
    font-family: 'Poppins', sans-serif;
  }
`;
document.head.appendChild(style);
