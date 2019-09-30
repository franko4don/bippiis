import moment from 'moment';

const getSingleError = (field = '', superErrors) => {
    if (superErrors.hasOwnProperty('errors')) {
        const errors = superErrors.errors;
        if (errors.hasOwnProperty(field)) {
            return errors[field][0];
        } else {
            return '';
        }
    }
    return '';
}

const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const isObjectEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const cleanUrl = (sentence) => {
    return sentence.replace(/ /g, "-").replace(/\//g, "-");
}

const encode = (value) => {
    let start = "";
    let end = "";
    let multiplier = 15;
    let alpha = "ABCDEFGHIJKLMNOPQRSTUPWXYZabcdefghijklmanopqrstuvwxyz0123456789";

    for (let i = 0; i < multiplier; i++) {
        let rand = parseInt(Math.random() * alpha.length - 1);
        start += alpha.substring(rand, rand + 1);
    }

    for (let i = 0; i < multiplier; i++) {
        let rand = parseInt(Math.random() * alpha.length - 1);
        end += alpha.substring(rand, rand + 1);
    }

    return start + value + end;
}



const decode = (value) => {
    let multiplier = 6;
    return value.substring(multiplier, value.length - multiplier);
}


const formatJoinedDate = (date) => {
    return moment(date).format("D MMMM, YYYY");
}

const formatCommentDate = (date) => {
    return moment(date).format("HH:mm A");
}

const humanizeTime = (date) => {
    let time = moment(date);
    return time.fromNow();
}

const getWeek = (date) => {
    var startOfWeek = moment(date).startOf('isoWeek');
    var endOfWeek = moment(date).endOf('isoWeek');

    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
        days.push(day.toDate());
        day = day.clone().add(1, 'd');
    }
    return days;
}

const getDay = (date) => {
    return moment(date).format('D');
}

const getMonthWord = (date) => {
    return moment(date).format('MMMM');
}

const getProgramTime = (date) => {
    return moment(date).format("HH:mm");
}

const getDayWord = (date) => {
    let weekWord = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let index = moment(date).format('e');
    return weekWord[index];
}

const getDayWordFull = (date) => {
    let weekWord = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let index = moment(date).format('e');
    return weekWord[index];
}

const calculateOpacity = (percentage) => {
    let maxColorValue = 255;
    let opacity = percentage * maxColorValue / 100.0;
    let value = (parseInt(opacity)).toString(16)
    return value;
}

const searchMerchants = (query, merchants) => {
    query = query.toLowerCase();
    let expression = `.*${query}.*`;
    let regex = new RegExp(expression, 'g');
    let result = merchants.filter(merchant => {
    let matchBusiness = merchant.businessName.toLowerCase().match(regex);
    let matchAddress = merchant.branches[0] ? merchant.branches[0].address.toLowerCase().match(regex) : false;
    return  matchAddress || matchBusiness  ;
    }
    );
    
    return result;
}

const hasLikes = (uuid, likes) => {

    for (let i in likes) {
        if (likes[i].user == uuid) {
            return true;
        }
    }
    return false;
}

const getRandomNumber = () =>{
    let rand = Math.random();
    return parseInt(rand * 10);
}

const generateOTP = () => {
    let otp = '';
    let alpha = '0123456789';
    let multiplier = 6;
    for (let i = 0; i < multiplier; i++) {
        let rand = parseInt(Math.random() * alpha.length - 1);
        otp += alpha.substring(rand, rand + 1);
    }

    return otp;
}

const transformPhone = (phone) => {
    let newPhone = phone.substring(1, phone.length);
    return '234'+newPhone;
}

const validatePhone = (phone) => {
    // return /^0(703|702|706|806|810|813|814|816|903|803|906|705|805|807|811|815|905|701|708|802|808|812|902|907|907|809|817|818|908|909)[0-9]{7}$/.test(phone);
    // return isNumeric(phone);
    return true;
}

const renderEmojiFlag = (countries, cca2, emojiStyle) =>{
    return (
      <Text style={[countryPickerStyles.emojiFlag, emojiStyle]} allowFontScaling={false}>
        {cca2 !== '' && countries[cca2.toUpperCase()] ? (
          <Emoji name={countries[cca2.toUpperCase()].flag} />
        ) : null}
      </Text>
    )
  }

const standardizePhone = (phone) => {
    let isNigerian = /^0(703|702|706|806|810|813|814|816|903|901|803|906|705|805|807|811|815|905|701|708|802|808|812|902|907|907|809|817|818|908|909)[0-9]{7}$/.test(phone);
    if(isNigerian){
        return '+234'+phone.substring(1, phone.length);
    }
    if(phone.includes('+234')){
        return phone;
    }

    return phone;
}

const formatMoney = (n,c, d, t) => {
    // var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

const isNumber = (val) => {
    return typeof val === 'number';
}

const isNumeric = (text) => {
    return !isNaN(parseInt(text));
  }


const getDistance = (lat1, lon1, lat2, lon2) => {
    Number.prototype.toRadians = function() {
        return this * Math.PI / 180;
      }

    var R = 6371e3; // metres
    
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2-lat1).toRadians();
    var Δλ = (lon2-lon1).toRadians();
    
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;

    return d;
}

const geolocationDistance = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist.toFixed(4);
    }
}

const cleanPhoneNumber = (phone = '') => {
    phone = phone.replace(/\(/g, '').replace(/\)/g, '').replace(/ /g, '').replace(/-/g, '');
    if(phone.substring(0, 4) == '+234'){
        phone = phone.replace(/(\+234)/g, '0');
    }
    return phone;
}

const isNigerianNumber = (phone) => {
    return /^0(703|702|706|806|810|813|814|816|903|901|803|906|705|805|807|811|815|905|701|708|802|808|812|902|907|907|809|817|818|908|909)[0-9]{7}$/.test(phone);
}

const validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
    
}

const customFormatMoney = (phone = '') => {
    return phone.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    
}

const groupByProductId =(objectArray, property) =>{ 
    return objectArray.reduce((acc, obj)=>{
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj)
      return acc;
    }, {});
}

const sortFoodOptions=(filter, option, optionId, productId)=>{
    let foodOptions = [];
    if(filter.length !=0){
        for(let i=0; i < filter.length; i++){
            let item = filter[i]
            if(parseInt(item.itemId) == parseInt(optionId)){
                foodOptions.splice(i, 1, {itemId: optionId, option: option, productId: productId})
                console.log("======itemid exist====", foodOptions, i, optionId, item.itemId)
            }else{
                foodOptions.push(item)
                console.log("======item doesn't exist=====", item.itemId, optionId)

                foodOptions.push({itemId: optionId, option: option, productId: productId})
            }
        }
    }else{
        console.log("======length is 0====")
        foodOptions.push({itemId: optionId, option: option, productId: productId})
    }
    console.log("=====food returned=====", foodOptions, filter)
    return foodOptions
}

const capCase=(str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const sortReview=(reviews)=>{
    let userRate = {}
    let totalRate = []
    let totalRating = 0
    let rate = 0
    if(reviews.length != 0){
        let review = groupByProductId(reviews, "star")
        for(let i in review){
            let item = review[i];
            for(let j in item){
                let rating = item[j]
                if(item.length - 1 == j){
                    totalRate.push((item.length * rating.star))
                }
            }
        }
    }
    let rating = totalRate.reduce((acc, val)=>{return acc + val})
    userRate["rate"] = (rating/reviews.length).toFixed(2)
    userRate["totalRate"] = reviews.length
    return userRate
}

const truncateText = (length = 20, text) => {
    return text.length > length? `${text.substr(0, length)}...` : text;
  }

export {
   calculateOpacity, hasLikes,
    isObjectEmpty, encode,
    getRandomNumber, generateOTP,
    transformPhone, validatePhone,
    formatMoney, isNumber, isNumeric,
    getDistance, geolocationDistance,
    cleanPhoneNumber, searchMerchants,
    customFormatMoney, standardizePhone,
    renderEmojiFlag, isNigerianNumber,
    validateEmail, groupByProductId,
    sortFoodOptions, sortReview,
    capCase, truncateText
};