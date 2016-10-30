import jwt      from 'jwt-simple';
import moment   from 'moment';
import config   from './Config';

module.exports = _id => {
    let payload = {
        sub: _id,
        exp: moment().add('30', 'minutes').unix()
    };

    console.log(payload);
    
    return jwt.encode(payload, config.SIGNATURE);
};
