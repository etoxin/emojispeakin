import _ from 'lodash';

/**
 * @class EmojiSpeaking
 */
class EmojiSpeaking {
    /**
     * @constructor
     */
    constructor () {

        // todo: no api, soz, not soz.

        this.transcript = "";
        this.recognition = new webkitSpeechRecognition();
        this.recognition.interimResults = true;
        this.recognition.onstart = function(event){
            console.log('onStart', event);
        };
        this.recognition.onresult = function (event) {
            console.log('Transcript', event.results[0][0].transcript);
            this.transcript = event.results[0][0].transcript;

            var event = new CustomEvent("transcript", {
                detail: {
                    transcript: this.transcript,
                    result: event
                }
            });

            document.dispatchEvent(event);
        };
        this.recognition.onerror = function(event) {
            console.log("Fuck", event);
        };
    }

    /**
     * Start
     */
    start () {
        this.recognition.start();
    }

    error() {
        // todo: print to page
    };
}

class TranslateToEmoji {
    translate (event) {
        var transcript = event.detail.transcript;

        console.log(123);
        if(_.isString(transcript)) {

            // first split the transcript up into an array spliting spaces.
            var transcriptArray = transcript.spilt(" ");

            // them we go through each item and match up emoji's (to many)

            // if many random that

            // replace

            // reconstruct

            console.log(transcriptArray);

        } else {
            this.error();
        }
    }

    constructor () {
        document.addEventListener("transcript", function(event) {
            console.log('TranslateToEmoji', event.detail.transcript);
        });
        document.addEventListener("transcript", this.translate);
    }
}

class Page {
    contructor () {
        this.template = _.template('<div><&= text &></div>');
    }
}


var app = new EmojiSpeaking();
var emojiTranslate = new TranslateToEmoji();
app.start();
