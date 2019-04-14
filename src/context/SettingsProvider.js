import React, { useState } from 'react';
import SettingsContext from './SettingsContext';

const storage = {
  getItem(key) {
    if (localStorage) {
      return localStorage.getItem(key);
    }
  },
  setItem(key, value) {
    if (localStorage) {
      return localStorage.setItem(key, value);
    }
  },
};


const SettingsProvider = (props) => {
    const tableData  = JSON.parse(storage.getItem('items')) || [];
    const [items, setItems] = useState(tableData);


    const addItem = (item) => {
        let newItems = [...items];
        const sameIdIndex = newItems.findIndex((v) => v.id === item.id);

        if (sameIdIndex !== -1) {
            newItems[sameIdIndex] = item;
        } else {
            newItems.push(item);
        }

        setItems(newItems);
        storage.setItem('items', JSON.stringify(newItems));
    }

    const deleteItem = (item) => {
        const newData = tableData.filter((article) => item.id !== article.id);

        setItems(newData);
        storage.setItem('items', JSON.stringify(newData));
    }

    return (
        <SettingsContext.Provider value={{
            items,
            addItem,
            tableData,
            deleteItem
        }}>
            {props.children}
        </SettingsContext.Provider>
  );
};
export default SettingsProvider;