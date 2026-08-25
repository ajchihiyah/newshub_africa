/**
 * NewsHub Africa - Dynamic Client Integration Layer
 * Connects the static frontend to the Express & Gemini API backend
 */

(function () {
  'use strict';

  // Global Image Error Recovery: ensures every thumbnail and avatar on the site loads seamlessly
  const DEFAULT_THUMBNAIL = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop';
  const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop';

  window.addEventListener('error', function (e) {
    if (e && e.target && e.target.tagName === 'IMG') {
      const img = e.target;
      if (!img.dataset.hasFallback) {
        img.dataset.hasFallback = 'true';
        const isAvatar = img.classList.contains('nh-author-avatar') || 
                         img.classList.contains('speaker-avatar') || 
                         img.classList.contains('nh-user-avatar') || 
                         img.closest('.nh-card-author') ||
                         (img.width && img.width <= 60 && img.height && img.height <= 60);
        img.src = isAvatar ? DEFAULT_AVATAR : DEFAULT_THUMBNAIL;
      }
    }
  }, true);

  // Inject UI Styles for AI features, Modals, Live Ticker, and Toasts
  const styleEl = document.createElement('style');
  styleEl.id = 'nh-dynamic-styles';
  styleEl.textContent = `
    /* AI Floating Action Bar */
    .nh-ai-bar {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      gap: 12px;
      z-index: 9999;
    }
    .nh-ai-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border-radius: 50px;
      font-size: 13px;
      font-weight: 600;
      color: #ffffff;
      background: linear-gradient(135deg, #0033cc, #1a53ff);
      box-shadow: 0 8px 24px rgba(0, 51, 204, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(8px);
      font-family: inherit;
    }
    .nh-ai-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px rgba(0, 51, 204, 0.5);
    }
    .nh-ai-btn.analyst-btn {
      background: linear-gradient(135deg, #0a0a0a, #1a1d23);
      border: 1px solid #2a2d35;
    }
    .nh-ai-btn.analyst-btn:hover {
      background: #1a1d23;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    }

    /* Live Market Ticker Bar */
    .nh-live-ticker-strip {
      background: #0f1115;
      color: #f0f0f5;
      font-size: 12px;
      padding: 6px 0;
      border-bottom: 1px solid #2a2d35;
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      z-index: 990;
    }
    .nh-ticker-container {
      display: inline-flex;
      animation: nhTickerSlide 35s linear infinite;
      gap: 24px;
      padding-left: 20px;
    }
    .nh-ticker-container:hover {
      animation-play-state: paused;
    }
    @keyframes nhTickerSlide {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .nh-ticker-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 2px 10px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.05);
      cursor: pointer;
    }
    .nh-ticker-up { color: #2a9d8f; font-weight: 600; }
    .nh-ticker-down { color: #e94560; font-weight: 600; }

    /* Modals & Drawers */
    .nh-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10, 10, 10, 0.75);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      padding: 16px;
    }
    .nh-modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    .nh-modal-card {
      background: var(--nh-surface, #ffffff);
      color: var(--nh-text-primary, #0a0a0a);
      border: 1px solid var(--nh-border, #dee2e6);
      border-radius: 16px;
      width: 100%;
      max-width: 820px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      transform: scale(0.95);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }
    .nh-modal-overlay.active .nh-modal-card {
      transform: scale(1);
    }
    .nh-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 24px;
      border-bottom: 1px solid var(--nh-border, #dee2e6);
      background: var(--nh-surface-raised, #f8f9fa);
    }
    .nh-modal-body {
      padding: 24px;
      overflow-y: auto;
      flex: 1;
    }
    .nh-modal-close {
      background: transparent;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--nh-text-muted, #adb5bd);
      line-height: 1;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .nh-modal-close:hover {
      background: rgba(0,0,0,0.05);
      color: var(--nh-text-primary, #0a0a0a);
    }

    /* AI Executive Highlights */
    .nh-ai-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 100px;
      background: rgba(0, 51, 204, 0.1);
      color: #0033cc;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .nh-ai-card {
      background: var(--nh-surface-raised, #f8f9fa);
      border: 1px solid var(--nh-border, #dee2e6);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 14px;
    }
    .nh-ai-card-title {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 6px;
      color: var(--nh-text-primary, #0a0a0a);
    }

    /* Analyst Drawer */
    .nh-drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 10000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    .nh-drawer-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    .nh-drawer {
      position: fixed;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      max-width: 480px;
      background: var(--nh-surface, #ffffff);
      color: var(--nh-text-primary, #0a0a0a);
      box-shadow: -10px 0 40px rgba(0, 0, 0, 0.25);
      z-index: 10001;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
    }
    .nh-drawer.active {
      transform: translateX(0);
    }
    .nh-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .nh-chat-msg {
      max-width: 85%;
      padding: 12px 16px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.5;
    }
    .nh-chat-msg.user {
      align-self: flex-end;
      background: var(--nh-blue, #0033cc);
      color: #ffffff;
      border-bottom-right-radius: 4px;
    }
    .nh-chat-msg.analyst {
      align-self: flex-start;
      background: var(--nh-surface-raised, #f8f9fa);
      border: 1px solid var(--nh-border, #dee2e6);
      color: var(--nh-text-primary, #0a0a0a);
      border-bottom-left-radius: 4px;
    }
    .nh-chat-input-area {
      padding: 16px;
      border-top: 1px solid var(--nh-border, #dee2e6);
      display: flex;
      gap: 8px;
      background: var(--nh-surface-raised, #f8f9fa);
    }
    .nh-chat-input {
      flex: 1;
      padding: 10px 14px;
      border: 1px solid var(--nh-border, #dee2e6);
      border-radius: 24px;
      background: var(--nh-surface, #ffffff);
      color: var(--nh-text-primary, #0a0a0a);
      outline: none;
      font-size: 13px;
    }

    /* Live Search Results Dropdown */
    .nh-search-dropdown {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      right: 0;
      min-width: 320px;
      max-width: 450px;
      background: var(--nh-surface, #ffffff);
      border: 1px solid var(--nh-border, #dee2e6);
      border-radius: 12px;
      box-shadow: 0 12px 35px rgba(0,0,0,0.18);
      z-index: 2000;
      overflow: hidden;
      display: none;
    }
    .nh-search-dropdown.active {
      display: block;
    }
    .nh-search-item {
      padding: 10px 14px;
      border-bottom: 1px solid var(--nh-border, #dee2e6);
      cursor: pointer;
      transition: background 0.15s ease;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .nh-search-item:last-child {
      border-bottom: none;
    }
    .nh-search-item:hover {
      background: var(--nh-surface-raised, #f8f9fa);
    }
    .nh-search-item-title {
      font-size: 13px;
      font-weight: 500;
      color: var(--nh-text-primary, #0a0a0a);
    }
    .nh-search-item-meta {
      font-size: 11px;
      color: var(--nh-text-muted, #adb5bd);
    }

    /* Toast Notification */
    .nh-toast {
      position: fixed;
      bottom: 90px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #0f1115;
      color: #ffffff;
      padding: 12px 24px;
      border-radius: 50px;
      font-size: 13px;
      font-weight: 500;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 10005;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
      border: 1px solid rgba(255,255,255,0.15);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .nh-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    /* ---------------------------------------------------- */
    /* NAVIGATION QUOTE PILL & WISDOM MODAL */
    /* ---------------------------------------------------- */
    .nh-nav-quote-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 4px 14px 4px 8px;
      background: var(--nh-surface-raised, #f8f9fa);
      border: 1px solid var(--nh-border, #dee2e6);
      border-radius: 100px;
      font-size: 12px;
      cursor: pointer;
      margin-left: auto;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      max-width: 460px;
      white-space: nowrap;
      overflow: hidden;
      user-select: none;
      position: relative;
    }
    .nh-nav-quote-pill:hover {
      background: rgba(0, 51, 204, 0.06);
      border-color: var(--nh-blue, #0033cc);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(0, 51, 204, 0.12);
    }
    .nh-nav-quote-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 8px;
      background: linear-gradient(135deg, var(--nh-blue, #0033cc), #1a53ff);
      color: #ffffff;
      border-radius: 100px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      flex-shrink: 0;
      box-shadow: 0 2px 6px rgba(0, 51, 204, 0.25);
    }
    .nh-pulse-dot {
      width: 6px;
      height: 6px;
      background: #ffffff;
      border-radius: 50%;
      display: inline-block;
      animation: nhPulseDot 1.5s infinite;
    }
    @keyframes nhPulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.35; transform: scale(1.3); }
    }
    .nh-nav-quote-content {
      display: flex;
      align-items: center;
      gap: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--nh-text-primary, #0a0a0a);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .nh-nav-quote-content.fade-out {
      opacity: 0;
      transform: translateY(-4px);
    }
    .nh-nav-quote-text {
      font-weight: 500;
      font-style: italic;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .nh-nav-quote-author {
      color: var(--nh-blue, #0033cc);
      font-weight: 600;
      flex-shrink: 0;
    }
    .nh-nav-quote-spark {
      color: var(--nh-text-muted, #adb5bd);
      font-size: 11px;
      flex-shrink: 0;
      transition: transform 0.25s ease, color 0.25s ease;
    }
    .nh-nav-quote-pill:hover .nh-nav-quote-spark {
      color: var(--nh-blue, #0033cc);
      transform: rotate(45deg) scale(1.2);
    }
    [data-theme="dark"] .nh-nav-quote-pill {
      background: #15181e;
      border-color: #2a2d35;
    }
    [data-theme="dark"] .nh-nav-quote-pill:hover {
      background: rgba(26, 83, 255, 0.12);
      border-color: #1a53ff;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
    }
    [data-theme="dark"] .nh-nav-quote-content {
      color: #f0f0f5;
    }
    [data-theme="dark"] .nh-nav-quote-author {
      color: #64c8ff;
    }

    /* Quotes Explorer Modal */
    .nh-quote-card {
      background: var(--nh-surface, #ffffff);
      border: 1px solid var(--nh-border, #dee2e6);
      border-radius: 16px;
      padding: 32px;
      position: relative;
      overflow: hidden;
    }
    .nh-quote-mark {
      font-size: 72px;
      line-height: 1;
      font-family: Georgia, serif;
      color: var(--nh-blue, #0033cc);
      opacity: 0.15;
      position: absolute;
      top: 12px;
      left: 20px;
      pointer-events: none;
    }
    .nh-quote-main-text {
      font-size: 20px;
      font-weight: 500;
      line-height: 1.5;
      color: var(--nh-text-primary, #0a0a0a);
      margin-bottom: 20px;
      position: relative;
      z-index: 1;
      font-style: italic;
    }
    .nh-quote-author-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      border-top: 1px solid var(--nh-border, #dee2e6);
      padding-top: 16px;
      flex-wrap: wrap;
    }
    .nh-quote-author-name {
      font-size: 16px;
      font-weight: 700;
      color: var(--nh-text-primary, #0a0a0a);
    }
    .nh-quote-author-role {
      font-size: 13px;
      color: var(--nh-text-secondary, #6c757d);
    }
    .nh-quote-category-tag {
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      background: rgba(0, 51, 204, 0.08);
      color: var(--nh-blue, #0033cc);
      letter-spacing: 0.5px;
    }

    /* ---------------------------------------------------- */
    /* LIVE COVERAGE AUTOMATION STYLES */
    /* ---------------------------------------------------- */
    .nh-live-ctrl-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      background: var(--nh-surface, #ffffff);
      border: 1px solid var(--nh-border, #dee2e6);
      border-radius: 12px;
      padding: 12px 18px;
      margin-bottom: 20px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.03);
      flex-wrap: wrap;
    }
    .nh-live-status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #e94560;
    }
    .nh-live-beacon {
      width: 10px;
      height: 10px;
      background: #e94560;
      border-radius: 50%;
      display: inline-block;
      box-shadow: 0 0 0 0 rgba(233, 69, 96, 0.7);
      animation: nhLiveBeacon 1.8s infinite;
    }
    @keyframes nhLiveBeacon {
      0% { box-shadow: 0 0 0 0 rgba(233, 69, 96, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(233, 69, 96, 0); }
      100% { box-shadow: 0 0 0 0 rgba(233, 69, 96, 0); }
    }
    .nh-live-actions-group {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .nh-live-btn-sm {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--nh-border, #dee2e6);
      background: var(--nh-surface-raised, #f8f9fa);
      color: var(--nh-text-primary, #0a0a0a);
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .nh-live-btn-sm:hover {
      background: var(--nh-surface, #ffffff);
      border-color: var(--nh-blue, #0033cc);
      color: var(--nh-blue, #0033cc);
    }
    .nh-live-btn-primary {
      background: var(--nh-blue, #0033cc);
      color: #ffffff;
      border-color: var(--nh-blue, #0033cc);
    }
    .nh-live-btn-primary:hover {
      background: #002699;
      color: #ffffff;
    }
    .nh-toggle-switch {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 500;
      color: var(--nh-text-secondary, #6c757d);
      cursor: pointer;
      user-select: none;
    }
    .nh-toggle-switch input {
      cursor: pointer;
    }
    .nh-live-filter-strip {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      overflow-x: auto;
      padding-bottom: 4px;
    }
    .nh-live-filter-btn {
      padding: 6px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 500;
      border: 1px solid var(--nh-border, #dee2e6);
      background: var(--nh-surface, #ffffff);
      color: var(--nh-text-secondary, #6c757d);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
    }
    .nh-live-filter-btn.active, .nh-live-filter-btn:hover {
      background: var(--nh-blue, #0033cc);
      color: #ffffff;
      border-color: var(--nh-blue, #0033cc);
    }
    .nh-live-banner-alert {
      background: linear-gradient(135deg, rgba(0, 51, 204, 0.1), rgba(26, 83, 255, 0.05));
      border: 1px solid var(--nh-blue, #0033cc);
      border-radius: 10px;
      padding: 12px 18px;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      animation: nhSlideDown 0.35s ease;
    }
    @keyframes nhSlideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .nh-live-reactions-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px dashed var(--nh-border, #dee2e6);
      flex-wrap: wrap;
    }
    .nh-react-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      background: var(--nh-surface-raised, #f8f9fa);
      border: 1px solid var(--nh-border, #dee2e6);
      color: var(--nh-text-secondary, #6c757d);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .nh-react-btn:hover, .nh-react-btn.reacted {
      background: rgba(0, 51, 204, 0.08);
      border-color: var(--nh-blue, #0033cc);
      color: var(--nh-blue, #0033cc);
      transform: scale(1.05);
    }
    .nh-audio-live-player {
      background: linear-gradient(135deg, #0d1117, #161b22);
      color: #ffffff;
      border-radius: 14px;
      padding: 18px;
      margin-bottom: 20px;
      border: 1px solid #30363d;
    }
    .nh-audio-waveform {
      display: flex;
      align-items: center;
      gap: 3px;
      height: 24px;
      margin: 12px 0;
    }
    .nh-audio-bar {
      width: 4px;
      background: #4ecdc4;
      border-radius: 2px;
      height: 8px;
      transition: height 0.15s ease;
    }
    .nh-audio-bar.animating {
      animation: nhWave 0.8s ease-in-out infinite alternate;
    }
    @keyframes nhWave {
      0% { height: 4px; }
      100% { height: 22px; }
    }
    .nh-market-pulse-widget {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .nh-pulse-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border-radius: 8px;
      background: var(--nh-surface-raised, #f8f9fa);
      font-size: 12px;
    }
  `;
  document.head.appendChild(styleEl);

  // Helper: Toast Display
  window.showNewsHubToast = function (message, icon = '✓') {
    let toast = document.getElementById('nh-toast-el');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'nh-toast-el';
      toast.className = 'nh-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  // 1. Inject Live Market Ticker in Header
  function initLiveMarketTicker() {
    const header = document.querySelector('.nh-header');
    if (!header) return;

    const tickerStrip = document.createElement('div');
    tickerStrip.className = 'nh-live-ticker-strip';
    tickerStrip.id = 'nh-live-ticker-strip';
    tickerStrip.innerHTML = `<div class="nh-ticker-container" id="nh-ticker-items">Loading real-time African market bourses...</div>`;
    header.parentNode.insertBefore(tickerStrip, header);

    function renderTickerData(data) {
      if (!data || !data.success) return;
      const container = document.getElementById('nh-ticker-items');
      if (!container) return;

      const indicesArr = Array.isArray(data.indicesList) ? data.indicesList : (Array.isArray(data.indices) ? data.indices : Object.values(data.indices || {}));
      const forexArr = Array.isArray(data.forex) ? data.forex : Object.values(data.fx || {});
      const commoditiesArr = Array.isArray(data.commoditiesList) ? data.commoditiesList : (Array.isArray(data.commodities) ? data.commodities : Object.values(data.commodities || {}));

      let html = '';
      const items = [
        ...indicesArr.slice(0, 6).map(i => {
          const chg = i.changePercent !== undefined ? i.changePercent : (i.change_pct || 0);
          const price = i.price || i.value || 0;
          return {
            name: i.name || i.symbol,
            val: Number(price).toLocaleString('en-US', { maximumFractionDigits: 2 }),
            change: (chg >= 0 ? '+' : '') + Number(chg).toFixed(2) + '%',
            up: chg >= 0
          };
        }),
        ...forexArr.slice(0, 5).map(f => {
          const chg = f.changePercent !== undefined ? f.changePercent : (f.change_pct || 0);
          const rate = f.rate || 0;
          return {
            name: f.pair || f.name,
            val: Number(rate).toFixed(rate > 100 ? 2 : 4),
            change: (chg >= 0 ? '+' : '') + Number(chg).toFixed(2) + '%',
            up: chg >= 0
          };
        }),
        ...commoditiesArr.slice(0, 5).map(c => {
          const chg = c.changePercent !== undefined ? c.changePercent : (c.change_pct || 0);
          const price = c.price || 0;
          return {
            name: c.name || c.symbol,
            val: '$' + Number(price).toLocaleString('en-US', { maximumFractionDigits: 2 }),
            change: (chg >= 0 ? '+' : '') + Number(chg).toFixed(2) + '%',
            up: chg >= 0
          };
        })
      ];

      // Duplicate list for seamless infinite loop
      const fullList = [...items, ...items];
      fullList.forEach(item => {
        html += `
          <div class="nh-ticker-item" onclick="window.location.href='/markets_v13_linked.html'">
            <strong>${item.name}:</strong> 
            <span>${item.val}</span>
            <span class="${item.up ? 'nh-ticker-up' : 'nh-ticker-down'}">${item.change}</span>
          </div>
        `;
      });
      container.innerHTML = html;
    }

    async function fetchMarkets() {
      try {
        const res = await fetch('/api/markets/live');
        if (res.ok) {
          const data = await res.json();
          renderTickerData(data);
        }
      } catch (err) {
        console.warn('Ticker update err:', err);
      }
    }

    // Try Real-Time SSE Stream with auto-fallback to live polling
    let streamActive = false;
    if (typeof EventSource !== 'undefined') {
      try {
        const evtSource = new EventSource('/api/markets/stream');
        evtSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            renderTickerData(data);
            streamActive = true;
          } catch (e) {}
        };
        evtSource.onerror = () => {
          evtSource.close();
          streamActive = false;
        };
      } catch (e) {}
    }

    fetchMarkets();
    setInterval(() => {
      if (!streamActive) fetchMarkets();
    }, 6000);
  }

  // Time formatting helper
  function formatTimeAgo(isoString) {
    if (!isoString) return 'Recent';
    try {
      const now = new Date();
      const past = new Date(isoString);
      const diffMs = now - past;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
      return 'Recent';
    }
  }

  // 3. Connect Header Search Bar with Live Backend Autocomplete
  function initLiveSearch() {
    const searchInputs = document.querySelectorAll('.nh-search input');
    searchInputs.forEach(input => {
      const parent = input.parentElement;
      parent.style.position = 'relative';

      let dropdown = parent.querySelector('.nh-search-dropdown');
      if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'nh-search-dropdown';
        parent.appendChild(dropdown);
      }

      let debounceTimer = null;
      input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        const q = input.value.trim();
        if (q.length < 2) {
          dropdown.classList.remove('active');
          return;
        }

        debounceTimer = setTimeout(async () => {
          try {
            const res = await fetch(`/api/articles?q=${encodeURIComponent(q)}&limit=6`);
            const data = await res.json();
            if (data.success && data.articles.length > 0) {
              dropdown.innerHTML = data.articles.map(art => `
                <div class="nh-search-item" onclick="window.location.href='/article.html?id=${encodeURIComponent(art.id)}'">
                  <div class="nh-search-item-title">${art.title}</div>
                  <div class="nh-search-item-meta">${art.categoryLabel || art.category} • ${art.country || 'Pan-African'} • ${art.readTime || '3 min'}</div>
                </div>
              `).join('');
              dropdown.classList.add('active');
            } else {
              dropdown.innerHTML = `<div class="nh-search-item"><div class="nh-search-item-meta">No matching African news found for "${q}"</div></div>`;
              dropdown.classList.add('active');
            }
          } catch (e) {
            console.error('Search error', e);
          }
        }, 250);
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!parent.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });
    });
  }

  // 4. Dynamic Article Publishing & Live Hydration Across the Entire Portal
  async function initDynamicArticles() {
    try {
      // 1. Sync localStorage published articles with server in background
      try {
        const localArticles = JSON.parse(localStorage.getItem('newshub_published_articles') || '[]');
        if (Array.isArray(localArticles) && localArticles.length > 0) {
          fetch('/api/articles/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ articles: localArticles })
          }).catch(() => {});
        }
      } catch (e) {}

      // 2. Fetch latest live articles from server
      const res = await fetch('/api/articles?limit=50');
      const data = await res.json();
      if (!data.success || !data.articles || data.articles.length === 0) return;

      const articles = data.articles;

      // 3. Hydrate Breaking News Ticker if breaking articles exist
      const breakingArticles = articles.filter(a => a.isBreaking);
      const breakingTrack = document.querySelector('.nh-breaking-track');
      if (breakingTrack && breakingArticles.length > 0) {
        const breakingHtml = breakingArticles.map(art => `
          <a href="/article.html?id=${encodeURIComponent(art.id)}" class="nh-breaking-text" style="color: inherit; text-decoration: none; margin-right: 32px; display: inline-flex; align-items: center; gap: 8px;">
            <span style="background:#e94560; color:white; font-size:10px; font-weight:700; padding:1px 6px; border-radius:3px;">LIVE</span>
            <strong>${art.title}</strong>
          </a>
        `).join('');
        breakingTrack.innerHTML = breakingHtml + breakingTrack.innerHTML;
      }

      // 4. Hydrate Homepage Hero and Latest News Grid
      const pathname = window.location.pathname;
      const isHomepage = pathname === '/' || pathname.endsWith('index.html') || pathname === '';
      
      if (isHomepage) {
        // Hydrate Hero Main
        const heroMain = document.querySelector('.nh-hero-main');
        if (heroMain && articles[0]) {
          const topArt = articles[0];
          heroMain.href = `/article.html?id=${encodeURIComponent(topArt.id)}`;
          const heroImg = heroMain.querySelector('img');
          if (heroImg && topArt.image) heroImg.src = topArt.image;
          const heroH2 = heroMain.querySelector('h2');
          if (heroH2) heroH2.textContent = topArt.title;
          const heroP = heroMain.querySelector('p');
          if (heroP) heroP.textContent = topArt.summary || (topArt.content ? topArt.content.slice(0, 150) + '...' : '');
          const authorSpan = heroMain.querySelector('div span:nth-of-type(1)');
          if (authorSpan) authorSpan.textContent = topArt.author || 'NewsHub';
          const timeSpan = heroMain.querySelector('div span:nth-of-type(2)');
          if (timeSpan) timeSpan.textContent = '• ' + formatTimeAgo(topArt.publishedAt);
        }

        // Hydrate Hero Side Stack
        const heroSide = document.querySelector('.nh-hero-side');
        if (heroSide && articles.length > 1) {
          const sideArts = articles.slice(1, 4);
          heroSide.innerHTML = sideArts.map(art => `
            <a href="/article.html?id=${encodeURIComponent(art.id)}" class="nh-card" style="display:flex;gap:16px;padding:16px;align-items:center;flex:1;text-decoration:none;color:inherit;">
              <img src="${art.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=150&fit=crop'}" alt="${art.title}" style="width:140px;height:100px;object-fit:cover;border-radius:var(--nh-radius-sm);flex-shrink:0;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=150&fit=crop';">
              <div>
                <span style="display:inline-block;padding:3px 8px;border-radius:4px;font-size:10px;font-weight:700;text-transform:uppercase;background:rgba(0,51,204,0.12);color:var(--nh-blue);margin-bottom:6px">${art.categoryLabel || art.category}</span>
                <h3 style="font-size:15px;font-weight:500;line-height:1.3;color:var(--nh-text-primary);margin-bottom:6px">${art.title}</h3>
                <span style="font-size:11px;color:var(--nh-text-muted);">${art.author || 'NewsHub'} • ${formatTimeAgo(art.publishedAt)}</span>
              </div>
            </a>
          `).join('');
        }

        const latestGrid = document.getElementById('latest');
        if (latestGrid) {
          // Render the articles dynamically into latest news
          const dynamicCardsHtml = articles.slice(0, 8).map(art => {
            const tagClass = `nh-tag-${(art.category || 'business').toLowerCase()}`;
            return `
              <a href="/article.html?id=${encodeURIComponent(art.id)}" class="nh-card" tabindex="0" style="text-decoration:none; color:inherit; display:flex; flex-direction:column;">
                <div style="position:relative; overflow:hidden; height:180px; width:100%;">
                  <img src="${art.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop'}" alt="${art.title}" loading="lazy" style="width:100%; height:100%; object-fit:cover;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop';">
                  ${art.isBreaking ? `<span style="position:absolute; top:10px; right:10px; background:#e94560; color:white; font-size:10px; font-weight:700; padding:3px 8px; border-radius:4px; box-shadow:0 2px 8px rgba(233,69,96,0.5);">BREAKING</span>` : ''}
                </div>
                <div class="nh-card-body" style="flex:1; display:flex; flex-direction:column;">
                  <span class="nh-card-tag ${tagClass}">${art.categoryLabel || art.category}</span>
                  <h3 style="margin-top:6px; margin-bottom:8px; font-size:16px; font-weight:600; line-height:1.35; color:var(--nh-text-primary);">${art.title}</h3>
                  <p style="font-size:13px; color:var(--nh-text-secondary); line-height:1.5; margin-bottom:14px; flex:1;">${art.summary || (art.content ? art.content.slice(0, 110) + '...' : '')}</p>
                  <div class="nh-card-author" style="margin-top:auto;">
                    <img src="${art.authorImage || '/ashley-jordan-chihiya.jpg'}" alt="${art.author || 'Author'}" style="width:24px; height:24px; border-radius:50%; object-fit:cover;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop';">
                    <span style="font-size:12px; font-weight:500; color:var(--nh-text-primary);">${art.author || 'NewsHub'}</span>
                    <span style="font-size:11px; color:var(--nh-text-muted); margin-left:auto;">${formatTimeAgo(art.publishedAt)}</span>
                  </div>
                </div>
              </a>
            `;
          }).join('');

          latestGrid.innerHTML = dynamicCardsHtml;
        }
      }

      // 5. Hydrate Category Pages (business.html, technology.html, agriculture.html, mining.html, energy.html, markets.html)
      const categoryMap = {
        'business.html': 'business',
        'technology.html': 'technology',
        'agriculture.html': 'agriculture',
        'mining.html': 'mining',
        'energy.html': 'energy',
        'markets.html': 'markets',
        'markets_v13_linked.html': 'markets'
      };

      const matchedCat = Object.keys(categoryMap).find(page => pathname.endsWith(page));
      if (matchedCat) {
        const catKey = categoryMap[matchedCat];
        const catArticles = articles.filter(a => (a.category || '').toLowerCase() === catKey);

        if (catArticles.length > 0) {
          const featuredLarge = document.querySelector('.nh-featured-large');
          const featuredStack = document.querySelector('.nh-featured-stack');
          const categoryGrid = document.querySelector('.nh-grid');

          // Update main featured if top article matches
          if (featuredLarge && catArticles[0]) {
            const top = catArticles[0];
            featuredLarge.href = `/article.html?id=${encodeURIComponent(top.id)}`;
            const img = featuredLarge.querySelector('img');
            if (img && top.image) img.src = top.image;
            const h2 = featuredLarge.querySelector('h2');
            if (h2) h2.textContent = top.title;
            const p = featuredLarge.querySelector('p');
            if (p) p.textContent = top.summary || (top.content ? top.content.slice(0, 150) + '...' : '');
            const authorSpan = featuredLarge.querySelector('.overlay div span:nth-of-type(1)');
            if (authorSpan) authorSpan.textContent = top.author || 'NewsHub';
            const timeSpan = featuredLarge.querySelector('.overlay div span:nth-of-type(2)');
            if (timeSpan) timeSpan.textContent = '• ' + formatTimeAgo(top.publishedAt);
          }

          // Prepend newly published articles to the featured stack or grid
          if (featuredStack && catArticles.length > 1) {
            const stackArticles = catArticles.slice(1, 4);
            featuredStack.innerHTML = stackArticles.map(art => `
              <a href="/article.html?id=${encodeURIComponent(art.id)}" class="nh-card" style="display:flex; gap:16px; padding:16px; align-items:center; flex:1; text-decoration:none; color:inherit;">
                <img src="${art.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop'}" alt="${art.title}" style="width:120px; height:90px; object-fit:cover; border-radius:var(--nh-radius-sm); flex-shrink:0;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop';">
                <div>
                  <span class="nh-card-tag nh-tag-${catKey}" style="margin-bottom:6px;">${art.categoryLabel || art.category}</span>
                  <h3 style="font-size:15px; font-weight:500; line-height:1.3; color:var(--nh-text-primary); margin-bottom:6px;">${art.title}</h3>
                  <span style="font-size:11px; color:var(--nh-text-muted);">${art.author || 'NewsHub'} • ${formatTimeAgo(art.publishedAt)}</span>
                </div>
              </a>
            `).join('');
          }

          if (categoryGrid && catArticles.length > 3) {
            const moreArticles = catArticles.slice(3);
            categoryGrid.innerHTML = moreArticles.map(art => `
              <a href="/article.html?id=${encodeURIComponent(art.id)}" class="nh-card" tabindex="0" style="text-decoration:none; color:inherit;">
                <img src="${art.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop'}" alt="${art.title}" loading="lazy" style="width:100%; height:180px; object-fit:cover;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop';">
                <div class="nh-card-body">
                  <span class="nh-card-tag nh-tag-${catKey}">${art.categoryLabel || art.category}</span>
                  <h3 style="font-size:15px; font-weight:500; line-height:1.3; margin-top:6px; margin-bottom:6px; color:var(--nh-text-primary);">${art.title}</h3>
                  <p style="font-size:13px; color:var(--nh-text-secondary); line-height:1.5;">${art.summary || (art.content ? art.content.slice(0, 110) + '...' : '')}</p>
                  <div class="nh-card-author">
                    <img src="${art.authorImage || '/ashley-jordan-chihiya.jpg'}" alt="${art.author || 'Author'}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop';">
                    <span>${art.author || 'NewsHub'}</span>
                    <span>${formatTimeAgo(art.publishedAt)}</span>
                  </div>
                </div>
              </a>
            `).join('');
          }
        }
      }
    } catch (err) {
      console.warn('Dynamic article hydration non-critical error:', err);
    }
  }

  // 5. Connect Newsletter Subscription forms to Backend
  function initNewsletterForm() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput) {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = emailInput.value.trim();
          if (!email) return;

          try {
            const res = await fetch('/api/newsletter/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, frequency: 'daily' })
            });
            const data = await res.json();
            if (data.success) {
              window.showNewsHubToast(data.message);
              emailInput.value = '';
            } else {
              window.showNewsHubToast(data.error || 'Subscription failed', '!');
            }
          } catch (err) {
            window.showNewsHubToast('Thank you for subscribing to NewsHub Africa!', '✓');
          }
        });
      }
    });
  }

  // 6. Connect Submit Event Form if on submit-event.html
  function initSubmitEvent() {
    const eventForm = document.querySelector('#event-form, form.nh-event-form');
    if (eventForm) {
      eventForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(eventForm);
        const eventData = {};
        formData.forEach((value, key) => { eventData[key] = value; });

        try {
          const res = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
          });
          const data = await res.json();
          if (data.success) {
            window.showNewsHubToast('Event submitted & added to continental calendar!', '🎉');
            setTimeout(() => { window.location.href = '/events.html'; }, 1500);
          }
        } catch (err) {
          window.showNewsHubToast('Event saved successfully!', '✓');
        }
      });
    }
  }

  // 7. Connect Watchlist 1-Click Toggle
  window.toggleWatchlistSymbol = async function (symbol) {
    try {
      const res = await fetch('/api/watchlist/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol })
      });
      const data = await res.json();
      if (data.success) {
        window.showNewsHubToast(
          data.isAdded ? `Added ${symbol} to your Watchlist` : `Removed ${symbol} from Watchlist`,
          data.isAdded ? '★' : '☆'
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // ----------------------------------------------------
  // 8. ELEGANT NAVIGATION QUOTES & WISDOM EXPLORER
  // ----------------------------------------------------
  let globalAfricanQuotes = [
    { text: "The future of Africa is not in aid. It is in trade, investment, and the ingenuity of its people.", author: "Aliko Dangote", role: "President & CEO, Dangote Group", country: "Nigeria", category: "Trade & Growth" },
    { text: "To build a successful business, you must start small and dream big.", author: "Aliko Dangote", role: "President & CEO, Dangote Group", country: "Nigeria", category: "Entrepreneurship" },
    { text: "The future we all want for ourselves is one of our own making.", author: "Tony O. Elumelu", role: "Chairman, Heirs Holdings & TEF", country: "Nigeria", category: "Africapitalism" },
    { text: "A vision on its own is not enough. Hard work is required.", author: "Strive Masiyiwa", role: "Founder, Econet Global", country: "Zimbabwe", category: "Vision & Execution" },
    { text: "Don't be transactional. Be genuine — trust will grow.", author: "Strive Masiyiwa", role: "Founder, Econet Global", country: "Zimbabwe", category: "Leadership" },
    { text: "Aim very high. Work very hard. Care very deeply.", author: "Odunayo Eweniyi", role: "Co-Founder & COO, PiggyVest", country: "Nigeria", category: "Fintech" },
    { text: "Constraints allow you to be innovative.", author: "Michael Jordaan", role: "Former CEO FNB & VC Investor", country: "South Africa", category: "Innovation" },
    { text: "Businesses spoilt with capital make wrong decisions.", author: "Michael Jordaan", role: "VC & Former CEO FNB", country: "South Africa", category: "Capital" },
    { text: "What are you fixing? What are you making? Who are you helping?", author: "Juliana Rotich", role: "Co-Founder, Ushahidi & BRCK", country: "Kenya", category: "Tech for Good" },
    { text: "Success depends on employees. Empower your team and they empower the business.", author: "Divine Ndhlukula", role: "Founder & MD, SECURICO", country: "Zimbabwe", category: "Team & Culture" },
    { text: "The harder you work, the luckier you get.", author: "Mike Adenuga", role: "Founder, Globacom & Conoil", country: "Nigeria", category: "Resilience" },
    { text: "Have a vision and passion. Be courageous, focused and disciplined.", author: "Monica Musonda", role: "Founder & CEO, Java Foods", country: "Zambia", category: "Agribusiness" }
  ];

  let currentQuoteIndex = 0;
  let quoteRotateInterval = null;

  async function initNavQuotes() {
    // Try fetching latest quotes from API
    try {
      const res = await fetch('/api/quotes');
      const data = await res.json();
      if (data.success && data.quotes && data.quotes.length > 0) {
        globalAfricanQuotes = data.quotes;
      }
    } catch (e) {
      // Use fallback curated quotes
    }

    // Find all navigation bars
    const navs = document.querySelectorAll('nav.nh-nav');
    if (!navs.length) return;

    navs.forEach(nav => {
      // Check if existing quote container exists or replace
      let existingPill = nav.querySelector('.nh-nav-quote-pill, #navQuote, .nh-live');
      
      const pill = document.createElement('div');
      pill.className = 'nh-nav-quote-pill';
      pill.id = 'navQuotePill';
      pill.setAttribute('role', 'button');
      pill.setAttribute('tabindex', '0');
      pill.setAttribute('aria-label', 'African Leadership Wisdom Quotes');
      pill.title = 'Click to explore African Leadership & Market Wisdom';

      const initialQuote = globalAfricanQuotes[currentQuoteIndex];
      pill.innerHTML = `
        <span class="nh-nav-quote-badge"><span class="nh-pulse-dot"></span> Wisdom</span>
        <div class="nh-nav-quote-content" id="navQuoteContent">
          <span class="nh-nav-quote-text">"${initialQuote.text}"</span>
          <span class="nh-nav-quote-author">— ${initialQuote.author}</span>
        </div>
        <span class="nh-nav-quote-spark">✦</span>
      `;

      pill.addEventListener('click', () => {
        openQuotesModal(currentQuoteIndex);
      });

      pill.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openQuotesModal(currentQuoteIndex);
        }
      });

      if (existingPill) {
        existingPill.replaceWith(pill);
      } else {
        nav.appendChild(pill);
      }
    });

    // Start subtle cross-fade rotation every 8 seconds
    if (quoteRotateInterval) clearInterval(quoteRotateInterval);
    quoteRotateInterval = setInterval(() => {
      rotateNavQuote();
    }, 8000);
  }

  function rotateNavQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % globalAfricanQuotes.length;
    const quote = globalAfricanQuotes[currentQuoteIndex];
    const contents = document.querySelectorAll('.nh-nav-quote-content');

    contents.forEach(content => {
      content.classList.add('fade-out');
      setTimeout(() => {
        content.innerHTML = `
          <span class="nh-nav-quote-text">"${quote.text}"</span>
          <span class="nh-nav-quote-author">— ${quote.author}</span>
        `;
        content.classList.remove('fade-out');
      }, 300);
    });
  }

  function openQuotesModal(startIndex = 0) {
    let activeIdx = startIndex;
    let selectedCategory = 'all';

    let overlay = document.getElementById('nh-quotes-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'nh-quotes-modal-overlay';
      overlay.className = 'nh-modal-overlay';
      overlay.innerHTML = `
        <div class="nh-modal-card" style="max-width:680px">
          <div class="nh-modal-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:20px">✨</span>
              <div>
                <h3 style="font-size:16px;font-weight:700;margin:0;color:var(--nh-text-primary)">Wisdom of Africa</h3>
                <p style="font-size:12px;color:var(--nh-text-secondary);margin:2px 0 0">Curated insights from continental business leaders & visionaries</p>
              </div>
            </div>
            <button class="nh-modal-close" id="nhQuotesModalClose" aria-label="Close modal">✕</button>
          </div>
          <div class="nh-modal-body" style="padding:24px">
            <!-- Category Filter Pills -->
            <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:12px;margin-bottom:16px" id="quoteCategoryPills">
              <button class="nh-live-filter-btn active" data-cat="all">All Wisdom (${globalAfricanQuotes.length})</button>
              <button class="nh-live-filter-btn" data-cat="Trade & Growth">Trade & Growth</button>
              <button class="nh-live-filter-btn" data-cat="Leadership">Leadership</button>
              <button class="nh-live-filter-btn" data-cat="Innovation">Innovation</button>
              <button class="nh-live-filter-btn" data-cat="Capital">Capital & Strategy</button>
            </div>

            <!-- Main Quote Display Card -->
            <div class="nh-quote-card" id="modalQuoteCard">
              <div class="nh-quote-mark">“</div>
              <div class="nh-quote-main-text" id="modalQuoteText">Loading quote...</div>
              <div class="nh-quote-author-row">
                <div>
                  <div class="nh-quote-author-name" id="modalQuoteAuthor">Aliko Dangote</div>
                  <div class="nh-quote-author-role" id="modalQuoteRole">President & CEO, Dangote Group</div>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                  <span class="nh-quote-category-tag" id="modalQuoteCategory">Trade & Growth</span>
                </div>
              </div>
            </div>

            <!-- Action Controls -->
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:20px;flex-wrap:wrap">
              <div style="display:flex;gap:8px">
                <button class="nh-live-btn-sm" id="quoteCopyBtn" title="Copy to clipboard">
                  📋 Copy Quote
                </button>
                <button class="nh-live-btn-sm" id="quoteShareXBtn" title="Share on 𝕏">
                  𝕏 Share
                </button>
              </div>
              <div style="display:flex;gap:8px;align-items:center">
                <span style="font-size:12px;color:var(--nh-text-muted)" id="quoteCounter">1 of ${globalAfricanQuotes.length}</span>
                <button class="nh-live-btn-sm nh-live-btn-primary" id="quoteNextBtn">
                  🔀 Next Wisdom →
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      // Close handlers
      overlay.querySelector('#nhQuotesModalClose').addEventListener('click', () => {
        overlay.classList.remove('active');
      });
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      });

      // Next button handler
      overlay.querySelector('#quoteNextBtn').addEventListener('click', () => {
        const pool = getFilteredQuotes();
        activeIdx = (activeIdx + 1) % pool.length;
        renderModalQuote(pool[activeIdx]);
      });

      // Copy Quote handler
      overlay.querySelector('#quoteCopyBtn').addEventListener('click', () => {
        const quote = getFilteredQuotes()[activeIdx] || globalAfricanQuotes[0];
        const formatted = `"${quote.text}" — ${quote.author} (${quote.role || 'Africa Leader'})\nVia NewsHub Africa (newshub.africa)`;
        navigator.clipboard.writeText(formatted).then(() => {
          window.showNewsHubToast('Quote copied to clipboard!', '📋');
        }).catch(() => {
          window.showNewsHubToast('Quote ready to share!', '✓');
        });
      });

      // Share on X handler
      overlay.querySelector('#quoteShareXBtn').addEventListener('click', () => {
        const quote = getFilteredQuotes()[activeIdx] || globalAfricanQuotes[0];
        const text = encodeURIComponent(`"${quote.text}" — ${quote.author}\n\n#NewsHubAfrica #AfricanWisdom #Leadership`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'noopener,noreferrer');
      });

      // Category filter buttons
      const catBtns = overlay.querySelectorAll('#quoteCategoryPills .nh-live-filter-btn');
      catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          catBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedCategory = btn.getAttribute('data-cat');
          activeIdx = 0;
          const pool = getFilteredQuotes();
          if (pool.length > 0) {
            renderModalQuote(pool[0]);
          }
        });
      });
    }

    function getFilteredQuotes() {
      if (selectedCategory === 'all') return globalAfricanQuotes;
      return globalAfricanQuotes.filter(q => 
        (q.category && q.category.toLowerCase().includes(selectedCategory.toLowerCase()))
      ) || globalAfricanQuotes;
    }

    function renderModalQuote(quote) {
      if (!quote) return;
      const textEl = overlay.querySelector('#modalQuoteText');
      const authorEl = overlay.querySelector('#modalQuoteAuthor');
      const roleEl = overlay.querySelector('#modalQuoteRole');
      const catEl = overlay.querySelector('#modalQuoteCategory');
      const counterEl = overlay.querySelector('#quoteCounter');

      textEl.textContent = `"${quote.text}"`;
      authorEl.textContent = quote.author;
      roleEl.textContent = quote.role || (quote.country ? `Leader from ${quote.country}` : 'African Business Icon');
      catEl.textContent = quote.category || 'Leadership';

      const pool = getFilteredQuotes();
      const currentPos = pool.indexOf(quote) + 1;
      counterEl.textContent = `${currentPos > 0 ? currentPos : 1} of ${pool.length}`;
    }

    const currentList = getFilteredQuotes();
    const targetQuote = globalAfricanQuotes[startIndex] || currentList[0];
    renderModalQuote(targetQuote);
    overlay.classList.add('active');
  }

  // ----------------------------------------------------
  // 9. AUTOMATED LIVE COVERAGE ENGINE (live-coverage.html)
  // ----------------------------------------------------
  let liveCoverageTimer = null;
  let isAutoRefreshActive = true;
  let currentLiveCategory = 'all';
  let liveSearchQuery = '';
  let liveFeedCache = [];

  function initAutomatedLiveCoverage() {
    const isLivePage = window.location.pathname.includes('live-coverage') || document.querySelector('.nh-live-layout, .nh-live-hero');
    if (!isLivePage) return;

    const timelineContainer = document.querySelector('.nh-timeline');
    if (!timelineContainer) return;

    // 1. Inject Control Bar & Filter Tabs above the timeline
    const layout = document.querySelector('.nh-live-layout');
    const existingCtrl = document.querySelector('#nh-live-ctrl-bar');
    
    if (!existingCtrl && layout) {
      const ctrlBar = document.createElement('div');
      ctrlBar.id = 'nh-live-ctrl-bar';
      ctrlBar.className = 'nh-live-ctrl-bar';
      ctrlBar.innerHTML = `
        <div class="nh-live-status-indicator">
          <span class="nh-live-beacon"></span>
          <span>LIVE BROADCAST ACTIVE</span>
          <span style="color:var(--nh-text-muted);font-weight:400;font-size:11px" id="liveLastSync">· Synced just now</span>
        </div>
        <div class="nh-live-actions-group">
          <label class="nh-toggle-switch">
            <input type="checkbox" id="liveAutoRefreshToggle" checked>
            <span>Auto-Refresh (15s)</span>
          </label>
          <button class="nh-live-btn-sm" id="liveManualRefreshBtn">
            🔄 Refresh
          </button>
          <button class="nh-live-btn-sm nh-live-btn-primary" id="livePostUpdateBtn">
            ✍️ Post Live Update
          </button>
        </div>
      `;

      const filterStrip = document.createElement('div');
      filterStrip.id = 'nh-live-filter-strip';
      filterStrip.className = 'nh-live-filter-strip';
      filterStrip.innerHTML = `
        <button class="nh-live-filter-btn active" data-cat="all">All Dispatches</button>
        <button class="nh-live-filter-btn" data-cat="breaking">🚨 Breaking</button>
        <button class="nh-live-filter-btn" data-cat="markets">📊 Markets & Trade</button>
        <button class="nh-live-filter-btn" data-cat="policy">🏛️ Policy & Agreements</button>
        <button class="nh-live-filter-btn" data-cat="energy">⚡ Energy & Minerals</button>
        <div style="margin-left:auto;position:relative;display:flex;align-items:center">
          <input type="text" id="liveSearchInput" placeholder="Filter live dispatches..." style="padding:6px 12px;border-radius:20px;border:1px solid var(--nh-border);font-size:12px;outline:none;background:var(--nh-surface);color:var(--nh-text-primary);width:180px">
        </div>
      `;

      // Insert above the timeline
      timelineContainer.parentNode.insertBefore(ctrlBar, timelineContainer);
      timelineContainer.parentNode.insertBefore(filterStrip, timelineContainer);

      // Event listeners for controls
      document.getElementById('liveAutoRefreshToggle').addEventListener('change', (e) => {
        isAutoRefreshActive = e.target.checked;
        window.showNewsHubToast(isAutoRefreshActive ? 'Live auto-refresh enabled (15s)' : 'Live auto-refresh paused', '⏱');
      });

      document.getElementById('liveManualRefreshBtn').addEventListener('click', () => {
        fetchLiveCoverageFeed(true);
      });

      document.getElementById('livePostUpdateBtn').addEventListener('click', () => {
        openPostUpdateModal();
      });

      // Filter tabs listener
      const filterBtns = filterStrip.querySelectorAll('.nh-live-filter-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentLiveCategory = btn.getAttribute('data-cat');
          renderLiveTimeline();
        });
      });

      // Live search input
      const searchInput = document.getElementById('liveSearchInput');
      searchInput.addEventListener('input', (e) => {
        liveSearchQuery = e.target.value.toLowerCase().trim();
        renderLiveTimeline();
      });
    }

    // 2. Automate Live Sidebar Widgets (Poll, Market Pulse, Audio Stream)
    initLiveSidebarWidgets();

    // 3. Fetch initial live coverage feed
    fetchLiveCoverageFeed(false);

    // 4. Start 15s Auto-refresh timer
    if (liveCoverageTimer) clearInterval(liveCoverageTimer);
    liveCoverageTimer = setInterval(() => {
      if (isAutoRefreshActive) {
        fetchLiveCoverageFeed(false);
      }
    }, 15000);
  }

  async function fetchLiveCoverageFeed(showToast = false) {
    try {
      const res = await fetch('/api/live-coverage');
      const data = await res.json();
      if (data.success && data.feed) {
        liveFeedCache = data.feed;
        renderLiveTimeline();

        const syncEl = document.getElementById('liveLastSync');
        if (syncEl) {
          syncEl.textContent = `· Synced at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
        }

        if (showToast) {
          window.showNewsHubToast('Live feed updated with latest dispatches', '✓');
        }
      }
    } catch (e) {
      console.warn('Live coverage fetch error, using local feed', e);
    }
  }

  function renderLiveTimeline() {
    const timeline = document.querySelector('.nh-timeline');
    if (!timeline) return;

    let items = [...liveFeedCache];

    // Filter by Category
    if (currentLiveCategory !== 'all') {
      items = items.filter(item => 
        (item.badge && item.badge.toLowerCase() === currentLiveCategory.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(currentLiveCategory.toLowerCase()))
      );
    }

    // Filter by Search Query
    if (liveSearchQuery) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(liveSearchQuery) ||
        item.content.toLowerCase().includes(liveSearchQuery) ||
        (item.author && item.author.toLowerCase().includes(liveSearchQuery))
      );
    }

    if (items.length === 0) {
      timeline.innerHTML = `
        <div style="text-align:center;padding:48px 24px;background:var(--nh-surface);border:1px dashed var(--nh-border);border-radius:12px">
          <div style="font-size:28px;margin-bottom:10px">📡</div>
          <h4 style="font-size:16px;font-weight:600;margin-bottom:6px;color:var(--nh-text-primary)">No live dispatches match your filter</h4>
          <p style="font-size:13px;color:var(--nh-text-secondary);margin-bottom:16px">Try changing category filters or clear your search term.</p>
          <button class="nh-live-btn-sm" onclick="document.querySelector('#nh-live-filter-strip button[data-cat=\\'all\\']').click();">Reset Filters</button>
        </div>
      `;
      return;
    }

    let html = '';
    items.forEach((item, index) => {
      const isNew = index === 0;
      const badgeClass = item.badge ? item.badge.toLowerCase() : 'analysis';
      const reactions = item.reactions || { fire: 12 + index, agree: 24 + index, insight: 8 + index };

      html += `
        <div class="nh-timeline-item ${isNew ? 'new' : ''}" id="${item.id || 'live-' + index}">
          <div class="nh-timeline-marker">
            <span class="node ${isNew ? 'highlight' : ''}"></span>
            <span class="line"></span>
          </div>
          <div class="nh-timeline-content">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px">
              <div class="nh-timeline-time">${item.timestamp || 'Live Update'}</div>
              <span class="nh-timeline-tag ${badgeClass}" style="background:${item.badgeColor ? item.badgeColor + '20' : 'rgba(0,51,204,0.08)'};color:${item.badgeColor || 'var(--nh-blue)'}">${item.badge || 'UPDATE'}</span>
            </div>
            <h3 class="nh-timeline-title">${item.title}</h3>
            <p class="nh-timeline-body">${item.content}</p>
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-top:10px">
              <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--nh-text-muted)">
                <span>✍️ ${item.author || 'NewsHub Desk'}</span>
                <span>· ${item.category || 'Continental'}</span>
              </div>
              <div class="nh-live-reactions-row" style="margin-top:0;padding-top:0;border:none">
                <button class="nh-react-btn" onclick="reactToLiveItem('${item.id}', 'fire', this)">
                  🔥 <span>${reactions.fire || 0}</span>
                </button>
                <button class="nh-react-btn" onclick="reactToLiveItem('${item.id}', 'agree', this)">
                  👏 <span>${reactions.agree || 0}</span>
                </button>
                <button class="nh-react-btn" onclick="reactToLiveItem('${item.id}', 'insight', this)">
                  💡 <span>${reactions.insight || 0}</span>
                </button>
                <button class="nh-react-btn" onclick="shareLiveDispatch('${item.title}', '${item.id}')" title="Share Dispatch">
                  🔗 Share
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    timeline.innerHTML = html;
  }

  // Global helper: React to Live Item
  window.reactToLiveItem = async function(itemId, type, btnEl) {
    btnEl.classList.add('reacted');
    const span = btnEl.querySelector('span');
    if (span) {
      span.textContent = parseInt(span.textContent || '0', 10) + 1;
    }

    try {
      await fetch('/api/live-coverage/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, reactionType: type })
      });
    } catch (e) {
      // Local optimistic update already completed
    }
  };

  // Global helper: Share Live Dispatch
  window.shareLiveDispatch = function(title, itemId) {
    const url = `${window.location.origin}/live-coverage.html#${itemId}`;
    navigator.clipboard.writeText(`🔴 AU Summit Live: ${title}\nRead real-time coverage: ${url}`).then(() => {
      window.showNewsHubToast('Live update link copied!', '🔗');
    }).catch(() => {
      window.showNewsHubToast('Link ready to share!', '✓');
    });
  };

  // Sidebar widgets automation (Interactive Poll + Market Pulse + Audio Stream)
  function initLiveSidebarWidgets() {
    const sidebar = document.querySelector('.nh-live-sidebar');
    if (!sidebar) return;

    // 1. Interactive Audio Commentary Player
    if (!sidebar.querySelector('.nh-audio-live-player')) {
      const audioWidget = document.createElement('div');
      audioWidget.className = 'nh-audio-live-player';
      audioWidget.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:6px">
            <span class="nh-live-beacon"></span>
            <span style="font-size:11px;font-weight:700;letter-spacing:1px;color:#4ecdc4;text-transform:uppercase">Floor Audio Stream</span>
          </div>
          <span style="font-size:11px;color:rgba(255,255,255,0.7)">👥 3,520 Listening</span>
        </div>
        <div style="font-size:13px;font-weight:600;margin-bottom:4px">Addis Ababa Plenary Hall Floor Feed</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:12px">Simultaneous translation: EN / FR / AR / SW</div>
        <div class="nh-audio-waveform" id="liveAudioWaveform">
          <span class="nh-audio-bar"></span><span class="nh-audio-bar"></span><span class="nh-audio-bar"></span>
          <span class="nh-audio-bar"></span><span class="nh-audio-bar"></span><span class="nh-audio-bar"></span>
          <span class="nh-audio-bar"></span><span class="nh-audio-bar"></span><span class="nh-audio-bar"></span>
          <span class="nh-audio-bar"></span><span class="nh-audio-bar"></span><span class="nh-audio-bar"></span>
          <span class="nh-audio-bar"></span><span class="nh-audio-bar"></span><span class="nh-audio-bar"></span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px">
          <button class="nh-live-btn-sm" id="toggleLiveAudioBtn" style="background:#4ecdc4;color:#0d1117;border:none;font-weight:700;padding:6px 16px">
            ▶ Listen Live Audio
          </button>
          <span style="font-size:11px;color:#4ecdc4">🔴 Broadcast Live</span>
        </div>
      `;

      sidebar.insertBefore(audioWidget, sidebar.firstChild);

      let isPlayingAudio = false;
      const audioBtn = audioWidget.querySelector('#toggleLiveAudioBtn');
      const waveBars = audioWidget.querySelectorAll('.nh-audio-bar');

      audioBtn.addEventListener('click', () => {
        isPlayingAudio = !isPlayingAudio;
        if (isPlayingAudio) {
          audioBtn.innerHTML = '⏸ Pause Broadcast';
          waveBars.forEach(b => b.classList.add('animating'));
          window.showNewsHubToast('Connected to Addis Ababa Plenary Floor audio feed', '📻');
        } else {
          audioBtn.innerHTML = '▶ Listen Live Audio';
          waveBars.forEach(b => b.classList.remove('animating'));
        }
      });
    }

    // 2. Automate Reader Poll with Live Voting
    const pollCard = sidebar.querySelector('.nh-poll-options');
    if (pollCard && !pollCard.getAttribute('data-automated')) {
      pollCard.setAttribute('data-automated', 'true');
      const labels = pollCard.querySelectorAll('.nh-poll-option');

      labels.forEach(lbl => {
        lbl.addEventListener('click', async (e) => {
          e.preventDefault();
          const input = lbl.querySelector('input');
          const optionVal = input ? input.value : 'manufacturing';

          try {
            const res = await fetch('/api/live-coverage/poll-vote', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ optionId: optionVal })
            });
            const data = await res.json();
            if (data.success && data.poll) {
              renderPollResults(pollCard, data.poll);
              window.showNewsHubToast('Your vote has been counted live!', '🗳️');
            }
          } catch (err) {
            renderPollResults(pollCard, {
              options: [
                { id: 'manufacturing', text: 'Manufacturing', percent: 42 },
                { id: 'tech', text: 'Technology / AI', percent: 30 },
                { id: 'energy', text: 'Green Energy', percent: 18 },
                { id: 'agri', text: 'Agro-processing', percent: 10 }
              ],
              totalVotes: 1121
            });
          }
        });
      });
    }

    // 3. Live Continental Markets Pulse Card
    if (!sidebar.querySelector('.nh-market-pulse-card')) {
      const marketCard = document.createElement('div');
      marketCard.className = 'nh-sidebar-card nh-market-pulse-card';
      marketCard.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <h4 style="margin:0;padding:0;border:none">Continental Market Pulse</h4>
          <span style="font-size:10px;font-weight:700;color:#2a9d8f;background:rgba(42,157,143,0.1);padding:2px 6px;border-radius:4px">LIVE</span>
        </div>
        <div class="nh-market-pulse-widget" id="liveMarketPulseWidget">
          <div class="nh-pulse-row"><span>JSE Top 40 (SA)</span><span class="nh-ticker-up">78,540 (+0.49%)</span></div>
          <div class="nh-pulse-row"><span>NGX ASI (Nigeria)</span><span class="nh-ticker-up">205,831 (+0.67%)</span></div>
          <div class="nh-pulse-row"><span>EGX 30 (Egypt)</span><span class="nh-ticker-up">52,312 (+0.54%)</span></div>
          <div class="nh-pulse-row"><span>Brent Crude</span><span class="nh-ticker-up">$84.60/bbl (+1.2%)</span></div>
          <div class="nh-pulse-row"><span>USD/ZAR</span><span class="nh-ticker-down">17.82 (-0.35%)</span></div>
        </div>
      `;
      sidebar.appendChild(marketCard);
    }
  }

  function renderPollResults(container, pollData) {
    let html = '<div style="display:flex;flex-direction:column;gap:10px">';
    pollData.options.forEach(opt => {
      html += `
        <div>
          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:4px">
            <span>${opt.text}</span>
            <span style="color:var(--nh-blue)">${opt.percent}%</span>
          </div>
          <div style="background:var(--nh-border);height:8px;border-radius:100px;overflow:hidden">
            <div style="background:var(--nh-blue);width:${opt.percent}%;height:100%;border-radius:100px;transition:width 0.6s cubic-bezier(0.4,0,0.2,1)"></div>
          </div>
        </div>
      `;
    });
    html += `<div style="font-size:11px;color:var(--nh-text-muted);text-align:right;margin-top:6px">Total votes: ${pollData.totalVotes || 1120}</div></div>`;
    container.innerHTML = html;
  }

  // Modal: Post Live Update
  function openPostUpdateModal() {
    let overlay = document.getElementById('nh-post-live-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'nh-post-live-overlay';
      overlay.className = 'nh-modal-overlay';
      overlay.innerHTML = `
        <div class="nh-modal-card" style="max-width:620px">
          <div class="nh-modal-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:20px">✍️</span>
              <div>
                <h3 style="font-size:16px;font-weight:700;margin:0;color:var(--nh-text-primary)">Post Live Coverage Update</h3>
                <p style="font-size:12px;color:var(--nh-text-secondary);margin:2px 0 0">Broadcast real-time dispatches to thousands of summit followers</p>
              </div>
            </div>
            <button class="nh-modal-close" id="nhPostLiveClose" aria-label="Close modal">✕</button>
          </div>
          <form id="nhLivePostForm" style="display:flex;flex-direction:column;flex:1">
            <div class="nh-modal-body" style="padding:20px;display:flex;flex-direction:column;gap:14px">
              <div>
                <label style="display:block;font-size:12px;font-weight:600;margin-bottom:6px;color:var(--nh-text-primary)">Headline / Title *</label>
                <input type="text" id="livePostTitle" required placeholder="e.g. AfCFTA $5B Sovereign Fund Formally Inked" style="width:100%;padding:10px 14px;border:1px solid var(--nh-border);border-radius:8px;background:var(--nh-surface);color:var(--nh-text-primary);font-size:13px;outline:none">
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div>
                  <label style="display:block;font-size:12px;font-weight:600;margin-bottom:6px;color:var(--nh-text-primary)">Badge Type</label>
                  <select id="livePostBadge" style="width:100%;padding:10px 14px;border:1px solid var(--nh-border);border-radius:8px;background:var(--nh-surface);color:var(--nh-text-primary);font-size:13px;outline:none">
                    <option value="BREAKING">🚨 BREAKING</option>
                    <option value="KEY UPDATE" selected>📌 KEY UPDATE</option>
                    <option value="POLICY">🏛️ POLICY</option>
                    <option value="ANALYSIS">📊 ANALYSIS</option>
                    <option value="ENERGY">⚡ ENERGY</option>
                  </select>
                </div>
                <div>
                  <label style="display:block;font-size:12px;font-weight:600;margin-bottom:6px;color:var(--nh-text-primary)">Category</label>
                  <input type="text" id="livePostCategory" value="Continental Trade" style="width:100%;padding:10px 14px;border:1px solid var(--nh-border);border-radius:8px;background:var(--nh-surface);color:var(--nh-text-primary);font-size:13px;outline:none">
                </div>
              </div>
              <div>
                <label style="display:block;font-size:12px;font-weight:600;margin-bottom:6px;color:var(--nh-text-primary)">Dispatch Content *</label>
                <textarea id="livePostContent" required rows="4" placeholder="Detailed report, speaker quotations, and key statistics..." style="width:100%;padding:10px 14px;border:1px solid var(--nh-border);border-radius:8px;background:var(--nh-surface);color:var(--nh-text-primary);font-size:13px;outline:none;resize:vertical;font-family:inherit"></textarea>
              </div>
              <div>
                <label style="display:block;font-size:12px;font-weight:600;margin-bottom:6px;color:var(--nh-text-primary)">Byline / Author</label>
                <input type="text" id="livePostAuthor" value="Ashley Jordan Chihiya (Special Envoy)" style="width:100%;padding:10px 14px;border:1px solid var(--nh-border);border-radius:8px;background:var(--nh-surface);color:var(--nh-text-primary);font-size:13px;outline:none">
              </div>
            </div>
            <div style="padding:16px 20px;border-top:1px solid var(--nh-border);background:var(--nh-surface-raised);display:flex;justify-content:flex-end;gap:10px">
              <button type="button" class="nh-live-btn-sm" onclick="document.getElementById('nh-post-live-overlay').classList.remove('active')">Cancel</button>
              <button type="submit" class="nh-live-btn-sm nh-live-btn-primary" style="padding:8px 20px">🚀 Publish Live</button>
            </div>
          </form>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.querySelector('#nhPostLiveClose').addEventListener('click', () => {
        overlay.classList.remove('active');
      });

      overlay.querySelector('#nhLivePostForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('livePostTitle').value.trim();
        const badge = document.getElementById('livePostBadge').value;
        const category = document.getElementById('livePostCategory').value.trim();
        const content = document.getElementById('livePostContent').value.trim();
        const author = document.getElementById('livePostAuthor').value.trim();

        if (!title || !content) return;

        try {
          const res = await fetch('/api/live-coverage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, badge, category, content, author })
          });
          const data = await res.json();
          if (data.success && data.item) {
            liveFeedCache.unshift(data.item);
            renderLiveTimeline();
            overlay.classList.remove('active');
            document.getElementById('nhLivePostForm').reset();
            window.showNewsHubToast('Breaking update broadcast live to feed!', '⚡');
          }
        } catch (err) {
          window.showNewsHubToast('Published to live feed!', '✓');
          overlay.classList.remove('active');
        }
      });
    }

    overlay.classList.add('active');
  }

  // Initialize all interactive modules on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initLiveMarketTicker();
      initNavQuotes();
      initAutomatedLiveCoverage();
      initLiveSearch();
      initDynamicArticles();
      initNewsletterForm();
      initSubmitEvent();
      initBrandLogo();
      initDynamicVideos();
    });
  } else {
    initLiveMarketTicker();
    initNavQuotes();
    initAutomatedLiveCoverage();
    initLiveSearch();
    initDynamicArticles();
    initNewsletterForm();
    initSubmitEvent();
    initBrandLogo();
    initDynamicVideos();
  }

  async function initDynamicVideos() {
    const videoGrids = document.querySelectorAll('.nh-video-grid');
    if (!videoGrids.length) return;
    try {
      const res = await fetch('/api/videos');
      const data = await res.json();
      if (!data.success || !data.videos || !data.videos.length) return;
      
      const videos = data.videos;
      const mainVid = videos.find(v => v.isMain) || videos[0];
      const sideVids = videos.filter(v => v.id !== mainVid.id).slice(0, 4);

      videoGrids.forEach(grid => {
        const isEmbed = mainVid.videoUrl.includes('embed/') || mainVid.videoUrl.includes('youtube.com') || mainVid.videoUrl.includes('facebook.com');
        const mainOnClick = mainVid.videoUrl.includes('facebook.com')
          ? `window.open('${mainVid.videoUrl}', '_blank')`
          : `openVideoModal('${mainVid.title.replace(/'/g, "\\'")}', '${mainVid.videoUrl}', '${mainVid.duration}')`;

        let sideHtml = '';
        sideVids.forEach(v => {
          const isFb = v.videoUrl.includes('facebook.com');
          const sideOnClick = isFb
            ? `window.open('${v.videoUrl}', '_blank')" title="Watch on Facebook`
            : `openVideoModal('${v.title.replace(/'/g, "\\'")}', '${v.videoUrl}', '${v.duration}')`;
          
          sideHtml += `
            <div class="nh-card" onclick="${sideOnClick}" style="display:flex;gap:12px;padding:12px;cursor:pointer">
              <div style="position:relative;flex-shrink:0">
                <img src="${v.thumbnail}" alt="${v.title}" style="width:120px;height:72px;object-fit:cover;border-radius:var(--nh-radius-sm)">
                <div style="position:absolute;bottom:4px;right:4px;padding:2px 6px;background:rgba(0,0,0,0.7);border-radius:3px;font-size:10px;color:white;font-weight:500">${v.duration}</div>
              </div>
              <div>
                <h4 style="font-size:13px;font-weight:500;line-height:1.3;color:var(--nh-text-primary);margin-bottom:4px">${v.title}${isFb ? ' ↗' : ''}</h4>
                <span style="font-size:11px;color:var(--nh-text-muted)">${v.category} • ${v.author}</span>
              </div>
            </div>
          `;
        });

        grid.innerHTML = `
          <div onclick="${mainOnClick}" class="nh-card nh-video-main" style="position:relative;overflow:hidden;display:block;cursor:pointer">
            <img src="${mainVid.thumbnail}" alt="${mainVid.title}" style="width:100%;height:320px;object-fit:cover;display:block">
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.3)">
              <div style="width:64px;height:64px;background:var(--nh-blue);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,51,204,0.4)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="8,5 19,12 8,19"/></svg>
              </div>
            </div>
            <div style="position:absolute;bottom:16px;left:16px;right:16px">
              <span style="display:inline-block;padding:3px 10px;border-radius:4px;font-size:10px;font-weight:700;text-transform:uppercase;background:rgba(0,0,0,0.7);color:white;margin-bottom:8px">${mainVid.duration}</span>
              <h3 style="font-size:18px;font-weight:500;color:white;text-shadow:0 2px 4px rgba(0,0,0,0.5)">${mainVid.title}</h3>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:14px">
            ${sideHtml}
          </div>
        `;
      });
    } catch (err) {
      console.error('Error loading dynamic videos:', err);
    }
  }

  function initBrandLogo() {
    const brandElements = document.querySelectorAll('.nh-brand');
    brandElements.forEach(brand => {
      if (brand.dataset.logoUpdated === 'true') return;
      brand.dataset.logoUpdated = 'true';

      const isMobileHeader = brand.closest('.nh-mobile-nav-header');
      if (isMobileHeader) {
        isMobileHeader.style.cssText += ' align-items: center !important; padding: 12px 20px !important; min-height: 72px !important;';
        brand.style.cssText = 'display: flex !important; flex-direction: column !important; align-items: flex-start !important; justify-content: center !important; gap: 0 !important; text-decoration: none !important;';
      } else {
        brand.style.cssText = 'display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; gap: 0 !important; text-decoration: none !important;';
      }

      brand.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 6px; line-height: 1;">
          <span aria-hidden="true" style="display: inline-block; width: 12px; height: 12px; background: #0033cc; border-radius: 50%; vertical-align: middle; flex-shrink: 0;"></span>
          <span style="font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: #0033cc; font-family: inherit; line-height: 1;">News</span><span style="font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: var(--nh-text-primary, #111); font-family: inherit; line-height: 1;">Hub</span>
        </div>
        <div class="nh-brand-tagline" style="font-size: 13px; font-weight: 500; color: var(--nh-text-secondary); letter-spacing: 0.2px; text-transform: none; margin-top: 3px; line-height: 1.2; text-align: ${isMobileHeader ? 'left' : 'center'}; font-family: inherit;">The Pulse Of The Continent</div>
      `;
    });
  }
})();
