import { IMessage } from "~/intefaces/iMessage";

export const useIsChatting = () => useState("isChatting", () => false);

export const useMessages = () => useState<IMessage[]>("messages", () => {
    return []
})