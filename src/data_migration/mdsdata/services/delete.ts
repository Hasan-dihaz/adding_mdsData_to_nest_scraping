const mySqlTables = ['mkistat', 'idx', 'man', 'trd'];

mySqlTables.forEach(async (element) => {
  if (
    element == 'mkistat' ||
    element == 'idx' ||
    element == 'man' ||
    element == 'trd'
  ) {
    const table = element;
    let model;

    try {
      if (table == 'idx') {
        model = this.idxModel;
      } else if (table == 'man') {
        model = this.manModel;
      } else if (table == 'mkistat') {
        model = this.mkistatModel;
      } else if (table == 'trd') {
        model = this.trdModel;
      } else {
        throw new Error('No model found');
      }
      const [rows, fields] = connection.execute(`SELECT * FROM ${table}`);

      rows.then(async (results) => {
        if (Object.keys(results).length != 0) {
          //Object.keys(results)... converts the result into an array....since...length is a method of array.

          console.time(`Writing_Time_to..${table}`);
          try {
            await model.insertMany(results, {
              ordered: false,
            });
          } catch (error) {
            console.log('Error');
          }
          console.timeEnd(`Writing_Time_to..${table}`);
        } else {
          console.log('Task Completed...For', table);
        }
      });
    } catch (error) {
      console.log('got Error');
    }
  }
});
