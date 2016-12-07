import _ from 'lodash';

/**
 * @class EmojiSpeaking
 */
class EmojiSpeaking {
    /**
     * @constructor
     */
    constructor () {
        console.log('Running');

        this.transcript = "";
        this.recognition = new webkitSpeechRecognition();
        this.recognition.interimResults = true;
        this.recognition.onstart = function(event){
            console.log('onStart', event);
        };
        this.recognition.onresult = function (event) {
            console.log('boom', event.results[0][0].transcript);
            this.transcript = event.results[0][0].transcript;
        };
        this.recognition.onerror = function(event) {
            console.log("Fuck", event);
        };
    }

    /**
     *
     */
    start () {
        this.recognition.start();
    }

    /**
     *
     * @param text {string}
     */
    printToPage (text) {

    }
}

class Page {
    contructor () {
        this.template = _.template('<div><&= text &></div>');
    }
}


var app = new EmojiSpeaking();
app.start();
