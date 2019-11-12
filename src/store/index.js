import Vue from 'vue'
import Vuex from 'vuex'
import Papa from 'papaparse'

Vue.use(Vuex)

const SET_CHARACTERS = 'SET_CHARACTERS'
export const FETCH_CHARACTERS = 'FETCH_CHARACTERS'
export const CHARACTERS = 'CHARACTERS'
export const GET_CHARACTER = 'GET_CHARACTER'
export const GET_PREVIOUS_CHARACTER = 'GET_PREVIOUS_CHARACTER'
export const GET_NEXT_CHARACTER = 'GET_NEXT_CHARACTER'

const CSV_FILE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR13t6gXETiVhnQPOcCOfnfLufMq55Lna0Gxv7KwFxoZw3nD1v0CsapdzTkyBSDU9Q8afPY49evhqqE/pub?output=csv'

const computeRawData = (rawData) => {
  rawData.shift()
  return rawData.map((line, index) => ({
    id: line[16],
    index: index + 1,
    name: line[15],
    strength: line[3],
    weakness: line[4],
    description: line[8],
    weight: line[9],
    dash: line[10],
    airSpeed: line[11],
    gravity: line[12],
    jump: line[13]
  }))
}

export default new Vuex.Store({
  state: {
    characters: []
  },
  mutations: {
    [SET_CHARACTERS] (state, characters) {
      state.characters = Object.freeze(characters)
    }
  },
  getters: {
    [GET_CHARACTER]: state => id => {
      return state.characters.find(user => user.id === id)
    },
    [GET_NEXT_CHARACTER]: state => id => {
      const index = state.characters.findIndex(user => user.id === id)
      return state.characters[(index + 1) % state.characters.length]
    },
    [GET_PREVIOUS_CHARACTER]: state => id => {
      const index = state.characters.findIndex(user => user.id === id)
      const { length } = state.characters
      return state.characters[(length + index - 1) % length]
    },
    [CHARACTERS] (state) {
      return state.characters
    }
  },
  actions: {
    [FETCH_CHARACTERS] ({ commit }) {
      const onComplete = (result) => {
        const characters = computeRawData(result.data)
        commit(SET_CHARACTERS, characters)
      }
      Papa.parse(CSV_FILE_URL, {
        download: true,
        complete: onComplete
      })
    }
  }
})
