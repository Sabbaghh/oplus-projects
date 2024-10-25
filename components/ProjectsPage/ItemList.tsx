'use client';
import React from 'react';
function ItemList({ query }: any) {
  console.log(query);
  return (
    <div>
      {query.type ? query.type.toString() : ''}
      {query.search ? query.search.toString() : ''}
    </div>
  );
}

export default ItemList;
