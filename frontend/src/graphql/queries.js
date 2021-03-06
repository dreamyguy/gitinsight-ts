// All queries are defined on this file. When making requests from React page components,
//  or directly from 'requests.js' file, we only use the exported 'gql' template literal tags from this file.

import gql from 'graphql-tag';

export const sidebarQuery = gql`
  query SidebarQuery {
    statsGlobal {
      commits
      contributors
      repositories
    }
  }
`;

export const statsGlobalQuery = gql`
  query StatsGlobalQuery {
    statsGlobal {
      commitDateFirst
      commitDateLast
      commits
      commitsImpactGtThousand
      commitsOnWeekend
      commitsPerContributorAverage
      commitsPerSecond
      commitsPerMinute
      commitsPerHour
      commitsPerDay
      commitsPerDayCummulative
      commitsPerDayAverage
      commitsPerMonthDay
      commitsPerMonthNr
      commitsPerYear
      impactPerSecond
      impactByDay
      impactByDayCummulative
      commitsWithoutFileChanges
      commitsWithoutImpact
      contributors
      # contributorsList
      daysActive
      daysSinceFirstCommit
      daysSinceLastCommit
      fileChanges
      lines
      repositories
      # repositoriesList
      staleness
      weekdays {
        Mon
        Tue
        Wed
        Thu
        Fri
        Sat
        Sun
      }
    }
  }
`;

export const statsAuthorsQueryTop30 = gql`
  query StatsAuthorsQueryTop30 {
    statsAuthors(sortBy: staleness, sortDirection: asc, count: 30) {
      author
      # commitDateFirst
      commitDateLast
      commits
      # commitsPerSecond
      # commitsPerMinute
      # commitsPerHour
      # commitsPerDay
      # commitsPerDayAverage
      # commitsPerMonthDay
      # commitsPerMonthName
      # commitsPerMonthNr
      # commitsPerYear
      daysActive
      # daysSinceFirstCommit
      daysSinceLastCommit
      impact
      impactRatio
      repositories
      # repositoriesList
      staleness
      # weekdays {
      #   Mon
      #   Tue
      #   Wed
      #   Thu
      #   Fri
      #   Sat
      #   Sun
      # }
    }
  }
`;

export const statsAuthorsQueryStaleness = gql`
  query StatsAuthorsQueryStaleness {
    statsAuthors(sortBy: staleness, sortDirection: asc) {
      staleness
    }
  }
`;

export const statsReposQueryTop30 = gql`
  query StatsReposQueryTop30 {
    statsRepos(sortBy: staleness, sortDirection: asc, count: 30) {
      repository
      # commitDateFirst
      commitDateLast
      commits
      # commitsPerSecond
      # commitsPerMinute
      # commitsPerHour
      # commitsPerDay
      # commitsPerDayAverage
      # commitsPerMonthDay
      # commitsPerMonthName
      # commitsPerMonthNr
      # commitsPerYear
      contributors
      # contributorsList
      daysActive
      # daysSinceFirstCommit
      daysSinceLastCommit
      impact
      impactRatio
      staleness
      # weekdays {
      #   Mon
      #   Tue
      #   Wed
      #   Thu
      #   Fri
      #   Sat
      #   Sun
      # }
    }
  }
`;

export const statsReposQueryStaleness = gql`
  query StatsReposQueryStaleness {
    statsRepos(sortBy: staleness, sortDirection: asc) {
      staleness
    }
  }
`;
