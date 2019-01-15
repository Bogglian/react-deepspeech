
const Fs = require("fs");
const Sox = require("sox-stream");
const DeepSpeech = require("deepspeech");
const MemoryStream = require("memory-stream");
const Wav = require("node-wav");
const Duplex = require("stream").Duplex;
const util = require("util");

module.exports = function(audio) {
  // These constants control the beam search decoder

  // Beam width used in the CTC decoder when building candidate transcriptions
  const BEAM_WIDTH = 500;

  // The alpha hyperparameter of the CTC decoder. Language Model weight
  const LM_ALPHA = 0.75;

  // The beta hyperparameter of the CTC decoder. Word insertion bonus.
  const LM_BETA = 1.85;

  // These constants are tied to the shape of the graph used (changing them changes
  // the geometry of the first layer), so make sure you use the same constants that
  // were used during training

  // Number of MFCC features to use
  const N_FEATURES = 26;

  // Size of the context window used for producing timesteps in the input vector
  const N_CONTEXT = 9;

  // for DeepSpeech Model in src/models
  const MODEL = "./models/output_graph.pb";
  const ALPHABET = "./models/alphabet.txt";
  const LM = "./models/lm.binary";
  const TRIE = "./models/trie";
  //경로바꿔야함
  const AUDIO = `${audio}`;

  function totalTime(hrtimeValue) {
    return (hrtimeValue[0] + hrtimeValue[1] / 1000000000).toPrecision(4);
  }

  const buffer = Fs.readFileSync(AUDIO);
  const result = Wav.decode(buffer);

  if (result.sampleRate < 16000) {
    console.error(
      "Warning: original sample rate (" +
        result.sampleRate +
        ") is lower than 16kHz. Up-sampling might produce erratic speech recognition."
    );
  }

  function bufferToStream(buffer) {
    let stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  let audioStream = new MemoryStream();
  bufferToStream(buffer)
    .pipe(
      Sox({
        global: {
          "no-dither": true
        },
        output: {
          bits: 16,
          rate: 16000,
          channels: 1,
          encoding: "signed-integer",
          endian: "little",
          compression: 0.0,
          type: "raw"
        }
      })
    )
    .pipe(audioStream);

  audioStream.on("finish", () => {
    let audioBuffer = audioStream.toBuffer();

    console.error("Loading model from file %s", MODEL);
    const model_load_start = process.hrtime();
    let model = new DeepSpeech.Model(
      MODEL,
      N_FEATURES,
      N_CONTEXT,
      ALPHABET,
      BEAM_WIDTH
    );
    const model_load_end = process.hrtime(model_load_start);
    console.error("Loaded model in %ds.", totalTime(model_load_end));

    if (LM && TRIE) {
      console.error("Loading language model from files %s %s", LM, TRIE);
      const lm_load_start = process.hrtime();
      model.enableDecoderWithLM(ALPHABET, LM, TRIE, LM_ALPHA, LM_BETA);
      const lm_load_end = process.hrtime(lm_load_start);
      console.error("Loaded language model in %ds.", totalTime(lm_load_end));
    }

    const inference_start = process.hrtime();
    console.error("Running inference.");
    const audioLength = (audioBuffer.length / 2) * (1 / 16000);

    // We take half of the buffer_size because buffer is a char* while
    // LocalDsSTT() expected a short*

    let result = model.stt(audioBuffer.slice(0, audioBuffer.length / 2), 16000);
    console.log(result);
    const inference_stop = process.hrtime(inference_start);
    console.error(
      "Inference took %ds for %ds audio file.",
      totalTime(inference_stop),
      audioLength.toPrecision(4)
    );
    return result;
  });
};