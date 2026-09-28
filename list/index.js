import { GiftApi } from '../giftdata/gift-api.js';
import './gift-card.js';
import '../tags/tag.js';

const urlParams = new URLSearchParams(window.location.search);
const tags = urlParams.getAll('tags')
    .flatMap(value => value.split(','))
    .map(tag => tag.trim())
    .filter(Boolean);

const tagBubbles = document.getElementById('tag-bubbles');
for (const name of tags) {
    const tagBubble = document.createElement('gift-tag');
    tagBubble.tag = name;
    tagBubbles.append(tagBubble);
}

try {
    const giftApi = await GiftApi.get();
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

// TODOs:
//  Add the ability to add new tags to the filter bar
//  Derived tags (i.e. under $20)
//  Add the ability to remove tags from the filter bar
//  Responsive UI - make sure things work on a small screen by reorienting
//  General UI improvements with Jacqueline
//  Picture 404 checking
//  Pre-build validation of gift and tag data.