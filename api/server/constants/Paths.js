const paths = {
  product: 'products/',
  store: 'stores/',
  user: 'users/',
  banners: 'banners/',
};

export default (entity) => `ganhepontos/${paths[entity]}`;
