import GameSavingLoader from '../src/js/main';
import readGameSaving from '../src/js/readGameSaving';


jest.mock('../src/js/readGameSaving.js');

beforeEach(() => {
  jest.resetAllMocks();
});

test('Промис возвращается', async () => {
  const expected = {
    id: 9,
    created: 1546300800,
    userInfo: {
      id: 1, name: 'Hitman', level: 10, points: 2000,
    },
  };
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
      return ((input) => {
        const buffer = new ArrayBuffer(input.length * 2);
        const bufferView = new Uint16Array(buffer);
        for (let i = 0; i < input.length; i += 1) {
          bufferView[i] = input.charCodeAt(i);
        }
        resolve(buffer);
      })(data);
    }, 500);
  });
  readGameSaving.mockReturnValue(promise);
  const gameSavingLoader = new GameSavingLoader();
  const load = gameSavingLoader.load();
  return load.then((result) => {
    expect(result).toEqual(expected);
  });
});


test('Ошибка', async () => {
  const expected = 'Что-то пошло не так';
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
      return ((input) => {
        const buffer = new ArrayBuffer(input.length * 2);
        const bufferView = new Uint16Array(buffer);
        for (let i = 0; i < input.length; i += 1) {
          bufferView[i] = input.charCodeAt(i);
        }
        resolve(buffer);
      })(data);
    }, 500);
  });
  readGameSaving.mockReturnValue(promise);
  const gameSavingLoader = new GameSavingLoader();
  const load = gameSavingLoader.load();
  return load.catch((result) => {
    expect(result).toEqual(expected);
  });
});
