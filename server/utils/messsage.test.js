const expect = require('expect');
const {generateMessage} = require('./message');

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
