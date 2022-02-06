import * as SQLite from "expo-sqlite";

//acesses the database with selected name or create it if it not exists
const db = SQLite.openDatabase('places.db');

export const init = () => {
    //query syntax
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, adress TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)',
                [],
                //the third argument is success function
                //the first argument in both these functions is the query itself
                ( ) => {
                    resolve();
                },
                //the fourth argument is the error function
                (_, err) => {
                    reject(err);
                })
            });
    });

    return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
                tx.executeSql('INSERT INTO places (title, imageUri, adress, lat, lng) VALUES (?,?,?,?,?)',
                [title, imageUri, address, lat, lng],
                (_, result ) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                })
            });
    });

    return promise;
};

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
                tx.executeSql('SELECT * FROM places',
                [],
                (_, result ) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                })
            });
    });

    return promise;
};

export const deletePlace = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
                tx.executeSql('DELETE FROM places WHERE id=?',
                [id],
                (_, result ) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                })
            });
    });

    return promise;
};