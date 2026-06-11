import { communityGuides, popularGuides } from "../mock/guides";
import { CommunityFeed, CommunityFeedParams, Guide } from "../types";
import { mockRequest, requestWithMock } from "./apiClient";

export const communityService = {
  getCommunityFeed(params: CommunityFeedParams = {}): Promise<CommunityFeed> {
    const keyword = params.keyword?.trim();
    const filter = params.filter;
    const items = communityGuides.filter((guide) => {
      const matchFilter = !filter || filter === "全部" || guide.tag === filter || guide.city === filter || guide.title.includes(filter);
      const matchKeyword = !keyword || guide.title.includes(keyword) || guide.summary.includes(keyword) || guide.city.includes(keyword);
      return matchFilter && matchKeyword;
    });

    return requestWithMock("/community/feed", { items }, { query: { channel: params.channel, filter: params.filter, keyword: params.keyword } });
  },
  getPopularGuides(): Promise<Guide[]> {
    return mockRequest(popularGuides);
  },
  getCommunityGuides(): Promise<Guide[]> {
    return mockRequest(communityGuides);
  },
  getGuide(id: string): Promise<Guide> {
    const fallback = communityGuides[0];
    const guide = communityGuides.find((item) => item.id === id) ?? fallback;
    if (!guide) {
      throw new Error("Guide mock data is empty");
    }
    return mockRequest(guide);
  }
};
