import dayjs from 'dayjs';
import advanceFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advanceFormat)

const formatDate = (date, seperator = " | ") => {
    const formatted_date = dayjs(date)
    let format = seperator
    if (formatted_date.isValid()){
        format += formatted_date.format('Do MMMM YYYY');
    }else{
        format += "Date is not available"
    }
    return format
}

export {formatDate};