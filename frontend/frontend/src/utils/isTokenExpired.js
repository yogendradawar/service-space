function isTokenExpired(token){
   const decodedTime=JSON.parse(atob(token.split(".")[1])).exp*1000;
   const currentTime=Date.now();
   console.log(decodedTime);
   console.log(currentTime);
   return currentTime>decodedTime;
}
export default isTokenExpired;