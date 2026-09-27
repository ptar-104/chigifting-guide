// Contains all the various means of getting/listing gifts by id or tags
export class GiftApi {

    // Recommended to use the create function
    constructor(giftData) {
        this.giftData = giftData;
    }

    static async create() {
        const giftData = await GiftApi.parseGiftJson();
        return new GiftApi(giftData);
    }

    // Parses the json into a local file. I... likely want to do this
    // every time, but I can see not in certain circumstances. Can we
    // have this be static throughout the entire webpage? Probably not
    // without a framework. Defintely want to seperate the images tho.
    static async parseGiftJson() {
        try {
            const response = await fetch(new URL('./data.json', import.meta.url));
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem reading the JSON file:', error);
            throw new Error('Error parsing JSON file!');
        }
    }

    // Perhaps a map would be better?
    getGiftById(giftId) {
        for (const gift of this.giftData) {
            if (gift.id == giftId) {
                return gift;
            }
        }
        throw new Error('Gift not found!');
    }

    getGiftsByTags(tags) {
        const requestedTags = new Set(tags);
        if (requestedTags.size === 0) {
            return [];
        }
        return this.giftData.filter(gift =>
            [...requestedTags].every(tag => gift.tags.includes(tag))
        );
    }

}