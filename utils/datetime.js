/** getDate
 gets a specified date
 @param addDays -- days to add (default 0)
 @param startDate -- date to start at (default today)
 */
exports.getDate = function(addDays = 0, startDate = new Date()){
    const newDate = new Date(startDate.getTime());
    newDate.setDate(startDate.getDate() + addDays);
    return newDate;
}
