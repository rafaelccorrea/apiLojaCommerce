  const toCents = (price) => {
    return parseInt(price.toString().replace('.'),''.replace(',', ''));
  }


export {toCents}
