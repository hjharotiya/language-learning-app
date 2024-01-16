import axios from "axios";
import _, { words } from "lodash";
import { generate } from "random-words";

const generateMCQ = (
  meaning: {
    Text: string;
  }[],
  idx: number
): string[] => {
  const correctAns: string = meaning[idx].Text;

  const allMeaningExpectForCorrect = meaning.filter(
    (i) => i.Text !== correctAns
  );

  const incorrectOptions: string[] = _.sampleSize(
    allMeaningExpectForCorrect,
    3
  ).map((i) => i.Text);

  const mcqOptions = _.shuffle([...incorrectOptions, correctAns]);

  return mcqOptions;
};

export const translateWords = async (params: LangType): Promise<WordType[]> => {
  try {
    const words = generate(8).map((i) => ({
      Text: i,
    }));

    const apikey = await import.meta.env.VITE_MICROSFT_KEY;

    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": apikey,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );

    const recive: FetchedDataType[] = response.data;
    const arr: WordType[] = recive.map((i, idx) => {
      const options: string[] = generateMCQ(words, idx);
      return {
        word: i.translations[0].text,
        meaning: words[idx].Text,
        options,
      };
    });
    return arr;
  } catch (error) {
    console.log(error);
    throw new Error("Some thing wen Wrong");
  }
};

export const countMatchingElements = (
  arr1: string[],
  arr2: string[]
): number => {
  if (arr1.length !== arr2.length) throw new Error("Arrays are not equal");
  let matchedCount = 0;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) matchedCount++;
  }
  return matchedCount;
};

export const fetchAudio = async (
  text: string,
  language: LangType
): Promise<string> => {
  const key = import.meta.env.VITE_TEXT_TO_SPEECH_API;
  const rapidkey = import.meta.env.VITE_RAPID_API;

  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true",
  });

  // encodedParams.set("src", text);
  // encodedParams.set("hl", "en-us");
  // encodedParams.set("r", "0");
  // encodedParams.set("c", "mp3");
  // encodedParams.set("f", "8khz_8bit_mono");

  if (language === "ja") encodedParams.set("h1", "ja-jp");
  else if (language === "es") encodedParams.set("h1", "es-es");
  else if (language === "hi") encodedParams.set("h1", "hi-in");
  else encodedParams.set("h1", "fr-fr");

  const { data }: { data: string } = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: { key: "b72941a4ff374df68e5ffbf942b39f49" },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "d177efb50fmsh00cc3f04255613bp10eb7ajsne982c7748576",
        "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
      },
    }
  );
  return data;
};
