/** weightedGrade
 apply weight to grade
 @param grades -- array containing grades
 @param weights -- array containing grade weights
 */
exports.weightedGrade = function(grades, weights){
	weightedgrade = 0;
    for (var i = grades.length - 1; i >= 0; i--) {
    	weightedgrade = weightedgrade + parseFloat(grades[i]) * parseFloat(weights[i]);
    }
    return weightedgrade;
}
