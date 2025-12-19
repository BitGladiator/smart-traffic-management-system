import api, { route } from '@forge/api';

const addJiraCommentInternal = async (issueId, commentText) => {
  try {
    const bodyData = {
      body: {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [{
              text: commentText,
              type: "text"
            }]
          }
        ]
      }
    };
    const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueId}/comment`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    });

    if(response.ok){
      console.log(`Added comment '${commentText}' to issueId: ${issueId}`);
    }
    else{
      console.log(`Failed to add comment '${commentText}' '${await response.text()}' to issueId: ${issueId}`);
    }
  }
  catch(error){
    console.log(error);
  }
};

export async function addComment(payload) {
  const issueId = payload.issueId;
  const comment = payload.comment;

  await addJiraCommentInternal(issueId, comment);
}

export async function fetchComments(payload) {
  const issueId = payload.issueId;
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueId}/comment`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  return response.json();
}
