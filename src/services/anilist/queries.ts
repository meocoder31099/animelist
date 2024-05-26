import type {
  Studio,
  Character,
  Staff,
  GenreCollection,
  MediaTag,
} from "@/types/anilist";
import type {
  Media,
  Page,
  User,
  MediaListCollection,
  Review,
  Thread,
} from "@/types/anilistv2";

export type PageQueryResponse = {
  Page: Page;
};

export type MediaDetailsQueryResponse = {
  Media: Media;
};

export type StaffDetailsQueryResponse = {
  Staff: Staff;
};

export type CharacterDetailsQueryResponse = {
  Character: Character;
};

export type StudioDetailsQueryResponse = {
  Studio: Studio;
};

export type GenreCollectionQueryResponse = {
  GenreCollection: GenreCollection;
  MediaTagCollection: MediaTag[];
};

export type ViewerQueryResponse = {
  Viewer: User;
};

export type UserQueryResponse = {
  User: User;
};

export type UserMediaListCollection = {
  MediaListCollection: MediaListCollection;
};

export type ReviewDetailsQueryResponse = {
  Review: Review;
};

export type ForumThreadDetailsQueryResponse = {
  Thread: Thread;
};

export const mediaDefaultFields = `
id
type
title {
  userPreferred
}
coverImage {
  extraLarge
  large
  color
}
startDate {
  year
  month
  day
}
endDate {
  year
  month
  day
}
bannerImage
season
seasonYear
description
type
format
status(version: 2)
episodes
duration
chapters
volumes
favourites
trending
genres
isAdult
averageScore
popularity
trailer {
  id
  site 
}
nextAiringEpisode {
  airingAt
  episode
}
`;

export const mediaQuery = (fields: string = mediaDefaultFields) => `
query Media(
  $page: Int = 1,
  $perPage: Int = 20,
  $id: Int
  $idMal: Int
  $startDate: FuzzyDateInt
  $endDate: FuzzyDateInt
  $season: MediaSeason
  $seasonYear: Int
  $type: MediaType
  $format: MediaFormat
  $status: MediaStatus
  $episodes: Int
  $duration: Int
  $chapters: Int
  $volumes: Int
  $isAdult: Boolean
  $genre: String
  $tag: String
  $minimumTagRank: Int
  $tagCategory: String
  $onList: Boolean
  $licensedBy: String
  $licensedById: Int
  $averageScore: Int
  $popularity: Int
  $source: MediaSource
  $countryOfOrigin: CountryCode
  $isLicensed: Boolean
  $search: String
  $id_not: Int
  $id_in: [Int]
  $id_not_in: [Int]
  $idMal_not: Int
  $idMal_in: [Int]
  $idMal_not_in: [Int]
  $startDate_greater: FuzzyDateInt
  $startDate_lesser: FuzzyDateInt
  $startDate_like: String
  $endDate_greater: FuzzyDateInt
  $endDate_lesser: FuzzyDateInt
  $endDate_like: String
  $format_in: [MediaFormat]
  $format_not: MediaFormat
  $format_not_in: [MediaFormat]
  $status_in: [MediaStatus]
  $status_not: MediaStatus
  $status_not_in: [MediaStatus]
  $episodes_greater: Int
  $episodes_lesser: Int
  $duration_greater: Int
  $duration_lesser: Int
  $chapters_greater: Int
  $chapters_lesser: Int
  $volumes_greater: Int
  $volumes_lesser: Int
  $genre_in: [String]
  $genre_not_in: [String]
  $tag_in: [String]
  $tag_not_in: [String]
  $tagCategory_in: [String]
  $tagCategory_not_in: [String]
  $licensedBy_in: [String]
  $licensedById_in: [Int]
  $averageScore_not: Int
  $averageScore_greater: Int
  $averageScore_lesser: Int
  $popularity_not: Int
  $popularity_greater: Int
  $popularity_lesser: Int
  $source_in: [MediaSource]
  $sort: [MediaSort]
) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(
      id: $id
      idMal: $idMal
      startDate: $startDate
      endDate: $endDate
      season: $season
      seasonYear: $seasonYear
      type: $type
      format: $format
      status: $status
      episodes: $episodes
      duration: $duration
      chapters: $chapters
      volumes: $volumes
      isAdult: $isAdult
      genre: $genre
      tag: $tag
      minimumTagRank: $minimumTagRank
      tagCategory: $tagCategory
      onList: $onList
      licensedBy: $licensedBy
      licensedById: $licensedById
      averageScore: $averageScore
      popularity: $popularity
      source: $source
      countryOfOrigin: $countryOfOrigin
      isLicensed: $isLicensed
      search: $search
      id_not: $id_not
      id_in: $id_in
      id_not_in: $id_not_in
      idMal_not: $idMal_not
      idMal_in: $idMal_in
      idMal_not_in: $idMal_not_in
      startDate_greater: $startDate_greater
      startDate_lesser: $startDate_lesser
      startDate_like: $startDate_like
      endDate_greater: $endDate_greater
      endDate_lesser: $endDate_lesser
      endDate_like: $endDate_like
      format_in: $format_in
      format_not: $format_not
      format_not_in: $format_not_in
      status_in: $status_in
      status_not: $status_not
      status_not_in: $status_not_in
      episodes_greater: $episodes_greater
      episodes_lesser: $episodes_lesser
      duration_greater: $duration_greater
      duration_lesser: $duration_lesser
      chapters_greater: $chapters_greater
      chapters_lesser: $chapters_lesser
      volumes_greater: $volumes_greater
      volumes_lesser: $volumes_lesser
      genre_in: $genre_in
      genre_not_in: $genre_not_in
      tag_in: $tag_in
      tag_not_in: $tag_not_in
      tagCategory_in: $tagCategory_in
      tagCategory_not_in: $tagCategory_not_in
      licensedBy_in: $licensedBy_in
      licensedById_in: $licensedById_in
      averageScore_not: $averageScore_not
      averageScore_greater: $averageScore_greater
      averageScore_lesser: $averageScore_lesser
      popularity_not: $popularity_not
      popularity_greater: $popularity_greater
      popularity_lesser: $popularity_lesser
      source_in: $source_in
      sort: $sort      
    ) {
      ${fields}
    }
  }
}

`;

export const mediaDetailsDefaultFields = `
id
idMal
title {
  romaji
  english
  native
  userPreferred
}
type
format
status
description
startDate {
  year
  month
  day
}
endDate {
  year
  month
  day
}
season
seasonYear
seasonInt
episodes
duration
chapters
volumes
countryOfOrigin
updatedAt
coverImage {
  extraLarge
  large
  medium
  color
}
rankings {
  rank
  type
  context
  allTime
  season
  format
  year
}
bannerImage
genres
synonyms
averageScore
popularity
trending
favourites
tags {
  id
  name
  description
  category
  rank
  isGeneralSpoiler
  isMediaSpoiler
  isAdult
  userId
}
characters(perPage: 1) {
  edges {
    id
  }
}
stats{
  scoreDistribution{
    score
    amount
  }
}
staff(perPage: 1) {
  edges {
    id
  }
}
studios {
  nodes {
    id
    name
    isAnimationStudio
  }
  pageInfo {
    total
    perPage
    currentPage
    lastPage
    hasNextPage
  }
}
isAdult
recommendations(perPage: 1) {
  edges {
    node {
      id
    }
  }
}
nextAiringEpisode{
  airingAt
  episode
  timeUntilAiring
}
streamingEpisodes{
  thumbnail
  title
  url
}
externalLinks{
  type
  color
  language
  url
  site
  icon
}
`;
// airingSchedule(notYetAired: true, perPage: 1) {
//   nodes {
//     airingAt
//     episode
//   }
// }

export const mediaDetailsQuery = (
  fields: string = mediaDetailsDefaultFields
) => `
query Media(
  $id: Int
  $idMal: Int
  $startDate: FuzzyDateInt
  $endDate: FuzzyDateInt
  $season: MediaSeason
  $seasonYear: Int
  $type: MediaType
  $format: MediaFormat
  $status: MediaStatus
  $episodes: Int
  $duration: Int
  $chapters: Int
  $volumes: Int
  $isAdult: Boolean
  $genre: String
  $tag: String
  $minimumTagRank: Int
  $tagCategory: String
  $onList: Boolean
  $licensedBy: String
  $licensedById: Int
  $averageScore: Int
  $popularity: Int
  $source: MediaSource
  $countryOfOrigin: CountryCode
  $isLicensed: Boolean
  $search: String
  $id_not: Int
  $id_in: [Int]
  $id_not_in: [Int]
  $idMal_not: Int
  $idMal_in: [Int]
  $idMal_not_in: [Int]
  $startDate_greater: FuzzyDateInt
  $startDate_lesser: FuzzyDateInt
  $startDate_like: String
  $endDate_greater: FuzzyDateInt
  $endDate_lesser: FuzzyDateInt
  $endDate_like: String
  $format_in: [MediaFormat]
  $format_not: MediaFormat
  $format_not_in: [MediaFormat]
  $status_in: [MediaStatus]
  $status_not: MediaStatus
  $status_not_in: [MediaStatus]
  $episodes_greater: Int
  $episodes_lesser: Int
  $duration_greater: Int
  $duration_lesser: Int
  $chapters_greater: Int
  $chapters_lesser: Int
  $volumes_greater: Int
  $volumes_lesser: Int
  $genre_in: [String]
  $genre_not_in: [String]
  $tag_in: [String]
  $tag_not_in: [String]
  $tagCategory_in: [String]
  $tagCategory_not_in: [String]
  $licensedBy_in: [String]
  $licensedById_in: [Int]
  $averageScore_not: Int
  $averageScore_greater: Int
  $averageScore_lesser: Int
  $popularity_not: Int
  $popularity_greater: Int
  $popularity_lesser: Int
  $source_in: [MediaSource]
  $sort: [MediaSort]
) {
  Media(
    id: $id
    idMal: $idMal
    startDate: $startDate
    endDate: $endDate
    season: $season
    seasonYear: $seasonYear
    type: $type
    format: $format
    status: $status
    episodes: $episodes
    duration: $duration
    chapters: $chapters
    volumes: $volumes
    isAdult: $isAdult
    genre: $genre
    tag: $tag
    minimumTagRank: $minimumTagRank
    tagCategory: $tagCategory
    onList: $onList
    licensedBy: $licensedBy
    licensedById: $licensedById
    averageScore: $averageScore
    popularity: $popularity
    source: $source
    countryOfOrigin: $countryOfOrigin
    isLicensed: $isLicensed
    search: $search
    id_not: $id_not
    id_in: $id_in
    id_not_in: $id_not_in
    idMal_not: $idMal_not
    idMal_in: $idMal_in
    idMal_not_in: $idMal_not_in
    startDate_greater: $startDate_greater
    startDate_lesser: $startDate_lesser
    startDate_like: $startDate_like
    endDate_greater: $endDate_greater
    endDate_lesser: $endDate_lesser
    endDate_like: $endDate_like
    format_in: $format_in
    format_not: $format_not
    format_not_in: $format_not_in
    status_in: $status_in
    status_not: $status_not
    status_not_in: $status_not_in
    episodes_greater: $episodes_greater
    episodes_lesser: $episodes_lesser
    duration_greater: $duration_greater
    duration_lesser: $duration_lesser
    chapters_greater: $chapters_greater
    chapters_lesser: $chapters_lesser
    volumes_greater: $volumes_greater
    volumes_lesser: $volumes_lesser
    genre_in: $genre_in
    genre_not_in: $genre_not_in
    tag_in: $tag_in
    tag_not_in: $tag_not_in
    tagCategory_in: $tagCategory_in
    tagCategory_not_in: $tagCategory_not_in
    licensedBy_in: $licensedBy_in
    licensedById_in: $licensedById_in
    averageScore_not: $averageScore_not
    averageScore_greater: $averageScore_greater
    averageScore_lesser: $averageScore_lesser
    popularity_not: $popularity_not
    popularity_greater: $popularity_greater
    popularity_lesser: $popularity_lesser
    source_in: $source_in
    sort: $sort      
  ) {
    ${fields}
  }
}

`;

const mediaCharactersDefaultFields = `
characters(sort: $characterSort, page: $page, perPage: $perPage) {
  edges {
    role
    node {
      id
      image {
        large
        medium
      }
      name {
        first
        middle
        last
        full
        native
        userPreferred
      }
    }
  }
  pageInfo {
    total
    perPage
    currentPage
    lastPage
    hasNextPage
  }
}
`;
export const mediaCharactersDetailsQuery = (
  fields: string = mediaCharactersDefaultFields
) => `
query Media(
  $id: Int
  $characterSort: [CharacterSort]
  $page: Int
  $perPage: Int
) {
  Media(
    id: $id
  ) {
    ${fields}
  }
}

`;

const mediaStaffDefaultFields = `
staff(sort: $staffSort, page: $page, perPage: $perPage) {
  edges {
    role
    node {
      id
      image {
        large
        medium
      }
      name {
        first
        middle
        last
        full
        native
        userPreferred
      }
    }
  }
  pageInfo {
    total
    perPage
    currentPage
    lastPage
    hasNextPage
  }
}
`;
export const mediaStaffDetailsQuery = (
  fields: string = mediaStaffDefaultFields
) => `
query Media(
  $id: Int
  $staffSort: [StaffSort]
  $page: Int
  $perPage: Int
) {
  Media(
    id: $id
  ) {
    ${fields}
  }
}

`;

const mediaRecommendationsDefaultFields = `
recommendations(sort: $recommendationsSort, page: $page, perPage: $perPage) {
  edges {
    node {
      mediaRecommendation {
        ${mediaDefaultFields}
      }
    }
  }
  pageInfo {
    total
    perPage
    currentPage
    lastPage
    hasNextPage
  }
}
`;
export const mediaRecommendationsDetailsQuery = (
  fields: string = mediaRecommendationsDefaultFields
) => `
query Media(
  $id: Int
  $recommendationsSort: [RecommendationSort]
  $page: Int
  $perPage: Int
) {
  Media(
    id: $id
  ) {
    ${fields}
  }
}

`;
const mediaRelationsDefaultFields = `
relations {
  edges {
    relationType
    node {
      ${mediaDefaultFields}
    }
  }
  pageInfo {
    total
    perPage
    currentPage
    lastPage
    hasNextPage
  }
}
`;
export const mediaRelationsDetailsQuery = (
  fields: string = mediaRelationsDefaultFields
) => `
query Media(
  $id: Int
) {
  Media(
    id: $id
  ) {
    ${fields}
  }
}

`;

export const airingSchedulesDefaultFields = `
airingAt
episode
mediaId
media {
  bannerImage
  type
  id
  title {
    userPreferred
  }
  coverImage {
    extraLarge
    large
    color
  }
  genres
  favourites
  averageScore
}
`;

export const airingSchedulesQuery = (
  fields: string = airingSchedulesDefaultFields
) => `
query AiringSchedule($page: Int = 1, $perPage: Int = 20, $id: Int, $mediaId: Int, $episode: Int, $airingAt: Int, $notYetAired: Boolean, $id_not: Int, $id_in: [Int], $id_not_in: [Int], $mediaId_not: Int, $mediaId_in: [Int], $mediaId_not_in: [Int], $episode_not: Int, $episode_in: [Int], $episode_not_in: [Int], $episode_greater: Int, $episode_lesser: Int, $airingAt_greater: Int, $airingAt_lesser: Int, $sort: [AiringSort]) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    airingSchedules(
      id: $id, mediaId: $mediaId, episode: $episode, airingAt: $airingAt, notYetAired: $notYetAired, id_not: $id_not, id_in: $id_in, id_not_in: $id_not_in, mediaId_not: $mediaId_not, mediaId_in: $mediaId_in, mediaId_not_in: $mediaId_not_in, episode_not: $episode_not, episode_in: $episode_in, episode_not_in: $episode_not_in, episode_greater: $episode_greater, episode_lesser: $episode_lesser, airingAt_greater: $airingAt_greater, airingAt_lesser: $airingAt_lesser, sort: $sort
    ) {
      ${fields}
    }
  }
}
`;

export const recommendationsDefaultFields = `
id
rating
userRating
media {
  ${mediaDefaultFields}
}
mediaRecommendation {
  ${mediaDefaultFields}
}
`;

export const recommendationsQuery = (
  fields: string = recommendationsDefaultFields
) => `
query Recommendation ($page:Int = 1, $perPage: Int = 20, $id: Int,$mediaId: Int,$mediaRecommendationId: Int,$userId: Int,$rating: Int,$onList: Boolean,$rating_greater: Int,$rating_lesser: Int,$sort: [RecommendationSort]) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    recommendations(
      id: $id,mediaId: $mediaId,mediaRecommendationId: $mediaRecommendationId,userId: $userId,rating: $rating,onList: $onList,rating_greater: $rating_greater,rating_lesser: $rating_lesser,sort: $sort
    ) {
      ${fields}
    }
  }
}
`;

export const charactersDefaultFields = `
id
name {
  first
  middle
  last
  full
  native
  alternative
  alternativeSpoiler
  userPreferred
}
image {
  large
  medium
}
description
gender
dateOfBirth {
  year
  month
  day
}
age
bloodType
updatedAt
favourites
`;

export const charactersPageQuery = (fields = charactersDefaultFields) => `
query Character(
  $page: Int = 1
  $perPage: Int = 20
  $id: Int
  $isBirthday: Boolean
  $search: String
  $id_not: Int
  $id_in: [Int]
  $id_not_in: [Int]
  $sort: [CharacterSort]
) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    characters(
      id: $id
      isBirthday: $isBirthday
      search: $search
      id_not: $id_not
      id_in: $id_in
      id_not_in: $id_not_in
      sort: $sort
    ) {
      ${fields}
    }
  }
}
`;

export const charactersQuery = (fields = charactersDefaultFields) => `
query (
  $id: Int
  $sort: [MediaSort]
  $page: Int = 1
  $perPage: Int = 12
  $search: String
) {
  Character(id: $id, search: $search) {
    ${fields}
  }
}
`;

export const staffDefaultFields = `
id
name {
  first
  middle
  last
  full
  native
  alternative
  userPreferred
}
language
languageV2
image {
  large
  medium
}
description
primaryOccupations
gender
dateOfBirth {
  year
  month
  day
}
dateOfDeath {
  year
  month
  day
}
age
yearsActive
homeTown
bloodType
isFavourite
updatedAt
favourites
`;

export const staffPageQuery = (fields = staffDefaultFields) => `
query Staff(
  $page: Int = 1
  $perPage: Int = 20
  $id: Int
  $isBirthday: Boolean
  $search: String
  $id_not: Int
  $id_in: [Int]
  $id_not_in: [Int]
  $sort: [StaffSort]
) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    staff(
      id: $id
      isBirthday: $isBirthday
      search: $search
      id_not: $id_not
      id_in: $id_in
      id_not_in: $id_not_in
      sort: $sort
    ) {
      ${fields}
    }
  }
}
`;

export const staffQuery = (fields = staffDefaultFields) => `
query ($page: Int = 1, $perPage: Int = 12, $id: Int, $sort: [MediaSort] = [START_DATE_DESC]) {
  Staff(id: $id) {
    ${fields}
  }
}
`;

export const studioDetailsDefaultFields = `
id
name
isAnimationStudio
media(page: $page, perPage: $perPage, sort: ID_DESC) {
  nodes {
    ${mediaDefaultFields}
  }
  pageInfo {
    total
    perPage
    currentPage
    lastPage
    hasNextPage
  }
}
favourites
`;

export const studiosDefaultFields = `
id
name
isAnimationStudio
favourites
`;

export const studioDetailsQuery = (fields = studioDetailsDefaultFields) => `
query Studio(
  $page: Int = 1
  $perPage: Int = 20
  $id: Int
  $search: String
  $id_not: Int
  $id_in: [Int]
  $id_not_in: [Int]
  $sort: [StudioSort]
  $mediaSort: [MediaSort]
) {
  Studio(
    id: $id
    search: $search
    id_not: $id_not
    id_in: $id_in
    id_not_in: $id_not_in
    sort: $sort
  ) {
    ${fields}
  }
}
`;

export const studiosQuery = (fields = studiosDefaultFields) => `
query Studio(
  $page: Int = 1
  $perPage: Int = 20
  $id: Int
  $search: String
  $id_not: Int
  $id_in: [Int]
  $id_not_in: [Int]
  $sort: [StudioSort]
) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    studios(
      id: $id
      search: $search
      id_not: $id_not
      id_in: $id_in
      id_not_in: $id_not_in
      sort: $sort
    ) {
      ${fields}
    }
  }
}
`;

export const genresDefaultFields = `
{
  GenreCollection
  MediaTagCollection {
    name
    isAdult
    category
  }
}
`;
export const genresQuery = (fields = genresDefaultFields) => `
query ${fields}
`;

export const viewerDefaultFields = `
{
  Viewer {
    id
    name
    about
    avatar {
      large
    }
    bannerImage
    unreadNotificationCount
    donatorTier
    donatorBadge
    moderatorRoles
    options {
      titleLanguage
      staffNameLanguage
      restrictMessagesToFollowing
      airingNotifications
      displayAdultContent
      profileColor
      notificationOptions {
        type
        enabled
      }
      disabledListActivity {
        type
        disabled
      }
    }
    mediaListOptions {
      scoreFormat
      rowOrder
      animeList {
        customLists
        sectionOrder
        splitCompletedSectionByFormat
        advancedScoring
        advancedScoringEnabled
      }
      mangaList {
        customLists
        sectionOrder
        splitCompletedSectionByFormat
        advancedScoring
        advancedScoringEnabled
      }
    }
  }
}
`;
export const viewerQuery = (fields = viewerDefaultFields) => `
query ${fields}
`;

export const userDefaultFields = `
id
name
previousNames {
  name
  updatedAt
}
avatar {
  large
}
bannerImage
about
isFollowing
isFollower
donatorTier
donatorBadge
createdAt
moderatorRoles
isBlocked
bans
options {
  profileColor
  restrictMessagesToFollowing
}
mediaListOptions {
  scoreFormat
  animeList {
    customLists
    sectionOrder
  }
  mangaList {
    customLists
    sectionOrder
  }
}
`;
export const userInfoQuery = (fields = userDefaultFields) => `
query ($id: Int, $name: String) {
  User(id: $id, name: $name) {
    ${fields}
  }
}
`;

export const userMediaFavouritesDefaultFields = `
pageInfo {
  total
  perPage
  currentPage
  lastPage
  hasNextPage
}
edges {
  favouriteOrder
  node {
    id
    type
    status(version: 2)
    format
    isAdult
    bannerImage
    title {
      userPreferred
    }
    coverImage {
      large
      color
    }
    startDate {
      year
    }
  }
}
`;
export const userAnimeFavouritesQuery = (
  fields = userMediaFavouritesDefaultFields
) => `
query ($id: Int, $name: String, $animePage: Int) {
  User(id: $id, name: $name) {
    favourites {
      anime(page: $animePage) {
        ${fields}
      }
    }
  }
}
`;

export const userMangaFavouritesQuery = (
  fields = userMediaFavouritesDefaultFields
) => `
query ($id: Int, $name: String, $mangaPage: Int) {
  User(id: $id, name: $name) {
    favourites {
      manga(page: $mangaPage) {
        ${fields}
      }
    }
  }
}
`;

export const userCharactersFavouritesDefaultFields = `
pageInfo {
  total
  perPage
  currentPage
  lastPage
  hasNextPage
}
edges {
  favouriteOrder
  node {
    id
    name {
      userPreferred
    }
    image {
      large
    }
  }
}
`;
export const userCharactersFavouritesQuery = (
  fields = userCharactersFavouritesDefaultFields
) => `
query ($id: Int, $name: String, $charactersPage: Int) {
  User(id: $id, name: $name) {
    favourites {
      characters(page: $charactersPage) {
        ${fields}
      }
    }
  }
}
`;
export const userStaffFavouritesDefaultFields =
  userCharactersFavouritesDefaultFields;
export const userStaffFavouritesQuery = (
  fields = userStaffFavouritesDefaultFields
) => `
query ($id: Int, $name: String, $staffPage: Int) {
  User(id: $id, name: $name) {
    favourites {
      staff(page: $staffPage) {
        ${fields}
      }
    }
  }
}
`;

export const userMediaListCollectionQuery = (fields = "") => `
query ($userId: Int, $userName: String, $type: MediaType) {
  ${fields}
  MediaListCollection(userId: $userId, userName: $userName, type: $type) {
    lists {
      name
      isCustomList
      isCompletedList: isSplitCompletedList
      entries {
        ...mediaListEntry
      }
    }
    user {
      id
      name
      avatar {
        large
      }
      mediaListOptions {
        scoreFormat
        rowOrder
        animeList {
          sectionOrder
          customLists
          splitCompletedSectionByFormat
          theme
        }
        mangaList {
          sectionOrder
          customLists
          splitCompletedSectionByFormat
          theme
        }
      }
    }
  }
}

fragment mediaListEntry on MediaList {
  id
  mediaId
  status
  score
  progress
  progressVolumes
  repeat
  priority
  private
  hiddenFromStatusLists
  customLists
  advancedScores
  notes
  updatedAt
  startedAt {
    year
    month
    day
  }
  completedAt {
    year
    month
    day
  }
  media {
    id
    title {
      userPreferred
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
      color
    }
    type
    format
    status(version: 2)
    episodes
    volumes
    chapters
    averageScore
    popularity
    isAdult
    countryOfOrigin
    genres
    bannerImage
    startDate {
      year
      month
      day
    }
  }
}
`;

export const userPageActivityQuery = (fields = "") => `
query ($userId: Int, $type: ActivityType, $type_in: [ActivityType], $page: Int, $createdAt_lesser: Int, $sort: [ActivitySort] = [PINNED, ID_DESC], $hasReplies: Boolean) {
  Page(page: $page, perPage: 25) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    ${fields}
    activities(userId: $userId, type: $type, type_in: $type_in, sort: $sort, createdAt_lesser: $createdAt_lesser, hasReplies: $hasReplies) {
      ... on ListActivity {
        id
        type
        replyCount
        status
        progress
        isLocked
        isSubscribed
        isLiked
        isPinned
        likeCount
        createdAt
        user {
          id
          name
          avatar {
            large
          }
        }
        media {
          id
          type
          status(version: 2)
          isAdult
          bannerImage
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
      }
      ... on TextActivity {
        id
        type
        text
        replyCount
        isLocked
        isSubscribed
        isLiked
        isPinned
        likeCount
        createdAt
        user {
          id
          name
          avatar {
            large
          }
        }
      }
      ... on MessageActivity {
        id
        type
        message
        replyCount
        isPrivate
        isLocked
        isSubscribed
        isLiked
        likeCount
        createdAt
        user: recipient {
          id
        }
        messenger {
          id
          name
          donatorTier
          donatorBadge
          moderatorRoles
          avatar {
            large
          }
        }
      }
    }
  }
}
`;

export const userPageActivityRepliesQuery = (fields = "") => `
query ($activityId: Int, $page: Int) {
  Page(page: $page, perPage: 10) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    ${fields}
    activityReplies(activityId: $activityId) {
      id
      userId
      text
      createdAt
      activityId
      isLiked
      likeCount
      user {
        id
        name
        moderatorRoles
        avatar {
          large
        }
      }
    }
  }
}
`;

export const pageReviewsQuery = (fields = "") => `
query ($userId: Int, $page: Int, $perPage: Int = 30) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    ${fields}
    reviews(userId: $userId, sort: ID_DESC) {
      id
      rating
      ratingAmount
      summary
      media {
        id
        title {
          userPreferred
        }
        type
        bannerImage
        coverImage {
          large
        }
      }
      user {
        id
        name
        avatar {
          large
        }
      }
    }
  }
}
`;

export const reviewDetailsQuery = (fields = "") => `
query ($id: Int, $mediaId: Int, $userId: Int) {
  Review(id: $id, mediaId: $mediaId, userId: $userId) {
    ${fields}
    id
    body
    summary
    rating
    ratingAmount
    userRating
    score
    private
    createdAt
    user {
      id
      name
      avatar {
        medium
      }
    }
    media {
      id
      type
      title {
        userPreferred
      }
      isAdult
      bannerImage
      coverImage {
        large
        extraLarge
      }
    }
  }
}
`;

export const userPageFollowingQuery = (fields = "") => `
query ($userId: Int!, $page: Int) {
  Page(page: $page, perPage: 30) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    ${fields}
    following(userId: $userId, sort: USERNAME) {
      id
      name
      isFollowing
      moderatorRoles
      avatar {
        large
      }
    }
  }
}
`;

export const userPageFollowersQuery = (fields = "") => `
query ($userId: Int!, $page: Int) {
  Page(page: $page, perPage: 30) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    ${fields}
    followers(userId: $userId, sort: USERNAME) {
      id
      name
      isFollowing
      moderatorRoles
      avatar {
        large
      }
    }
  }
}
`;

export const pageForumThreadsQuery = (fields = "") => `
query ($userId: Int, $sort: [ThreadSort] = [ID_DESC], $categoryId: Int, $mediaCategoryId: Int, $subscribed: Boolean, $search: String, $page: Int, $perPage: Int = 25) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    ${fields}
    threads(userId: $userId, sort: $sort, categoryId: $categoryId, mediaCategoryId: $mediaCategoryId, subscribed: $subscribed, search: $search) {
      id
      title
      replyCount
      viewCount
      replyCommentId
      isLocked
      repliedAt
      createdAt
      categories {
        id
        name
      }
      mediaCategories {
        id
        title {
          userPreferred
        }
        bannerImage
        coverImage {
          large
        }
        type
      }
      user {
        id
        name
        avatar {
          large
        }
      }
      replyUser {
        id
        name
        avatar {
          large
        }
      }
    }
  }
}
`;

export const forumThreadDetailsQuery = (fields = "") => `
query ($id: Int) {
  Thread(id: $id) {
    ${fields}
    id
    title
    body
    userId
    replyCount
    viewCount
    isLocked
    isSticky
    isSubscribed
    isLiked
    likeCount
    repliedAt
    createdAt
    user {
      id
      name
      avatar {
        large
      }
    }
    categories {
      id
      name
    }
    mediaCategories {
      id
      title {
        userPreferred
      }
      coverImage {
        large
      }
      type
      format
    }
  }
}
`;

export const pageForumThreadCommentsQuery = (fields = "") => `
query ($threadId: Int, $userId: Int, $page: Int, $sort: [ThreadCommentSort] = [ID_DESC]) {
  Page(page: $page, perPage: 15) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    ${fields}
    threadComments(threadId: $threadId, userId: $userId, sort: $sort) {
      id
      threadId
      comment
      isLiked
      likeCount
      createdAt
      thread {
        id
        title
      }
      user {
        id
        name
        donatorTier
        donatorBadge
        moderatorRoles
        avatar {
          large
        }
      }
    }
  }
}
`;

export const pageForumThreadCommentsWithChildrenCommentQuery = (
  fields = ""
) => `
query ($threadId: Int, $userId: Int, $page: Int) {
  Page(page: $page, perPage: 15) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    ${fields}
    threadComments(threadId: $threadId, userId: $userId,) {
      id
      threadId
      comment
      isLiked
      likeCount
      createdAt
      user {
        id
        name
        donatorTier
        donatorBadge
        moderatorRoles
        avatar {
          large
        }
      }
      childComments
      isLocked
    }
  }
}
`;
