[{
  id: '87ervnkujne',
  name: 'Rich',
  room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor (){
    this.users = [];
  }

  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id){
    // return user that was removed
    var user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser(id){
    return this.users.filter((user) => user.id === id)[0];
  }

  getUsers(room){
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }

  getRooms(){
    // var rooms = this.users.filter((user) => {
    //   return user.room.toLowerCase();
    // });
    // // return jQuery.unique(rooms);
    // return rooms;
    var rooms = this.users.map((user) => user.room);
    return Array.from(new Set(rooms));
  }

}

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription(){
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var me = new Person('Rich', 39);
// var description = me.getUserDescription();
// console.log(description);

module.exports = {
  Users
};
