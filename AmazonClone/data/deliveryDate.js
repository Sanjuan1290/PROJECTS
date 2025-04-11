
export function getDate(daysToAdd) {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + daysToAdd);   

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", 
        "August", "September", "October", "November", "December"];
    

    if(days[currentDate.getDay()] == "Saturday"){
        currentDate.setDate(currentDate.getDate() + 2);   
    }else if(days[currentDate.getDay()] == "Sunday"){
        currentDate.setDate(currentDate.getDate() + 1);  
    }

    const wordDay = days[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const monthDay = currentDate.getDate();

    const formattedDate = `${wordDay}, ${month} ${monthDay}`;
    return formattedDate;
}

export function getDeliveryDate(cartDeliveryOption){

    if(cartDeliveryOption == 0){
        return getDate(10);
    }else if(cartDeliveryOption == 499){
        return getDate(7);
    }else if(cartDeliveryOption == 999){
        return getDate(3);
    }else return "Error occur!"
    
}