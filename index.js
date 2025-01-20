const movingText = document.querySelector('.moving-text');

const textWidth = movingText.scrollWidth;
const containerWidth = movingText.parentElement.offsetWidth;

const urlParams = new URLSearchParams(window.location.search);
const categoryNotice = urlParams.get('categoria') || "economia";

async function fetchRSS() {
    try {
        const response = await fetch(`https://corsproxy.io/https://g1.globo.com/dynamo/${categoryNotice}/rss2.xml`);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const rssText = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(rssText, "application/xml");

        const firstItem = xml.querySelector("item");

        if (!firstItem) {
            throw new Error("Nenhum item encontrado no RSS.");
        }

        const title = firstItem.querySelector("title").textContent;
        document.querySelector(".title h4").textContent = title;

        const image = firstItem.querySelector("media\\:content, content")?.getAttribute("url");
        if (image) {
            document.querySelector(".background-image").style.content = `url(${image})`;
        } else {
            console.warn("Nenhuma imagem encontrada no RSS.");
        }

        // Limitar o resumo ao primeiro trecho de texto antes de truncar
        let description = firstItem.querySelector("description").textContent;
        description = description.replace(/<[^>]*>/g, '').trim(); // Remove tags HTML

        // Limita o tamanho do texto
        if (description.length > 200) {
            description = description.substring(0, 200) + '...'; // Resumo do conteúdo
        }
        
        document.querySelector(".moving-text").textContent = description;

    } catch (error) {
        console.error("Erro ao buscar o RSS:", error);
    }
}

fetchRSS();
