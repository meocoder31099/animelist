export const aniListEndPoint = "https://graphql.anilist.co";
export const aniListqueryMedia = `
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
  $isAdult: Boolean = false,
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
  $year: String
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
      startDate_like: $year
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
      
id
type
title {
  english
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

    }
  }
}
`;

export const aniListQueryDetailMedia = `
query Media(
  $page: Int = 1
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
  $isAdult: Boolean = false,
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
  $sort: [RecommendationSort]
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
  ) {
      id
      type
      title {
        english
        native
        romaji
        userPreferred
      }
      coverImage {
        extraLarge
        large
        color
      }
      studios {
        edges {
          node {
            name
            id
          }
        }
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
      season
      seasonYear
      description
      type
      synonyms
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
      countryOfOrigin
      averageScore
      popularity
      trailer {
        id
        site 
      }
      tags {
        id,
        name
      }
      staff{
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
      characters {
        edges {
          id
          role
          node {
            id
            name {
              userPreferred
            }
            image {
              large
              medium
            }
          }
        }
      }
      relations{
        edges{
          relationType
          node{
            id
            type
            title{
              english
              userPreferred
            }
            format
            status
            coverImage{
              color
              large
              extraLarge
            }
            nextAiringEpisode {
              airingAt
              episode
            }
          }
        }
      }
      recommendations(page: $page, sort:$sort) {
        edges {
          node {
            mediaRecommendation {
              id
              type
              coverImage {
                large
                color
                extraLarge
              }
              nextAiringEpisode {
                airingAt
                episode
              }
              title {
                english
                userPreferred
              }
            }
          }
        }
      }
      nextAiringEpisode {
        airingAt
        episode
      }
    }
  }
`;

export const aniListQueryCharacter = `
query (
  $id: Int
  $sort: [MediaSort]
  $page: Int = 1
  $perPage: Int = 18
  $search: String
  $withMedia:Boolean = true
) {
    Character(id: $id, search: $search) {
      id
      name {
        userPreferred
        native
        alternative
        alternativeSpoiler
      }
      description
      gender
      age
      image {
        large
        medium
      }
      dateOfBirth {
        month
        day
      }
      favourites
      media(sort: $sort, page: $page, perPage: $perPage) @include(if: $withMedia) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          characterRole
          voiceActorRoles {
            roleNotes
            voiceActor {
              id
              languageV2
              name {
                userPreferred
              }
              age
              image {
                medium
                large
              }
            }
          }
          node {
            id
            type
            title {
              english
              userPreferred
            }
            format
            coverImage {
              large
              extraLarge
              color
            }
            nextAiringEpisode {
              airingAt
              episode
            }
          }
        }
      }
    }
  }
`;

export const aniListQueryBrowseCharacter = `query($page:Int = 1 $perPage:Int = 24 $id:Int $search:String $isBirthday:Boolean $sort:[CharacterSort]){Page(page:$page,perPage:$perPage){pageInfo{total perPage currentPage lastPage hasNextPage}characters(id:$id search:$search isBirthday:$isBirthday sort:$sort){id name{userPreferred}image{large}}}}`;

export const aniListQueryBrowseStaff = `query($page:Int = 1 $perPage:Int = 24 $id:Int $search:String $isBirthday:Boolean $sort:[StaffSort]){Page(page:$page,perPage:$perPage){pageInfo{total perPage currentPage lastPage hasNextPage}staff(id:$id search:$search isBirthday:$isBirthday sort:$sort){id name{userPreferred}image{large}}}}`;

export const aniListQueryCollection = `
  query { GenreCollection
    MediaTagCollection {
      name
    }
  }
`;

export const aniListQueryStaff = `
query($page:Int = 1 $perPage:Int = 18 $id:Int $sort:[MediaSort] = [START_DATE_DESC]){
  Staff(id: $id) {
    id
    name {
      native
      userPreferred
      alternative
    }
    image {
      large
      medium
    }
    favourites
    description
    age
    gender
    bloodType
    yearsActive
    dateOfDeath{
      year
      month
      day
    }
    homeTown
    dateOfBirth {
      year
      month
      day
    }
    characterMedia(page: $page, perPage: $perPage, sort: $sort) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        characterRole
        characters {
          id
          name {
            userPreferred
          }
          image{
            medium
            large
          }
        }
        node {
          id
          type
          startDate {
            year
          }
          format
          coverImage {
            color
            extraLarge
            large
            medium
          }
          title {
            english
            userPreferred
          }
          nextAiringEpisode {
            airingAt
            episode
          }
        }
      }
    }
  }
}
`;

export const aniListQueryAiringSchedule = `
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
      
airingAt
episode
mediaId
media {
  bannerImage
  type
  id
  title {
    english
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
  isAdult
  nextAiringEpisode {
    airingAt
    episode
  }
}

    }
  }
}
`;

export const aniListQueryStudio = `
query($id:Int,$page:Int=1,$perPage:Int=18,$sort:[MediaSort]){Studio(id:$id){id name isAnimationStudio favourites isFavourite media(page:$page,perPage:$perPage,sort:$sort){pageInfo{total perPage currentPage lastPage hasNextPage}edges{isMainStudio node{id title{english userPreferred}coverImage{extraLarge large color}startDate{year month day}endDate{year month day}bannerImage season description type format status(version:2)episodes duration chapters volumes genres isAdult averageScore popularity mediaListEntry{id status}nextAiringEpisode{airingAt timeUntilAiring episode}}}}}}
`;

export const aniListDescriptionRewrite = (description: string): string => {
  if (!description) return "";
  let convertedText = description;

  //Comment phần này để hiện spoiler
  // convertedText = convertedText.replace(
  //   /__(.*?):__ (.*?)!~\n/g,
  //   '<p><span class="mr-1">$1:</span>$2</p>!~'
  // );
  // convertedText = convertedText.replace(
  //   /~!(.*?)!~/gs,
  //   '<span spoiler="true" class="bg-neutral-800 text-neutral-800 rounded cursor-pointer" onclick="this.classList.remove(\'bg-neutral-800\', \'text-neutral-800\')" >$1</span>'
  // );
  convertedText = convertedText.replace(
    /__(.*?):__ (.*?)\n|__(.*?):__ (.*?)!~/g,
    '<p><span class="mr-1">$1:</span>$2</p>'
  );

  convertedText = convertedText.replace(
    /\*\*(.*?):\*\* (.*?)\n|\*\*(.*?):\*\* (.*?)!~/g,
    '<p><span class="mr-1">$1:</span>$2</p>'
  );

  convertedText = convertedText.replace(/\[(.*?)\]\((.*?)\)/g, "$1");

  // Comment phần này nếu muốn ẩn sploiler
  convertedText = convertedText.replace(/~!|!~/g, "");

  convertedText = convertedText.replace(/\n/g, "<br>");
  return convertedText;
};

export const formatTimestamp = (timestamp: number): string => {
  const units = [
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
  ];

  let seconds = Math.floor((timestamp * 1000 - Date.now()) / 1000);
  const parts = [];

  for (const unit of units) {
    const value = Math.floor(seconds / unit.seconds);
    if (value > 0) {
      parts.push(`${value}${unit.label}`);
      seconds %= unit.seconds;
    }
  }

  return parts.join(" ");
};
