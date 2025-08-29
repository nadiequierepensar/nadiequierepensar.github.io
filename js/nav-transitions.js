(() => {
  const root = document.documentElement;
  const DURATION = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 320;
  window.__PAGE_FADE_DURATION = DURATION;

  // Por si volvemos desde otra página con la clase pegada
  root.classList.remove('is-leaving');

  // Fade IN al estar listo
  function ready(){ root.classList.add('is-ready'); }
  if (document.readyState !== 'loading') ready();
  else document.addEventListener('DOMContentLoaded', ready);

  // Al volver con "Atrás" desde el bfcache: reponé el estado visible
  window.addEventListener('pageshow', (e) => {
    root.classList.remove('is-leaving');
    root.classList.add('is-ready');
  });

  // Navegación con fade OUT
  function leaveTo(url, replace=false){
    root.classList.add('is-leaving');
    const go = () => replace ? location.replace(url) : location.assign(url);
    if (DURATION) setTimeout(go, DURATION); else go();
  }
  window.startPageLeave = leaveTo;

  // Intercepta links internos
  document.addEventListener('click', (ev) => {
    const a = ev.target.closest('a[href]');
    if (!a) return;
    if (a.target === '_blank' || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;

    const url = new URL(a.getAttribute('href'), location.href);
    if (url.origin !== location.origin) return;     // externos: dejar pasar
    if (url.href === location.href) return;         // misma página: nada

    ev.preventDefault();
    leaveTo(url.href);
  });
})();
