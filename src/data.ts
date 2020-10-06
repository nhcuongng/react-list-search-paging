/**
 * Tao ra id ngau nhien
 * @param length
 *
 * @src https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */
export function makeId(length: number = 10) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export type TList = {
  id: string,
  name: string,
  role: string,
  title: string,
}[]

const MyStaff = ['Cường', 'Dũng', 'Hưng', 'Neo', 'Hùng', 'Tân', 'Đông', 'Hoan']

export const genListFake = (function () {
  const length = 100;
  const temp: TList = []
  for (let index = 0; index < (length / 2); index++) {
    // const _tmp = `${MyStaff[Math.floor(Math.random() * MyStaff.length)]} ${index + 1}`
    const _tmp = `Cuong ${index + 1}`
    temp.push({
      id: makeId(10),
      title: _tmp,
      name: _tmp,
      role: 'Developer',
    })
  }
  for (let index = 0; index < (length / 2); index++) {
    // const _tmp = `${MyStaff[Math.floor(Math.random() * MyStaff.length)]} ${index + 1}`
    const _tmp = `Neo ${index + 1}`
    temp.push({
      id: makeId(10),
      title: _tmp,
      name: _tmp,
      role: 'Developer',
    })
  }
  return temp;
}());