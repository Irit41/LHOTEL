export class User {
    
    constructor(User) {
      this.Id = User.Id;
      this.FirstName = User.FirstName;
      this.LastName = User.LastName;
      this.Email =User.Email;
      this.Password = User.Password;
      this.Phone = User.Phone;
    }

    ToString()
    {
        return "ID: " + this.Id + "Name: " + this.FirstName  + " " + this.LastName
        + "Email: " + this.Email + "Password: " +  this.Password + "Phone: " +  this.Phone
    }
}
