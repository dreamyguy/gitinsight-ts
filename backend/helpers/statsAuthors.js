import arrayByKey from './arrayByKey';
import arrayMaxMin from './arrayMaxMin';
import daysBetween from './daysBetween';
import daysSince from './daysSince';
import groupByDuplicatesInArray from './groupByDuplicatesInArray';
import itemsSum from './itemsSum';
import sortArrayByKey from './sortArrayByKey';
import totalSum from './totalSum';

// Create author stats object
const authorStats = ({ author, objData }) => {
  // calculate total number of commits
  const totalNrCommits = itemsSum(objData);
  // calculate total impact
  const totalImpact = arrayByKey(objData, 'impact');
  const totalImpactSum = totalSum(totalImpact);
  // calculate the ratio of impact per commit
  const totalImpactRatio = totalImpactSum / totalNrCommits;
  // variables to pass to final object
  const commits = totalNrCommits;
  const impact = totalImpactSum;
  const impactRatio = totalImpactRatio;
  // calculate author's commits on a given week day
  const daysWeek = arrayByKey(objData, 'date_day_week');
  const weekdays = groupByDuplicatesInArray(daysWeek);
  // calculate days between first and last commits
  const commitsByAuthorDateUnixtimestamp = arrayByKey(
    objData,
    'author_date_unix_timestamp'
  );
  const commitDateFirst = arrayMaxMin(commitsByAuthorDateUnixtimestamp, 'min');
  const commitDateLast = arrayMaxMin(commitsByAuthorDateUnixtimestamp, 'max');
  const daysActive = daysBetween(commitDateFirst, commitDateLast);
  // calculate days since first and last commits
  const daysSinceFirstCommit = daysSince(commitDateFirst);
  const daysSinceLastCommit = daysSince(commitDateLast);
  // calculate staleness
  const staleness = daysSinceLastCommit / 365;
  // calculate commits per time unit
  const commitsBySecondsCalendar = arrayByKey(objData, 'time_seconds');
  const commitsByMinutesCalendar = arrayByKey(objData, 'time_minutes');
  const commitsByHoursCalendar = arrayByKey(objData, 'time_hour');
  const commitsByDaysCalendar = arrayByKey(objData, 'date_iso_8601');
  const commitsByMonthDay = arrayByKey(objData, 'date_month_day');
  const commitsByMonthName = arrayByKey(objData, 'date_month_name');
  const commitsByMonthNr = arrayByKey(objData, 'date_month_number');
  const commitsByYear = arrayByKey(objData, 'date_year');
  const commitsPerSecond = groupByDuplicatesInArray(commitsBySecondsCalendar);
  const commitsPerMinute = groupByDuplicatesInArray(commitsByMinutesCalendar);
  const commitsPerHour = groupByDuplicatesInArray(commitsByHoursCalendar);
  const commitsPerDay = groupByDuplicatesInArray(commitsByDaysCalendar);
  const commitsPerDayAverage = daysActive / totalNrCommits;
  const commitsPerMonthDay = groupByDuplicatesInArray(commitsByMonthDay);
  const commitsPerMonthName = groupByDuplicatesInArray(commitsByMonthName);
  const commitsPerMonthNr = groupByDuplicatesInArray(commitsByMonthNr);
  const commitsPerYear = groupByDuplicatesInArray(commitsByYear);
  // total nr repositories
  const repositories = itemsSum(
    Object.keys(
      groupByDuplicatesInArray(
        arrayByKey(objData, 'repository')
      )
    )
  );
  // repositories list
  const repositoriesList = Object.keys(
    groupByDuplicatesInArray(
      arrayByKey(objData, 'repository')
    )
  ).sort();
  return {
    author,
    commitDateFirst,
    commitDateLast,
    commits,
    commitsPerSecond,
    commitsPerMinute,
    commitsPerHour,
    commitsPerDay,
    commitsPerDayAverage,
    commitsPerMonthDay,
    commitsPerMonthName,
    commitsPerMonthNr,
    commitsPerYear,
    daysActive,
    daysSinceFirstCommit,
    daysSinceLastCommit,
    impact,
    impactRatio,
    repositories,
    repositoriesList,
    staleness,
    weekdays,
  }
};

// Get author stats and output it on a dedicated array, with options
// ------------------------------------------------------------
export const statsAuthors = ({ data, sortBy, sortDirection, count }) => {
  let output = null;
  var obja = {};
  for (var i in data) {
    if (!obja.hasOwnProperty(data[i].author_email)) {
      obja[data[i].author_email] = [];
    }
    obja[data[i].author_email].push(data[i]);
  }
  // Create an array to receive customised stats
  var stats = [];
  // Iterate through 'obja' object
  for (var b in obja) {
    if (obja.hasOwnProperty(b)) {
      var objb = obja[b];
      // Push new data to array
      stats.push(authorStats({ author: b, objData: objb }));
    }
  }
  if (sortBy && sortDirection) {
    output = sortArrayByKey(stats, sortBy, sortDirection);
  } else if (sortBy && !sortDirection) {
    output = sortArrayByKey(stats, sortBy);
  } else {
    output = stats;
  }
  if (count) {
    output = output.slice(0, count);
  }
  return output;
};
