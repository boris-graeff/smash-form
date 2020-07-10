import Vue from 'vue'
import Vuex from 'vuex'
import Papa from 'papaparse'
import data from './data.txt'

Vue.use(Vuex)

export const SET_CHARACTERS = 'SET_CHARACTERS'
export const FETCH_CHARACTERS = 'FETCH_CHARACTERS'
export const CHARACTERS = 'CHARACTERS'
export const GET_CHARACTER = 'GET_CHARACTER'
export const GET_PREVIOUS_CHARACTER = 'GET_PREVIOUS_CHARACTER'
export const GET_NEXT_CHARACTER = 'GET_NEXT_CHARACTER'

const CSV_FILE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR13t6gXETiVhnQPOcCOfnfLufMq55Lna0Gxv7KwFxoZw3nD1v0CsapdzTkyBSDU9Q8afPY49evhqqE/pub?output=csv'

const computeRawData = rawData => {
  rawData.shift()

  return rawData.map((line, index) => ({
    id: line[23],
    index: index + 1,
    name: line[22],
    imageId: line[24],
    strength: line[4],
    weakness: line[5],
    feeling: line[13],
    description: line[2],
    weight: line[16],
    dash: line[17],
    runSpeed: line[18],
    airSpeed: line[19],
    gravity: line[20],
    jump: line[21]
  }))
}

const store = new Vuex.Store({
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

const onComplete = (result) => {
  const characters = computeRawData(result.data)
  store.commit(SET_CHARACTERS, characters)
}

Papa.parse(data, {
  complete: onComplete
})

export default store
