const expect = require('expect');
const {Users} = require('./users');

describe('Users Class', ()=>{

  var users;

  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: '1',
      name: 'UserOne',
      room: 'node'
    },{
      id: '2',
      name: 'UserTwo',
      room: 'react'
    },{
      id: '3',
      name: 'UserThree',
      room: 'node'
    }];
  });


  it('should add new user', ()=>{

    var users = new Users();
    var user = {
      id: '123',
      name: 'Remy',
      room: 'BMW'
    };
    var resUsers = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);

  });

  it('should return names for node room', ()=>{
    var userList = users.getUsers('node');
    expect(userList).toEqual(['UserOne', 'UserThree']);
  });

  it('should return names for react room', ()=>{
    var userList = users.getUsers('react');
    expect(userList).toEqual(['UserTwo']);
  });

  it('should remove user', ()=>{
    users.removeUser('3');
    var userList = users.getUsers('node');
    expect(userList).toEqual(['UserOne']);
  });

  it('should NOT remove user', ()=>{
    users.removeUser('333');
    var userList = users.getUsers('node');
    expect(userList).toEqual(['UserOne', 'UserThree']);
  });

  it('should find user', ()=>{
    var user = users.getUser('1');
    expect(user).toEqual(users.users[0]);
  });

  it('should NOT find user', ()=>{
    var user = users.getUser('333');
    expect(user).toEqual();
    expect(user).toNotExist();
  });

});
