import { BagistoCommerceConfig } from '../index'
import ProductHandler from '../utils/handler/product-handler'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation({ commerce }: any) {
  async function getAllProductPaths({
    config,
  }: {
    config?: BagistoCommerceConfig
  } = {}): Promise<GetAllProductPathsResult> {
    const bagistoConfig = commerce.getConfig(config)

    const productHandler = new ProductHandler(bagistoConfig)

    const products = await productHandler.getAllProducts()

    const normalizedProducts = productHandler.normalizeAllProducts(products)

    return Promise.resolve({
      products: normalizedProducts.map((product: any) => ({
        path: product.path,
      })),
    })
  }

  return getAllProductPaths
}
