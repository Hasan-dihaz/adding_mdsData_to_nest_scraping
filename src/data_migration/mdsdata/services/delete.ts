// export class LastDataService {

//  recursivePromise(n) {
//   return new Promise((resolve, reject) => {
//     if (n <= 0) {
//       reject('Invalid argument');
//     } else if (n === 1) {
//       resolve(1);
//     } else {
//       this.recursivePromise(n - 1)
//         .then((result) => resolve(n * result))
//         .catch((err) => reject(err));
//     }
//   });
// }

// recursivePromise(10);

// }
