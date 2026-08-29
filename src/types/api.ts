export type Gender = 'MALE' | 'FEMALE'
export type UserRole = 'ADMIN' | 'USER'
export type DwellingType = 'House' | 'Apartment' | 'Room' | 'Republic' | 'Kitnet'
export type DwellingGoal = 'Rent' | 'Sell' | 'Vacation Home'
export type DwellingAvailability = 'Available' | 'Unavailable'
export type DwellingStatus = 'Active' | 'Inactive' | 'Draft' | 'Pending' | 'Sold' | 'Rented'
export type DwellingPaymentConditions = 'Monthly' | 'One Time' | 'Daily' | 'Weekly' | 'Yearly'

export interface User {
  id: string
  name: string
  email: string
  gender: Gender
  role: UserRole
  confirmed?: boolean
  banned?: boolean
  bannedBy?: string | null
  bannedAt?: string | null
  banReason?: string | null
  photoUrl?: string | null
  extPhotoUrl?: string | null
  isSmoker?: boolean | null
  isStudent?: boolean | null
  createdAt?: string
  updatedAt?: string
}

export interface LoginRequest { email: string; password: string }
export interface LoginResponse extends User { token: string }
export interface CreateAccountRequest { name: string; email: string; password: string; gender: Gender }
export interface UpdateAccountRequest { password?: string; isSmoker?: boolean; isStudent?: boolean }

export interface DwellingMedia {
  id: string
  filename: string
  url: string
  dwellingId: string
  isCover?: boolean
  metadata?: string
  createdAt?: string
  updatedAt?: string
}

export interface DwellingOwner { id: string; name: string }

export interface Dwelling {
  id: string
  title: string
  description: string
  price: number | string
  address: string
  neighborhood?: string
  city: string
  state?: string
  type: DwellingType
  paymentConditions: DwellingPaymentConditions
  goal: DwellingGoal
  availability?: DwellingAvailability
  latitude?: number | string
  longitude?: number | string
  contact?: string
  animals?: boolean
  furnished?: boolean
  smoker?: boolean
  children?: boolean
  rules?: string | null
  includeEletricityBill?: boolean
  includeWaterBill?: boolean
  includeInternetBill?: boolean
  includeOthersBill?: boolean
  condominiumFee?: number | string | null
  restrictedToSex?: Gender | null
  studentsOnly?: boolean
  status: DwellingStatus
  zipCode: string
  zipCodeFormatted?: string
  owner?: DwellingOwner
  medias?: DwellingMedia[] | null
  createdAt?: string
  updatedAt?: string
}

export interface CreateDwellingRequest {
  title: string
  description: string
  price: number
  address: string
  neighborhood: string
  city: string
  state: string
  type: DwellingType
  paymentConditions: DwellingPaymentConditions
  goal: DwellingGoal
  availability: DwellingAvailability
  latitude: number
  longitude: number
  contact: string
  animals?: boolean
  furnished?: boolean
  smoker?: boolean
  children?: boolean
  rules?: string
  includeEletricityBill?: boolean
  includeWaterBill?: boolean
  includeInternetBill?: boolean
  includeOthersBill?: boolean
  condominiumFee?: number | null
  restrictedToSex?: Gender
  studentsOnly?: boolean
  status: DwellingStatus
  zipCode: string
}

export interface SearchDwellingsParams {
  page?: number
  term: string
  type?: DwellingType
  address?: string
  city?: string
  latitude?: number
  longitude?: number
  distance?: number
  maximumPrice?: number
  condominiumFee?: number
  goal?: DwellingGoal
  children?: boolean
  animals?: boolean
  paymentConditions?: DwellingPaymentConditions
  includeEletricityBill?: boolean
  includeWaterBill?: boolean
  includeInternetBill?: boolean
  includeOthersBill?: boolean
  studentsOnly?: boolean
  restrictedToSex?: Gender
  ownerId?: string
  orderBy?: 'price' | 'createdAt'
  order?: 'ASC' | 'DESC'
}

export interface PaginatedDwellings { totalItems: number; totalPages: number; dwellings: Dwelling[] }
export interface PaginatedUsers { totalItems: number; totalPages: number; users: User[] }

export interface PlatformLimits {
  paginationLimit: number
  unauthedUserDwellingsPageViewLimit: number
  unauthenticatedUserPageViewLimit: number
  maxDwellingMedia: number
}

export interface PlatformStatistics {
  totalDwellings: number
  totalUsers: number
  dwellingsMonthPercentage: number
  dwellingsCountLastWeek?: Array<{ dayOfWeek: number; count: number }>
  cityDwellingsRank?: Array<{ city: string; count: number }>
  userDwellingsRank?: Array<{ user: { id: string }; count: number }>
  dwellingsCountByType?: Array<{ type: DwellingType; count: number; percentageOfTotal: number }>
  activeDwellingsCount?: number
  adminUsersCount?: number
  activeUsersCount?: number
  bannedUsersCount?: number
  lastDwellings: Dwelling[]
  lastUsers: User[]
}
