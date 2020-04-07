import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/components/WishList.css';

const WishList = () => {
  const { wishList } = useSelector((state) => state);
  return (
    <div className="list-wishlist">
      {wishList.items.sort((a, b) => {
        if (a.listName > b.listName) {
          return 1;
        }
        if (a.listName < b.listName) {
          return -1;
        }
        return 0;
      }).reduce((accumulator, currentElement) => {
        const index = accumulator
          .map((e, i) => (e[0].listName === currentElement.listName ? i : -1))
          .filter((e) => e > -1).pop();
        if (index === undefined) {
          return [...accumulator, [currentElement]];
        }
        return [...accumulator, [accumulator[index].push(currentElement)]];
      }, [])
        .map((e) => (
          e[0].id && (
            <div>
              <h1>{`--------${e[0].listName}--------`}</h1>
              {e.map((i) => (
                <div>
                  <h1>{i.id}</h1>
                </div>
              ))}
            </div>
          )
        ))}
    </div>
  );
};

export default WishList;
