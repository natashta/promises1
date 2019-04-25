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
  load() {
    return new Promise((resolve, reject) => {
      const data = readGameSaving();
      data.then((buffer) => {
        const gameSavingData = new GameSavingData(buffer);
        const str = gameSavingData.json();
        return (str);
      }).then((st) => {
        resolve(JSON.parse(st));
      }).catch(() => reject('Что-то пошло не так'));
    });
  }
}
