import jwt      from 'jwt-simple';
import moment   from 'moment';
import config   from './Config';

module.exports = user => {
    
    let payload = {
        sub: user._id,
        exp: moment().add('1', 'days').unix()
    };

    return jwt.encode(payload, config.SIGNATURE);
};
