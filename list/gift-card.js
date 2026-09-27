const templateResponse = await fetch(new URL('./gift-card.html', import.meta.url));
if (!templateResponse.ok) {
    throw new Error(`Network response was not ok: ${templateResponse.status}`);
}

const templateDocument = new DOMParser().parseFromString(await templateResponse.text(), 'text/html');
const giftCardTemplate = templateDocument.getElementById('gift-card-template');
const withUrlScheme = link => /^[a-z][a-z\d+.-]*:/i.test(link)
    ? link
    : `https://${link}`;
const priceFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2
});

class GiftCard extends HTMLElement {
    set gift(gift) {
        const content = giftCardTemplate.content.cloneNode(true);
        const image = content.querySelector('[data-gift-image]');
        image.src = gift.imageLink;
        image.alt = gift.name;

        const nameLink = content.querySelector('[data-gift-name]');
        nameLink.textContent = gift.name;
        nameLink.href = withUrlScheme(gift.purchaseLink);

        const artistLink = content.querySelector('[data-gift-artist]');
        artistLink.textContent = gift.artist;
        artistLink.href = withUrlScheme(gift.artistLink);

        content.querySelector('[data-gift-price]').textContent = `$ ${priceFormatter.format(gift.price)}`;

        this.classList.add('gift-card');
        this.setAttribute('role', 'article');
        this.replaceChildren(content);
    }
}

customElements.define('gift-card', GiftCard);