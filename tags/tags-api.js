let tagsApiInstance;
let tagsApiCreation;

export class TagsApi {
    constructor(tagData) {
        this.tagData = tagData;
    }

    static get() {
        if (tagsApiInstance) {
            return Promise.resolve(tagsApiInstance);
        }
        if (!tagsApiCreation) {
            tagsApiCreation = TagsApi.parseTagsJson()
                .then(tagData => {
                    tagsApiInstance = new TagsApi(tagData);
                    return tagsApiInstance;
                })
                .finally(() => {
                    tagsApiCreation = undefined;
                });
        }
        return tagsApiCreation;
    }

    static async parseTagsJson() {
        try {
            const response = await fetch(new URL('./tags-data.json', import.meta.url));
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem reading the tags JSON file:', error);
            throw new Error('Error parsing tags JSON file!');
        }
    }

    getTagByName(name) {
        const tag = this.tagData.find(tag => tag.name === name);
        if (tag) {
            return tag;
        }
        throw new Error('Tag not found!');
    }
}