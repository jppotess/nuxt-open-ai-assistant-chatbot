<template>
  <section class="flex flex-col min-w-[520px] w-full">
    <div class="flex items-center gap-3.5 pb-4 border-b border-dashed">
      <div>
        <div
          class="w-20 h-20 overflow-hidden rounded-full image-fit border-2 border-slate-200/70"
        >
          <img src="/jacko.jpg" />
        </div>
      </div>
      <div>
        <div class="font-medium truncate max-w-[9rem] md:max-w-none">Jacko</div>
        <div class="text-slate-500 mt-0.5 truncate max-w-[9rem] md:max-w-none">
          Existential Support Agent
        </div>
      </div>
    </div>

    <div v-if="pending" class="text-center text-2xl py-12">
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-12 h-12 mx-auto animate-spin"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </div>

    <div
      ref="container"
      v-else
      class="flex flex-col gap-3.5 py-5 px-3 overflow-y-scroll max-h-[400px]"
    >
      <div
        v-for="(message, index) in messages"
        :key="message.id"
        class="flex items-end gap-3"
        :class="{ 'flex-row-reverse': !message.isJacko && index !== 0 }"
      >
        <img
          v-if="index === 0 || message.isJacko"
          class="block w-16 h-16 overflow-hidden rounded-full border-2 border-slate-200/70"
          src="/jacko.jpg"
        />

        <div
          v-else
          class="flex uppercase items-center justify-center text-xl text-center text-white font-bold bg-gradient-to-t from-sky-500 to-emerald-500 w-16 h-16 overflow-hidden rounded-full border-2 border-slate-200/70"
        >
          {{ customerInitials }}
        </div>

        <div
          class="w-3/5 flex flex-col gap-2 border px-4 pt-3 pb-4 rounded-xl bg-slate-50/80 border-slate-200/80"
        >
          <div v-if="message.isJacko" v-html="message.message"></div>

          <div v-else>
            {{ message.message }}
          </div>

          <div class="text-xs text-slate-500/70">{{ message.timestamp }}</div>
        </div>
      </div>
    </div>

    <MessageForm v-if="!pending" />
  </section>
</template>

<script setup lang="ts">
const messages = useMessages();
const { customerInitials } = useCustomer();
const container = ref();

// Scroll to the bottom of the chat container when a new message is added
onUpdated(() => {
  container.value.scrollTop = container.value.scrollHeight;
});

// Fetch messages from the API and add them to the messages array when the component is mounted
const { pending } = await useFetch("/api/message", {
  lazy: true,
  onResponse({ response }) {
    response._data.data.reverse().forEach((element) => {
      const content = element.content[0];

      // This is like this because the API returns an array of message
      if (content?.type === "text") {
        messages.value.push({
          name: content.role === "assistant" ? "Jacko" : customerInitials.value,
          isJacko: content.role === "assistant" ? true : false,
          message: content.text.value,
          timestamp: new Date().toLocaleString([], { timeStyle: "short" }),
        });
      }
    });
  },
});
</script>
