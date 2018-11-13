import Contracts from './Contracts';

export default {
  contracts: (parent, args, context) => {
    console.log(context);
    return Contracts.find({}).fetch();
  },
};
