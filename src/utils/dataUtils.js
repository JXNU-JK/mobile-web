import privityResultScore from '../../static/js/result-js/privity-result-score.js'
import charmResultScore from '../../static/js/result-js/charm-result-score.js'
import safeResultScore from '../../static/js/result-js/safe-result-score.js'
import anxietyResultScore from '../../static/js/result-js/anxiety-result-score.js'

function rnd (n, m) {
  var random = Math.floor(Math.random() * (m - n) + n)
  return random
}

export function getResultData (type, score) {
  switch (type) {
    case 'privity':
      for (var i = 0; i < privityResultScore.length; i++) {
        if (score <= privityResultScore[i].score) {
          break
        }
      }
      return privityResultScore[i]
    case 'charm':
      for (var i = 0; i < charmResultScore.length; i++) {
        if (score <= privityResultScore[i].score) {
          break
        }
      }
      return charmResultScore[i]
    case 'safe':
      for (var i = 0; i < safeResultScore.length; i++) {
        if (score <= safeResultScore[i].score) {
          break
        }
      }
      return safeResultScore[i]
    case 'anxiety':
      for (var i = 0; i < anxietyResultScore.length; i++) {
        if (score <= anxietyResultScore[i].score) {
          break
        }
      }
      return anxietyResultScore[i]
    default:
      return ''
  }
}
