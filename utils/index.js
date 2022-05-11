export function secondsToDhms(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    
    let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    let mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minutes") : "";
    if( m > 0 && s > 0 ) mDisplay += ", "
    let hDisplay = h > 0 ? h + (h == 1 ? " hour" : " hours") : "";
    if( h > 0 && (m > 0 || s > 0) ) hDisplay += ", "
    let dDisplay = d > 0 ? d + (d == 1 ? " day" : " days") : "";
    if( d > 0 && (h > 0 || m > 0 || s > 0) ) dDisplay += ", "
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

export function secondsToDHM(seconds) {
    seconds = Number(seconds / 1000);
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.ceil(seconds % 3600 / 60);
        
    let dDisplay = d > 0 ? d + " d, " : "";
    let hDisplay = h > 0 ? h + " h, " : "";
    return dDisplay + hDisplay + m + " mins";
}

export function remainingTime(seconds) {
    seconds = Number(seconds / 1000);
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.ceil(seconds % 3600 / 60);

    if( d > 0 ) return `${d} days`
    if( h > 0 ) return `${h + 1} hours`
    
    return `${m} minutes`
}

export function shortAmount(val) {
    if (val > 1000000000) {
        return (val / 1000000000).toFixed(2) + "B"
    } else if (val > 1000000) {
        return (val / 1000000).toFixed(2) + "M"
    } else if (val > 1000) {
        return (val / 1000).toFixed(2) + "K"
    }

    return val || 0
}

export function shortWalletAddr(address) {
    if(address) 
        return address.slice(0,5) + "..." + address.slice(-4)
    return '';
}

export const date2normal = (date) =>  {
    const cTime = new Date(date)
    
    return (cTime.getMonth() + 1) + "/" + cTime.getDate() + "/" + cTime.getFullYear()
}

export const time2str = (date) =>  {
    if(date === undefined) return '';
    const cTime = new Date(date)    
    const hour = cTime.getHours();
    
    return (hour % 12 === 0 ? 12 : hour) + ":" + cTime.getMinutes() + " " + (hour < 12 ? 'AM' : 'PM')
}

export const datetime2str = (date) =>  {
    if(date === undefined) return '';
    const cTime = new Date(date)
    const hour = cTime.getHours();
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return month[cTime.getMonth()] + " " + cTime.getDate() + ", " + cTime.getFullYear()  + ", " + (hour % 12 === 0 ? 12 : hour) + ":" + cTime.getMinutes() + " " + (hour < 12 ? 'AM' : 'PM')
}

export const formatMoney = (val, decimal = 0, currency) => {
    if(val === undefined || val === null) return '';
    
    let num = typeof val === 'string' ? parseFloat(val) : val;
    
    var parts = num.toFixed(decimal).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (currency || '') + parts.join(".");
}