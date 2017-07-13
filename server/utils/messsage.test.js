const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('Generate message', ()=>{

  it('Should generate correct message object', ()=>{
    var from = 'Rich';
    var text = 'Test message';
    var newMessage = generateMessage(from, text);
    expect(newMessage.from).toBe(from);
    expect(newMessage.text).toBe(text);
    expect(newMessage.completedAt).toBeA('number');
  });


});

describe('generateLocationMessage', ()=>{

  it('should generate correct location object', (done)=>{
    var from = 'Rich';
    var lat = 1;
    var long = 1;
    var location = generateLocationMessage(from, lat, long);

    expect(location.createdAt).toBeA('number');
    expect(location.url).toBe('https://www.google.com/maps?q=1,1');
    expect(location.from).toBe(from);

    done();
  });


});
