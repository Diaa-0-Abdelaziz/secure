export default interface User {
  id: number | null,
  name: string | null,
  email: string | null,
  type: string | null,
  currency: string | null,
  email_verified_at?: Date | null,
  token: string | null,
  business: Array<any>,
  hotels: Array<any>
}
