/* eslint-disable */

class LangService {
    translate(key) {
        return key;
    }
}

function init() {
    const langService = new LangService();

    langService.translate('test');
    langService.translate('another.test');
    langService.translate('message_1');
}

init();
