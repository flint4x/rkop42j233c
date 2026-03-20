const PerformanceManager = {
  isLowEnd: false,

  init() {
    this.detectHardware();
    this.applySettings();
    this.setupEventListeners();
  },

  detectHardware() {
    const ua = navigator.userAgent.toLowerCase();
    const isChromebook = ua.includes('cros');
    const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
    const isMobile = /iphone|ipad|ipod|android/i.test(ua);

    this.isLowEnd = isChromebook || hasLowMemory || isMobile;
    
    const savedMode = localStorage.getItem('apollo_perf_mode');
    if (savedMode) {
      this.isLowEnd = savedMode === 'low';
    }
  },

  applySettings() {
    const body = document.body;
    if (this.isLowEnd) {
      body.classList.add('perf-low-end');
    } else {
      body.classList.remove('perf-low-end');
    }
  },

  togglePerformanceMode(isLow) {
    this.isLowEnd = isLow;
    localStorage.setItem('apollo_perf_mode', isLow ? 'low' : 'high');
    this.applySettings();
  },

  setupEventListeners() {
    window.addEventListener('apolloRefreshPerf', () => this.applySettings());
  }
};

window.addEventListener('DOMContentLoaded', () => PerformanceManager.init());
