// PICK UNIQUE SIZES FROM STOCK
export const uniqueSizes = (stockProps, itemName) => {
  let arr = stockProps.map((i) =>
    i.item_name === itemName ? i.item_size : null,
  );
  let filtered = arr.filter((i) => i != null);
  let unArr = [...new Set(filtered)];
  return unArr;
};

// FOR TOTAL ITEM QUANTITY
export const totalQnt = (stockProps, itemName, itemSize) => {
  let arr = stockProps.map((i) =>
    i.item_name === itemName && i.item_size === itemSize ? i.quantity : null,
  );
  let filtered = arr.filter((i) => i != null);
  const total = (tlt, nm) => tlt + nm;
  return filtered.reduce(total, 0);
};
