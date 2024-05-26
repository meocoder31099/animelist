import type {
  AiringSchedule,
  AiringScheduleArgs,
  CharacterArgs,
  MediaArgs,
  MediaType,
  MediaSort,
  CharacterSort,
  StaffSort,
  RecommendationSort,
  PageArgs,
  RecommendationArgs,
  StaffArgs,
  StudioArgs,
} from "@/types/anilist";
import type {
  MediaDetailsQueryResponse,
  CharacterDetailsQueryResponse,
  StaffDetailsQueryResponse,
  StudioDetailsQueryResponse,
  PageQueryResponse,
  GenreCollectionQueryResponse,
} from "@/services/anilist/queries";

// Import Libs
import usePostData from "@/hooks/usePostData";
import {
  mediaQuery,
  mediaDetailsQuery,
  mediaCharactersDetailsQuery,
  mediaStaffDetailsQuery,
  mediaRecommendationsDetailsQuery,
  mediaRelationsDetailsQuery,
  charactersQuery,
  charactersPageQuery,
  staffQuery,
  staffPageQuery,
  airingSchedulesQuery,
  studioDetailsQuery,
  genresQuery,
  charactersDefaultFields,
  mediaDefaultFields,
  staffDefaultFields,
  studiosDefaultFields,
} from "@/services/anilist/queries";

// https://cors-anywhere.herokuapp.com/
const GRAPHQL_URL = "https://graphql.anilist.co";

type anilistFetcherOptions = {
  query: string;
  variables?: any;
  customFetch?: typeof fetch;
};
export const anilistFetcher = async <T>({
  query,
  variables,
  customFetch,
}: anilistFetcherOptions): Promise<T> => {
  type Response = {
    data: T;
  };
  const data = (await usePostData<Response>({
    url: GRAPHQL_URL,
    body: {
      query,
      variables,
    },
    customFetch,
  })) as Response;

  return data?.data;
};

type getPageMediaOptions = {
  args: MediaArgs & PageArgs;
  fields?: string;
  customFetch?: typeof fetch;
};
export const getPageMedia = async ({
  args,
  fields,
  customFetch,
}: getPageMediaOptions) => {
  const response = await anilistFetcher<PageQueryResponse>({
    query: mediaQuery(fields),
    variables: args,
    customFetch,
  });

  return response?.Page || null;
};

type getMediaDetailsOptions = {
  args: MediaArgs & PageArgs;
  fields?: string;
  customFetch?: typeof fetch;
};
export const getMediaDetails = async ({
  args,
  fields,
  customFetch,
}: getMediaDetailsOptions) => {
  const response = await anilistFetcher<MediaDetailsQueryResponse>({
    query: mediaDetailsQuery(fields),
    variables: args,
    customFetch,
  });
  const media = response?.Media;

  return {
    ...media,
  };
};

type getMediaCharacterPageDetailsOptions = {
  args: MediaArgs & PageArgs & { characterSort?: CharacterSort[] };
  fields?: string;
  customFetch?: typeof fetch;
};
export const getMediaCharacterPageDetails = async ({
  args,
  fields,
  customFetch,
}: getMediaCharacterPageDetailsOptions) => {
  const response = await anilistFetcher<MediaDetailsQueryResponse>({
    query: mediaCharactersDetailsQuery(fields),
    variables: {
      perPage: 12,
      ...args,
    },
    customFetch,
  });

  return response?.Media?.characters;
};

type getMediaStaffPageDetailsOptions = {
  args: MediaArgs & PageArgs & { staffSort?: StaffSort };
  fields?: string;
  customFetch?: typeof fetch;
};
export const getMediaStaffPageDetails = async ({
  args,
  fields,
  customFetch,
}: getMediaStaffPageDetailsOptions) => {
  const response = await anilistFetcher<MediaDetailsQueryResponse>({
    query: mediaStaffDetailsQuery(fields),
    variables: {
      perPage: 25,
      ...args,
    },
    customFetch,
  });

  return response?.Media?.staff;
};

type getMediaRecommendationsPageDetailsOptions = {
  args: MediaArgs & PageArgs & { recommendationsSort?: RecommendationSort };
  fields?: string;
  customFetch?: typeof fetch;
};
export const getMediaRecommendationsPageDetails = async ({
  args,
  fields,
  customFetch,
}: getMediaRecommendationsPageDetailsOptions) => {
  const response = await anilistFetcher<MediaDetailsQueryResponse>({
    query: mediaRecommendationsDetailsQuery(fields),
    variables: {
      perPage: 25,
      ...args,
    },
    customFetch,
  });

  return response?.Media?.recommendations;
};

type getMediaRelationsPageDetailsOptions = {
  args: MediaArgs & PageArgs;
  fields?: string;
  customFetch?: typeof fetch;
};
export const getMediaRelationsPageDetails = async ({
  args,
  fields,
  customFetch,
}: getMediaRelationsPageDetailsOptions) => {
  const response = await anilistFetcher<MediaDetailsQueryResponse>({
    query: mediaRelationsDetailsQuery(fields),
    variables: args,
    customFetch,
  });

  return response?.Media?.relations;
};

type getPageCharactersOptions = {
  args: PageArgs & CharacterArgs;
  fields?: string;
  customFetch?: typeof fetch;
};
export const getPageCharacters = async ({
  args,
  fields,
  customFetch,
}: getPageCharactersOptions) => {
  const response = await anilistFetcher<PageQueryResponse>({
    query: charactersPageQuery(fields),
    variables: { ...args },
    customFetch,
  });

  return response?.Page;
};

type getCharacterDetailsOptions = {
  args: PageArgs & CharacterArgs;
  fields?: string;
  withMedia?: boolean;
  withInfo?: boolean;
  customFetch?: typeof fetch;
};
const chaptersMediaDefaultFields = `
media(sort: $sort, page: $page, perPage: $perPage) {
  edges {
    characterRole
    node {
      ${mediaDefaultFields}
    }
    voiceActorRoles {
      roleNotes
      voiceActor {
        ${staffDefaultFields}
      }
    }
  }
  pageInfo{
    total
    perPage
    currentPage
    lastPage
    hasNextPage
  }
}
`;
export const getCharacterDetails = async ({
  args,
  fields,
  withMedia = true,
  withInfo = true,
  customFetch,
}: getCharacterDetailsOptions) => {
  const defaultFields = `
    ${withInfo ? charactersDefaultFields : ""}
    ${withMedia ? chaptersMediaDefaultFields : ""}
  `;

  const response = await anilistFetcher<CharacterDetailsQueryResponse>({
    query: charactersQuery(fields || defaultFields),
    variables: { ...args },
    customFetch,
  });

  return response?.Character || null;
};

type getPageStaffOptions = {
  args: PageArgs & StaffArgs;
  fields?: string;
  customFetch?: typeof fetch;
};
export const getPageStaff = async ({
  args,
  fields,
  customFetch,
}: getPageStaffOptions) => {
  const response = await anilistFetcher<PageQueryResponse>({
    query: staffPageQuery(fields),
    variables: { ...args },
    customFetch,
  });

  return response?.Page;
};

type getStaffDetailsOptions = {
  args: PageArgs & StaffArgs;
  fields?: string;
  withMedia?: boolean;
  withStaffRole?: boolean;
  withInfo?: boolean;
  customFetch?: typeof fetch;
};
const staffCharactersMediaDefaultFields = `
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
      image {
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
`;
const staffRolesMediaDefaultFields = `
staffMedia(page: $page, perPage: $perPage, sort: $sort) {
  pageInfo {
    total
    perPage
    currentPage
    lastPage
    hasNextPage
  }
  edges {
    staffRole
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
`;
export const getStaffDetails = async ({
  args,
  fields,
  withInfo = true,
  withMedia = true,
  withStaffRole = true,
  customFetch,
}: getStaffDetailsOptions) => {
  const defaultFields = `
  ${withInfo ? staffDefaultFields : ""}
  ${withMedia ? staffCharactersMediaDefaultFields : ""}
  ${withStaffRole ? staffRolesMediaDefaultFields : ""}
  `;

  const response = await anilistFetcher<StaffDetailsQueryResponse>({
    query: staffQuery(fields || defaultFields),
    variables: { ...args },
    customFetch,
  });

  if (response?.Staff.characterMedia?.pageInfo?.total === 0) {
    const staffMedia = await anilistFetcher<StaffDetailsQueryResponse>({
      query: staffQuery(fields || staffRolesMediaDefaultFields),
      variables: { ...args },
      customFetch,
    });

    if (staffMedia.Staff.staffMedia?.pageInfo?.total)
      return { ...response?.Staff, ...staffMedia.Staff };
  }

  return response?.Staff || null;
};

type getAiringSchedulesOptions = {
  args: PageArgs & AiringScheduleArgs;
  fields?: string;
  customFetch?: typeof fetch;
};
export const getAiringSchedules = async ({
  args,
  fields,
  customFetch,
}: getAiringSchedulesOptions) => {
  const response = await anilistFetcher<PageQueryResponse>({
    query: airingSchedulesQuery(fields),
    variables: { ...args },
    customFetch,
  });

  return response?.Page;
};

type getStudioDetailsOptions = {
  args: PageArgs & StudioArgs & { mediaSort: MediaSort[] };
  fields?: string;
  customFetch?: typeof fetch;
  withMedia?: boolean;
  withInfo?: boolean;
};
const studioMediaDefaultFields = `
media(page: $page, perPage: $perPage, sort: $mediaSort) {
  pageInfo {
    total
    perPage
    currentPage
    lastPage
    hasNextPage
  }
  edges {
    isMainStudio
    node {
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
      description
      type
      format
      status(version: 2)
      episodes
      duration
      chapters
      volumes
      genres
      isAdult
      averageScore
      popularity
      mediaListEntry {
        id
        status
      }
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
    }
  }
}
`;
export const getStudioDetails = async ({
  args,
  fields,
  customFetch,
  withMedia = true,
  withInfo = true,
}: getStudioDetailsOptions) => {
  const defaultFields = `
  ${withInfo ? studiosDefaultFields : ""}
  ${withMedia ? studioMediaDefaultFields : ""}
  `;
  const response = await anilistFetcher<StudioDetailsQueryResponse>({
    query: studioDetailsQuery(fields || defaultFields),
    variables: args,
    customFetch,
  });

  return response?.Studio || null;
};

type getGenreCollectionOptions = {
  fields?: string;
  customFetch?: typeof fetch;
};
export const getGenreCollection = async ({
  fields,
  customFetch,
}: getGenreCollectionOptions) => {
  const response = await anilistFetcher<GenreCollectionQueryResponse>({
    query: genresQuery(fields),
    customFetch,
  });

  return response || null;
};
