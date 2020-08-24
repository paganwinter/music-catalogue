// const fs = require('fs')

// const baseDir = 'E:/MEDIA/MUSIC/ENGLISH/SINGLES'
// let outer = fs.readdirSync(baseDir)

// function isDir(path) {
//   return fs.lstatSync(path).isDirectory()
// }

// console.log(outer)
// for (let otr of outer) {
//   if (isDir(baseDir + '/' + otr)) {
//     console.log(`"${otr}",""`)
//     let inner = fs.readdirSync(baseDir + '/' + otr)
//     for (let inr of inner) {
//       // if (isDir(baseDir + '/' + otr + '/' + inr)) {
//       //   console.log(`"","${inr}"`)
//       // }
//       console.log(`"","${inr}"`)
//     }
//   } else {
//     console.log(otr)
//   }
// }

/////////////////////////////////////

// const dirTree = require('directory-tree');
// const tree = dirTree('C:/VAID/MEDIA/MUSIC');
// console.log(JSON.stringify(tree, 0, 2))

///////////////////////////////////

// const Handlebars = require('handlebars')
// const albums = fs.readdirSync('')
// let data = { albums }
// const source = fs.readFileSync('./index.tpl.html', 'utf-8');
// const template = Handlebars.compile(source);
// const result = template(data);
// fs.writeFileSync('./index.html', result);

//////////////////////////////////////

const fs = require('fs')
const path = require('path');

// const walk_ = function(dir, done) {
//   var results = [];
//   fs.readdir(dir, function(err, list) {
//     if (err) return done(err);
//     var pending = list.length;
//     if (!pending) return done(null, results);
//     list.forEach(function(file) {
//       file = path.resolve(dir, file);
//       fs.stat(file, function(err, stat) {
//         if (stat && stat.isDirectory()) {
//           walk(file, function(err, res) {
//             results = results.concat(res);
//             if (!--pending) done(null, results);
//           });
//         } else {
//           results.push(file);
//           if (!--pending) done(null, results);
//         }
//       });
//     });
//   });
// };
// walk_('C:/VAID/MEDIA/MUSIC', function(err, results) {
//   if (err) throw err;
//   console.log(results);
// });


const baseDir = 'C:/VAID/MEDIA/MUSIC'
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
