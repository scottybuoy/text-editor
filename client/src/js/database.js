import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    // Add database schema if not already initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create new object store for data and give it 'id' keyname, which increments automatically
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// PUT to database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ value: content });
  const result = await request;
  console.log('result.value', result);

};

// Get all conent from database
export const getDb = async () => {
  console.log('GET all from database');

  // create connection to database and version we want to use
  const jateDb = await openDB('jate', 1);

  // create new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // open desired object store
  const store = tx.objectStore('jate');

  // get all data in database
  const request = store.getAll();

  // get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};


initdb();
