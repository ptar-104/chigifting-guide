import { GiftApi } from '../giftdata/gift-api.js';
import './gift-card.js';

const urlParams = new URLSearchParams(window.location.search);
const tags = urlParams.getAll('tags')
    .flatMap(value => value.split(','))
    .map(tag => tag.trim())
    .filter(Boolean);

try {
    const giftApi = await GiftApi.create();
    const gifts = giftApi.getGiftsByTags(tags);
    const giftsContainer = document.getElementById('gifts');

    for (const gift of gifts) {
        const giftCard = document.createElement('gift-card');
        giftCard.gift = gift;
        giftsContainer.append(giftCard);
    }
} catch (error) {
    console.error('Error listing gifts:', error);
}