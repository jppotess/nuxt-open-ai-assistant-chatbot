
import {getLatestMessages} from '../utils/get-message'

export default defineEventHandler(async (event) => {
    const threadId = getCookie(event, "open-ai-thread-id")
    const runId = getCookie(event, "open-ai-run-id")

    if (!threadId || !runId) {
        return {
            error: "Thread ID or Run ID is missing"
        }
    }

    return await getLatestMessages(threadId, runId)
})