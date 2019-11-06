import Vue from 'vue';
import Vuex from 'vuex';
import Papa from 'papaparse';

Vue.use(Vuex);

const SET_CHARACTERS = 'SET_CHARACTERS';
export const FETCH_CHARACTERS = 'FETCH_CHARACTERS';

const CSV_FILE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQlgMlWtSs8Iehul_TIyqsrSC27V4obzO8ZEEnW9iLxQi6w6hq593lHGSIsIp-akNETmuGfFZpL9M81/pub?output=csv';

const computeRawData = (rawData) => {
  rawData.shift();
  return rawData.map(line => ({
    name: line[1],
    weight: line[9],
    dash: line[10],
    airSpeed: line[11],
    gravity: line[12],
    jump: line[13],
  }));
};

export default new Vuex.Store({
  state: {
    characters: [],
  },
  mutations: {
    [SET_CHARACTERS](state, characters) {
      state.characters = Object.freeze(characters);
      console.log(state.characters);
    },
  },
  actions: {
    [FETCH_CHARACTERS]({ commit }) {
      const onComplete = (result) => {
        console.log(result);
        const characters = computeRawData(result.data);
        commit(SET_CHARACTERS, characters);
      };
      Papa.parse(CSV_FILE_URL, {
        download: true,
        complete: onComplete,
      });
    },
  },
});
