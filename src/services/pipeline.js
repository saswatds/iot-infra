const _ = require('lodash'),
  uuidv4 = require('uuid/v4'),
  { Service } = require('feathers-mongoose');

class Pipeline extends Service{
  // Create a pipeline
  constructor (mongooseParams, MQTT) {
    // Here we will need to acces the
    super(mongooseParams);
    // We get the mqtt service to attach listeners
    this.MQTT = MQTT;
  }

  create(data, params) {
    /**
     * @property name - name of the pipeline
     * @property input - an array of all input channels
     * @property output - an array of all output channels
     * @property operations - an array of function body to be evaled when
     *  and even is generated
     */
    const id = uuidv4();
    _.set(data, '_id', id);
    this.MQTT.updateListener(this.preprocess(id, data)); // binding not required
    return super.create(data, params);
  }

  update(id, data, params) {
    this.MQTT.updateListener(this.preprocess(id, data)); // binding not required
    return super.update(id, data, params);
  }

  patch(id, data, params) {
    this.get(id).then((sdata)=>{
      this.MQTT.updateListener(this.preprocess(id, sdata));
    });
    return super.patch(id, data, params);
  }

  remove(id, params) {
    this.MQTT.removeListener({id}); // Making interfaces consistent
    return super.remove(id, params);
  }

  preprocess(id, data) {
    // in this step we take all the operations and apply them in order
    const {input, output, operations} = data;

    /**
     * operations = {
     *  name: 'compress'
     *  func: 'const a  = 5'
     * }
     */
    // Now we generate the function chain
    const mappedFunctions = _.map(operations, (opp)=> {
      return new Function('data', 'done', opp.func || '');
    });
    return {id: input, output, operations: mappedFunctions};
  }
}

module.exports.Pipeline = Pipeline;
