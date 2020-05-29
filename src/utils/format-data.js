import moment from 'moment';
import 'moment/locale/uk';

export const formatDate = (date, param) => {
    let formatedDate;
    moment.locale('uk')
    switch (param) {
        case 'ymd':
            return formatedDate = moment(date).format('YYYY-MM-DD'); 
        case 'hour':
            return formatedDate = moment(date).format('LT'); 
    }
    
}