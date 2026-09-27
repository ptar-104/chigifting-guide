import { TagsApi } from './tags-api.js';

const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = new URL('./tag.css', import.meta.url);
document.head.append(stylesheet);

const templateResponse = await fetch(new URL('./tag.html', import.meta.url));
if (!templateResponse.ok) {
	throw new Error(`Network response was not ok: ${templateResponse.status}`);
}

const templateDocument = new DOMParser().parseFromString(await templateResponse.text(), 'text/html');
const tagTemplate = templateDocument.getElementById('tag-template');

class GiftTag extends HTMLElement {
	set tag(name) {
		const content = tagTemplate.content.cloneNode(true);
		const bubble = content.querySelector('[data-tag-name]');
		bubble.textContent = name;
		const listUrl = new URL('/list/', window.location.origin);
		listUrl.searchParams.set('tags', name);
		bubble.href = listUrl;
		this.replaceChildren(content);
		this.setBackgroundColor(name, bubble);
	}

	async setBackgroundColor(name, bubble) {
		try {
			const tagsApi = await TagsApi.get();
			bubble.style.backgroundColor = tagsApi.getTagByName(name).backgroundColor;
		} catch (error) {
			if (error.message !== 'Tag not found!') {
				console.error('There was a problem loading tag metadata:', error);
			}
		}
	}
}

customElements.define('gift-tag', GiftTag);