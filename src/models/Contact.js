
export default class Contact {
  
  constructor({ _id, firstName, lastName, email, phoneNumber, createdAt, updatedAt }) {
    this._id = _id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phoneNumber = phoneNumber
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}