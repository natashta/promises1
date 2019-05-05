import readGameSaving from './readGameSaving';

class GameSavingData {
  constructor(data) {
    this.data = data;
  }

  json() {
    return new Promise((resolve, reject) => {
      // эмуляция обработки ArrayBuffer
      setTimeout(() => {
        resolve(String.fromCharCode.apply(null, new Uint16Array(this.data)));
      }, 1000);
    });
  }
}

export default class GameSavingLoader {
  static load() {
    return readGameSaving()
      .then(data => new GameSavingData(data))
      .then(data => data.json())
      .catch(err => new Error(err));
  }
}
