export interface ManagerStore {
  dishes: Dish[]
  categories: Category[]
  info: Info []
}

export interface Dish {
  id: string
  dishName: string
  dishDescription: string
  dishWeight: string
  dishPrice: string
  image: string
  dishAvailable: boolean
  categoryId: string
}

export interface Category {
  id: string
  categoryName: string
  categoryAvailable: boolean
}

export interface Info {
  address: string
  phone: string
  wifi: string
}
