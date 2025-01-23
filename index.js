const movingText = document.querySelector('.moving-text');

const textWidth = movingText.scrollWidth;
const containerWidth = movingText.parentElement.offsetWidth;

const urlParams = new URLSearchParams(window.location.search);
const categoryNotice = urlParams.get('categoria') || "economia";
const id = parseInt(urlParams.get('id')) || 0;

async function fetchRSS() {
    try {
        const response = await fetch(`https://corsproxy.io/https://g1.globo.com/dynamo/${categoryNotice}/rss2.xml`);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const rssText = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(rssText, "application/xml");

        const items = xml.querySelectorAll("item");

        if (id < 0 || id >= items.length) {
            throw new Error(`Nenhum item encontrado no índice ${id}.`);
        }

        const selectedItem = items[id];

        const title = selectedItem.querySelector("title").textContent;
        document.querySelector(".title h4").textContent = title;

        const image = selectedItem.querySelector("media\\:content, content")?.getAttribute("url");
        if (image) {
            document.querySelector(".background-image").style.content = `url(${image})`;
        } else {
            console.warn("Nenhuma imagem encontrada no RSS.");
        }

        let description = selectedItem.querySelector("description").textContent;
        description = description.replace(/<[^>]*>/g, '').trim(); 

        if (description.length > 200) {
            description = description.substring(0, 200) + '...'; 
        }
        document.querySelector(".moving-text").textContent = description;

    } catch (error) {
        console.error("Erro ao buscar o RSS:", error);
    }
}

fetchRSS();
