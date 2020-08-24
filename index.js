/////////////////////////////////////

// const dirTree = require('directory-tree');
// const tree = dirTree('C:/VAID/MEDIA/MUSIC');
// console.log(JSON.stringify(tree, 0, 2))

///////////////////////////////////

const fs = require('fs')
const path = require('path')

const baseDir = process.argv[2]
function isDir(path) {
  return fs.lstatSync(path).isDirectory()
}

function walk(dir, dat) {
  // let list = fs.readdirSync(dir)
  //   .map(itm => {
  //     return {
  //       name: itm,
  //       isDir: fs.lstatSync(`${dir}/${itm}`).isDirectory(),
  //     };
  //   })
  //   .sort((a, b) => b.isDir - a.isDir || a.name > b.name ? 1 : -1)
  //   .map(i => i.name)

  let list = fs.readdirSync(dir)

  for (let item of list) {
    if (isDir(`${dir}/${item}`)) {
      let innerNodes = []
      let folder = {
        text: item,
        nodes: innerNodes,
        backColor: '#eee',
        state: {
          expanded: false,
        },
      }
      dat.push(folder)
      walk(dir + '/' + item, innerNodes)
    } else {
      let file = {
        text: item,
      }
      dat.push(file)
    }
  }
}

let data = []
walk(baseDir, data)
console.log(JSON.stringify(data, 0, 2))
fs.writeFileSync('./data.js', 'let data = ' + JSON.stringify(data, 0, 2))
