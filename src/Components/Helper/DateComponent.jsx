export function dateFormatter(dateString) {
    const inputDate = new Date(dateString);
  
    if (isNaN(inputDate)) {
      return "Invalid Date";
    }
  
    const today = new Date();
    const isToday = 
      today.getDate() === inputDate.getDate() &&
      today.getMonth() === inputDate.getMonth() &&
      today.getFullYear() === inputDate.getFullYear();
  
    if (isToday) {
      return "Today";
    }
  
    const year = inputDate.getFullYear();
    const month = inputDate.toLocaleString("default", { month: "long" });
    const day = inputDate.getDate();
  
    const formattedDate = `${month.slice(0,3)} ${day}, ${year}`;
    return formattedDate;
  }