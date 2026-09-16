document.addEventListener("DOMContentLoaded", () => {
  // 1. Seleção dos elementos do HTML
  const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
  const postMedia = document.querySelector(".post-media");
  const bookmarkBtn = document.querySelector(".post-actions > .action-btn");

  if (!likeBtn) return;

  // 2. Localiza o SVG e o nó de texto dentro do botão de curtir
  const likeSvg = likeBtn.querySelector("svg");
  const textNode = Array.from(likeBtn.childNodes).find(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
  );

  // 3. Variáveis de estado inicial
  let isLiked = false;
  let baseLikes = 0;

  // Atualiza o texto inicial para "0"
  if (textNode) {
    textNode.textContent = "0";
  }

  // 4. Função para formatar números grandes (ex: 1000 -> 1.0K)
  function formatLikes(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  // 5. Função para aplicar o efeito visual no coração (Bounce)
  function triggerHeartAnimation() {
    if (likeSvg) {
      likeSvg.style.transform = "scale(1.3)";
      setTimeout(() => {
        likeSvg.style.transform = "scale(1)";
      }, 150);
    }
  }

  // 6. Função para atualizar a interface (estilo e texto)
  function updateLikeUI() {
    if (textNode) {
      textNode.textContent = formatLikes(baseLikes);
    }

    if (isLiked) {
      likeBtn.classList.add("liked");
      if (likeSvg) {
        likeSvg.style.fill = "#ef4444";
        likeSvg.style.stroke = "#ef4444";
      }
    } else {
      likeBtn.classList.remove("liked");
      if (likeSvg) {
        likeSvg.style.fill = "none";
        likeSvg.style.stroke = "currentColor";
      }
    }

    triggerHeartAnimation();
  }

  // 7. Evento do Botão de Curtir (Alterna entre curtir e descurtir)
  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (isLiked) {
      isLiked = false;
      baseLikes = Math.max(0, baseLikes - 1);
    } else {
      isLiked = true;
      baseLikes++;
    }

    updateLikeUI();
  });

  // 8. Evento de clique na Imagem Principal (Curte ou incrementa)
  if (postMedia) {
    postMedia.addEventListener("click", (e) => {
      e.stopPropagation();

      if (!isLiked) {
        isLiked = true;
      }
      baseLikes++;

      updateLikeUI();
    });
  }

  // 9. Evento no Botão Salvar (Bookmark)
  if (bookmarkBtn) {
    let isBookmarked = false;
    bookmarkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isBookmarked = !isBookmarked;
      bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

      const svg = bookmarkBtn.querySelector("svg");
      if (svg) {
        svg.style.transform = "scale(1.2)";
        setTimeout(() => {
          svg.style.transform = "scale(1)";
        }, 150);
      }
    });
  }
});