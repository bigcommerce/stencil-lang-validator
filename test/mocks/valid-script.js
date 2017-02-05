/* eslint-disable */

class LangService {
    translate(key) {
        return key;
    }
}

function init() {
    const langService = new LangService();

    langService.translate('top_level_message_1');
    langService.translate('nested.message_1');
    langService.translate('nested.message_2');
}

init();
