import _ from 'lodash';
import emoji from './emoji';

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
            // console.log('onStart', event);
        };
        this.recognition.onresult = function (event) {
            // console.log('Transcript', event.results[0][0].transcript);
            this.transcript = event.results[0][0].transcript;

            console.log(event.results[0].isFinal);

            if(event.results[0].isFinal) {
                var event = new CustomEvent("transcript", {
                    detail: {
                        transcript: this.transcript,
                        result: event
                    }
                });

                document.dispatchEvent(event);
            }
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
        const transcript = event.detail.transcript;

        if(_.isString(transcript) && !_.isUndefined(transcript)) {

            // first split the transcript up into an array spliting spaces.
            const transcriptArray = transcript.split(/\W/);
            var translatedArray = [];

            console.log(emoji.grinning.char);

             // them we go through each transcript word and match up emoji's (to many)
             _.forEach(transcriptArray, function (transcriptWord, index) {
                 // we format the word
                 const formattedWord = transcriptWord.toLowerCase();

                 // we filter matching emoji's
                 const potentials = _.filter(emoji, function potentialsFinder(e) {
                     if(!_.isUndefined(e.keywords)) {
                         return Boolean(e.keywords.indexOf(formattedWord) > -1) ? true : false;
                     }
                 });

                 console.log('potentials', potentials, potentials.length, index, transcriptWord);

                 translatedArray[index] = potentials;

                 if (potentials.length === 0) {
                     translatedArray[index] = transcriptWord;
                 } else if (potentials.length === 1) {
                     translatedArray[index] = potentials[0].char;
                 } else if (potentials.length > 1) {

                     var itemToChoose = _.random(potentials.length);

                     translatedArray[index] = potentials[itemToChoose].char
                 }



                 // transcriptArray[index] =
//

             });

             // if many random that

             // replace

             // reconstruct

            console.log('translatedArray', translatedArray);

        }
    }

    constructor () {
        document.addEventListener("transcript", function(event) {
            console.log('TranslateToEmoji: ', event.detail.transcript);
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
