
import { client, assistant } from '../utils/openai'
import {getLatestMessages} from '../utils/get-message'

export default defineEventHandler(async (event) => {
    const threadId = getCookie(event, "open-ai-thread-id")

    if (!threadId) {
        return {
            error: "Thread ID or Run ID is missing"
        }
    }

    const queryParams = getQuery(event)

    await client.beta.threads.messages.create(threadId, {
        role: "user",
        content: queryParams.message?.toString() ?? ""
    })

    // new run for the assistant
    const run = await client.beta.threads.runs.create(threadId, {
        assistant_id: assistant,
    })

    return await getLatestMessages(threadId, run.id)
})