(function () {
  const menuHost = document.querySelector('.site-menu');
  if (!menuHost) {
    return;
  }

  async function loadMenu() {
    let response = null;
    let basePrefix = '';

    for (let depth = 0; depth < 8; depth += 1) {
      try {
        response = await fetch(basePrefix + 'menu.html', { cache: 'no-cache' });
        if (response.ok) {
          break;
        }
      } catch (error) {
        response = null;
      }
      basePrefix += '../';
    }

    if (!response || !response.ok) {
      return;
    }

    const html = await response.text();
    const sourceDocument = new DOMParser().parseFromString(html, 'text/html');
    menuHost.innerHTML = sourceDocument.body ? sourceDocument.body.innerHTML : html;

    menuHost.querySelectorAll('[href]').forEach((element) => {
      const href = element.getAttribute('href');
      if (!href || /^(?:[a-z]+:|#|\/\/)/i.test(href)) {
        return;
      }
      element.setAttribute('href', basePrefix + href);
    });
  }

  loadMenu();
})();
