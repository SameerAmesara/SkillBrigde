import axios from "axios";
import { DiscussionModel, DiscussionSearchAndFilterModel, NewDiscussionReplyModel, NewDiscussionSubmitDataModel } from "../../models/discussions.model";
import React from "react";

const BASE_URL = 'http://localhost:8000';
const DISCUSSION_URL = `${BASE_URL}/discussions`

export const fetchDiscussions = async (searchAndFilter: DiscussionSearchAndFilterModel, page: number) => {
    const response = await axios.post<{ discussions: DiscussionModel[], totalPages: number }>(`${DISCUSSION_URL}?page=${page}`, searchAndFilter, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
};

export const fetchDiscussion = async (discussionId: string) => {
    const response = await axios.get<DiscussionModel>(`${DISCUSSION_URL}/${discussionId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
};

export const updateLikeDisLike = async (discussionId: string, userId: string, action: string) => {
    const url = `${DISCUSSION_URL}/${discussionId}/${action}?userId=${userId}`;
    return await axios.patch<DiscussionModel>(url);
};

export const replyToDiscussion = async (discussionId: string, reply: NewDiscussionReplyModel) => {
    const url = `${DISCUSSION_URL}/${discussionId}/reply`;
    return await axios.post<DiscussionModel>(url, reply);
};

export const deleteReplyFromDiscussion = async (discussionId: string, replyId: string) => {
    const url = `${DISCUSSION_URL}/${discussionId}/reply/${replyId}`;
    return await axios.delete<DiscussionModel>(url);
};

export const startDiscussion = async (newDiscussionData: NewDiscussionSubmitDataModel) => {
    const url = `${DISCUSSION_URL}/new`
    return await axios.post(url, newDiscussionData)
}

export const deleteDiscussion = async (discussionId: string) => {
    const url = `${DISCUSSION_URL}/${discussionId}`;
    return await axios.delete(url);
}

export const formateContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.trim().startsWith('- ')) {
        return React.createElement('li', { key: index }, line.trim().substring(2));
      } else if (line.trim().match(/^\d+\. /)) {
        return React.createElement('li', { key: index }, line.trim().substring(line.indexOf('.') + 1));
      }
      return React.createElement('p', { key: index }, line);
    });
  }