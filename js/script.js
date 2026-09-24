// 1. Menu mobile
const btnMenu = document.querySelector('.tt-menu-toggle');
const navList = document.querySelector('.tt-nav-list');
if (btnMenu && navList) {
  btnMenu.addEventListener('click', () => {
    const open = navList.classList.toggle('active');
    btnMenu.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.tt-nav-link').forEach((link) =>
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      btnMenu.setAttribute('aria-expanded', 'false');
    })
  );
}

// 2. Legenda sincronizada do podcast
const audio = document.getElementById('podcast-audio');
const display = document.getElementById('live-caption-display');
const overlay = document.getElementById('live-caption-overlay');
const cues = [
  { start: 0, end: 5, text: 'Lucas: Olá a todos! Está no ar o primeiro episódio do Voz Inclusiva...' },
  { start: 5, end: 11, text: 'Lucas: Hoje recebemos a desenvolvedora Mariana para bater um papo sobre os maiores erros na web.' },
  { start: 11, end: 18, text: 'Mariana: Oi Lucas! O erro mais comum é esquecer o atributo alt nas imagens ou o foco visível nos links.' },
  { start: 18, end: 25, text: 'Mariana: A boa notícia é que com HTML semântico resolvemos 80% dos problemas de acessibilidade!' },
  { start: 25, end: 40, text: 'Lucas: Sensacional! No próximo bloco veremos exemplos práticos com formulários e rótulos semânticos.' },
];
function setCaption(text) {
  if (display) display.textContent = text;
  if (overlay) overlay.textContent = text;
}
if (audio) {
  audio.addEventListener('timeupdate', () => {
    const t = audio.currentTime;
    const cue = cues.find((c) => t >= c.start && t < c.end);
    if (cue) setCaption(cue.text);
    else if (t >= 40) setCaption('Fim do episódio #01.');
  });
  audio.addEventListener('play', () => {
    if (audio.currentTime < 0.4) setCaption(cues[0].text);
  });
}
