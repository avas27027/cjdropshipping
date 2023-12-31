import { Product } from '@src/models/Products';
import orm from './MockOrm';


// **** Functions **** //

/**
 * Get one product.
 */
async function getOne(sku: string): Promise<Product | null> {
  const db = await orm.openDb();
  for (const product of db.products) {
    if (product.productSku === sku) {
      return product;
    }
  }
  return null;
}

/**
 * See if a product with the given sku exists.
 */
async function persists(sku: string): Promise<boolean> {
  const db = await orm.openDb();
  for (const product of db.products) {
    if (product.productSku === sku) {
      return true;
    }
  }
  return false;
}

/**
 * Sync the products with another list of Sku's
 */
async function syncProducts(productsList: Product[]): Promise<void> {
  const db = await orm.openDb();
  const now = new Date()
  const formatDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}  ${now.getHours()}:${now.getMinutes()}`
  for (const newProds of productsList) {
    if (!await persists(newProds.productSku)) {
      await add(newProds)
    }
  }
  for (const product of db.products) {
    if (productsList.findIndex((e) => e.productSku === product.productSku) === -1) {
      await delete_(product.productSku)
    }
    else{
      product.syncDate = formatDate
      await update(product)
    }
  }
}

/**
 * Get all products.
 */
async function getAll(): Promise<Product[]> {
  const db = await orm.openDb();
  return db.products;
}

/**
 * Add one product.
 */
async function add(product: Product): Promise<void> {
  const db = await orm.openDb();
  const now = new Date()
  product.syncDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}  ${now.getHours()}:${now.getMinutes()}`
  db.products.push(product);
  return orm.saveDb(db);
}

/**
 * Update a product.
 */
async function update(product: Product): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.products.length; i++) {
    if (db.products[i].productSku === product.productSku) {
      db.products[i] = product;
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one product.
 */
async function delete_(sku: string): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.products.length; i++) {
    if (db.products[i].productSku === sku) {
      db.products.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}


// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
  syncProducts,
} as const;
